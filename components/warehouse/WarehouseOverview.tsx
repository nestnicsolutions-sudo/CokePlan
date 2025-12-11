"use client";

import { mockWarehouseMetrics } from "@/lib/mockWarehouseData";
import { KpiCard } from "@/components/common/KpiCard";
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

export function WarehouseOverview() {
  const chartData = mockWarehouseMetrics.map((warehouse) => ({
    warehouse: warehouse.warehouse,
    "Total Weight Processed": warehouse.totalWeightProcessed,
    "Number of Shipments": warehouse.totalShipments,
  }));

  const kpiCards = mockWarehouseMetrics.map((warehouse) => ({
    title: `Warehouse ${warehouse.warehouse}`,
    value: `${warehouse.totalShipments} shipments`,
    change: undefined,
    changeLabel: `${warehouse.totalWeightProcessed.toLocaleString()} kg`,
    trend: "neutral" as const,
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Warehouse Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiCards.map((kpi, index) => (
          <KpiCard key={index} kpi={kpi} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Total Weight Processed vs Number of Shipments
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="warehouse" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="Total Weight Processed"
              fill="#e11d48"
            />
            <Bar
              yAxisId="right"
              dataKey="Number of Shipments"
              fill="#111111"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

