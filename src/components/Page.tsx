import { forwardRef } from 'react';
import type { PageProps } from '../types';

const pageStyles: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  backgroundColor: '#fff',
};

const hardPageStyles: React.CSSProperties = {
  ...pageStyles,
  background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
};

/**
 * Page component for use inside MagazineBook
 * Each page should be wrapped in this component to properly integrate with the flip book
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, number, density = 'soft', className = '', style = {} }, ref) => {
    const baseStyles = density === 'hard' ? hardPageStyles : pageStyles;

    return (
      <div
        ref={ref}
        className={className || undefined}
        data-density={density}
        data-page-number={number}
        style={{
          ...baseStyles,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

Page.displayName = 'Page';

export default Page;
