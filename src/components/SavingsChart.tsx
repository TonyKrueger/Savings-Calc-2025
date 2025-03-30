import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface SavingsChartProps {
  annualSavings: number
}

interface DataPoint {
  years: string
  savings: number
}

export function SavingsChart({ annualSavings }: SavingsChartProps) {
  // Calculate savings for different time periods
  const data = [5, 10, 15, 20, 25].map((years) => ({
    years: `${years} Years`,
    savings: annualSavings * years,
  }))

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Your Savings</h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="years"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              content={({ active, payload }) => {
                if (active && payload?.[0]?.payload) {
                  const data = payload[0].payload as DataPoint
                  return (
                    <div className="bg-white border border-gray-200 p-2 shadow-lg rounded-lg">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-xs uppercase text-gray-500">
                            Period
                          </span>
                          <span className="font-bold text-gray-900">
                            {data.years}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase text-gray-500">
                            Total Savings
                          </span>
                          <span className="font-bold text-green-600">
                            ${data.savings.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="savings"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              label={({ x, y, width, value }) => {
                return (
                  <text
                    x={x + width / 2}
                    y={y - 10}
                    fill="#22c55e"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-semibold"
                  >
                    ${value.toLocaleString()}
                  </text>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 