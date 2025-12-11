"use client";

import { useState } from "react";
import { mockFinancialData, mockFinancialTrends } from "@/lib/mockFinancialData";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#e11d48", "#f87171", "#111111"];

export function FinancialCharts() {
  const [selectedPack, setSelectedPack] = useState(mockFinancialData[0]?.pack || "");

  const selectedPackData = mockFinancialData.find((row) => row.pack === selectedPack);

  const costBreakdownData = selectedPackData
    ? [
        { name: "COM", value: selectedPackData.com },
        { name: "MOH", value: selectedPackData.moh },
        { name: "COGs", value: selectedPackData.cogs },
      ]
    : [];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Financial Charts</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Gross Profit by Pack
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockFinancialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="pack" />
              <YAxis />
              <Tooltip />
              <Legend />
            <Bar dataKey="gp" fill="#e11d48" name="Gross Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            GSR vs NSR
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockFinancialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="pack" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="gsr" fill="#e11d48" name="GSR" />
              <Bar dataKey="nsr" fill="#b91c1c" name="NSR" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-gray-900">
              Cost Breakdown
            </h4>
            <select
              value={selectedPack}
              onChange={(e) => setSelectedPack(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {mockFinancialData.map((row) => (
                <option key={row.pack} value={row.pack}>
                  {row.pack}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costBreakdownData}
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
                {costBreakdownData.map((entry, index) => (
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
            Profit Margin Analysis (GP % NSR)
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockFinancialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="pack" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="gpPercentNsr" fill="#e11d48" name="GP % NSR" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Trend Analysis of Key Metrics
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mockFinancialTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
              <Line
                type="monotone"
                dataKey="gsr"
                stroke="#e11d48"
                strokeWidth={2}
                name="GSR"
              />
              <Line
                type="monotone"
                dataKey="nsr"
                stroke="#b91c1c"
                strokeWidth={2}
                name="NSR"
              />
              <Line
                type="monotone"
                dataKey="com"
                stroke="#7f1d1d"
                strokeWidth={2}
                name="COM"
              />
              <Line
                type="monotone"
                dataKey="cogs"
                stroke="#991b1b"
                strokeWidth={2}
                name="COGs"
              />
              <Line
                type="monotone"
                dataKey="gp"
                stroke="#111111"
                strokeWidth={2}
                name="GP"
              />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

