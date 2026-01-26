declare module 'page-flip' {
  export interface FlipSetting {
    startPage?: number;
    size?: 'fixed' | 'stretch';
    width: number;
    height: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export interface DataSource {
    load(page: number): HTMLElement | null;
  }

  export interface FlipEvent {
    data: number;
    object: PageFlip;
  }

  export interface StateEvent {
    data: string;
    object: PageFlip;
  }

  export interface OrientationEvent {
    data: 'portrait' | 'landscape';
    object: PageFlip;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: FlipSetting);

    loadFromHTML(elements: HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    updateFromHtml(elements: HTMLElement[]): void;
    updateFromImages(images: string[]): void;
    update(): void;

    flip(pageNum: number, corner?: 'top' | 'bottom'): void;
    flipNext(corner?: 'top' | 'bottom'): void;
    flipPrev(corner?: 'top' | 'bottom'): void;
    turnToPage(pageNum: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;

    on(eventName: 'flip', callback: (e: FlipEvent) => void): PageFlip;
    on(eventName: 'changeState', callback: (e: StateEvent) => void): PageFlip;
    on(eventName: 'changeOrientation', callback: (e: OrientationEvent) => void): PageFlip;
    on(eventName: 'init', callback: (e: FlipEvent) => void): PageFlip;
    on(eventName: 'update', callback: (e: FlipEvent) => void): PageFlip;
    on(eventName: string, callback: (e: unknown) => void): PageFlip;
    off(eventName: string): void;

    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): 'portrait' | 'landscape';
    getState(): string;
    getFlipController(): unknown;

    destroy(): void;
    clear(): void;
  }
}
