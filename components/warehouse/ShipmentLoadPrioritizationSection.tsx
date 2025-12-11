"use client";

import { useState, useMemo } from "react";
import {
  buildShipmentPrioritizationView,
  DEFAULT_WEIGHTS,
} from "@/lib/prioritization";
import type {
  RawShipmentRow,
  ShipmentPrioritizationRow,
  PrioritizationWeights,
  ShipmentDecision,
} from "@/lib/types";
import { ShipmentPrioritizationSummary } from "./ShipmentPrioritizationSummary";
import { ShipmentPrioritizationTable } from "./ShipmentPrioritizationTable";
import { ShipmentPrioritizationDetails } from "./ShipmentPrioritizationDetails";
import { ShipmentPrioritizationFlow } from "./ShipmentPrioritizationFlow";
import { ShipmentPrioritizationControls } from "./ShipmentPrioritizationControls";
import { ShipmentPrioritizationCharts } from "./ShipmentPrioritizationCharts";
import { Search } from "lucide-react";

interface ShipmentLoadPrioritizationSectionProps {
  shipments: RawShipmentRow[];
}

/**
 * Main component for Shipment Load Prioritization feature
 */
export function ShipmentLoadPrioritizationSection({
  shipments,
}: ShipmentLoadPrioritizationSectionProps) {
  const [weights, setWeights] = useState<PrioritizationWeights>(DEFAULT_WEIGHTS);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentPrioritizationRow | null>(null);
  const [decisionFilter, setDecisionFilter] = useState<ShipmentDecision | "ALL">("ALL");
  const [carrierFilter, setCarrierFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Compute prioritized shipments with current weights
  const prioritizedShipments = useMemo(() => {
    return buildShipmentPrioritizationView(shipments, weights);
  }, [shipments, weights]);

  // Apply filters
  const filteredShipments = useMemo(() => {
    return prioritizedShipments.filter((shipment) => {
      // Decision filter
      if (decisionFilter !== "ALL" && shipment.decision !== decisionFilter) {
        return false;
      }

      // Carrier filter
      if (carrierFilter !== "ALL" && shipment.carrierName !== carrierFilter) {
        return false;
      }

      // Search filter
      if (
        searchQuery &&
        !shipment.shipmentId.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [prioritizedShipments, decisionFilter, carrierFilter, searchQuery]);

  // Get unique carriers for filter dropdown
  const carriers = useMemo(() => {
    const uniqueCarriers = Array.from(
      new Set(shipments.map((s) => s.carrierName))
    );
    return uniqueCarriers.sort();
  }, [shipments]);

  const handleWeightChange = (newWeights: PrioritizationWeights) => {
    setWeights(newWeights);
  };

  const handleResetWeights = () => {
    setWeights(DEFAULT_WEIGHTS);
  };

  return (
    <div className="space-y-8">
      {/* Intro Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Outbound Shipment Load Prioritization
        </h2>
        <p className="text-gray-600">
          This model ranks outbound shipments by urgency and operational impact,
          helping planners decide which loads to process first based on delay, load
          size, and carrier risk.
        </p>
      </div>

      {/* KPI Summary */}
      <ShipmentPrioritizationSummary shipments={prioritizedShipments} />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Decision Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decision
            </label>
            <select
              value={decisionFilter}
              onChange={(e) => setDecisionFilter(e.target.value as ShipmentDecision | "ALL")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="ALL">All</option>
              <option value="LOAD_IMMEDIATELY">Load Immediately</option>
              <option value="LOAD_NEXT">Load Next</option>
              <option value="KEEP_WAITING">Keep Waiting</option>
            </select>
          </div>

          {/* Carrier Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carrier
            </label>
            <select
              value={carrierFilter}
              onChange={(e) => setCarrierFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="ALL">All</option>
              {carriers.map((carrier) => (
                <option key={carrier} value={carrier}>
                  {carrier}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Shipment ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SHP-20250101-001"
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Priority Table */}
      <ShipmentPrioritizationTable
        shipments={filteredShipments}
        onRowClick={setSelectedShipment}
      />

      {/* Charts */}
      <ShipmentPrioritizationCharts shipments={prioritizedShipments} />

      {/* Process Flow */}
      <ShipmentPrioritizationFlow />

      {/* Model Controls */}
      <ShipmentPrioritizationControls
        weights={weights}
        onWeightChange={handleWeightChange}
        onReset={handleResetWeights}
      />

      {/* Details Drawer */}
      {selectedShipment && (
        <ShipmentPrioritizationDetails
          shipment={selectedShipment}
          weights={weights}
          onClose={() => setSelectedShipment(null)}
        />
      )}
    </div>
  );
}

