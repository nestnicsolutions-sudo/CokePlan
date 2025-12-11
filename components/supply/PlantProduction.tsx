"use client";

import { useState } from "react";
import type { PlantProductionRow } from "@/lib/types";
import { Edit } from "lucide-react";
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

export function PlantProduction({ plants }: { plants: PlantProductionRow[] }) {
  const [data, setData] = useState<PlantProductionRow[]>(plants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [newPlanned, setNewPlanned] = useState("");
  const [reason, setReason] = useState("");

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
    Planned: row.planned,
    Actual: row.actual,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gap
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.plant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.planned.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.actual.toLocaleString()}
                  </td>
                  <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    row.gap >= 0 ? "text-red-600" : "text-red-800"
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
            <XAxis dataKey="plant" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Planned" fill="#e11d48" />
            <Bar dataKey="Actual" fill="#111111" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
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

