import { forwardRef } from 'react';
import type { PageCoverProps } from '../types';

const baseCoverStyles: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  color: 'white',
};

const frontCoverStyles: React.CSSProperties = {
  ...baseCoverStyles,
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
};

const backCoverStyles: React.CSSProperties = {
  ...baseCoverStyles,
  background: 'linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)',
};

/**
 * PageCover component for hard cover pages (front/back)
 * This is a specialized Page component with density="hard" preset
 */
export const PageCover = forwardRef<HTMLDivElement, PageCoverProps>(
  ({ children, number, position = 'front', className = '', style = {} }, ref) => {
    const coverStyles = position === 'front' ? frontCoverStyles : backCoverStyles;

    return (
      <div
        ref={ref}
        className={className || undefined}
        data-density="hard"
        data-page-number={number}
        data-cover-position={position}
        style={{
          ...coverStyles,
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
