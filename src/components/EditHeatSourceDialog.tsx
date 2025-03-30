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
import { HeatSource } from '../types/calculator';
import { AVAILABLE_FUEL_TYPES } from '../config/calculator';

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
  const [editedSource, setEditedSource] = useState<HeatSource>(heatSource);

  const handleSave = () => {
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
                  setEditedSource({ ...editedSource, fuelType });
                }
              }}
            >
              <SelectTrigger id="fuel-type">
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
            <Label htmlFor="quantity">How many kilowatts?</Label>
            <Input
              id="quantity"
              type="number"
              value={editedSource.quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                setEditedSource({
                  ...editedSource,
                  quantity: parseFloat(e.target.value) || 0
                })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cost">Cost per unit</Label>
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

          {editedSource.type === "water heater" && (
            <div className="grid gap-2">
              <Label>How long would you run your furnace to heat your domestic water?</Label>
              <RadioGroup
                value={String(editedSource.waterHeaterDuration)}
                onValueChange={(value: string) =>
                  setEditedSource({
                    ...editedSource,
                    waterHeaterDuration: value === "180" ? 180 : 360
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="180" id="6months" />
                  <Label htmlFor="6months">6 Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="360" id="12months" />
                  <Label htmlFor="12months">12 Months</Label>
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