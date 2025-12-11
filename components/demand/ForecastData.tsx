"use client";

import { useState } from "react";
import { FiltersBar } from "@/components/common/FiltersBar";
import type { DemandForecastRow } from "@/lib/types";
import { Edit, Download } from "lucide-react";
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

export function ForecastData({ forecastRows }: { forecastRows: DemandForecastRow[] }) {
  const [data, setData] = useState<DemandForecastRow[]>(forecastRows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSku, setSelectedSku] = useState("");
  const [newForecast, setNewForecast] = useState("");
  const [reason, setReason] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const handleAdjustForecast = () => {
    if (!selectedSku || !newForecast) return;

    const updated = data.map((row) =>
      row.sku === selectedSku
        ? { ...row, predictedSellOut: Number(newForecast) }
        : row
    );
    setData(updated);
    setIsModalOpen(false);
    setSelectedSku("");
    setNewForecast("");
    setReason("");
  };

  const totalPredictedSellOut = data.reduce(
    (sum, row) => sum + row.predictedSellOut,
    0
  );
  const months = Array.from(new Set(data.map((r) => r.forecastMonth))).sort();
  const latestMonth = months[months.length - 1];
  const currentMonthForecast = data
    .filter((row) => row.forecastMonth === latestMonth)
    .reduce((sum, row) => sum + row.predictedSellOut, 0);

  const trendMonths = months.slice(-2);
  const trendSeries = data
    .filter((row) => trendMonths.includes(row.forecastMonth))
    .map((row) => ({
      month: row.forecastMonth,
      forecast: row.predictedSellOut,
      actual: row.predictedSellOut * 0.97,
    }));

  const uniqueSkus = Array.from(new Set(data.map((row) => row.sku)));
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <FiltersBar />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <p className="text-sm text-gray-600">Current Month Forecast</p>
        <p className="text-2xl font-semibold text-gray-900">
          {currentMonthForecast.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Forecast Data
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>Modify AI Forecast</span>
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flavor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distributor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plant Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Forecast Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Predicted Sell-Out
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pagedData.map((row, index) => (
                <tr key={`${row.sku}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.flavor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.packageSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.distributor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.plantLocation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.forecastMonth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {row.predictedSellOut.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>
            Page {page} of {totalPages} (showing {pagedData.length} of {data.length})
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Trend Analysis (Forecast vs Actual)
        </h4>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="forecast" stroke="#e11d48" strokeWidth={2} name="Forecast" />
            <Line type="monotone" dataKey="actual" stroke="#111111" strokeWidth={2} name="Actual" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <h4 className="text-md font-semibold text-red-900 mb-3">
          Impact Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-red-700">Total Predicted Sell-Out</p>
            <p className="text-lg font-semibold text-red-900">
              {totalPredictedSellOut.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-red-700">Inventory Implication</p>
            <p className="text-sm text-red-900">
              Stock levels adjusted based on forecast
            </p>
          </div>
          <div>
            <p className="text-sm text-red-700">Production Scheduling</p>
            <p className="text-sm text-red-900">
              Production plans updated accordingly
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Adjust Forecast
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <select
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select SKU</option>
                  {uniqueSkus.map((sku) => (
                    <option key={sku} value={sku}>
                      {sku}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Forecast Value
                </label>
                <input
                  type="number"
                  value={newForecast}
                  onChange={(e) => setNewForecast(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Adjustment
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
                    setSelectedSku("");
                    setNewForecast("");
                    setReason("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdjustForecast}
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

