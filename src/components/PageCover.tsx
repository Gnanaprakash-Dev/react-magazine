import { forwardRef } from 'react';
import type { PageCoverProps } from '../types';

/**
 * PageCover component for hard cover pages (front/back)
 * This is a specialized Page component with density="hard" preset
 */
export const PageCover = forwardRef<HTMLDivElement, PageCoverProps>(
  ({ children, number, position = 'front', className = '', style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={`react-magazine-page react-magazine-cover react-magazine-cover--${position} ${className}`}
        data-density="hard"
        data-page-number={number}
        data-cover-position={position}
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

PageCover.displayName = 'PageCover';

export default PageCover;
