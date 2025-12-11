"use client";

import type { SkuProductionRow } from "@/lib/types";

export function SkuProduction({ skus }: { skus: SkuProductionRow[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        SKU-Wise Production
      </h3>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock After Production
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skus.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.sku}
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
                    {Math.abs(row.gap) > 500 && (
                      <span className="ml-2 text-xs">⚠️</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.stockAfterProduction.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

