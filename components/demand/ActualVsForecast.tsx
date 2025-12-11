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

  const months = Object.keys(fByMonth).sort();
  const forecastData = months.map((m) => ({
    month: m,
    forecasted: fByMonth[m] ?? 0,
  }));

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="glass p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-semibold text-white mb-4">
          Monthly Demand Forecast
        </h3>
        <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
          <BarChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => Math.round(Number(v)).toLocaleString()} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: any) => Math.round(Number(v)).toLocaleString()} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="forecasted" fill="#e11d48" name="Forecasted Demand" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass p-4 lg:p-6">
          <h3 className="text-base lg:text-lg font-semibold text-white mb-4">
            Forecast Adjustments Tracking
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 lg:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-3 lg:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-3 lg:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th className="px-3 lg:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
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
  );
}

