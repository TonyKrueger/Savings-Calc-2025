import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { HeatSource, PerType } from '../types/calculator';
import { DEFAULT_HEAT_SOURCES } from '../config/calculator';
import { calculateSizing, calculateTotalSizing } from '../utils/sizing';

type Mode = 'savings' | 'sizing';

interface CalculatorContextType {
  heatSources: HeatSource[];
  mode: Mode;
  setMode: (mode: Mode) => void;
  addHeatSource: (heatSource: HeatSource) => void;
  removeHeatSource: (index: number) => void;
  updateHeatSource: (index: number, heatSource: HeatSource) => void;
  editHeatSource: (index: number) => void;
  editingSource: { index: number; source: HeatSource } | null;
  setEditingSource: (source: { index: number; source: HeatSource } | null) => void;
  sizingValues: number[];
  totalSizing: number;
  reset: () => void;
  hasChanges: boolean;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

interface CalculatorProviderProps {
  children: ReactNode;
}

export function CalculatorProvider({ children }: CalculatorProviderProps) {
  const [heatSources, setHeatSources] = useState<HeatSource[]>(DEFAULT_HEAT_SOURCES);
  const [mode, setMode] = useState<Mode>('savings');
  const [editingSource, setEditingSource] = useState<{ index: number; source: HeatSource } | null>(null);
  const [sizingValues, setSizingValues] = useState<number[]>([]);
  const [totalSizing, setTotalSizing] = useState<number>(0);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Update sizing values whenever heat sources change
  useEffect(() => {
    const newSizingValues = heatSources.map(source => 
      calculateSizing(source, 'annualUnits')
    );
    setSizingValues(newSizingValues);
    
    const newTotalSizing = calculateTotalSizing(heatSources, 'annualUnits');
    setTotalSizing(newTotalSizing);

    // Check if current state differs from default state
    const isDefault = JSON.stringify(heatSources) === JSON.stringify(DEFAULT_HEAT_SOURCES);
    setHasChanges(!isDefault);
  }, [heatSources]);

  const reset = () => {
    setHeatSources(DEFAULT_HEAT_SOURCES);
    setMode('savings');
    setEditingSource(null);
    setSizingValues([]);
    setTotalSizing(0);
    setHasChanges(false);
  };

  const addHeatSource = (heatSource: HeatSource) => {
    setHeatSources((prev) => [...prev, heatSource]);
  };

  const removeHeatSource = (index: number) => {
    setHeatSources((prev) => prev.filter((_, i) => i !== index));
  };

  const updateHeatSource = (index: number, heatSource: HeatSource) => {
    setHeatSources((prev) => {
      const newSources = [...prev];
      newSources[index] = heatSource;
      return newSources;
    });
  };

  const editHeatSource = (index: number) => {
    setEditingSource({ index, source: heatSources[index] });
  };

  return (
    <CalculatorContext.Provider 
      value={{ 
        heatSources, 
        mode,
        setMode,
        addHeatSource, 
        removeHeatSource, 
        updateHeatSource,
        editHeatSource,
        editingSource,
        setEditingSource,
        sizingValues,
        totalSizing,
        reset,
        hasChanges,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
} 