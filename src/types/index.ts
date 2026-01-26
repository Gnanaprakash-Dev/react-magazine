import type { PageFlip } from 'page-flip';

/** Page state */
export type PageState = 'user_fold' | 'fold_corner' | 'flipping' | 'read';

/** Page orientation */
export type PageOrientation = 'portrait' | 'landscape';

/** Page density - hard pages don't bend */
export type PageDensity = 'hard' | 'soft';

/** Size type */
export type SizeType = 'fixed' | 'stretch';

/** Flip corner type */
export type FlipCorner = 'top' | 'bottom';

/** Flip setting interface */
export interface IFlipSetting {
  /** Page number from which to start viewing */
  startPage: number;
  /** Whether the book will be stretched under the parent element or not */
  size: SizeType;
  /** Page width */
  width: number;
  /** Page height */
  height: number;
  /** Min width for responsive */
  minWidth: number;
  /** Max width for responsive */
  maxWidth: number;
  /** Min height for responsive */
  minHeight: number;
  /** Max height for responsive */
  maxHeight: number;
  /** Draw shadows or not when page flipping */
  drawShadow: boolean;
  /** Flipping animation time in ms */
  flippingTime: number;
  /** Enable switching to portrait mode */
  usePortrait: boolean;
  /** Initial value to z-index */
  startZIndex: number;
  /** If this value is true, the parent element will be equal to the size of the book */
  autoSize: boolean;
  /** Shadow intensity (1: max intensity, 0: hidden shadows) */
  maxShadowOpacity: number;
  /** If this value is true, the first and the last pages will be marked as hard and will be shown in single page mode */
  showCover: boolean;
  /** Disable content scrolling when touching a book on mobile devices */
  mobileScrollSupport: boolean;
  /** Set the forward event of clicking on child elements (buttons, links) */
  clickEventForward: boolean;
  /** Using mouse and touch events to page flipping */
  useMouseEvents: boolean;
  /** Minimum distance to trigger swipe */
  swipeDistance: number;
  /** If this value is true, fold the corners of the book when the mouse pointer is over them */
  showPageCorners: boolean;
  /** If this value is true, flipping by clicking on the whole book will be locked. Only on corners */
  disableFlipByClick: boolean;
}

/** Book state */
export interface IBookState {
  page: number;
  mode: PageOrientation;
}

/** Flip event data */
export interface FlipEvent {
  /** Current page index (0-based) */
  data: number;
  /** The PageFlip object */
  object: PageFlip;
}

/** Orientation change event data */
export interface OrientationEvent {
  /** New orientation */
  data: PageOrientation;
  /** The PageFlip object */
  object: PageFlip;
}

/** State change event data */
export interface StateEvent {
  /** New page state */
  data: PageState;
  /** The PageFlip object */
  object: PageFlip;
}

/** Event props */
export interface IEventProps {
  /** Called when page is flipped */
  onFlip?: (e: FlipEvent) => void;
  /** Called when orientation changes (portrait/landscape) */
  onChangeOrientation?: (e: OrientationEvent) => void;
  /** Called when page state changes */
  onChangeState?: (e: StateEvent) => void;
  /** Called when the book is initialized */
  onInit?: (e: FlipEvent) => void;
  /** Called when pages are updated */
  onUpdate?: (e: FlipEvent) => void;
}

/** Page flip instance - exposes the PageFlip object and helper methods */
export interface PageFlipInstance {
  /** Get the underlying PageFlip object */
  pageFlip: () => PageFlip | null;
  /** Flip to next page with animation */
  flipNext: (corner?: FlipCorner) => void;
  /** Flip to previous page with animation */
  flipPrev: (corner?: FlipCorner) => void;
  /** Flip to specific page with animation */
  flip: (pageNum: number, corner?: FlipCorner) => void;
  /** Turn to specific page without animation */
  turnToPage: (pageNum: number) => void;
  /** Get current page index (0-based) */
  getCurrentPageIndex: () => number;
  /** Get total page count */
  getPageCount: () => number;
  /** Get current orientation */
  getOrientation: () => PageOrientation | null;
  /** Get current page state */
  getState: () => PageState | null;
}

/** Props for the Page component */
export interface PageProps {
  /** Page number (for display purposes) */
  number?: number;
  /** Page density - hard or soft */
  density?: PageDensity;
  /** Page content */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: React.CSSProperties;
}

/** Props for the PageCover component */
export interface PageCoverProps {
  /** Page number (for display purposes) */
  number?: number;
  /** Page content */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: React.CSSProperties;
  /** Whether this is front or back cover */
  position?: 'front' | 'back';
}

// Re-export PageFlip type
export type { PageFlip };
