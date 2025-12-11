"use client";

import type { InventoryRow } from "@/lib/types";

export function InventoryStatus({ inventory }: { inventory: InventoryRow[] }) {
  const getRiskBadge = (status: string) => {
    switch (status) {
      case "shortage":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            🔴 Shortage Risk
          </span>
        );
      case "normal":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
            ⚪ Normal
          </span>
        );
      case "overstock":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-black text-white">
            ⚫ Overstock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Inventory (Stock Position)</h3>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Safety Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.stockAvailable.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.safetyStock.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRiskBadge(row.riskStatus)}
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

