import { FuelType, HeatSource, HeatSourceType, PerType } from '../types/calculator';

export const FUEL_OIL: FuelType = {
  name: "Fuel Oil",
  type: "fuelOil",
  units: "gallons",
  specificUnit: "gallon",
  dWhQuantity: 40.7,
  price: 4.79,
  multiplier: 1,
  btu: 138500,
};

export const PROPANE: FuelType = {
  name: "Propane",
  type: "propane",
  units: "gallons",
  specificUnit: "gallon",
  dWhQuantity: 27.1,
  price: 3.19,
  multiplier: 1,
  btu: 91600,
};

export const NATURAL_GAS_CU_FT: FuelType = {
  name: "Natural Gas (cu ft)",
  type: "naturalGasCuFt",
  units: "cubic feet",
  specificUnit: "cubic foot",
  dWhQuantity: 0.293,
  price: 0.0344,
  multiplier: 100,
  btu: 1037,
};

export const NATURAL_GAS_THERMS: FuelType = {
  name: "Natural Gas (therms)",
  type: "naturalGasTherms",
  units: "therms",
  specificUnit: "therm",
  dWhQuantity: 29.3,
  price: 3.44,
  multiplier: 1,
  btu: 100000,
};

export const ELECTRICITY: FuelType = {
  name: "Electricity",
  type: "electricity",
  units: "kWh",
  specificUnit: "kWh",
  dWhQuantity: 1,
  price: 0.34,
  multiplier: 1,
  btu: 3412,
};

export const WOOD: FuelType = {
  name: "Wood",
  type: "wood",
  units: "cords",
  specificUnit: "cord",
  dWhQuantity: 5800,
  price: 350,
  multiplier: 1,
  btu: 20000000,
};

export const EMPTY_FUEL: FuelType = {
  name: "Select a fuel type",
  type: "empty",
  units: "",
  specificUnit: "",
  dWhQuantity: 0,
  price: 0,
  multiplier: 1,
  btu: 0,
};

export const AVAILABLE_FUEL_TYPES: FuelType[] = [
  FUEL_OIL,
  PROPANE,
  NATURAL_GAS_CU_FT,
  NATURAL_GAS_THERMS,
  ELECTRICITY,
  WOOD,
];

export const AVAILABLE_HEAT_SOURCE_TYPES: HeatSourceType[] = [
  "home",
  "water heater",
  "garage",
  "shop",
];

export const AVAILABLE_PER_TYPES: PerType[] = [
  "monthlyUnits",
  "monthlyCost",
  "annualUnits",
  "annualCost",
];

export const DEFAULT_HEAT_SOURCES: HeatSource[] = [
  {
    type: "home",
    fuelType: EMPTY_FUEL,
    costPerUnit: 0,
    quantity: 0,
    waterHeaterDuration: null,
  },
  {
    type: "water heater",
    fuelType: ELECTRICITY,
    costPerUnit: 0,
    quantity: 0,
    waterHeaterDuration: 0,
  },
]; 