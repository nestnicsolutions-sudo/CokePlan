"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WarehouseOverview } from "@/components/warehouse/WarehouseOverview";
import { TimeAnalysis } from "@/components/warehouse/TimeAnalysis";
import { ShipmentStatus } from "@/components/warehouse/ShipmentStatus";
import { CarrierPerformance } from "@/components/warehouse/CarrierPerformance";
import { LoadingOptimization } from "@/components/warehouse/LoadingOptimization";
import { ShipmentLoadPrioritizationSection } from "@/components/warehouse/ShipmentLoadPrioritizationSection";
import type {
  RawShipmentRow,
  WarehouseMetrics,
  ShipmentStatusRow,
  CarrierPerformanceRow,
} from "@/lib/types";

type TabId = "overview" | "prioritization";

interface WarehouseOptimizationClientProps {
  shipments: RawShipmentRow[];
  metrics: WarehouseMetrics[];
  shipmentStatus: ShipmentStatusRow[];
  carriers: CarrierPerformanceRow[];
  loadingTrend: Array<Record<string, number | string>>;
}

export default function WarehouseOptimizationClient({
  shipments,
  metrics,
  shipmentStatus,
  carriers,
  loadingTrend,
}: WarehouseOptimizationClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const tabs = [
    { id: "overview" as TabId, label: "Warehouse Overview" },
    { id: "prioritization" as TabId, label: "Shipment Load Prioritization" },
  ];

  return (
    <DashboardLayout title="Warehouse Optimization">
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Warehouse Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <WarehouseOverview metrics={metrics} />
          <TimeAnalysis metrics={metrics} />
          <ShipmentStatus shipments={shipmentStatus} />
          <CarrierPerformance carriers={carriers} />
          <LoadingOptimization metrics={metrics} loadingTrend={loadingTrend} />
        </div>
      )}

      {activeTab === "prioritization" && (
        <ShipmentLoadPrioritizationSection shipments={shipments} />
      )}
    </DashboardLayout>
  );
}

