"use client";

import { mockForecastAdjustments } from "@/lib/mockDemandData";
import type { DemandForecastRow } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const toMonthKey = (val: string) => {
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export function ActualVsForecast({
  forecastRows,
  actualRows,
}: {
  forecastRows: DemandForecastRow[];
  actualRows: DemandForecastRow[];
}) {
  const byMonth = (rows: DemandForecastRow[]) =>
    rows.reduce<Record<string, number>>((acc, r) => {
      const m = r.forecastMonth || toMonthKey(r.forecastMonth);
      acc[m] = (acc[m] ?? 0) + r.predictedSellOut;
      return acc;
    }, {});

  const fByMonth = byMonth(forecastRows);
  const aByMonth = byMonth(actualRows);

  const months = Array.from(new Set([...Object.keys(fByMonth), ...Object.keys(aByMonth)])).sort();
  const comparisonData = months.map((m) => ({
    month: m,
    forecasted: fByMonth[m] ?? 0,
    actual: aByMonth[m] ?? 0,
  }));

  const mape = (() => {
    const errors = comparisonData
      .filter((d) => d.actual > 0)
      .map((d) => Math.abs((d.actual - d.forecasted) / d.actual));
    if (!errors.length) return undefined;
    return (errors.reduce((s, v) => s + v, 0) / errors.length) * 100;
  })();

  const rmse = (() => {
    if (!comparisonData.length) return undefined;
    const mse =
      comparisonData.reduce((s, d) => s + Math.pow(d.actual - d.forecasted, 2), 0) /
      comparisonData.length;
    return Math.sqrt(mse);
  })();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Actual vs Forecasted Demand
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="forecasted" fill="#e11d48" name="Forecasted" />
            <Bar dataKey="actual" fill="#111111" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Error Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">MAPE</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mape === undefined ? "N/A" : `${mape.toFixed(2)}%`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Mean Absolute Percentage Error
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">RMSE</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {rmse === undefined ? "N/A" : rmse.toFixed(0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Root Mean Square Error
                </p>
              </div>
            </div>
          </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Forecast Adjustments Tracking
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Old
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    New
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockForecastAdjustments.map((adj) => (
                  <tr key={adj.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{adj.date}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">{adj.user}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">{adj.sku}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {adj.oldValue.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {adj.newValue.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">{adj.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

