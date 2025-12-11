"use client";

import type {
  ShipmentPrioritizationRow,
  PrioritizationWeights,
} from "@/lib/types";
import { getScoreBreakdown } from "@/lib/prioritization";
import { X } from "lucide-react";
import { format } from "date-fns";

interface ShipmentPrioritizationDetailsProps {
  shipment: ShipmentPrioritizationRow;
  weights: PrioritizationWeights;
  onClose: () => void;
}

/**
 * Details drawer/modal for a selected shipment
 */
export function ShipmentPrioritizationDetails({
  shipment,
  weights,
  onClose,
}: ShipmentPrioritizationDetailsProps) {
  const breakdown = getScoreBreakdown(shipment, weights);

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

  const getDecisionExplanation = (decision: string, score: number) => {
    if (decision === "LOAD_IMMEDIATELY") {
      return "This shipment is classified as Load Immediately due to a high delay factor and high order/LPN load compared to other shipments. It should be prioritized for immediate loading.";
    } else if (decision === "LOAD_NEXT") {
      return "This shipment should be loaded next. It has moderate priority based on balanced delay and load factors. Queue it after immediate priority shipments.";
    } else {
      return "This shipment can keep waiting. It has low priority based on current delay and load factors. Process higher-priority shipments first.";
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Shipment Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Shipment ID</p>
                  <p className="font-medium text-gray-900">{shipment.shipmentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Carrier</p>
                  <p className="font-medium text-gray-900">{shipment.carrierName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Create Timestamp</p>
                  <p className="font-medium text-gray-900">
                    {format(new Date(shipment.createTimestamp), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">First Load Assignment</p>
                  <p className="font-medium text-gray-900">
                    {format(
                      new Date(shipment.firstLoadAssignmentTimestamp),
                      "MMM dd, yyyy HH:mm"
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Vehicle Assignment Time</p>
                  <p className="font-medium text-gray-900">
                    {shipment.timeSpentVehicleAssignment} min
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loading Process Time</p>
                  <p className="font-medium text-gray-900">
                    {shipment.timeSpentLoadingProcess} min
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="font-medium text-gray-900">{shipment.numOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">LPNs</p>
                  <p className="font-medium text-gray-900">{shipment.numOutboundLPNs}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="font-medium text-gray-900">
                    {shipment.totalWeight.toLocaleString()} kg
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Normalized Factors & Priority Breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Normalized Factors & Priority Breakdown
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 text-sm font-semibold text-gray-700">
                      Factor
                    </th>
                    <th className="text-right py-2 text-sm font-semibold text-gray-700">
                      Normalized Value
                    </th>
                    <th className="text-right py-2 text-sm font-semibold text-gray-700">
                      Weight
                    </th>
                    <th className="text-right py-2 text-sm font-semibold text-gray-700">
                      Contribution
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2 text-sm text-gray-900">Delay Factor</td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(shipment.delayFactor * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(weights.delayFactorWeight * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm font-medium text-red-600 text-right">
                      {(breakdown.delayContribution * 100).toFixed(0)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-900">Order Load</td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(shipment.orderLoad * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(weights.orderLoadWeight * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm font-medium text-red-600 text-right">
                      {(breakdown.orderContribution * 100).toFixed(0)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-900">LPN Load</td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(shipment.lpnLoad * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(weights.lpnLoadWeight * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm font-medium text-red-600 text-right">
                      {(breakdown.lpnContribution * 100).toFixed(0)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-900">Weight Load</td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(shipment.weightLoad * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(weights.weightLoadWeight * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm font-medium text-red-600 text-right">
                      {(breakdown.weightContribution * 100).toFixed(0)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-900">Carrier Risk</td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(shipment.carrierRisk * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm text-gray-600 text-right">
                      {(weights.carrierRiskWeight * 100).toFixed(0)}%
                    </td>
                    <td className="py-2 text-sm font-medium text-red-600 text-right">
                      {(breakdown.carrierContribution * 100).toFixed(0)}%
                    </td>
                  </tr>
                  <tr className="border-t-2 border-gray-400 font-semibold">
                    <td className="py-2 text-sm text-gray-900" colSpan={3}>
                      Priority Score
                    </td>
                    <td className="py-2 text-sm text-red-600 text-right">
                      {(shipment.priorityScore * 100).toFixed(0)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Decision & Explanation */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Decision & Explanation
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-3">
                <span
                  className={`inline-block px-3 py-1 rounded-md border text-sm font-medium ${getDecisionBadgeClass(
                    shipment.decision
                  )}`}
                >
                  {formatDecision(shipment.decision)}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {getDecisionExplanation(shipment.decision, shipment.priorityScore)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

