import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Calculator } from './Calculator';
import { CalculatorProvider, useCalculator } from '../contexts/CalculatorContext';
import { DEFAULT_HEAT_SOURCES } from '../config/calculator';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

vi.mock('../contexts/CalculatorContext', () => ({
  useCalculator: vi.fn(),
  CalculatorProvider: ({ children }: { children: ReactNode }) => children,
}));

describe('Calculator', () => {
  const renderCalculator = () => {
    return render(
      <CalculatorProvider>
        <Calculator />
      </CalculatorProvider>
    );
  };

  beforeEach(() => {
    vi.mocked(useCalculator).mockReturnValue({
      mode: 'savings',
      setMode: vi.fn(),
      addHeatSource: vi.fn(),
      totalSizing: 0,
      reset: vi.fn(),
      hasChanges: false,
      heatSources: DEFAULT_HEAT_SOURCES,
      removeHeatSource: vi.fn(),
      updateHeatSource: vi.fn(),
      editHeatSource: vi.fn(),
      editingSource: null,
      setEditingSource: vi.fn(),
      sizingValues: [],
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render calculator instructions', () => {
    renderCalculator();
    expect(screen.getByText('How to use the calculator')).toBeInTheDocument();
    expect(screen.getByText(/Enter your information in the boxes below/)).toBeInTheDocument();
  });

  it('should render mode switch and heat source selector', () => {
    renderCalculator();
    expect(screen.getByRole('switch', { name: /Savings Mode/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'What else are you heating?' })).toBeInTheDocument();
    expect(screen.getByText('What else are you heating?')).toBeInTheDocument();
  });

  it('should render print button', () => {
    // Mock the hasChanges state
    vi.mocked(useCalculator).mockReturnValue({
      mode: 'savings',
      setMode: vi.fn(),
      addHeatSource: vi.fn(),
      totalSizing: 0,
      reset: vi.fn(),
      hasChanges: true,
      heatSources: DEFAULT_HEAT_SOURCES,
      removeHeatSource: vi.fn(),
      updateHeatSource: vi.fn(),
      editHeatSource: vi.fn(),
      editingSource: null,
      setEditingSource: vi.fn(),
      sizingValues: [],
    });
    
    renderCalculator();
    
    // Find the print button
    const printButton = screen.getByRole('button', { name: /Print Your Savings/i });
    expect(printButton).toBeInTheDocument();
    expect(printButton).toHaveClass('bg-white');
  });

  describe('Start Over functionality', () => {
    it('should reset calculator to initial state when Start Over is clicked', async () => {
      const user = userEvent.setup();
      const reset = vi.fn();
      
      // Mock state with changes
      vi.mocked(useCalculator).mockReturnValue({
        mode: 'savings',
        setMode: vi.fn(),
        addHeatSource: vi.fn(),
        totalSizing: 0,
        reset,
        hasChanges: true,
        heatSources: DEFAULT_HEAT_SOURCES,
        removeHeatSource: vi.fn(),
        updateHeatSource: vi.fn(),
        editHeatSource: vi.fn(),
        editingSource: null,
        setEditingSource: vi.fn(),
        sizingValues: [],
      });
      
      renderCalculator();
      
      // Find and click the Start Over button
      const startOverButton = screen.getByText(/Start Over/i);
      await user.click(startOverButton);
      
      // Verify reset was called
      expect(reset).toHaveBeenCalled();
    });
  });

  describe('Mode Toggle functionality', () => {
    it('should switch between savings and sizing modes', async () => {
      const user = userEvent.setup();
      const setMode = vi.fn();
      
      // Mock initial state (savings mode)
      vi.mocked(useCalculator).mockReturnValue({
        mode: 'savings',
        setMode,
        addHeatSource: vi.fn(),
        totalSizing: 0,
        reset: vi.fn(),
        hasChanges: false,
        heatSources: DEFAULT_HEAT_SOURCES,
        removeHeatSource: vi.fn(),
        updateHeatSource: vi.fn(),
        editHeatSource: vi.fn(),
        editingSource: null,
        setEditingSource: vi.fn(),
        sizingValues: [],
      });
      renderCalculator();
      
      // Initial state should be savings mode
      const modeSwitch = screen.getByRole('switch', { name: /Savings Mode/i });
      expect(modeSwitch).toBeInTheDocument();
      expect(modeSwitch).not.toBeChecked();
      
      // Toggle to sizing mode
      await user.click(modeSwitch);
      expect(setMode).toHaveBeenCalledWith('sizing');
    });

    it('should show appropriate content based on mode', async () => {
      const user = userEvent.setup();
      const setMode = vi.fn();
      
      // Mock initial state (savings mode)
      vi.mocked(useCalculator).mockReturnValue({
        mode: 'savings',
        setMode,
        addHeatSource: vi.fn(),
        totalSizing: 0,
        reset: vi.fn(),
        hasChanges: false,
        heatSources: DEFAULT_HEAT_SOURCES,
        removeHeatSource: vi.fn(),
        updateHeatSource: vi.fn(),
        editHeatSource: vi.fn(),
        editingSource: null,
        setEditingSource: vi.fn(),
        sizingValues: [],
      });
      renderCalculator();
      
      // Initial state should be savings mode
      const modeSwitch = screen.getByRole('switch', { name: /Savings Mode/i });
      expect(modeSwitch).toBeInTheDocument();
      expect(modeSwitch).not.toBeChecked();
      
      // Toggle to sizing mode
      await user.click(modeSwitch);
      expect(setMode).toHaveBeenCalledWith('sizing');
      
      cleanup();
      
      // Mock sizing mode state
      vi.mocked(useCalculator).mockReturnValue({
        mode: 'sizing',
        setMode,
        addHeatSource: vi.fn(),
        totalSizing: 0,
        reset: vi.fn(),
        hasChanges: false,
        heatSources: DEFAULT_HEAT_SOURCES,
        removeHeatSource: vi.fn(),
        updateHeatSource: vi.fn(),
        editHeatSource: vi.fn(),
        editingSource: null,
        setEditingSource: vi.fn(),
        sizingValues: [],
      });
      renderCalculator();
      
      // Verify sizing mode content
      const sizingModeSwitch = screen.getByRole('switch', { name: /Sizing Mode/i });
      expect(sizingModeSwitch).toBeInTheDocument();
      expect(sizingModeSwitch).toBeChecked();
    });
  });

  describe('Heat Source List', () => {
    it('should display default heat sources', () => {
      // Mock state with default heat sources
      vi.mocked(useCalculator).mockReturnValue({
        mode: 'savings',
        setMode: vi.fn(),
        addHeatSource: vi.fn(),
        totalSizing: 0,
        reset: vi.fn(),
        hasChanges: false,
        heatSources: [
          { ...DEFAULT_HEAT_SOURCES[0], costPerUnit: 10 },
          { ...DEFAULT_HEAT_SOURCES[1], costPerUnit: 5 }
        ],
        removeHeatSource: vi.fn(),
        updateHeatSource: vi.fn(),
        editHeatSource: vi.fn(),
        editingSource: null,
        setEditingSource: vi.fn(),
        sizingValues: [],
      });
      
      renderCalculator();
      
      // Verify heat sources are displayed
      expect(screen.getByText(DEFAULT_HEAT_SOURCES[0].type)).toBeInTheDocument();
      expect(screen.getByText(DEFAULT_HEAT_SOURCES[1].type)).toBeInTheDocument();
    });

    it('should show empty state message for new heat sources', () => {
      // Mock state with no heat sources
      vi.mocked(useCalculator).mockReturnValue({
        mode: 'savings',
        setMode: vi.fn(),
        addHeatSource: vi.fn(),
        totalSizing: 0,
        reset: vi.fn(),
        hasChanges: false,
        heatSources: [],
        removeHeatSource: vi.fn(),
        updateHeatSource: vi.fn(),
        editHeatSource: vi.fn(),
        editingSource: null,
        setEditingSource: vi.fn(),
        sizingValues: [],
      });
      
      renderCalculator();
      
      // Verify empty state message
      expect(screen.getByText(/What else are you heating\?/i)).toBeInTheDocument();
    });
  });
}); 