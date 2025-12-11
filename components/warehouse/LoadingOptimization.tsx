"use client";

import { mockLoadingTimeData, mockWarehouseMetrics } from "@/lib/mockWarehouseData";
import { KpiCard } from "@/components/common/KpiCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function LoadingOptimization() {
  // Find warehouse with maximum loading time
  const maxLoadingWarehouse = mockWarehouseMetrics.reduce((max, warehouse) =>
    warehouse.averageLoadingTime > max.averageLoadingTime ? warehouse : max
  );

  const kpi = {
    title: "Warehouse with Highest Average Loading Time",
    value: `${maxLoadingWarehouse.warehouse}: ${maxLoadingWarehouse.averageLoadingTime} min`,
    trend: "neutral" as const,
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Loading Time Optimization
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <KpiCard kpi={kpi} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Average Loading Time Trend
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockLoadingTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="lhr"
              stroke="#e11d48"
              strokeWidth={2}
              name="LHR"
            />
            <Line
              type="monotone"
              dataKey="guj"
              stroke="#b91c1c"
              strokeWidth={2}
              name="GUJ"
            />
            <Line
              type="monotone"
              dataKey="fsb"
              stroke="#111111"
              strokeWidth={2}
              name="FSB"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

