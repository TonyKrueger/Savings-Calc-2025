import { HeatSource } from '../types/calculator';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Settings2 } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { useCalculator } from '../contexts/CalculatorContext';

interface HeatSourceCardProps {
  heatSource: HeatSource;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function HeatSourceCard({ 
  heatSource, 
  index,
  onEdit,
}: HeatSourceCardProps) {
  const { mode, sizingValues } = useCalculator();
  const sizingValue = sizingValues[index];

  const getHeatSourceDetails = () => {
    if (heatSource.fuelType.type === 'empty') {
      return "Click to enter type of fuel, units and cost per unit";
    }
    if (heatSource.type === 'water heater') {
      const duration = heatSource.waterHeaterDuration || 6;
      return `${heatSource.fuelType.name} ${heatSource.quantity} ${heatSource.fuelType.units} annually @ ${formatCurrency(heatSource.costPerUnit)} per ${heatSource.fuelType.specificUnit} for ${duration} months`;
    }
    // For other heat sources, use the saved measurement type
    const measurementType = heatSource.measurementType?.startsWith('annual') ? 'Annual' : 'Monthly';
    return `${heatSource.fuelType.name}, ${heatSource.quantity} ${measurementType} ${heatSource.fuelType.units} at ${formatCurrency(heatSource.costPerUnit)} per ${heatSource.fuelType.specificUnit}`;
  };

  const calculateAmount = () => {
    if (heatSource.fuelType.type === 'empty') return 0;
    
    // For water heaters, adjust annual cost based on duration
    if (heatSource.type === 'water heater' && heatSource.waterHeaterDuration) {
      return heatSource.quantity * heatSource.costPerUnit * (heatSource.waterHeaterDuration / 12);
    }
    
    // For other sources, convert to annual if needed
    const isMonthly = heatSource.measurementType?.startsWith('monthly');
    return heatSource.quantity * heatSource.costPerUnit * (isMonthly ? 12 : 1);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold capitalize">
              {heatSource.type}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="ml-2"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-600 text-left mb-2">{getHeatSourceDetails()}</p>
          {heatSource.fuelType.type !== 'empty' && (
            <p className="text-sm text-right">
              {mode === 'sizing' ? (
                <span className="text-blue-600">
                  Sizing Value: {sizingValue}
                </span>
              ) : (
                <span>
                  Annual Cost: {formatCurrency(calculateAmount())}
                </span>
              )}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 