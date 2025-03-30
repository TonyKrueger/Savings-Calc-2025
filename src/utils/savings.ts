import { HeatSource } from '../types/calculator';

/**
 * Calculates the total annual savings for all heat sources
 */
export const calculateAnnualSavings = (heatSources: HeatSource[]): number => {
  const totalAmount = heatSources.reduce((total, source) => {
    // Skip empty heat sources
    if (source.fuelType.type === 'empty' || source.quantity === 0) {
      return total;
    }
    
    // For water heaters, adjust annual cost based on duration
    if (source.type === 'water heater' && source.waterHeaterDuration) {
      return total + (source.quantity * source.costPerUnit * (source.waterHeaterDuration / 12));
    }
    
    // For other sources, convert to annual if needed
    const isMonthly = source.measurementType?.startsWith('monthly');
    return total + (source.quantity * source.costPerUnit * (isMonthly ? 12 : 1));
  }, 0);
  
  return Math.round(totalAmount);
}; 