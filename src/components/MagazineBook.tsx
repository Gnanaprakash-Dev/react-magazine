import React, {
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { PageFlip } from 'page-flip';
import type {
  IFlipSetting,
  IEventProps,
  PageFlipInstance,
  FlipCorner,
  PageOrientation,
  PageState,
} from '../types';

interface MagazineBookProps extends Partial<IFlipSetting>, IEventProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  renderOnlyPageLengthChange?: boolean;
  /** Show loading state */
  isLoading?: boolean;
  /** Disable all interactions */
  disabled?: boolean;
  /** Show built-in navigation controls */
  showControls?: boolean;
  /** Custom class for controls container */
  controlsClassName?: string;
  /** Custom style for controls container */
  controlsStyle?: React.CSSProperties;
}

// Inline styles
const inlineStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties,

  magazine: {
    display: 'block',
    position: 'relative',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'pan-y',
    boxSizing: 'border-box',
  } as React.CSSProperties,

  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    marginTop: '8px',
  } as React.CSSProperties,

  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    borderRadius: '6px',
    background: '#2196F3',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,

  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    background: '#90CAF9',
  } as React.CSSProperties,

  pageInfo: {
    fontSize: '13px',
    color: '#666',
    padding: '6px 12px',
    background: '#f5f5f5',
    borderRadius: '4px',
  } as React.CSSProperties,
};

// SVG Arrow Icons
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const MagazineBookForward = forwardRef<PageFlipInstance, MagazineBookProps>(
  (props, ref) => {
    const {
      className = '',
      style = {},
      children,
      renderOnlyPageLengthChange = false,
      isLoading = false,
      disabled = false,
      showControls = false,
      controlsClassName = '',
      controlsStyle = {},
      width = 400,
      height = 300,
      size = 'fixed',
      minWidth = 100,
      maxWidth = 2000,
      minHeight = 100,
      maxHeight = 2000,
      drawShadow = true,
      flippingTime = 1000,
      usePortrait = false,
      startZIndex = 0,
      autoSize = true,
      maxShadowOpacity = 1,
      showCover = false,
      mobileScrollSupport = true,
      clickEventForward = true,
      useMouseEvents = true,
      swipeDistance = 30,
      showPageCorners = true,
      disableFlipByClick = false,
      startPage = 0,
      onFlip,
      onChangeOrientation,
      onChangeState,
      onInit,
      onUpdate,
    } = props;

    const htmlElementRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLElement[]>([]);
    const pageFlip = useRef<PageFlip | null>(null);

    const [pages, setPages] = useState<ReactElement[]>([]);
    const [, setOrientation] = useState<PageOrientation>('landscape');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    // Expose pageFlip instance and helper methods via ref
    useImperativeHandle(ref, () => ({
      pageFlip: () => pageFlip.current,

      flipNext: (corner?: FlipCorner) => {
        pageFlip.current?.flipNext(corner);
      },

      flipPrev: (corner?: FlipCorner) => {
        pageFlip.current?.flipPrev(corner);
      },

      flip: (pageNum: number, corner?: FlipCorner) => {
        pageFlip.current?.flip(pageNum, corner);
      },

      turnToPage: (pageNum: number) => {
        pageFlip.current?.turnToPage(pageNum);
      },

      getCurrentPageIndex: () => {
        return pageFlip.current?.getCurrentPageIndex() ?? 0;
      },

      getPageCount: () => {
        return pageFlip.current?.getPageCount() ?? 0;
      },

      getOrientation: () => {
        const o = pageFlip.current?.getOrientation();
        return o as PageOrientation | null;
      },

      getState: () => {
        const s = pageFlip.current?.getState();
        return s as PageState | null;
      },
    }));

    const refreshOnPageDelete = useCallback(() => {
      if (pageFlip.current) {
        pageFlip.current.clear();
      }
    }, []);

    const removeHandlers = useCallback(() => {
      const flip = pageFlip.current;

      if (flip) {
        flip.off('flip');
        flip.off('changeOrientation');
        flip.off('changeState');
        flip.off('init');
        flip.off('update');
      }
    }, []);

    // Handle children changes
    useEffect(() => {
      childRef.current = [];

      if (children) {
        const childArray = React.Children.toArray(children).filter(React.isValidElement);
        const totalChildren = childArray.length;

        const childList = childArray.map((child, index) => {
          if (!React.isValidElement(child)) return null;

          // Get the density from child props, default to 'soft'
          const childProps = child.props as { density?: string };
          let density = childProps.density || 'soft';

          // If showCover is true, force first and last pages to be hard
          if (showCover) {
            const isFirstPage = index === 0;
            const isLastPage = index === totalChildren - 1;
            if (isFirstPage || isLastPage) {
              density = 'hard';
            }
          }

          return React.cloneElement(child as ReactElement<{ ref?: (dom: HTMLElement | null) => void }>, {
            ref: (dom: HTMLElement | null) => {
              if (dom) {
                // Ensure data-density is set correctly on the DOM element
                dom.setAttribute('data-density', density);
                childRef.current[index] = dom;
              }
            },
          });
        })?.filter(Boolean) as ReactElement[];

        if (!renderOnlyPageLengthChange || pages.length !== childList?.length) {
          if (childList && childList.length < pages.length) {
            refreshOnPageDelete();
          }

          setPages(childList || []);
        }
      }
    }, [children, renderOnlyPageLengthChange, pages.length, refreshOnPageDelete, showCover]);

    // Initialize PageFlip and handle updates
    useEffect(() => {
      const setHandlers = () => {
        const flip = pageFlip.current;

        if (flip) {
          // Always track current page for controls
          flip.on('flip', (e: unknown) => {
            const event = e as { data: number };
            setCurrentPage(event.data);
            if (onFlip) {
              onFlip(e as any);
            }
          });

          // Always track orientation
          flip.on('changeOrientation', (e: unknown) => {
            const event = e as { data: PageOrientation };
            setOrientation(event.data);
            if (onChangeOrientation) {
              onChangeOrientation(e as any);
            }
          });

          if (onChangeState) {
            flip.on('changeState', (e: unknown) => onChangeState(e as any));
          }

          // Always track page count on init
          flip.on('init', (e: unknown) => {
            // Get actual page count from the flip instance
            const count = flip.getPageCount();
            setPageCount(count);
            // Set initial page
            setCurrentPage(flip.getCurrentPageIndex());
            if (onInit) {
              onInit(e as any);
            }
          });

          if (onUpdate) {
            flip.on('update', (e: unknown) => onUpdate(e as any));
          }
        }
      };

      // Filter out any undefined entries and ensure proper order
      const validRefs = childRef.current.filter((ref): ref is HTMLElement => ref !== null && ref !== undefined);

      if (pages.length > 0 && validRefs.length > 0) {
        removeHandlers();

        if (htmlElementRef.current && !pageFlip.current) {
          pageFlip.current = new PageFlip(htmlElementRef.current, {
            width,
            height,
            size,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight,
            drawShadow,
            flippingTime,
            usePortrait,
            startZIndex,
            autoSize,
            maxShadowOpacity,
            showCover,
            mobileScrollSupport,
            clickEventForward,
            useMouseEvents,
            swipeDistance,
            showPageCorners,
            disableFlipByClick,
            startPage,
          });
        }

        if (pageFlip.current) {
          // Use requestAnimationFrame to ensure DOM is fully rendered
          requestAnimationFrame(() => {
            if (pageFlip.current) {
              if (!pageFlip.current.getFlipController()) {
                pageFlip.current.loadFromHTML(validRefs);
              } else {
                pageFlip.current.updateFromHtml(validRefs);
              }
              setHandlers();
            }
          });
        } else {
          setHandlers();
        }
      }

      return () => {
        removeHandlers();
      };
    }, [
      pages,
      width,
      height,
      size,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      drawShadow,
      flippingTime,
      usePortrait,
      startZIndex,
      autoSize,
      maxShadowOpacity,
      showCover,
      mobileScrollSupport,
      clickEventForward,
      useMouseEvents,
      swipeDistance,
      showPageCorners,
      disableFlipByClick,
      startPage,
      onFlip,
      onChangeOrientation,
      onChangeState,
      onInit,
      onUpdate,
      removeHandlers,
    ]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (pageFlip.current) {
          pageFlip.current.destroy();
          pageFlip.current = null;
        }
      };
    }, []);

    // Control handlers
    const handlePrevPage = useCallback(() => {
      pageFlip.current?.flipPrev();
    }, []);

    const handleNextPage = useCallback(() => {
      pageFlip.current?.flipNext();
    }, []);

    // Merge styles
    const magazineStyle: React.CSSProperties = {
      ...inlineStyles.magazine,
      ...style,
      opacity: isLoading ? 0.5 : undefined,
      pointerEvents: disabled || isLoading ? 'none' : undefined,
    };

    const isPrevDisabled = currentPage === 0;
    const isNextDisabled = currentPage >= pageCount - 1;

    const prevButtonStyle: React.CSSProperties = {
      ...inlineStyles.button,
      ...(isPrevDisabled ? inlineStyles.buttonDisabled : {}),
    };

    const nextButtonStyle: React.CSSProperties = {
      ...inlineStyles.button,
      ...(isNextDisabled ? inlineStyles.buttonDisabled : {}),
    };

    return (
      <div style={inlineStyles.wrapper}>
        <div
          ref={htmlElementRef}
          className={className || undefined}
          style={magazineStyle}
        >
          {pages}
        </div>
        {showControls && (
          <div
            className={controlsClassName || undefined}
            style={{
              ...inlineStyles.controls,
              ...controlsStyle,
            }}
          >
            <button
              onClick={handlePrevPage}
              disabled={isPrevDisabled}
              type="button"
              style={prevButtonStyle}
            >
              <ChevronLeft />
              <span>Previous</span>
            </button>
            <span style={inlineStyles.pageInfo}>
              {currentPage + 1} / {pageCount || '...'}
            </span>
            <button
              onClick={handleNextPage}
              disabled={isNextDisabled}
              type="button"
              style={nextButtonStyle}
            >
              <span>Next</span>
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    );
  }
);

MagazineBookForward.displayName = 'MagazineBook';

export const MagazineBook = React.memo(MagazineBookForward);

export default MagazineBook;
