"use client";

import type { ShipmentPrioritizationRow } from "@/lib/types";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ShipmentPrioritizationChartsProps {
  shipments: ShipmentPrioritizationRow[];
}

const DECISION_COLORS = {
  LOAD_IMMEDIATELY: "#dc2626",
  LOAD_NEXT: "#f59e0b",
  KEEP_WAITING: "#6b7280",
};

/**
 * Charts for shipment prioritization analytics
 */
export function ShipmentPrioritizationCharts({
  shipments,
}: ShipmentPrioritizationChartsProps) {
  // Chart A: Priority Score Distribution (Bar Chart)
  const distributionData = shipments.map((s, idx) => ({
    index: idx + 1,
    score: s.priorityScore * 100,
    decision: s.decision,
  }));

  // Chart B: Decision Category Distribution (Pie Chart)
  const decisionCounts = {
    LOAD_IMMEDIATELY: shipments.filter((s) => s.decision === "LOAD_IMMEDIATELY")
      .length,
    LOAD_NEXT: shipments.filter((s) => s.decision === "LOAD_NEXT").length,
    KEEP_WAITING: shipments.filter((s) => s.decision === "KEEP_WAITING").length,
  };

  const pieData = [
    { name: "Load Immediately", value: decisionCounts.LOAD_IMMEDIATELY },
    { name: "Load Next", value: decisionCounts.LOAD_NEXT },
    { name: "Keep Waiting", value: decisionCounts.KEEP_WAITING },
  ];

  // Chart C: Priority Score vs Delay (Scatter)
  const scatterData = shipments.map((s) => ({
    delay: Math.round(s.shipmentDelayMinutes),
    score: s.priorityScore * 100,
    decision: s.decision,
  }));

  return (
    <div className="space-y-8">
      {/* Chart A: Priority Score Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Priority Score Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="index"
              label={{ value: "Shipment Index", position: "insideBottom", offset: -5 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ value: "Priority Score (%)", angle: -90, position: "insideLeft" }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Priority Score"]}
            />
            <Bar dataKey="score" fill="#dc2626" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart B: Decision Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Decision Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent || 0) * 100).toFixed(1)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill={DECISION_COLORS.LOAD_IMMEDIATELY} />
                <Cell fill={DECISION_COLORS.LOAD_NEXT} />
                <Cell fill={DECISION_COLORS.KEEP_WAITING} />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart C: Priority Score vs Delay */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Priority Score vs Delay
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="delay"
                type="number"
                name="Delay"
                unit=" min"
                label={{ value: "Delay (min)", position: "insideBottom", offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                dataKey="score"
                type="number"
                name="Score"
                unit="%"
                label={{ value: "Priority Score (%)", angle: -90, position: "insideLeft" }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "Score") return [`${value.toFixed(1)}%`, "Priority Score"];
                  return [value, name];
                }}
              />
              <Scatter name="Shipments" data={scatterData} fill="#dc2626" />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-4">
            Visualizes how delay influences priority score. Higher delay typically
            correlates with higher priority.
          </p>
        </div>
      </div>
    </div>
  );
}

