import { createContext, useContext, useState, ReactNode } from 'react';
import { HeatSource } from '../types/calculator';
import { DEFAULT_HEAT_SOURCES } from '../config/calculator';

type Mode = 'savings' | 'sizing';

interface CalculatorContextType {
  heatSources: HeatSource[];
  mode: Mode;
  setMode: (mode: Mode) => void;
  addHeatSource: (heatSource: HeatSource) => void;
  removeHeatSource: (index: number) => void;
  updateHeatSource: (index: number, heatSource: HeatSource) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

interface CalculatorProviderProps {
  children: ReactNode;
}

export function CalculatorProvider({ children }: CalculatorProviderProps) {
  const [heatSources, setHeatSources] = useState<HeatSource[]>(DEFAULT_HEAT_SOURCES);
  const [mode, setMode] = useState<Mode>('savings');

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

  return (
    <CalculatorContext.Provider 
      value={{ 
        heatSources, 
        mode,
        setMode,
        addHeatSource, 
        removeHeatSource, 
        updateHeatSource,
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