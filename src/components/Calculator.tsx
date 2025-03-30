import { useCalculator } from '../contexts/CalculatorContext';
import { AVAILABLE_HEAT_SOURCE_TYPES, EMPTY_FUEL } from '../config/calculator';
import { HeatSourceList } from './HeatSourceList';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { HeatSource, HeatSourceType } from '../types/calculator';
import { Button } from './ui/button';

export function Calculator() {
  const { mode, setMode, addHeatSource } = useCalculator();

  const handleAddHeatSource = (type: string) => {
    const newHeatSource: HeatSource = {
      type: type as HeatSourceType,
      fuelType: EMPTY_FUEL,
      costPerUnit: 0,
      quantity: 0,
      waterHeaterDuration: type === "water heater" ? 0 : null,
    };
    addHeatSource(newHeatSource);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">How to use the calculator</h2>
        <p className="mb-4">Enter your information in the boxes below. When you are done, the calculator shows you:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>The approximate amount of money you can save annually PLUS a graph showing the savings add up over time, and</li>
          <li>Recommended furnaces based on your heating needs</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">What to do with your results</h2>
        <p className="mb-8">Click the PRINT YOUR SAVINGS button and print a copy of your results. Take this with you when you talk to your authorized Central Boiler dealer to help identify which furnace best fits your heating needs.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <Switch
              id="mode"
              checked={mode === 'sizing'}
              onCheckedChange={(checked) => setMode(checked ? 'sizing' : 'savings')}
            />
            <Label htmlFor="mode" className="text-lg">
              {mode === 'sizing' ? 'Sizing Mode' : 'Savings Mode'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="heat-source" className="sr-only">Add Heat Source</Label>
            <Select onValueChange={handleAddHeatSource}>
              <SelectTrigger id="heat-source" className="w-[200px]">
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
          </div>
        </div>

        <HeatSourceList />

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Print Your Savings
          </Button>
        </div>
      </div>
    </div>
  );
} 