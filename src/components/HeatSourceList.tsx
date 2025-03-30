import { useState } from 'react';
import { useCalculator } from '../contexts/CalculatorContext';
import { Button } from './ui/button';
import { formatCurrency } from '../utils/format';
import { Settings2 } from 'lucide-react';
import { EditHeatSourceDialog } from './EditHeatSourceDialog';
import { HeatSource } from '../types/calculator';

export function HeatSourceList() {
  const { heatSources, mode, removeHeatSource, updateHeatSource } = useCalculator();
  const [editingSource, setEditingSource] = useState<{ index: number; source: HeatSource } | null>(null);

  const handleEdit = (index: number, source: HeatSource) => {
    setEditingSource({ index, source });
  };

  const handleSave = (updatedSource: HeatSource) => {
    if (editingSource) {
      updateHeatSource(editingSource.index, updatedSource);
      setEditingSource(null);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
        {heatSources.map((source, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {source.type.charAt(0).toUpperCase() + source.type.slice(1)}
              </h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleEdit(index, source)}
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHeatSource(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Type:</span>
                <span>{source.fuelType.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Units:</span>
                <span>{source.quantity} {source.fuelType.units}</span>
              </div>
              {mode === "savings" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost per Unit:</span>
                    <span>{formatCurrency(source.costPerUnit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Cost:</span>
                    <span>{formatCurrency(source.costPerUnit * source.quantity * 12)}</span>
                  </div>
                </>
              )}
              {source.type === "water heater" && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span>{source.waterHeaterDuration} minutes</span>
                </div>
              )}
            </div>
          </div>
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