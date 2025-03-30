import { useCalculator } from '../contexts/CalculatorContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { formatCurrency } from '../utils/format';

export function HeatSourceList() {
  const { heatSources, mode, removeHeatSource } = useCalculator();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {heatSources.map((source, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>
                {source.type.charAt(0).toUpperCase() + source.type.slice(1)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeHeatSource(index)}
              >
                Remove
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Fuel Type:</span>{" "}
                {source.fuelType.name}
              </div>
              <div>
                <span className="font-medium">Units:</span>{" "}
                {source.quantity} {source.fuelType.units}
              </div>
              {mode === "savings" && (
                <>
                  <div>
                    <span className="font-medium">Cost per Unit:</span>{" "}
                    {formatCurrency(source.costPerUnit)}
                  </div>
                  <div>
                    <span className="font-medium">Annual Cost:</span>{" "}
                    {formatCurrency(source.costPerUnit * source.quantity * 12)}
                  </div>
                </>
              )}
              {source.type === "water heater" && (
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {source.waterHeaterDuration} minutes
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 