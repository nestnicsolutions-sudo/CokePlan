"use client";

import { useState, useMemo } from "react";
import type { PlantProductionRow } from "@/lib/types";
import { Edit, Search } from "lucide-react";
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

interface SupplyDataProps {
  plants: PlantProductionRow[];
  plannedRows?: any[];
  actualRows?: any[];
  yearMonthOptions?: { year: number; month: number }[];
}

export function PlantProduction({ 
  plants, 
  plannedRows = [], 
  actualRows = [],
  yearMonthOptions = []
}: SupplyDataProps) {
  const [data, setData] = useState<PlantProductionRow[]>(plants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [newPlanned, setNewPlanned] = useState("");
  const [reason, setReason] = useState("");
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState<number | "">(yearMonthOptions.length > 0 ? yearMonthOptions[0].year : "");
  const [selectedMonth, setSelectedMonth] = useState<number | "">(yearMonthOptions.length > 0 ? yearMonthOptions[0].month : "");
  
  const availableYears = useMemo(() => {
    const years = new Set(yearMonthOptions.map(ym => ym.year));
    return Array.from(years).sort((a, b) => b - a);
  }, [yearMonthOptions]);
  
  const availableMonths = useMemo(() => {
    if (!selectedYear) return [];
    return yearMonthOptions
      .filter(ym => ym.year === selectedYear)
      .map(ym => ym.month)
      .sort((a, b) => a - b);
  }, [selectedYear, yearMonthOptions]);

  const handleApplyFilters = () => {
    if (!selectedYear || !selectedMonth || !plannedRows.length || !actualRows.length) {
      setData(plants);
      return;
    }
    
    // Helper function to parse numbers safely
    const numberify = (v: any) => {
      if (v === null || v === undefined || v === "") return 0;
      const num = typeof v === "number" 
        ? v 
        : typeof v === "string" 
        ? Number(v.replace(/,/g, ""))
        : 0;
      return Number.isFinite(num) ? num : 0;
    };
    
    // Filter actual data by year/month on client side
    const year = selectedYear as number;
    const month = selectedMonth as number;
    
    const filteredActualRows = actualRows.filter((r: any) => {
      const dateStr = r["Production date"] ?? r.Date;
      if (!dateStr) return false;
      
      const d = new Date(dateStr);
      if (Number.isNaN(d.getTime())) return false;
      
      const rowYear = d.getFullYear();
      const rowMonth = d.getMonth() + 1;
      
      return rowYear === year && rowMonth === month;
    });
    
    // Re-map plant production with filtered actual data
    const agg: Record<string, PlantProductionRow> = {};
    
    const plantNames: Record<string, string> = {
      "3002": "Lahore",
      "3003": "Gujranwala",
      "3004": "Faisalabad",
    };
    
    // Add planned data
    plannedRows.forEach((r: any) => {
      const plant = String(r.Plant ?? r.plant ?? "Unknown").trim();
      const plantName = plantNames[plant] || plant;
      const planned = numberify(r.Pr_Forecast_Demand ?? r["Production in PHCs"] ?? 0);
      
      agg[plantName] ??= { plant: plantName, planned: 0, actual: 0, gap: 0 };
      agg[plantName].planned += planned;
    });
    
    // Add filtered actual data
    filteredActualRows.forEach((r: any) => {
      const plant = String(r.Plant ?? r.plant ?? "Unknown").trim();
      const plantName = plantNames[plant] || plant;
      const actual = numberify(r["Production in PHCs"] ?? r.Actual ?? r.Production ?? 0);
      
      agg[plantName] ??= { plant: plantName, planned: 0, actual: 0, gap: 0 };
      agg[plantName].actual += actual;
    });
    
    const filteredData = Object.values(agg)
      .map((row) => ({
        ...row,
        gap: row.actual - row.planned,
      }))
      .filter((row) => {
        // Only show the 3 allowed plants
        const allowedPlants = ["Lahore", "Gujranwala", "Faisalabad"];
        return allowedPlants.includes(row.plant);
      });
    
    setData(filteredData);
  };

  const handleAdjustSchedule = () => {
    if (!selectedPlant || !newPlanned) return;

    const updated = data.map((row) =>
      row.plant === selectedPlant
        ? {
            ...row,
            planned: Number(newPlanned),
            gap: row.actual - Number(newPlanned),
          }
        : row
    );
    setData(updated);
    setIsModalOpen(false);
    setSelectedPlant("");
    setNewPlanned("");
    setReason("");
  };

  const chartData = data.map((row) => ({
    plant: row.plant,
    "Actual (Filtered)": row.actual,
    "Predicted (Current Month)": row.planned,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          Plant-Wise Production
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <Edit className="h-4 w-4" />
          <span>Adjust Production Schedule</span>
        </button>
      </div>

      {/* Filters */}
      <div className="glass p-6">
        <h4 className="text-sm font-semibold text-white mb-4">Filter Actual Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => {
                const year = e.target.value ? Number(e.target.value) : "";
                setSelectedYear(year);
                // Reset month when year changes
                setSelectedMonth("");
              }}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Year</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value ? Number(e.target.value) : "")}
              disabled={!selectedYear}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select Month</option>
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {String(month).padStart(2, "0")} - {new Date(2025, month - 1).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleApplyFilters}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
        <p className="text-xs text-white/60">
          Note: Filters apply only to the "Actual (Filtered)" bar. "Predicted (Current Month)" shows the current month's demand forecast.
        </p>
      </div>

      <div className="glass p-6">
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-transparent">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Plant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Predicted (Current Month)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actual (Filtered)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Gap
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.map((row, index) => (
                <tr key={index} className="transition-colors hover:bg-red-700 hover:text-white">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {row.plant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {row.planned.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {row.actual.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      row.gap >= 0 ? "text-white" : "text-white"
                    }`}
                  >
                    {row.gap >= 0 ? "+" : ""}
                    {row.gap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="plant" stroke="#fff" />
            <YAxis stroke="#fff" tickFormatter={(v) => Math.round(Number(v)).toLocaleString()} />
            <Tooltip formatter={(v: any) => Math.round(Number(v)).toLocaleString()} />
            <Legend />
            <Bar dataKey="Actual (Filtered)" fill="#10b981" name="Actual (Filtered)" />
            <Bar dataKey="Predicted (Current Month)" fill="#e11d48" name="Predicted (Current Month)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="glass p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-4">
              Adjust Production Schedule
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plant
                </label>
                <select
                  value={selectedPlant}
                  onChange={(e) => setSelectedPlant(e.target.value)}
                  className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white"
                >
                  <option value="">Select Plant</option>
                  {data.map((row) => (
                    <option key={row.plant} value={row.plant}>
                      {row.plant}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Planned Production
                </label>
                <input
                  type="number"
                  value={newPlanned}
                  onChange={(e) => setNewPlanned(e.target.value)}
                  className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPlant("");
                    setNewPlanned("");
                    setReason("");
                  }}
                  className="px-4 py-2 border border-white/30 rounded-md text-white hover:bg-red-700/40"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdjustSchedule}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

