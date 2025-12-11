"use client";

import { mockFinancialData, mockFinancialTrends } from "@/lib/mockFinancialData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export function ProfitabilityAnalysis() {
  // Find product with highest margin
  const highestMargin = mockFinancialData.reduce((max, row) =>
    row.gpPercentNsr > max.gpPercentNsr ? row : max
  );

  // Find product with highest cost
  const highestCost = mockFinancialData.reduce((max, row) => {
    const totalCost = row.com + row.moh + row.cogs;
    const maxTotalCost = max.com + max.moh + max.cogs;
    return totalCost > maxTotalCost ? row : max;
  });

  // Find largest GSR-NSR discrepancy
  const largestDiscrepancy = mockFinancialData.reduce((max, row) => {
    const discrepancy = Math.abs(row.gsr - row.nsr);
    const maxDiscrepancy = Math.abs(max.gsr - max.nsr);
    return discrepancy > maxDiscrepancy ? row : max;
  });

  // Break-even analysis data
  const breakEvenData = mockFinancialTrends.map((point) => ({
    period: point.period,
    nsr: point.nsr,
    totalCost: point.com + point.cogs, // Simplified: COM + COGs (MOH included in COM for this example)
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Profitability Break-Even Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Product with Highest Margin
          </h4>
          <p className="text-lg font-semibold text-gray-900">{highestMargin.pack}</p>
          <p className="text-sm text-gray-500 mt-1">
            GP % NSR: {highestMargin.gpPercentNsr.toFixed(0)}%
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Product with Highest Cost to Produce
          </h4>
          <p className="text-lg font-semibold text-gray-900">{highestCost.pack}</p>
          <p className="text-sm text-gray-500 mt-1">
            Total Cost: ₨
            {(highestCost.com + highestCost.moh + highestCost.cogs).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Largest GSR-NSR Discrepancy
          </h4>
          <p className="text-lg font-semibold text-gray-900">
            {largestDiscrepancy.pack}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Difference: ₨
            {Math.abs(largestDiscrepancy.gsr - largestDiscrepancy.nsr).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Break-Even Analysis: NSR vs Total Cost
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={breakEvenData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="nsr"
              stroke="#b91c1c"
              strokeWidth={2}
              name="NSR"
            />
            <Line
              type="monotone"
              dataKey="totalCost"
              stroke="#ef4444"
              strokeWidth={2}
              name="Total Cost"
            />
            <ReferenceLine
              y={0}
              stroke="#666"
              strokeDasharray="3 3"
              label="Break-Even"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 mt-4">
          The intersection point indicates where NSR exceeds Total Cost (break-even
          point).
        </p>
      </div>
    </div>
  );
}

