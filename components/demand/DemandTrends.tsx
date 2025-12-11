"use client";

import { useMemo, useState } from "react";
import type { DemandForecastRow } from "@/lib/types";
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

export function DemandTrends({ forecastRows }: { forecastRows: DemandForecastRow[] }) {
  const [selectedFilter, setSelectedFilter] = useState<"brand" | "plant">("plant");

  // Group data by selected filter
  const groupedData = useMemo(
    () =>
      forecastRows.reduce((acc, point) => {
        const key =
          (selectedFilter === "plant"
            ? point.plantLocation
            : point.brand || point.plantLocation) || "Unknown";
        const existing = acc.find((item) => item.name === key);
        if (existing) {
          existing.value += point.predictedSellOut;
        } else {
          acc.push({ name: key, value: point.predictedSellOut });
        }
        return acc;
      }, [] as { name: string; value: number }[]),
    [forecastRows, selectedFilter]
  );

  // Year-on-Year comparison (mock)
  const yoyData = [
    { year: "2023", demand: 120000 },
    { year: "2024", demand: 135000, yoyChange: 12.5 },
    { year: "2025", demand: 150000, yoyChange: 11.1 },
  ];

  // Segmentation data (mock)
  const flavorData = [
    { flavor: "Original", demand: 45000 },
    { flavor: "Lemon-Lime", demand: 38000 },
    { flavor: "Orange", demand: 28000 },
  ];

  const packageSizeData = [
    { size: "250 ML", demand: 20000 },
    { size: "500 ML", demand: 60000 },
    { size: "1000 ML", demand: 31000 },
  ];

  const plantData = [
    { plant: "LHR", demand: 52000 },
    { plant: "GUJ", demand: 47000 },
    { plant: "FSB", demand: 36000 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Demand Forecast (By Plant/Brand)</h3>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as "brand" | "plant")}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="plant">By Plant</option>
            <option value="brand">By Brand</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={forecastRows.filter((p) =>
              selectedFilter === "plant" ? p.plantLocation : p.brand
            )}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="predictedSellOut"
              stroke="#e11d48"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Year-on-Year Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yoyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
              <Bar dataKey="demand" fill="#e11d48" name="Demand" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {yoyData
            .filter((item) => item.yoyChange !== undefined)
            .map((item) => (
              <div key={item.year} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.year}</span>
                <span className="text-sm font-medium text-red-700">
                  +{item.yoyChange}% YoY
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            By Flavor
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={flavorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="flavor" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#e11d48" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            By Package Size
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={packageSizeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="size" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#b91c1c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            By Plant
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={plantData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plant" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#111111" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

