"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { FilterOption } from "@/lib/types";

interface FiltersBarProps {
  onFiltersChange?: (filters: Record<string, string>) => void;
}

const mockTimePeriods: FilterOption[] = [
  { label: "January 2025", value: "2025-01" },
  { label: "February 2025", value: "2025-02" },
  { label: "Q1 2025", value: "2025-Q1" },
];

const mockDistributors: FilterOption[] = [
  { label: "All Distributors", value: "all" },
  { label: "Dist-A", value: "Dist-A" },
  { label: "Dist-B", value: "Dist-B" },
  { label: "Dist-C", value: "Dist-C" },
];

const mockBrands: FilterOption[] = [
  { label: "All Brands", value: "all" },
  { label: "Coca-Cola", value: "Coca-Cola" },
  { label: "Sprite", value: "Sprite" },
  { label: "Fanta", value: "Fanta" },
];

const mockPackageSizes: FilterOption[] = [
  { label: "All Sizes", value: "all" },
  { label: "250 ML", value: "250 ML" },
  { label: "500 ML", value: "500 ML" },
  { label: "1000 ML", value: "1000 ML" },
];

const mockPlants: FilterOption[] = [
  { label: "All Plants", value: "all" },
  { label: "LHR", value: "LHR" },
  { label: "GUJ", value: "GUJ" },
  { label: "FSB", value: "FSB" },
];

export function FiltersBar({ onFiltersChange }: FiltersBarProps) {
  const [filters, setFilters] = useState({
    timePeriod: "2025-01",
    distributor: "all",
    brand: "all",
    packageSize: "all",
    plant: "all",
    search: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="SKU, Plant, etc."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select
            value={filters.timePeriod}
            onChange={(e) => handleFilterChange("timePeriod", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {mockTimePeriods.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Distributor
          </label>
          <select
            value={filters.distributor}
            onChange={(e) => handleFilterChange("distributor", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {mockDistributors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {mockBrands.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Size
          </label>
          <select
            value={filters.packageSize}
            onChange={(e) => handleFilterChange("packageSize", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {mockPackageSizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plant Location
          </label>
          <select
            value={filters.plant}
            onChange={(e) => handleFilterChange("plant", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {mockPlants.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

