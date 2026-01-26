import { forwardRef } from 'react';
import type { PageProps } from '../types';

/**
 * Page component for use inside MagazineBook
 * Each page should be wrapped in this component to properly integrate with the flip book
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, number, density = 'soft', className = '', style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={`react-magazine-page ${className}`}
        data-density={density}
        data-page-number={number}
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

Page.displayName = 'Page';

export default Page;
