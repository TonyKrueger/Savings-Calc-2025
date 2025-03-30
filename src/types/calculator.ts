export type FuelType = {
  name: string;
  type: string;
  units: string;
  specificUnit: string;
  dWhQuantity: number;
  price: number;
  multiplier: number;
  btu: number;
};

export type HeatSourceType = "home" | "water heater" | "garage" | "shop";

export type PerType = "monthlyUnits" | "monthlyCost" | "annualUnits" | "annualCost";

export type HeatSource = {
  type: HeatSourceType;
  fuelType: FuelType;
  costPerUnit: number;
  quantity: number;
  waterHeaterDuration: number | null;
};

export const enum FuelTypes {
  fuelOil = 'fuelOil',
  propane = 'propane',
  naturalGasCuFt = 'naturalGasCuFt',
  naturalGasTherms = 'naturalGasTherms',
  electricity = 'electricity',
  wood = 'wood',
  empty = 'empty'
}

export const enum HeatSourceTypes {
  home = 'home',
  waterHeater = 'waterHeater',
  garage = 'garage',
  shop = 'shop'
}

export const enum PerTypes {
  monthlyUnits = 'monthlyUnits',
  monthlyCost = 'monthlyCost',
  annualUnits = 'annualUnits',
  annualCost = 'annualCost'
} 