import type {
  PlantProductionRow,
  WorkCentreRow,
  SkuProductionRow,
  InventoryRow,
} from "./types";

export const mockPlantProduction: PlantProductionRow[] = [
  {
    plant: "LHR",
    planned: 50000,
    actual: 48500,
    gap: -1500,
  },
  {
    plant: "GUJ",
    planned: 45000,
    actual: 47000,
    gap: 2000,
  },
  {
    plant: "FSB",
    planned: 40000,
    actual: 39500,
    gap: -500,
  },
];

export const mockWorkCentreProduction: WorkCentreRow[] = [
  {
    workCentre: "WC-001",
    status: "active",
    currentSku: "SKU-001",
    planned: 10000,
    actual: 9800,
    gap: -200,
  },
  {
    workCentre: "WC-002",
    status: "active",
    currentSku: "SKU-002",
    planned: 12000,
    actual: 12000,
    gap: 0,
  },
  {
    workCentre: "WC-003",
    status: "inactive",
    currentSku: undefined,
    planned: 8000,
    actual: 0,
    gap: -8000,
  },
  {
    workCentre: "WC-004",
    status: "active",
    currentSku: "SKU-003",
    planned: 15000,
    actual: 15200,
    gap: 200,
  },
];

export const mockSkuProduction: SkuProductionRow[] = [
  {
    sku: "SKU-001",
    planned: 15000,
    actual: 14800,
    gap: -200,
    stockAfterProduction: 45000,
  },
  {
    sku: "SKU-002",
    planned: 12000,
    actual: 12000,
    gap: 0,
    stockAfterProduction: 38000,
  },
  {
    sku: "SKU-003",
    planned: 18000,
    actual: 19000,
    gap: 1000,
    stockAfterProduction: 52000,
  },
  {
    sku: "SKU-004",
    planned: 14000,
    actual: 13500,
    gap: -500,
    stockAfterProduction: 28000,
  },
];

export const mockInventory: InventoryRow[] = [
  {
    sku: "SKU-001",
    stockAvailable: 45000,
    safetyStock: 50000,
    riskStatus: "shortage",
  },
  {
    sku: "SKU-002",
    stockAvailable: 38000,
    safetyStock: 35000,
    riskStatus: "normal",
  },
  {
    sku: "SKU-003",
    stockAvailable: 52000,
    safetyStock: 40000,
    riskStatus: "overstock",
  },
  {
    sku: "SKU-004",
    stockAvailable: 28000,
    safetyStock: 30000,
    riskStatus: "shortage",
  },
];

export const mockProductionOverall = {
  totalUnitsProduced: 135000,
  totalPlanned: 135000,
  productionGap: 0,
  lastYear: 128000,
};

export const mockProductionTrend = [
  { month: "Jul 25", planned: 18000, actual: 17500 },
  { month: "Aug 25", planned: 19000, actual: 18800 },
  { month: "Sep 25", planned: 20000, actual: 19800 },
  { month: "Oct 25", planned: 20500, actual: 20700 },
  { month: "Nov 25", planned: 21000, actual: 20900 },
  { month: "Dec 25", planned: 21500, actual: 21200 },
  { month: "Jan 26", planned: 22000, actual: 22100 },
];

