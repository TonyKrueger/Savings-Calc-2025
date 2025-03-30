import { FuelType, HeatSource, HeatSourceType, PerType } from '../types/calculator';

// Sizing and conversion factors
export const ANNUAL_TO_MONTHLY = 5;
export const MONTHLY_TO_ANNUAL = 5;
export const ANNUAL_TO_MONTHLY_SIZING = 4.5;
export const MONTHLY_TO_ANNUAL_SIZING = 4.5;

export interface FurnaceRecommendation {
  furnaces: string[];
  low: number;
  high: number;
  productUrls: Record<string, string>;
}

// Sizing recommendations
export const SIZING_RECOMMENDATIONS: FurnaceRecommendation[] = [
  {
    furnaces: ['Classic Edge 360', 'CL 4030'],
    low: 0,
    high: 170,
    productUrls: {
      'Classic Edge 360': 'https://example.com/classic-edge-360',
      'CL 4030': 'https://example.com/cl-4030'
    }
  },
  {
    furnaces: ['Classic Edge 560', 'CL 5036'],
    low: 0,
    high: 395,
    productUrls: {
      'Classic Edge 560': 'https://example.com/classic-edge-560',
      'CL 5036': 'https://example.com/cl-5036'
    }
  },
  {
    furnaces: ['Classic Edge 760', 'CL 6048'],
    low: 250,
    high: 710,
    productUrls: {
      'Classic Edge 760': 'https://example.com/classic-edge-760',
      'CL 6048': 'https://example.com/cl-6048'
    }
  },
  {
    furnaces: ['Classic Edge 960', 'CL 7260', 'Pallet Burner'],
    low: 500,
    high: 1800,
    productUrls: {
      'Classic Edge 960': 'https://example.com/classic-edge-960',
      'CL 7260': 'https://example.com/cl-7260',
      'Pallet Burner': 'https://example.com/pallet-burner'
    }
  }
];

export const FUEL_OIL: FuelType = {
  name: "Fuel Oil",
  type: "fuelOil",
  units: "gallons",
  specificUnit: "gallon",
  dWhQuantity: 145,
  price: 3.54,
  multiplier: 1.18,
  btu: 112000,
};

export const PROPANE: FuelType = {
  name: "Propane",
  type: "propane",
  units: "gallons",
  specificUnit: "gallon",
  dWhQuantity: 228.5,
  price: 3.03,
  multiplier: 0.78,
  btu: 73600,
};

export const NATURAL_GAS_CU_FT: FuelType = {
  name: "Natural Gas (cu ft)",
  type: "naturalGasCuFt",
  units: "cubic feet",
  specificUnit: "cubic foot",
  dWhQuantity: 600,
  price: 3.5,
  multiplier: 0.0087,
  btu: 800,
};

export const NATURAL_GAS_THERMS: FuelType = {
  name: "Natural Gas (therms)",
  type: "naturalGasTherms",
  units: "therms",
  specificUnit: "therm",
  dWhQuantity: 210.5,
  price: 0.98,
  multiplier: 0.87,
  btu: 80000,
};

export const ELECTRICITY: FuelType = {
  name: "Electricity",
  type: "electricity",
  units: "kilowatts",
  specificUnit: "kilowatt",
  dWhQuantity: 4531.5,
  price: 0.185,
  multiplier: 0.037,
  btu: 3413,
};

export const WOOD: FuelType = {
  name: "Wood",
  type: "wood",
  units: "cords",
  specificUnit: "cord",
  dWhQuantity: 0,
  price: 100,
  multiplier: 150,
  btu: 0,
};

export const WOOD_PELLETS_BAG: FuelType = {
  name: "Wood Pellets",
  type: "woodPelletsBag",
  units: "40 lb bags",
  specificUnit: "40 lb bag",
  dWhQuantity: 0,
  price: 4,
  multiplier: 0,
  btu: 256000,
};

export const WOOD_PELLETS_TON: FuelType = {
  name: "Wood Pellets",
  type: "woodPelletsTon",
  units: "Tons",
  specificUnit: "Ton",
  dWhQuantity: 0,
  price: 200,
  multiplier: 0,
  btu: 1280000,
};

export const CORN_BUSHEL: FuelType = {
  name: "Corn",
  type: "cornBushel",
  units: "Bushels",
  specificUnit: "Bushel",
  dWhQuantity: 0,
  price: 4.5,
  multiplier: 0,
  btu: 313600,
};

export const CORN_TON: FuelType = {
  name: "Corn",
  type: "cornTon",
  units: "Tons",
  specificUnit: "Ton",
  dWhQuantity: 0,
  price: 183,
  multiplier: 0,
  btu: 1120000,
};

export const EMPTY_FUEL: FuelType = {
  name: "Select a fuel type",
  type: "empty",
  units: "",
  specificUnit: "",
  dWhQuantity: 0,
  price: 0,
  multiplier: 0,
  btu: 0,
};

export const AVAILABLE_FUEL_TYPES: FuelType[] = [
  FUEL_OIL,
  PROPANE,
  NATURAL_GAS_CU_FT,
  NATURAL_GAS_THERMS,
  ELECTRICITY,
  WOOD,
  WOOD_PELLETS_BAG,
  WOOD_PELLETS_TON,
  CORN_BUSHEL,
  CORN_TON,
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
    measurementType: "monthlyUnits"
  },
  {
    type: "water heater",
    fuelType: ELECTRICITY,
    costPerUnit: 0.18,
    quantity: 4531.50,
    waterHeaterDuration: 6, // 6 months
    measurementType: "annualUnits"
  },
]; 