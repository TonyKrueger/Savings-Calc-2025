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
import { useState } from 'react';

export function Calculator() {
  const { mode, setMode, addHeatSource } = useCalculator();
  const [selectedHeatSource, setSelectedHeatSource] = useState<string>("");

  const handleAddHeatSource = (type: string) => {
    const newHeatSource: HeatSource = {
      type: type as HeatSourceType,
      fuelType: EMPTY_FUEL,
      costPerUnit: 0,
      quantity: 0,
      waterHeaterDuration: type === "water heater" ? 0 : null,
    };
    addHeatSource(newHeatSource);
    setSelectedHeatSource("");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl mb-2">How to use the calculator</h2>
          <p className="mb-3">Enter your information in the boxes below. When you are done, the calculator shows you:</p>
          <ol className="list-decimal pl-8 mb-4 space-y-1">
            <li>The approximate amount of money you can save annually PLUS a graph showing the savings add up over time, and</li>
            <li>Recommended furnaces based on your heating needs</li>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="text-xl mb-2">What to do with your results</h2>
          <p>Click the PRINT YOUR SAVINGS button and print a copy of your results. Take this with you when you talk to your authorized Central Boiler dealer to help identify which furnace best fits your heating needs.</p>
        </div>

        <div className="flex items-center justify-between mb-4">
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
          
          <div className="flex items-center space-x-2">
            <Select value={selectedHeatSource} onValueChange={handleAddHeatSource}>
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

        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white border-gray-300 hover:bg-gray-50"
          >
            Print Your Savings
          </Button>
        </div>
      </div>
    </div>
  );
} 