import { useCalculator } from '../contexts/CalculatorContext';
import { AVAILABLE_HEAT_SOURCE_TYPES, EMPTY_FUEL } from '../config/calculator';
import { HeatSourceList } from './HeatSourceList';
import { SizingTable } from './SizingTable';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { FuelBurnRate } from './FuelBurnRate';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { HeatSource, HeatSourceType } from '../types/calculator';
import { Button } from './ui/button';
import { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { calculateAnnualSavings } from '../utils/savings';
import { SavingsBanner } from './SavingsBanner';
import { SavingsChart } from './SavingsChart';

export function Calculator() {
  const { mode, setMode, addHeatSource, totalSizing, reset, hasChanges, heatSources } = useCalculator();
  const [selectedHeatSource, setSelectedHeatSource] = useState<string>("");

  // Calculate annual savings from heat sources
  const annualSavings = useMemo(() => {
    return calculateAnnualSavings(heatSources);
  }, [heatSources]);

  const handleAddHeatSource = (type: string) => {
    const newHeatSource: HeatSource = {
      type: type as HeatSourceType,
      fuelType: EMPTY_FUEL,
      costPerUnit: 0,
      quantity: 0,
      waterHeaterDuration: type === "water heater" ? 6 : null,
      measurementType: "annualCost",
    };
    addHeatSource(newHeatSource);
    setSelectedHeatSource("");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-left">
          <h2 className="text-xl font-bold mb-2">How to use the calculator</h2>
          <p className="mb-3">Enter your information in the boxes below. When you are done, the calculator shows you:</p>
          <ol className="list-decimal pl-8 mb-4 space-y-1">
            <li>The approximate amount of money you can save annually PLUS a graph showing the savings add up over time, and</li>
            <li>Recommended furnaces based on your heating needs</li>
          </ol>
        </div>

        <div className="mb-8 text-left">
          <h2 className="text-xl font-bold mb-2">What to do with your results</h2>
          <p>Click the PRINT YOUR SAVINGS button and print a copy of your results. Take this with you when you talk to your authorized Central Boiler dealer to help identify which furnace best fits your heating needs.</p>
        </div>

        <div className="space-y-6">
          <HeatSourceList />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <Select value={selectedHeatSource} onValueChange={handleAddHeatSource}>
                  <SelectTrigger id="heat-source" className="w-[280px]" aria-label="What else are you heating?">
                    <SelectValue placeholder="What else are you heating?" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_HEAT_SOURCE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={reset}
                  className="w-[280px]"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="mode"
                  checked={mode === 'sizing'}
                  onCheckedChange={(checked) => setMode(checked ? 'sizing' : 'savings')}
                  aria-label={mode === 'sizing' ? 'Sizing Mode' : 'Savings Mode'}
                />
                <Label htmlFor="mode" className="text-lg">
                  {mode === 'sizing' ? 'Sizing Mode' : 'Savings Mode'}
                </Label>
              </div>
            </div>
          </div>
        </div>

        {mode === 'sizing' ? (
          <SizingTable totalSizing={totalSizing} />
        ) : (
          hasChanges && annualSavings > 0 && (
            <>
              <SavingsBanner annualSavings={annualSavings} />
              <SavingsChart annualSavings={annualSavings} />
            </>
          )
        )}

        {hasChanges && (
          <div className="flex justify-center mt-6">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white border-gray-300 hover:bg-gray-50"
            >
              Print Your Savings
            </Button>
          </div>
        )}

        <FuelBurnRate />
      </div>
    </div>
  );
} 