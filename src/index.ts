// Components
export { MagazineBook, Page, PageCover } from './components';
export { MagazineBook as default } from './components';

// Hooks
export { useFlipBook } from './hooks';

// Types
export type {
  // Settings & Props
  IFlipSetting,
  IEventProps,
  IBookState,
  PageProps,
  PageCoverProps,

  // Instance
  PageFlipInstance,

  // Enums & Unions
  SizeType,
  PageDensity,
  PageState,
  PageOrientation,
  FlipCorner,

  // Events
  FlipEvent,
  OrientationEvent,
  StateEvent,

  // Re-exported from page-flip
  PageFlip,
} from './types';
