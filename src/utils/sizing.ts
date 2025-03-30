import { HeatSource, PerType } from '../types/calculator';
import { 
  ANNUAL_TO_MONTHLY, 
  MONTHLY_TO_ANNUAL, 
  ANNUAL_TO_MONTHLY_SIZING, 
  MONTHLY_TO_ANNUAL_SIZING,
  SIZING_RECOMMENDATIONS,
  FurnaceRecommendation 
} from '../config/calculator';

/**
 * Calculates the quantity of fuel used based on cost and cost per unit
 */
const calculateQuantity = (cost: number, costPerUnit: number): number => {
  return Math.round(cost / costPerUnit);
};

/**
 * Gets the recommended furnaces based on the sizing value
 */
export const getRecommendedFurnaces = (sizing: number): string[] => {
  return SIZING_RECOMMENDATIONS
    .filter((rec: FurnaceRecommendation) => sizing >= rec.low && sizing <= rec.high)
    .map((rec: FurnaceRecommendation) => rec.furnaces)
    .flat();
};

/**
 * Calculates the sizing value for a heat source based on the input type
 * @param heatSource The heat source to calculate sizing for
 * @param perType The type of input (monthly/annual units/cost)
 * @param cost The cost value if using cost-based calculation
 * @returns The calculated sizing value
 */
export const calculateSizing = (
  heatSource: HeatSource,
  perType: PerType,
  cost?: number
): number => {
  let quantity = heatSource.quantity;
  
  // If using cost-based calculation, derive quantity from cost
  if (cost !== undefined && (perType === 'monthlyCost' || perType === 'annualCost')) {
    quantity = calculateQuantity(cost, heatSource.costPerUnit);
  }

  // Skip calculation for empty fuel type
  if (heatSource.fuelType.type === 'empty' || quantity === 0) {
    return 0;
  }

  let sizing: number;

  // For water heaters, use the water heater duration instead of standard conversion
  if (heatSource.type === 'water heater' && heatSource.waterHeaterDuration) {
    const durationInMonths = heatSource.waterHeaterDuration; // Duration is already in months
    
    if (perType.startsWith('monthly')) {
      sizing = heatSource.fuelType.multiplier * (quantity * (12 / durationInMonths) / MONTHLY_TO_ANNUAL_SIZING);
    } else {
      sizing = heatSource.fuelType.multiplier * (quantity / MONTHLY_TO_ANNUAL_SIZING);
    }
  } else {
    // For all other heat sources
    if (perType === 'monthlyUnits' || perType === 'monthlyCost') {
      sizing = heatSource.fuelType.multiplier * (MONTHLY_TO_ANNUAL * quantity / MONTHLY_TO_ANNUAL_SIZING);
    } else {
      sizing = heatSource.fuelType.multiplier * (quantity / MONTHLY_TO_ANNUAL_SIZING);
    }
  }

  return Math.round(sizing);
};

/**
 * Calculates the total sizing value for multiple heat sources
 */
export const calculateTotalSizing = (
  heatSources: HeatSource[],
  perType: PerType,
  costs?: number[]
): number => {
  return heatSources.reduce((total, source, index) => {
    const cost = costs ? costs[index] : undefined;
    return total + calculateSizing(source, perType, cost);
  }, 0);
}; 