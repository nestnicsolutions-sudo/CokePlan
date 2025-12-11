import { loadCsv } from "./csvLoader";
import type {
  PlantProductionRow,
  SkuProductionRow,
  WorkCentreRow,
  InventoryRow,
} from "@/lib/types";

const numberify = (v: any) => {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string"
      ? Number(v.replace(/,/g, ""))
      : 0;
  return Number.isFinite(n) ? n : 0;
};

type RowShape = Record<string, any>;

const toMonthKey = (val: string) => {
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const getMonthFromValue = (v: any): number | null => {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d.getMonth() + 1; // 1-12
};

const allowedPlants = new Set(["3002", "3003", "3004"]);

export function loadSupplyPlanned(monthFilter?: number): RowShape[] {
  const rows = loadCsv<RowShape>("orecasted Production demand.csv");
  if (!monthFilter) return rows;
  return rows.filter((r) => {
    const m = getMonthFromValue(r.Production_Date ?? r["Production date"] ?? r.Date);
    return m === monthFilter;
  });
}

export function loadSupplyActual(monthFilter?: number): RowShape[] {
  const rows = loadCsv<RowShape>("Actual-Production .csv");
  if (!monthFilter) return rows;
  return rows.filter((r) => {
    const m = getMonthFromValue(r["Production date"] ?? r.Date);
    return m === monthFilter;
  });
}

export function mapPlantProduction(
  plannedRows: RowShape[],
  actualRows: RowShape[]
): PlantProductionRow[] {
  const agg: Record<string, PlantProductionRow> = {};

  plannedRows.forEach((r) => {
    const plant = String(r.Plant ?? r.plant ?? "Unknown");
    if (!allowedPlants.has(plant)) return;
    const planned = numberify(r.Pr_Forecast_Demand ?? r["Production in PHCs"] ?? 0);
    agg[plant] ??= { plant, planned: 0, actual: 0, gap: 0 };
    agg[plant].planned += planned;
  });

  actualRows.forEach((r) => {
    const plant = String(r.Plant ?? r.plant ?? "Unknown");
    if (!allowedPlants.has(plant)) return;
    const actual = numberify(r["Production in PHCs"] ?? r.Actual ?? 0);
    agg[plant] ??= { plant, planned: 0, actual: 0, gap: 0 };
    agg[plant].actual += actual;
  });

  return Object.values(agg).map((row) => ({
    ...row,
    gap: row.actual - row.planned,
  }));
}

export function mapSkuProduction(
  plannedRows: RowShape[],
  actualRows: RowShape[]
): SkuProductionRow[] {
  const agg: Record<string, SkuProductionRow> = {};

  plannedRows.forEach((r) => {
    const sku = String(r.Material ?? r.material ?? "Unknown");
    const planned = numberify(r.Pr_Forecast_Demand ?? 0);
    agg[sku] ??= { sku, planned: 0, actual: 0, gap: 0, stockAfterProduction: 0 };
    agg[sku].planned += planned;
  });

  actualRows.forEach((r) => {
    const sku = String(r.Material ?? r.material ?? "Unknown");
    const actual = numberify(r["Production in PHCs"] ?? 0);
    agg[sku] ??= { sku, planned: 0, actual: 0, gap: 0, stockAfterProduction: 0 };
    agg[sku].actual += actual;
    agg[sku].stockAfterProduction += actual;
  });

  return Object.values(agg).map((row) => ({
    ...row,
    gap: row.actual - row.planned,
  }));
}

export function mapWorkCentreProduction(actualRows: RowShape[]): WorkCentreRow[] {
  return actualRows.slice(0, 50).map((r) => ({
    workCentre: String(r["Work center"] ?? r.WorkCenter ?? "WC"),
    status: "active",
    currentSku: String(r.Material ?? ""),
    planned: 0,
    actual: numberify(r["Production in PHCs"] ?? 0),
    gap: 0,
  }));
}

export function mapInventory(actualRows: RowShape[]): InventoryRow[] {
  // Simple heuristic: stockAvailable = last available production per SKU; safety = 80% of that.
  const agg: Record<string, InventoryRow> = {};
  actualRows.forEach((r) => {
    const sku = String(r.Material ?? "Unknown");
    const actual = numberify(r["Production in PHCs"] ?? 0);
    agg[sku] = {
      sku,
      stockAvailable: actual,
      safetyStock: Math.round(actual * 0.8),
      riskStatus:
        actual < actual * 0.8
          ? "shortage"
          : actual > actual * 1.2
          ? "overstock"
          : "normal",
    };
  });
  return Object.values(agg);
}

