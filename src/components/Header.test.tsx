import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('should render header with correct structure', () => {
    render(<Header />);
    
    // Check header element
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('w-full');
    
    // Check green bar
    const greenBar = header.firstElementChild;
    expect(greenBar).toHaveClass('h-[60px]');
    expect(greenBar).toHaveClass('bg-green-600');
    
    // Check gray bar
    const grayBar = header.lastElementChild;
    expect(grayBar).toHaveClass('h-[48px]');
    expect(grayBar).toHaveClass('bg-[#e0e0e0]');
    
    // Check title
    const title = screen.getByRole('heading', { name: /SAVINGS AND SIZING CALCULATOR/i });
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
    expect(title.parentElement).toBe(grayBar);
  });
}); 