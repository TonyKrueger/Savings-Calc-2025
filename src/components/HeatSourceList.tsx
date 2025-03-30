import { useCalculator } from '../contexts/CalculatorContext';
import { Button } from './ui/button';
import { formatCurrency } from '../utils/format';
import { Settings2 } from 'lucide-react';
import { EditHeatSourceDialog } from './EditHeatSourceDialog';
import { HeatSource, FuelTypes } from '../types/calculator';
import { HeatSourceCard } from './HeatSourceCard';

export function HeatSourceList() {
  const { 
    heatSources, 
    editHeatSource, 
    updateHeatSource, 
    editingSource, 
    setEditingSource,
    removeHeatSource 
  } = useCalculator();

  const handleSave = (updatedSource: HeatSource) => {
    if (editingSource) {
      updateHeatSource(editingSource.index, updatedSource);
      setEditingSource(null);
    }
  };

  const getHeatSourceDetails = (index: number) => {
    const source = heatSources[index];
    if (source.fuelType.type === FuelTypes.empty) {
      return "Click to enter type of fuel, units and cost per unit";
    }
    if (source.type === 'water heater') {
      return "Using estimates based on a family of 5";
    }
    return `${source.fuelType.name}, ${source.quantity} units at $${source.costPerUnit} per unit`;
  };

  const calculateAmount = (index: number) => {
    const source = heatSources[index];
    if (source.fuelType.type === FuelTypes.empty) return 0;
    return source.quantity * source.costPerUnit;
  };

  return (
    <>
      <div className="space-y-3">
        {heatSources.map((source, index) => (
          <HeatSourceCard
            key={index}
            heatSource={source}
            index={index}
            onEdit={() => editHeatSource(index)}
            onDelete={() => removeHeatSource(index)}
          />
        ))}
      </div>

      {editingSource && (
        <EditHeatSourceDialog
          isOpen={true}
          onClose={() => setEditingSource(null)}
          heatSource={editingSource.source}
          onSave={handleSave}
        />
      )}
    </>
  );
} 