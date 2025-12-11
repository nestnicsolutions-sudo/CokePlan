"use client";

import { KpiCard } from "@/components/common/KpiCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DemandForecastRow } from "@/lib/types";

const toMonthKey = (val: string) => {
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export function MonthlySummary({
  forecastRows,
  actualRows,
}: {
  forecastRows: DemandForecastRow[];
  actualRows: DemandForecastRow[];
}) {
  const monthlyData = forecastRows.reduce((acc, row) => {
    const month = row.forecastMonth || toMonthKey(row.forecastMonth);
    const existing = acc.find((i) => i.month === month);
    if (existing) existing.total += row.predictedSellOut;
    else acc.push({ month, total: row.predictedSellOut });
    return acc;
  }, [] as { month: string; total: number }[]);

  const monthsSorted = monthlyData.map((m) => m.month).sort();
  const currentMonth = monthsSorted[monthsSorted.length - 1] || "";
  const prevMonth = monthsSorted[monthsSorted.length - 2] || "";

  const currentTotal = monthlyData.find((m) => m.month === currentMonth)?.total ?? 0;
  const prevTotal = monthlyData.find((m) => m.month === prevMonth)?.total ?? 0;

  // Brand/Pack stand-ins using plant/article until brand/pack fields exist
  const brandAgg: Record<string, number> = {};
  forecastRows.forEach((r) => {
    const key = r.plantLocation || "Unknown";
    brandAgg[key] = (brandAgg[key] ?? 0) + r.predictedSellOut;
  });
  const brandComparison = Object.entries(brandAgg)
    .map(([brand, total]) => ({ brand, current: total, lastYear: total * 0.9, change: 0 }))
    .sort((a, b) => b.current - a.current)
    .slice(0, 4)
    .map((item) => ({
      ...item,
      change: item.lastYear ? ((item.current - item.lastYear) / item.lastYear) * 100 : 0,
    }));

  const packAgg: Record<string, number> = {};
  forecastRows.forEach((r) => {
    const key = r.sku || "Unknown";
    packAgg[key] = (packAgg[key] ?? 0) + r.predictedSellOut;
  });
  const packComparison = Object.entries(packAgg)
    .map(([pack, total]) => ({ pack, current: total, lastYear: total * 0.9, change: 0 }))
    .sort((a, b) => b.current - a.current)
    .slice(0, 4)
    .map((item) => ({
      ...item,
      change: item.lastYear ? ((item.current - item.lastYear) / item.lastYear) * 100 : 0,
    }));

  const kpis = [
    {
      title: "Total Predicted Sell-Out (Current Month)",
      value: currentTotal.toLocaleString(),
      change: prevTotal ? ((currentTotal - prevTotal) / prevTotal) * 100 : undefined,
      changeLabel: "vs previous month",
      trend: currentTotal >= prevTotal ? ("up" as const) : ("down" as const),
    },
    {
      title: "Demand Forecast",
      value: currentTotal >= prevTotal ? "Increasing" : "Decreasing",
      trend: currentTotal >= prevTotal ? ("up" as const) : ("down" as const),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <KpiCard key={index} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Demand Forecast (Jul 25 - Jan 26)
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis hide />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#e11d48"
                strokeWidth={2}
                name="Predicted Sell-Out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Targets (Current Month)
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={[
                { day: "1", target: 520, actual: 500 },
                { day: "5", target: 540, actual: 530 },
                { day: "10", target: 560, actual: 550 },
                { day: "15", target: 580, actual: 575 },
                { day: "20", target: 600, actual: 590 },
                { day: "25", target: 620, actual: 615 },
                { day: "30", target: 640, actual: 635 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis hide />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="target" stroke="#e11d48" strokeWidth={2} name="Target" />
              <Line type="monotone" dataKey="actual" stroke="#111111" strokeWidth={2} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Brand-wise Comparison
          </h3>
          <div className="space-y-3">
            {brandComparison.map((item) => (
              <div key={item.brand} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {item.brand}
                </span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {item.current.toLocaleString()}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      item.change > 0 ? "text-red-600" : "text-red-800"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pack-wise Comparison
          </h3>
          <div className="space-y-3">
            {packComparison.map((item) => (
              <div key={item.pack} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {item.pack}
                </span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {item.current.toLocaleString()}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      item.change > 0 ? "text-red-600" : "text-red-800"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

