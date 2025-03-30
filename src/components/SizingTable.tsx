import { SIZING_RECOMMENDATIONS, FurnaceRecommendation } from '../config/calculator';
import { cn } from '../utils/cn';

interface SizingTableProps {
  totalSizing: number;
}

export function SizingTable({ totalSizing }: SizingTableProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">
        Based on a total sizing value of {totalSizing} we recommend the following furnace(s)* highlighted green:
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 text-left border border-gray-300 bg-gray-50 font-semibold">Sizing Value</th>
              <th className="p-2 text-left border border-gray-300 bg-gray-50 font-semibold">Furnaces</th>
            </tr>
          </thead>
          <tbody>
            {SIZING_RECOMMENDATIONS.map((rec: FurnaceRecommendation) => {
              const isRecommended = totalSizing >= rec.low && totalSizing <= rec.high;
              return (
                <tr 
                  key={rec.furnaces.join('-')}
                  className={cn(
                    "border-b border-gray-300",
                    isRecommended && "bg-green-100"
                  )}
                >
                  <td className="p-2 border-r border-gray-300">{rec.low}-{rec.high}</td>
                  <td className="p-2">
                    {rec.furnaces.map((furnace, idx) => (
                      <span key={furnace}>
                        {idx > 0 && ", "}
                        <a 
                          href={rec.productUrls[furnace]} 
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {furnace}
                        </a>
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-600 italic">
        * In the U.S., Classic and Pallet Burner models are for non-residential applications only. Check all applicable local codes and regulations.
      </p>
    </div>
  );
} 