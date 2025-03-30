import { formatCurrency } from '../utils/format';

interface SavingsBannerProps {
  annualSavings: number;
}

export function SavingsBanner({ annualSavings }: SavingsBannerProps) {
  return (
    <div className="w-full bg-green-600 p-4 rounded-md text-center mb-8">
      <h2 className="text-white text-xl font-semibold mb-1">
        You could save:
      </h2>
      <div className="text-white text-4xl font-bold">
        {formatCurrency(annualSavings)} dollars a year!
      </div>
    </div>
  );
} 