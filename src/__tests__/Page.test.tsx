import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Page } from '../components/Page';

describe('Page Component', () => {
  it('renders children correctly', () => {
    render(
      <Page number={1}>
        <div>Test Content</div>
      </Page>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Page number={1} className="custom-class">
        <div>Content</div>
      </Page>
    );

    const pageElement = container.querySelector('.custom-class');
    expect(pageElement).toBeInTheDocument();
  });

  it('renders with correct density', () => {
    const { container } = render(
      <Page number={1} density="hard">
        <div>Content</div>
      </Page>
    );

    const pageElement = container.querySelector('[data-density="hard"]');
    expect(pageElement).toBeInTheDocument();
  });
});
