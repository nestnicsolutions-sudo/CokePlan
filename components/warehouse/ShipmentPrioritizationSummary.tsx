"use client";

import type { ShipmentPrioritizationRow } from "@/lib/types";
import { getPrioritizationSummary } from "@/lib/prioritization";
import { KpiCard } from "@/components/common/KpiCard";
import { Package, TrendingUp, AlertTriangle, Clock } from "lucide-react";

interface ShipmentPrioritizationSummaryProps {
  shipments: ShipmentPrioritizationRow[];
}

/**
 * Summary KPIs for shipment prioritization
 */
export function ShipmentPrioritizationSummary({
  shipments,
}: ShipmentPrioritizationSummaryProps) {
  const summary = getPrioritizationSummary(shipments);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-red-600 rounded-lg shadow-sm border border-red-700 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">Total Shipments Today</h3>
          <Package className="h-5 w-5 opacity-75" />
        </div>
        <p className="text-3xl font-bold">{summary.totalShipments}</p>
        <p className="text-xs opacity-75 mt-2">In prioritization queue</p>
      </div>

      <div className="bg-red-600 rounded-lg shadow-sm border border-red-700 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">Avg Priority Score</h3>
          <TrendingUp className="h-5 w-5 opacity-75" />
        </div>
        <p className="text-3xl font-bold">
          {(summary.avgPriorityScore * 100).toFixed(0)}%
        </p>
        <p className="text-xs opacity-75 mt-2">Based on current model weights</p>
      </div>

      <div className="bg-red-600 rounded-lg shadow-sm border border-red-700 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">Load Immediately</h3>
          <AlertTriangle className="h-5 w-5 opacity-75" />
        </div>
        <p className="text-3xl font-bold">{summary.loadImmediately}</p>
        <p className="text-xs opacity-75 mt-2">
          {summary.totalShipments > 0
            ? `${((summary.loadImmediately / summary.totalShipments) * 100).toFixed(0)}%`
            : "0%"}{" "}
          of total
        </p>
      </div>

      <div className="bg-red-600 rounded-lg shadow-sm border border-red-700 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">Shipments Waiting</h3>
          <Clock className="h-5 w-5 opacity-75" />
        </div>
        <p className="text-3xl font-bold">{summary.keepWaiting}</p>
        <p className="text-xs opacity-75 mt-2">
          {summary.totalShipments > 0
            ? `${((summary.keepWaiting / summary.totalShipments) * 100).toFixed(0)}%`
            : "0%"}{" "}
          can wait
        </p>
      </div>
    </div>
  );
}

