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
    const val = Math.round(row.predictedSellOut);
    const existing = acc.find((i) => i.month === month);
    if (existing) existing.total += val;
    else acc.push({ month, total: val });
    return acc;
  }, [] as { month: string; total: number }[]);

  const monthsSorted = monthlyData.map((m) => m.month).sort();
  const currentMonth = monthsSorted[monthsSorted.length - 1] || "";
  const prevMonth = monthsSorted[monthsSorted.length - 2] || "";

  const currentTotal = monthlyData.find((m) => m.month === currentMonth)?.total ?? 0;
  const prevTotal = monthlyData.find((m) => m.month === prevMonth)?.total ?? 0;

  // Plant-wise comparison - current month vs previous month
  const plantCurrentMonth: Record<string, number> = {};
  const plantPrevMonth: Record<string, number> = {};
  
  forecastRows.forEach((r) => {
    const key = r.plantLocation || "Unknown";
    const month = r.forecastMonth || toMonthKey(r.forecastMonth);
    
    if (month === currentMonth) {
      plantCurrentMonth[key] = (plantCurrentMonth[key] ?? 0) + Math.round(r.predictedSellOut);
    } else if (month === prevMonth) {
      plantPrevMonth[key] = (plantPrevMonth[key] ?? 0) + Math.round(r.predictedSellOut);
    }
  });
  
  const plantComparison = Object.keys(plantCurrentMonth)
    .map((plant) => {
      const current = plantCurrentMonth[plant] ?? 0;
      const previous = plantPrevMonth[plant] ?? 0;
      const change = previous ? Math.round(((current - previous) / previous) * 100) : 0;
      return { plant, current, previous, change };
    })
    .sort((a, b) => b.current - a.current)
    .slice(0, 4);

  // Pack-wise comparison - current month vs previous month
  const packCurrentMonth: Record<string, number> = {};
  const packPrevMonth: Record<string, number> = {};
  
  forecastRows.forEach((r) => {
    const key = r.packageSize || r.sku || "Unknown";
    const month = r.forecastMonth || toMonthKey(r.forecastMonth);
    
    if (month === currentMonth) {
      packCurrentMonth[key] = (packCurrentMonth[key] ?? 0) + Math.round(r.predictedSellOut);
    } else if (month === prevMonth) {
      packPrevMonth[key] = (packPrevMonth[key] ?? 0) + Math.round(r.predictedSellOut);
    }
  });
  
  const packComparison = Object.keys(packCurrentMonth)
    .map((pack) => {
      const current = packCurrentMonth[pack] ?? 0;
      const previous = packPrevMonth[pack] ?? 0;
      const change = previous ? Math.round(((current - previous) / previous) * 100) : 0;
      return { pack, current, previous, change };
    })
    .sort((a, b) => b.current - a.current)
    .slice(0, 4);

  const kpis = [
    {
      title: "Total Predicted Sell-Out (Current Month)",
      value: Math.round(currentTotal).toLocaleString(),
      change: prevTotal ? Math.round(((currentTotal - prevTotal) / prevTotal) * 100) : undefined,
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
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {kpis.map((kpi, index) => (
          <KpiCard key={index} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="glass p-4 lg:p-6">
          <h3 className="text-base lg:text-lg font-semibold text-white mb-4">
            Monthly Demand Forecast (Dec 25 - Feb 26)
          </h3>
          <ResponsiveContainer width="100%" height={220} className="lg:h-[260px]">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => Math.round(Number(v)).toLocaleString()} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => Math.round(Number(v)).toLocaleString()} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
            Daily Targets (Current Month)
          </h3>
          <ResponsiveContainer width="100%" height={220} className="lg:h-[260px]">
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
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Plant-wise Comparison
            </h3>
            <span className="text-xs text-white/60">
              Current vs Previous Month
            </span>
          </div>
          <div className="space-y-3">
            {plantComparison.map((item) => (
              <div key={item.plant} className="flex items-center justify-between">
                <span className="text-xs lg:text-sm font-medium text-white">
                  {item.plant}
                </span>
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <span className="text-xs lg:text-sm text-white/80">
                    {Math.round(item.current).toLocaleString()}
                  </span>
                  <span
                    className={`text-xs lg:text-sm font-medium px-2 py-1 rounded ${
                      item.change > 0 
                        ? "bg-green-500/20 text-green-300" 
                        : item.change < 0
                        ? "bg-red-500/20 text-red-300"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                    title={`Change from ${prevMonth} (${Math.round(item.previous).toLocaleString()}) to ${currentMonth} (${Math.round(item.current).toLocaleString()})`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-white/60">
              Percentage shows change in demand forecast from {prevMonth} to {currentMonth}
            </p>
          </div>
        </div>

        <div className="glass p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base lg:text-lg font-semibold text-white">
              Pack-wise Comparison
            </h3>
            <span className="text-xs text-white/60">
              Current vs Previous Month
            </span>
          </div>
          <div className="space-y-3">
            {packComparison.map((item) => (
              <div key={item.pack} className="flex items-center justify-between">
                <span className="text-xs lg:text-sm font-medium text-white">
                  {item.pack}
                </span>
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <span className="text-sm text-white/80">
                    {Math.round(item.current).toLocaleString()}
                  </span>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      item.change > 0 
                        ? "bg-green-500/20 text-green-300" 
                        : item.change < 0
                        ? "bg-red-500/20 text-red-300"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                    title={`Change from ${prevMonth} (${Math.round(item.previous).toLocaleString()}) to ${currentMonth} (${Math.round(item.current).toLocaleString()})`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-white/60">
              Percentage shows change in demand forecast from {prevMonth} to {currentMonth}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

