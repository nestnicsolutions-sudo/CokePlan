/**
 * Type definitions for Supply Chain Planning Dashboard
 */

// Demand Planning Types
export interface DemandForecastRow {
  sku: string;
  brand: string;
  flavor: string;
  packageSize: string;
  distributor: string;
  plantLocation: string;
  forecastMonth: string;
  predictedSellOut: number;
}

export interface DemandTrendPoint {
  month: string;
  predictedSellOut: number;
  plant?: string;
  brand?: string;
  sku?: string;
}

export interface DemandAlert {
  id: string;
  severity: "high" | "medium" | "low";
  message: string;
  tags: string[];
  timestamp: string;
  sku?: string;
  plant?: string;
  distributor?: string;
}

export interface ForecastAdjustment {
  id: string;
  date: string;
  user: string;
  sku: string;
  oldValue: number;
  newValue: number;
  reason: string;
}

// Supply Planning Types
export interface ProductionRow {
  plant?: string;
  workCentre?: string;
  sku?: string;
  planned: number;
  actual: number;
  gap: number;
}

export interface PlantProductionRow extends ProductionRow {
  plant: string;
}

export interface WorkCentreRow extends ProductionRow {
  workCentre: string;
  status: "active" | "inactive";
  currentSku?: string;
}

export interface SkuProductionRow extends ProductionRow {
  sku: string;
  stockAfterProduction: number;
}

export interface InventoryRow {
  sku: string;
  stockAvailable: number;
  safetyStock: number;
  riskStatus: "shortage" | "normal" | "overstock";
}

// Warehouse Types
export interface WarehouseMetrics {
  warehouse: string;
  totalWeightProcessed: number;
  totalShipments: number;
  processingLoad: number;
  vehicleAssignmentTime: number;
  loadingProcessTime: number;
  shippedShipments: number;
  delayedShipments: number;
  averageLoadingTime: number;
}

export interface ShipmentStatusRow {
  warehouse: string;
  shipped: number;
  delayed: number;
  onTime: number;
}

export interface CarrierPerformanceRow {
  carrier: string;
  shipmentVolume: number;
  warehouse?: string;
}

// Shipment Load Prioritization Types
export interface RawShipmentRow {
  id: string;
  shipmentId: string;
  numOrders: number;
  numOutboundLPNs: number;
  totalWeight: number; // in kg
  createTimestamp: string; // ISO 8601
  firstLoadAssignmentTimestamp: string; // ISO 8601
  timeSpentVehicleAssignment: number; // in minutes
  timeSpentLoadingProcess: number; // in minutes
  carrierName: string;
  carrierPerformanceScore: number; // 0–100, higher = better
}

export type ShipmentDecision =
  | "LOAD_IMMEDIATELY"
  | "LOAD_NEXT"
  | "KEEP_WAITING";

export interface ShipmentPrioritizationRow extends RawShipmentRow {
  shipmentDelayMinutes: number;
  delayFactor: number;   // 0–1
  orderLoad: number;     // 0–1
  lpnLoad: number;       // 0–1
  weightLoad: number;    // 0–1
  carrierRisk: number;   // 0–1
  priorityScore: number; // 0–1
  decision: ShipmentDecision;
}

export interface PrioritizationWeights {
  delayFactorWeight: number;  // default 0.30
  orderLoadWeight: number;    // default 0.25
  lpnLoadWeight: number;      // default 0.20
  weightLoadWeight: number;   // default 0.15
  carrierRiskWeight: number;  // default 0.10
}

// Financial Types
export interface FinancialRow {
  pack: string;
  totalUC: number;
  gsr: number;
  nsr: number;
  com: number;
  moh: number;
  cogs: number;
  gp: number;
  gsrPercentNsr: number;
  gpPercentNsr: number;
}

export interface FinancialSummary {
  totalGSR: number;
  totalNSR: number;
  totalCOM: number;
  totalMOH: number;
  totalCOGs: number;
  totalGP: number;
  overallGPPercentNSR: number;
}

export interface FinancialTrendPoint {
  period: string;
  gsr: number;
  nsr: number;
  com: number;
  cogs: number;
  gp: number;
}

// Common Types
export interface KpiCard {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
}

export interface FilterOption {
  label: string;
  value: string;
}

