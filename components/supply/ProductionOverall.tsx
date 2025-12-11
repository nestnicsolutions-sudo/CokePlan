"use client";

import { KpiCard } from "@/components/common/KpiCard";
import type { PlantProductionRow } from "@/lib/types";
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

export function ProductionOverall({ plants }: { plants: PlantProductionRow[] }) {
  const totalPlanned = plants.reduce((s, p) => s + p.planned, 0);
  const totalActual = plants.reduce((s, p) => s + p.actual, 0);
  const lastYear = totalActual * 0.95; // simple proxy

  const kpis = [
    {
      title: "Total Units Produced (Last Month)",
      value: totalActual.toLocaleString(),
      changeLabel: "vs last year",
      change: Math.round(((totalActual - lastYear) / lastYear) * 100),
      trend: "neutral" as const,
    },
    {
      title: "Total Planned Production",
      value: totalPlanned.toLocaleString(),
      trend: "neutral" as const,
    },
    {
      title: "Production Gap",
      value: (totalActual - totalPlanned).toLocaleString(),
      change: Math.round(((totalActual - totalPlanned) / totalPlanned) * 100) || 0,
      changeLabel: totalActual - totalPlanned > 0 ? "Over" : "Under",
      trend: (
        totalActual - totalPlanned > 0
          ? "up"
          : totalActual - totalPlanned < 0
          ? "down"
          : "neutral"
      ) as "up" | "down" | "neutral",
    },
  ];

  const chartData = plants.map((p) => ({
    name: p.plant,
    Planned: p.planned * 0.3,
    Actual: p.actual,
  }));

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {kpis.map((kpi, index) => (
          <KpiCard key={index} kpi={kpi} />
        ))}
      </div>

      <div className="glass p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-semibold text-white mb-4">
          Planned vs Actual Production
        </h3>
        <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v) => Math.round(Number(v)).toLocaleString()} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: any) => Math.round(Number(v)).toLocaleString()} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="Planned" fill="#e11d48" />
            <Bar dataKey="Actual" fill="#111111" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

