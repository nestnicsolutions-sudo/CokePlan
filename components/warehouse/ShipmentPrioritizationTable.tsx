"use client";

import { useState } from "react";
import type { ShipmentPrioritizationRow } from "@/lib/types";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface ShipmentPrioritizationTableProps {
  shipments: ShipmentPrioritizationRow[];
  onRowClick: (shipment: ShipmentPrioritizationRow) => void;
}

type SortDirection = "asc" | "desc";

/**
 * Table displaying prioritized shipments
 */
export function ShipmentPrioritizationTable({
  shipments,
  onRowClick,
}: ShipmentPrioritizationTableProps) {
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSortToggle = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const sortedShipments = [...shipments].sort((a, b) => {
    return sortDirection === "desc"
      ? b.priorityScore - a.priorityScore
      : a.priorityScore - b.priorityScore;
  });

  const getDecisionBadgeClass = (decision: string) => {
    switch (decision) {
      case "LOAD_IMMEDIATELY":
        return "bg-red-100 text-red-800 border-red-300";
      case "LOAD_NEXT":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "KEEP_WAITING":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatDecision = (decision: string) => {
    return decision.replace(/_/g, " ");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Shipment Priority Table
      </h3>

      {sortedShipments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No shipments match the current filters.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Shipment ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Carrier
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Orders
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  LPNs
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Weight (kg)
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Delay (min)
                </th>
                <th
                  className="text-right py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={handleSortToggle}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Priority Score</span>
                    {sortDirection === "desc" ? (
                      <ArrowDown className="h-4 w-4" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Decision
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedShipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  onClick={() => onRowClick(shipment)}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {shipment.shipmentId}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {shipment.carrierName}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {shipment.numOrders}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {shipment.numOutboundLPNs}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {shipment.totalWeight.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    {Math.round(shipment.shipmentDelayMinutes)}
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span className="font-semibold text-red-600">
                      {(shipment.priorityScore * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-md border text-xs font-medium ${getDecisionBadgeClass(
                        shipment.decision
                      )}`}
                    >
                      {formatDecision(shipment.decision)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Showing {sortedShipments.length} shipment{sortedShipments.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

