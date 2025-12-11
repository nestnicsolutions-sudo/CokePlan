import type { WarehouseMetrics, ShipmentStatusRow, CarrierPerformanceRow } from "./types";

export const mockWarehouseMetrics: WarehouseMetrics[] = [
  {
    warehouse: "LHR",
    totalWeightProcessed: 125000,
    totalShipments: 450,
    processingLoad: 450,
    vehicleAssignmentTime: 120,
    loadingProcessTime: 180,
    shippedShipments: 420,
    delayedShipments: 30,
    averageLoadingTime: 25,
  },
  {
    warehouse: "GUJ",
    totalWeightProcessed: 98000,
    totalShipments: 380,
    processingLoad: 380,
    vehicleAssignmentTime: 95,
    loadingProcessTime: 150,
    shippedShipments: 360,
    delayedShipments: 20,
    averageLoadingTime: 22,
  },
  {
    warehouse: "FSB",
    totalWeightProcessed: 87000,
    totalShipments: 320,
    processingLoad: 320,
    vehicleAssignmentTime: 85,
    loadingProcessTime: 140,
    shippedShipments: 300,
    delayedShipments: 20,
    averageLoadingTime: 28,
  },
];

export const mockShipmentStatus: ShipmentStatusRow[] = [
  {
    warehouse: "LHR",
    shipped: 420,
    delayed: 30,
    onTime: 420,
  },
  {
    warehouse: "GUJ",
    shipped: 360,
    delayed: 20,
    onTime: 360,
  },
  {
    warehouse: "FSB",
    shipped: 300,
    delayed: 20,
    onTime: 300,
  },
];

export const mockCarrierPerformance: CarrierPerformanceRow[] = [
  {
    carrier: "National Logistics Cell",
    shipmentVolume: 550,
    warehouse: "LHR",
  },
  {
    carrier: "National Logistics Cell",
    shipmentVolume: 320,
    warehouse: "GUJ",
  },
  {
    carrier: "SAMI Goods Transport",
    shipmentVolume: 280,
    warehouse: "FSB",
  },
  {
    carrier: "SAMI Goods Transport",
    shipmentVolume: 200,
    warehouse: "LHR",
  },
];

export const mockLoadingTimeData = [
  { day: "Day 1", lhr: 24, guj: 21, fsb: 27 },
  { day: "Day 2", lhr: 25, guj: 22, fsb: 28 },
  { day: "Day 3", lhr: 26, guj: 23, fsb: 29 },
  { day: "Day 4", lhr: 25, guj: 22, fsb: 28 },
  { day: "Day 5", lhr: 24, guj: 21, fsb: 27 },
  { day: "Day 6", lhr: 25, guj: 22, fsb: 28 },
  { day: "Day 7", lhr: 26, guj: 23, fsb: 29 },
];

