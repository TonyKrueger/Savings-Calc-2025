import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calculator } from './Calculator';
import { CalculatorProvider } from '../contexts/CalculatorContext';

describe('Calculator', () => {
  const renderCalculator = () => {
    return render(
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    );
  };

  it('should render calculator instructions', () => {
    renderCalculator();
    expect(screen.getByText('How to use the calculator')).toBeInTheDocument();
    expect(screen.getByText(/Enter your information in the boxes below/)).toBeInTheDocument();
  });

  it('should render mode switch and heat source selector', () => {
    renderCalculator();
    expect(screen.getByRole('switch', { name: /Savings Mode/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('What else are you heating?')).toBeInTheDocument();
  });

  it('should render print button', () => {
    renderCalculator();
    expect(screen.getByRole('button', { name: /Print Your Savings/i })).toBeInTheDocument();
  });
}); 