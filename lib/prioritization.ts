/**
 * Shipment Load Prioritization Logic
 * 
 * This module implements the scoring model for prioritizing outbound shipments
 * based on delay, order load, LPN count, weight, and carrier performance.
 */

import type {
  RawShipmentRow,
  ShipmentPrioritizationRow,
  ShipmentDecision,
  PrioritizationWeights,
} from "@/lib/types";

/**
 * Default weights for the priority score calculation
 */
export const DEFAULT_WEIGHTS: PrioritizationWeights = {
  delayFactorWeight: 0.30,
  orderLoadWeight: 0.25,
  lpnLoadWeight: 0.20,
  weightLoadWeight: 0.15,
  carrierRiskWeight: 0.10,
};

/**
 * Calculate the shipment delay in minutes
 */
function calculateShipmentDelay(row: RawShipmentRow, referenceTime: Date): number {
  const firstLoadTime = new Date(row.firstLoadAssignmentTimestamp);
  const delayMs = referenceTime.getTime() - firstLoadTime.getTime();
  return Math.max(0, delayMs / (1000 * 60)); // convert to minutes
}

/**
 * Normalize a value based on the maximum value in the dataset
 * Returns a value between 0 and 1
 */
function normalize(value: number, max: number): number {
  if (max === 0) return 0;
  return Math.min(1, Math.max(0, value / max));
}

/**
 * Calculate carrier risk from performance score
 * Higher performance score = lower risk
 */
function calculateCarrierRisk(carrierPerformanceScore: number): number {
  return 1 - (carrierPerformanceScore / 100);
}

/**
 * Calculate priority score based on normalized factors and weights
 */
export function computePriorityScore(
  delayFactor: number,
  orderLoad: number,
  lpnLoad: number,
  weightLoad: number,
  carrierRisk: number,
  weights: PrioritizationWeights
): number {
  const score =
    weights.delayFactorWeight * delayFactor +
    weights.orderLoadWeight * orderLoad +
    weights.lpnLoadWeight * lpnLoad +
    weights.weightLoadWeight * weightLoad +
    weights.carrierRiskWeight * carrierRisk;

  return Math.min(1, Math.max(0, score)); // clamp between 0–1
}

/**
 * Determine the shipment decision based on priority score
 */
export function getShipmentDecision(priorityScore: number): ShipmentDecision {
  if (priorityScore >= 0.75) return "LOAD_IMMEDIATELY";
  if (priorityScore >= 0.5) return "LOAD_NEXT";
  return "KEEP_WAITING";
}

/**
 * Main pipeline: transform raw shipment data into prioritized shipments
 * 
 * @param rawRows - Raw shipment data from WMS or CSV
 * @param weights - Weights for priority score calculation
 * @param referenceTime - Reference time for delay calculation (defaults to now)
 * @returns Sorted array of shipments with priority scores and decisions
 */
export function buildShipmentPrioritizationView(
  rawRows: RawShipmentRow[],
  weights: PrioritizationWeights = DEFAULT_WEIGHTS,
  referenceTime: Date = new Date()
): ShipmentPrioritizationRow[] {
  // Step 1: Calculate delays and find maximum values
  const delays = rawRows.map((row) => calculateShipmentDelay(row, referenceTime));
  const maxDelay = Math.max(...delays, 1); // prevent division by zero
  const maxOrders = Math.max(...rawRows.map((r) => r.numOrders), 1);
  const maxLPNs = Math.max(...rawRows.map((r) => r.numOutboundLPNs), 1);
  const maxWeight = Math.max(...rawRows.map((r) => r.totalWeight), 1);

  // Step 2: Normalize and compute priority scores
  const prioritizedRows: ShipmentPrioritizationRow[] = rawRows.map((row, index) => {
    const shipmentDelayMinutes = delays[index];
    const delayFactor = normalize(shipmentDelayMinutes, maxDelay);
    const orderLoad = normalize(row.numOrders, maxOrders);
    const lpnLoad = normalize(row.numOutboundLPNs, maxLPNs);
    const weightLoad = normalize(row.totalWeight, maxWeight);
    const carrierRisk = calculateCarrierRisk(row.carrierPerformanceScore);

    const priorityScore = computePriorityScore(
      delayFactor,
      orderLoad,
      lpnLoad,
      weightLoad,
      carrierRisk,
      weights
    );

    const decision = getShipmentDecision(priorityScore);

    return {
      ...row,
      shipmentDelayMinutes,
      delayFactor,
      orderLoad,
      lpnLoad,
      weightLoad,
      carrierRisk,
      priorityScore,
      decision,
    };
  });

  // Step 3: Sort by priority score descending (highest priority first)
  return prioritizedRows.sort((a, b) => b.priorityScore - a.priorityScore);
}

/**
 * Get summary statistics for prioritized shipments
 */
export function getPrioritizationSummary(rows: ShipmentPrioritizationRow[]) {
  const totalShipments = rows.length;
  const avgPriorityScore = totalShipments > 0
    ? rows.reduce((sum, row) => sum + row.priorityScore, 0) / totalShipments
    : 0;

  const loadImmediately = rows.filter((r) => r.decision === "LOAD_IMMEDIATELY").length;
  const loadNext = rows.filter((r) => r.decision === "LOAD_NEXT").length;
  const keepWaiting = rows.filter((r) => r.decision === "KEEP_WAITING").length;

  return {
    totalShipments,
    avgPriorityScore,
    loadImmediately,
    loadNext,
    keepWaiting,
  };
}

/**
 * Calculate the contribution of each factor to the priority score
 */
export function getScoreBreakdown(
  row: ShipmentPrioritizationRow,
  weights: PrioritizationWeights
) {
  return {
    delayContribution: weights.delayFactorWeight * row.delayFactor,
    orderContribution: weights.orderLoadWeight * row.orderLoad,
    lpnContribution: weights.lpnLoadWeight * row.lpnLoad,
    weightContribution: weights.weightLoadWeight * row.weightLoad,
    carrierContribution: weights.carrierRiskWeight * row.carrierRisk,
  };
}

