import { useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HeatSource, PerType } from '../types/calculator';
import { AVAILABLE_FUEL_TYPES, ANNUAL_TO_MONTHLY, MONTHLY_TO_ANNUAL } from '../config/calculator';

interface EditHeatSourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  heatSource: HeatSource;
  onSave: (updatedSource: HeatSource) => void;
}

export function EditHeatSourceDialog({
  isOpen,
  onClose,
  heatSource,
  onSave,
}: EditHeatSourceDialogProps) {
  const [editedSource, setEditedSource] = useState<HeatSource>({
    ...heatSource,
    waterHeaterDuration: heatSource.type === 'water heater' ? (heatSource.waterHeaterDuration || 6) : null
  });
  const [measurementType, setMeasurementType] = useState<PerType>(
    heatSource.type === 'water heater' ? 'annualUnits' : 'monthlyUnits'
  );
  const [inputValue, setInputValue] = useState<number>(
    heatSource.type === 'water heater' && measurementType === 'annualUnits' 
      ? heatSource.quantity 
      : heatSource.quantity
  );

  const handleMeasurementTypeChange = (newType: PerType) => {
    const isMonthlyToAnnual = newType.startsWith('annual') && measurementType.startsWith('monthly');
    const isAnnualToMonthly = newType.startsWith('monthly') && measurementType.startsWith('annual');
    const isUnitToCost = newType.endsWith('Cost') && measurementType.endsWith('Units');
    const isCostToUnit = newType.endsWith('Units') && measurementType.endsWith('Cost');

    let newValue = inputValue;

    if (isMonthlyToAnnual) {
      newValue = inputValue * MONTHLY_TO_ANNUAL;
    } else if (isAnnualToMonthly) {
      newValue = inputValue / ANNUAL_TO_MONTHLY;
    } else if (isUnitToCost) {
      newValue = 0; // Reset when switching from units to cost
    } else if (isCostToUnit) {
      newValue = 0; // Reset when switching from cost to units
    }

    setInputValue(newValue);
    setMeasurementType(newType);

    // Update the editedSource based on the new measurement type
    if (newType.endsWith('Units')) {
      setEditedSource({
        ...editedSource,
        quantity: newValue,
        measurementType: newType
      });
    }
  };

  const handleInputChange = (value: number) => {
    setInputValue(value);
    
    if (measurementType.endsWith('Units')) {
      setEditedSource({
        ...editedSource,
        quantity: value,
        measurementType: measurementType
      });
    }
  };

  const handleSave = () => {
    // If we're in cost mode, calculate the quantity
    if (measurementType.endsWith('Cost')) {
      const quantity = inputValue / editedSource.costPerUnit;
      const finalQuantity = measurementType === 'annualCost' 
        ? quantity / MONTHLY_TO_ANNUAL 
        : quantity;
      
      setEditedSource({
        ...editedSource,
        quantity: finalQuantity,
        measurementType: measurementType.replace('Cost', 'Units') as PerType
      });
    }
    
    onSave(editedSource);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit {editedSource.type.charAt(0).toUpperCase() + editedSource.type.slice(1)}
          </DialogTitle>
          <DialogDescription>
            Make changes to your {editedSource.type} settings here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fuel-type">How do you heat your {editedSource.type}?</Label>
            <Select
              value={editedSource.fuelType.type}
              onValueChange={(value) => {
                const fuelType = AVAILABLE_FUEL_TYPES.find((fuel) => fuel.type === value);
                if (fuelType) {
                  setEditedSource({ 
                    ...editedSource, 
                    fuelType,
                    costPerUnit: fuelType.price
                  });
                }
              }}
            >
              <SelectTrigger data-testid="select-fuel-type">
                <SelectValue placeholder="Select a fuel type" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_FUEL_TYPES.map((fuel) => (
                  <SelectItem key={fuel.type} value={fuel.type}>
                    {fuel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>What measurements do you want to enter?</Label>
            <Select
              value={measurementType}
              onValueChange={(value) => handleMeasurementTypeChange(value as PerType)}
            >
              <SelectTrigger data-testid="select-measurement-type">
                <SelectValue placeholder="Select measurement type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthlyUnits">Monthly Units</SelectItem>
                <SelectItem value="monthlyCost">Monthly Cost</SelectItem>
                <SelectItem value="annualUnits">Annual Units</SelectItem>
                <SelectItem value="annualCost">Annual Cost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="value">
              {measurementType.endsWith('Cost') ? 'Cost' : `${editedSource.fuelType.units.charAt(0).toUpperCase() + editedSource.fuelType.units.slice(1)}`}
            </Label>
            <Input
              id="value"
              type="number"
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                handleInputChange(parseFloat(e.target.value) || 0)
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cost">Cost per {editedSource.fuelType.specificUnit}</Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              value={editedSource.costPerUnit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditedSource({
                  ...editedSource,
                  costPerUnit: parseFloat(e.target.value) || 0
                })
              }
            />
          </div>

          {editedSource.type === 'water heater' && (
            <div className="grid gap-2">
              <Label>How many months per year do you use your water heater?</Label>
              <RadioGroup
                defaultValue="6"
                value={String(editedSource.waterHeaterDuration || 6)}
                onValueChange={(value: string) => {
                  const newDuration = parseInt(value);
                  const oldDuration = editedSource.waterHeaterDuration || 6;
                  
                  // Adjust quantity based on duration change
                  const newQuantity = newDuration === 12 
                    ? editedSource.quantity * (12 / oldDuration)
                    : editedSource.quantity * (6 / oldDuration);

                  setEditedSource({
                    ...editedSource,
                    waterHeaterDuration: newDuration,
                    quantity: newQuantity
                  });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6" id="6months" />
                  <Label htmlFor="6months">6 Months (Typical for colder months only)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="12" id="12months" />
                  <Label htmlFor="12months">12 Months (Year-round usage)</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 