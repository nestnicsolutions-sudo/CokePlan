"use client";

import { mockWarehouseMetrics } from "@/lib/mockWarehouseData";
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

export function TimeAnalysis() {
  const chartData = mockWarehouseMetrics.map((warehouse) => ({
    warehouse: warehouse.warehouse,
    "Vehicle Assignment": warehouse.vehicleAssignmentTime,
    "Loading Process": warehouse.loadingProcessTime,
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Time Spent on Warehouse Operations
      </h3>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Operation Efficiency by Warehouse
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="warehouse" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Vehicle Assignment"
              fill="#e11d48"
              stackId="a"
            />
            <Bar dataKey="Loading Process" fill="#111111" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

