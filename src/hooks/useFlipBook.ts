import { useRef, useState, useCallback } from 'react';
import type {
  PageFlipInstance,
  FlipCorner,
  PageOrientation,
  PageState,
  FlipEvent,
  OrientationEvent,
  StateEvent,
} from '../types';

interface UseFlipBookState {
  currentPage: number;
  pageCount: number;
  orientation: PageOrientation;
  pageState: PageState | null;
  isFlipping: boolean;
}

interface UseFlipBookReturn {
  /** Ref to attach to MagazineBook component */
  bookRef: React.RefObject<PageFlipInstance | null>;
  /** Current state of the book */
  state: UseFlipBookState;
  /** Flip to next page */
  flipNext: (corner?: FlipCorner) => void;
  /** Flip to previous page */
  flipPrev: (corner?: FlipCorner) => void;
  /** Flip to specific page */
  flipTo: (pageNum: number, corner?: FlipCorner) => void;
  /** Jump to page without animation */
  turnTo: (pageNum: number) => void;
  /** Check if can flip to next page */
  canFlipNext: () => boolean;
  /** Check if can flip to previous page */
  canFlipPrev: () => boolean;
  /** Event handlers to pass to MagazineBook */
  handlers: {
    onFlip: (e: FlipEvent) => void;
    onChangeOrientation: (e: OrientationEvent) => void;
    onChangeState: (e: StateEvent) => void;
    onInit: (e: FlipEvent) => void;
  };
}

/**
 * Custom hook for easier control of MagazineBook
 *
 * @example
 * ```tsx
 * function App() {
 *   const { bookRef, state, flipNext, flipPrev, handlers } = useFlipBook();
 *
 *   return (
 *     <div>
 *       <MagazineBook ref={bookRef} {...handlers}>
 *         <Page>Page 1</Page>
 *         <Page>Page 2</Page>
 *       </MagazineBook>
 *       <p>Page {state.currentPage + 1} of {state.pageCount}</p>
 *       <button onClick={() => flipPrev()}>Previous</button>
 *       <button onClick={() => flipNext()}>Next</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFlipBook(): UseFlipBookReturn {
  const bookRef = useRef<PageFlipInstance>(null);

  const [state, setState] = useState<UseFlipBookState>({
    currentPage: 0,
    pageCount: 0,
    orientation: 'landscape',
    pageState: null,
    isFlipping: false,
  });

  const flipNext = useCallback((corner?: FlipCorner) => {
    bookRef.current?.flipNext(corner);
  }, []);

  const flipPrev = useCallback((corner?: FlipCorner) => {
    bookRef.current?.flipPrev(corner);
  }, []);

  const flipTo = useCallback((pageNum: number, corner?: FlipCorner) => {
    bookRef.current?.flip(pageNum, corner);
  }, []);

  const turnTo = useCallback((pageNum: number) => {
    bookRef.current?.turnToPage(pageNum);
  }, []);

  const canFlipNext = useCallback(() => {
    return state.currentPage < state.pageCount - 1;
  }, [state.currentPage, state.pageCount]);

  const canFlipPrev = useCallback(() => {
    return state.currentPage > 0;
  }, [state.currentPage]);

  const onFlip = useCallback((e: FlipEvent) => {
    setState((prev) => ({
      ...prev,
      currentPage: e.data,
    }));
  }, []);

  const onChangeOrientation = useCallback((e: OrientationEvent) => {
    setState((prev) => ({
      ...prev,
      orientation: e.data,
    }));
  }, []);

  const onChangeState = useCallback((e: StateEvent) => {
    setState((prev) => ({
      ...prev,
      pageState: e.data,
      isFlipping: e.data === 'flipping',
    }));
  }, []);

  const onInit = useCallback((e: FlipEvent) => {
    const pageCount = bookRef.current?.getPageCount() ?? 0;
    setState((prev) => ({
      ...prev,
      currentPage: e.data,
      pageCount,
    }));
  }, []);

  return {
    bookRef,
    state,
    flipNext,
    flipPrev,
    flipTo,
    turnTo,
    canFlipNext,
    canFlipPrev,
    handlers: {
      onFlip,
      onChangeOrientation,
      onChangeState,
      onInit,
    },
  };
}

export default useFlipBook;
