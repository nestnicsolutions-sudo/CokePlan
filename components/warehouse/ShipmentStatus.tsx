"use client";

import { mockShipmentStatus } from "@/lib/mockWarehouseData";
import { KpiCard } from "@/components/common/KpiCard";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#e11d48", "#111111"];

export function ShipmentStatus() {
  const totalShipped = mockShipmentStatus.reduce(
    (sum, item) => sum + item.shipped,
    0
  );
  const totalDelayed = mockShipmentStatus.reduce(
    (sum, item) => sum + item.delayed,
    0
  );

  const kpis = [
    {
      title: "Shipped Shipments",
      value: totalShipped.toLocaleString(),
      trend: "up" as const,
    },
    {
      title: "Delayed Shipments",
      value: totalDelayed.toLocaleString(),
      trend: "down" as const,
    },
  ];

  const pieData = [
    { name: "Shipped", value: totalShipped },
    { name: "Delayed", value: totalDelayed },
  ];

  const barData = mockShipmentStatus.map((item) => ({
    warehouse: item.warehouse,
    Shipped: item.shipped,
    Delayed: item.delayed,
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Shipment Status Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kpis.map((kpi, index) => (
          <KpiCard key={index} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Status Distribution
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Shipments by Warehouse
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="warehouse" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Shipped" fill="#e11d48" />
              <Bar dataKey="Delayed" fill="#111111" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

