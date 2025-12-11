"use client";

import { useState, useMemo } from "react";
import type { DemandForecastRow } from "@/lib/types";
import { Download, Search } from "lucide-react";
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
  
  // Filter states
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedDistributor, setSelectedDistributor] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPackageSize, setSelectedPackageSize] = useState("all");
  const [selectedPlant, setSelectedPlant] = useState("all");
  
  // Filtered data state - starts with all data
  const [filteredData, setFilteredData] = useState<DemandForecastRow[]>(forecastRows);
  
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Extract unique values from the original data
  const uniqueMonths = useMemo(() => 
    Array.from(new Set(forecastRows.map((r) => r.forecastMonth))).sort(),
    [forecastRows]
  );
  
  const uniqueDistributors = useMemo(() => 
    Array.from(new Set(forecastRows.map((r) => r.distributor).filter(Boolean))).sort(),
    [forecastRows]
  );
  
  const uniqueBrands = useMemo(() => 
    Array.from(new Set(forecastRows.map((r) => r.brand).filter(Boolean))).sort(),
    [forecastRows]
  );
  
  const uniquePackageSizes = useMemo(() => 
    Array.from(new Set(forecastRows.map((r) => r.packageSize).filter(Boolean))).sort(),
    [forecastRows]
  );
  
  const uniquePlants = useMemo(() => 
    Array.from(new Set(forecastRows.map((r) => r.plantLocation).filter(Boolean))).sort(),
    [forecastRows]
  );

  const handleSearch = () => {
    let result = forecastRows;

    // Apply filters
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      result = result.filter(
        (row) =>
          row.sku.toLowerCase().includes(search) ||
          row.plantLocation.toLowerCase().includes(search) ||
          row.distributor.toLowerCase().includes(search) ||
          row.brand.toLowerCase().includes(search)
      );
    }

    if (selectedMonth !== "all") {
      result = result.filter((row) => row.forecastMonth === selectedMonth);
    }

    if (selectedDistributor !== "all") {
      result = result.filter((row) => row.distributor === selectedDistributor);
    }

    if (selectedBrand !== "all") {
      result = result.filter((row) => row.brand === selectedBrand);
    }

    if (selectedPackageSize !== "all") {
      result = result.filter((row) => row.packageSize === selectedPackageSize);
    }

    if (selectedPlant !== "all") {
      result = result.filter((row) => row.plantLocation === selectedPlant);
    }

    setFilteredData(result);
    setPage(1); // Reset to first page
  };

  const totalPredictedSellOut = filteredData.reduce(
    (sum, row) => sum + row.predictedSellOut,
    0
  );
  
  const months = Array.from(new Set(filteredData.map((r) => r.forecastMonth))).sort();
  const latestMonth = months[months.length - 1] || uniqueMonths[uniqueMonths.length - 1];
  const currentMonthForecast = filteredData
    .filter((row) => row.forecastMonth === latestMonth)
    .reduce((sum, row) => sum + row.predictedSellOut, 0);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const handleDownloadCSV = () => {
    const headers = ["SKU", "Brand", "Flavor", "Package Size", "Distributor", "Plant Location", "Forecast Month", "Predicted Sell-Out"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          row.sku,
          row.brand,
          row.flavor,
          row.packageSize,
          row.distributor,
          row.plantLocation,
          row.forecastMonth,
          row.predictedSellOut,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demand-forecast-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Filters */}
      <div className="glass p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Search & Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="SKU, Plant, etc."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Time Period */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Time Period
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Months</option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Distributor */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Distributor
            </label>
            <select
              value={selectedDistributor}
              onChange={(e) => setSelectedDistributor(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Distributors</option>
              {uniqueDistributors.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Brands</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Package Size */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Package Size
            </label>
            <select
              value={selectedPackageSize}
              onChange={(e) => setSelectedPackageSize(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Sizes</option>
              {uniquePackageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Plant Location */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Plant Location
            </label>
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Plants</option>
              {uniquePlants.map((plant) => (
                <option key={plant} value={plant}>
                  {plant}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <p className="text-sm text-gray-600">Current Month Forecast</p>
        <p className="text-2xl font-semibold text-gray-900">
          {Math.round(currentMonthForecast).toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold text-white">
            Forecast Data
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadCSV}
              className="flex items-center space-x-2 px-4 py-2 border border-white/30 text-white rounded-md hover:bg-red-700/60 transition-colors"
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
            <tbody className="divide-y divide-gray-200">
              {pagedData.map((row, index) => (
                <tr
                  key={`${row.sku}-${index}`}
                  className="transition-colors hover:bg-red-700 hover:text-white"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {row.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {row.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {row.flavor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {row.packageSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {row.distributor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {row.plantLocation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {row.forecastMonth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {Math.round(row.predictedSellOut).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>
            Page {page} of {totalPages} (showing {pagedData.length} of {filteredData.length})
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

      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <h4 className="text-md font-semibold text-red-900 mb-3">
          Impact Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-red-700">Total Predicted Sell-Out</p>
            <p className="text-lg font-semibold text-red-900">
              {Math.round(totalPredictedSellOut).toLocaleString()}
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
    </div>
  );
}

