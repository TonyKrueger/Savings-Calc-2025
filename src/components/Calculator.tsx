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
      <h1 className="text-4xl font-bold mb-8">Savings Calculator 2025</h1>
      <p className="mb-4">
        Use this calculator to estimate your potential savings or determine the
        right size for your heat pump system.
      </p>
      <p className="mb-8">
        Enter your current heating costs and usage to see how much you could save
        with a heat pump system, or input your desired heating requirements to get
        sizing recommendations.
      </p>

      <div className="flex items-center space-x-4 mb-8">
        <Switch
          id="mode"
          checked={mode === 'sizing'}
          onCheckedChange={(checked) => setMode(checked ? 'sizing' : 'savings')}
        />
        <Label htmlFor="mode">
          {mode === 'sizing' ? 'Sizing Mode' : 'Savings Mode'}
        </Label>
      </div>

      <div className="mb-8">
        <Label htmlFor="heat-source">Add Heat Source</Label>
        <Select onValueChange={handleAddHeatSource}>
          <SelectTrigger id="heat-source" className="w-[280px]">
            <SelectValue placeholder="Select a heat source type" />
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

      <HeatSourceList />
    </div>
  );
} 