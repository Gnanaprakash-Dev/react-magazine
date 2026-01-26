# react-magazine

React component for creating realistic magazine-style page flip animations with built-in controls and full TypeScript support.

## Installation

```bash
npm install react-magazine
```

## Quick Start

```tsx
import { MagazineBook, Page } from 'react-magazine';
import 'react-magazine/styles.css';

function App() {
  return (
    <MagazineBook
      width={400}
      height={500}
      showCover={true}
      showControls={true}
    >
      <Page number={1}>Front Cover</Page>
      <Page number={2}>Page 2</Page>
      <Page number={3}>Page 3</Page>
      <Page number={4}>Back Cover</Page>
    </MagazineBook>
  );
}
```

## Features

- Realistic page flip animation
- Built-in navigation controls
- Hard/soft page density support
- Responsive design (fixed/stretch modes)
- Portrait and landscape orientation
- Touch and mouse support
- TypeScript support
- SSR compatible (with dynamic import)

## Using the useFlipBook Hook

```tsx
import { MagazineBook, Page, useFlipBook } from 'react-magazine';
import 'react-magazine/styles.css';

function App() {
  const { bookRef, state, flipNext, flipPrev, handlers } = useFlipBook();

  return (
    <div>
      <MagazineBook ref={bookRef} width={400} height={500} {...handlers}>
        <Page number={1}>Page 1</Page>
        <Page number={2}>Page 2</Page>
        <Page number={3}>Page 3</Page>
        <Page number={4}>Page 4</Page>
      </MagazineBook>

      <p>Page {state.currentPage + 1} of {state.pageCount}</p>
      <button onClick={() => flipPrev()}>Previous</button>
      <button onClick={() => flipNext()}>Next</button>
    </div>
  );
}
```

## Props

### MagazineBook Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `400` | Page width in pixels |
| `height` | `number` | `300` | Page height in pixels |
| `size` | `'fixed' \| 'stretch'` | `'fixed'` | Size mode |
| `startPage` | `number` | `0` | Starting page index |
| `showCover` | `boolean` | `false` | Makes first & last pages hard (like book covers) |
| `showControls` | `boolean` | `false` | Show built-in navigation controls |
| `drawShadow` | `boolean` | `true` | Draw shadow when flipping |
| `flippingTime` | `number` | `1000` | Flip animation duration (ms) |
| `usePortrait` | `boolean` | `false` | Use portrait mode |
| `mobileScrollSupport` | `boolean` | `true` | Enable mobile scroll |
| `swipeDistance` | `number` | `30` | Swipe distance threshold |
| `showPageCorners` | `boolean` | `true` | Show page corner fold on hover |
| `disableFlipByClick` | `boolean` | `false` | Disable click to flip |
| `clickEventForward` | `boolean` | `true` | Forward click events to children |
| `useMouseEvents` | `boolean` | `true` | Enable mouse/touch events |
| `maxShadowOpacity` | `number` | `1` | Shadow intensity (0-1) |
| `autoSize` | `boolean` | `true` | Auto-resize based on container |
| `isLoading` | `boolean` | `false` | Show loading state |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `controlsClassName` | `string` | `''` | Custom class for controls |
| `controlsStyle` | `CSSProperties` | `{}` | Custom style for controls |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| `onFlip` | `(e: FlipEvent) => void` | Called when page flips |
| `onChangeState` | `(e: StateEvent) => void` | Called when state changes |
| `onChangeOrientation` | `(e: OrientationEvent) => void` | Called when orientation changes |
| `onInit` | `(e: FlipEvent) => void` | Called when initialized |
| `onUpdate` | `(e: FlipEvent) => void` | Called when updated |

### Page Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `number` | `number` | - | Page number (for display) |
| `density` | `'soft' \| 'hard'` | `'soft'` | Page density (soft bends, hard doesn't) |
| `className` | `string` | `''` | Custom class |
| `style` | `CSSProperties` | `{}` | Custom style |

## showCover Behavior

When `showCover={true}`:
- First page automatically becomes **hard** (doesn't bend)
- Last page automatically becomes **hard** (doesn't bend)
- All inner pages remain **soft** (paper flip effect)

```tsx
<MagazineBook showCover={true}>
  <Page>Front Cover (auto hard)</Page>
  <Page>Page 2 (soft - bends)</Page>
  <Page>Page 3 (soft - bends)</Page>
  <Page>Back Cover (auto hard)</Page>
</MagazineBook>
```

## Ref API Methods

Access via `bookRef.current`:

| Method | Description |
|--------|-------------|
| `flipNext(corner?)` | Flip to next page |
| `flipPrev(corner?)` | Flip to previous page |
| `flip(pageNum, corner?)` | Flip to specific page with animation |
| `turnToPage(pageNum)` | Jump to page without animation |
| `getCurrentPageIndex()` | Get current page index (0-based) |
| `getPageCount()` | Get total page count |
| `getOrientation()` | Get current orientation |
| `getState()` | Get current state |
| `pageFlip()` | Get underlying PageFlip instance |

## useFlipBook Hook

Returns:

| Property | Type | Description |
|----------|------|-------------|
| `bookRef` | `RefObject` | Ref to attach to MagazineBook |
| `state` | `object` | `{ currentPage, pageCount, orientation, pageState, isFlipping }` |
| `flipNext` | `function` | Flip to next page |
| `flipPrev` | `function` | Flip to previous page |
| `flipTo` | `function` | Flip to specific page |
| `turnTo` | `function` | Jump without animation |
| `canFlipNext` | `function` | Check if can flip next |
| `canFlipPrev` | `function` | Check if can flip prev |
| `handlers` | `object` | Event handlers to spread on MagazineBook |

## Next.js Usage

```tsx
import dynamic from 'next/dynamic';

const MagazineBook = dynamic(
  () => import('react-magazine').then((mod) => mod.MagazineBook),
  { ssr: false }
);

const Page = dynamic(
  () => import('react-magazine').then((mod) => mod.Page),
  { ssr: false }
);
```

## TypeScript

All types are exported:

```tsx
import type {
  PageFlipInstance,
  IFlipSetting,
  IEventProps,
  PageProps,
  FlipEvent,
  OrientationEvent,
  StateEvent,
  PageDensity,
  PageOrientation,
  PageState,
  FlipCorner,
  SizeType,
} from 'react-magazine';
```

## License

MIT
