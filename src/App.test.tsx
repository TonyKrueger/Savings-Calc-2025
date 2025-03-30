import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders calculator with initial state', () => {
    render(<App />);
    
    // Check main heading
    expect(screen.getByRole('heading', { name: /SAVINGS AND SIZING CALCULATOR/i })).toBeInTheDocument();
    
    // Check instruction text
    expect(screen.getByText(/How to use the calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/What to do with your results/i)).toBeInTheDocument();
    
    // Check initial mode
    expect(screen.getByText(/Savings Mode/i)).toBeInTheDocument();
    
    // Check heat source selector presence
    expect(screen.getByRole('combobox', { name: /Add Heat Source/i })).toBeInTheDocument();
    
    // Check default heat sources
    expect(screen.getByText('Select a fuel type')).toBeInTheDocument();
    expect(screen.getByText('Electricity')).toBeInTheDocument();
  });

  it('toggles between savings and sizing modes', () => {
    render(<App />);
    
    // Initial mode is savings
    expect(screen.getByText(/Savings Mode/i)).toBeInTheDocument();
    
    // Click the mode switch
    const modeSwitch = screen.getByRole('switch', { name: /Savings Mode/i });
    fireEvent.click(modeSwitch);
    
    // Mode should change to sizing
    expect(screen.getByText(/Sizing Mode/i)).toBeInTheDocument();
  });
}); 