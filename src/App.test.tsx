import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders calculator with initial state', () => {
    render(<App />);

    // Check header elements
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const title = screen.getByRole('heading', { name: /SAVINGS AND SIZING CALCULATOR/i });
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');

    // Check main content
    expect(screen.getByText(/How to use the calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/What to do with your results/i)).toBeInTheDocument();
    
    // Check heat source selector
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('What else are you heating?')).toBeInTheDocument();
  });

  it('toggles between savings and sizing modes', () => {
    render(<App />);

    // Check initial mode
    const modeLabel = screen.getByLabelText(/Savings Mode/i);
    expect(modeLabel).toBeInTheDocument();

    // Click the mode switch
    const modeSwitch = screen.getByRole('switch', { name: /Savings Mode/i });
    fireEvent.click(modeSwitch);

    // Check if mode changed
    expect(screen.getByLabelText(/Sizing Mode/i)).toBeInTheDocument();
  });
}); 