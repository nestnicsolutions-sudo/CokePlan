"use client";

import type { WorkCentreRow } from "@/lib/types";

export function WorkCentreProduction({ centres }: { centres: WorkCentreRow[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Work Centre-Wise Production
      </h3>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Centre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Produced (Yesterday)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {centres.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.workCentre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === "active"
                          ? "bg-red-100 text-red-700"
                          : "bg-black text-white"
                      }`}
                    >
                      {row.status === "active" ? "🔴 Active" : "⚫ Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.currentSku || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.actual.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {centres
          .filter((row) => row.status === "active")
          .map((row) => (
            <div
              key={row.workCentre}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {row.workCentre}
                </span>
                <span className="text-xs text-red-700">🔴 Active</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">Current SKU:</p>
              <p className="text-sm font-semibold text-gray-900">
                {row.currentSku || "N/A"}
              </p>
              <p className="text-xs text-gray-500 mt-2">Units Produced:</p>
              <p className="text-lg font-semibold text-gray-900">
                {row.actual.toLocaleString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

