import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import type {
  WarehouseMetrics,
  ShipmentStatusRow,
  CarrierPerformanceRow,
} from "@/lib/types";

const cache = new Map<string, any[]>();

type RawRow = Record<string, any>;

const numberify = (v: any) => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = parseFloat(v.replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const toDateOnly = (value: any): string | null => {
  if (!value) return null;
  if (typeof value === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const d = new Date(excelEpoch.getTime() + value * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
};

function loadWarehouseSheet(): RawRow[] {
  const cacheKey = "warehouse-shipments";
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  const filePath = path.join(
    process.cwd(),
    "public",
    "ShipLoadOpt",
    "Warehouse Shipment Time Optimization Data V6.xlsx"
  );
  const wb = XLSX.read(fs.readFileSync(filePath));
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: "" }) as RawRow[];
  cache.set(cacheKey, rows);
  return rows;
}

export function loadWarehouseMetrics(): WarehouseMetrics[] {
  const rows = loadWarehouseSheet();
  const agg: Record<string, WarehouseMetrics & { vehicleCount: number; loadingCount: number }> = {};

  rows.forEach((r) => {
    const warehouse = String(r.Warehouse ?? r.Facility ?? "Unknown").trim();
    if (!warehouse) return;
    const totalWeight = numberify(r["Total Weight"]);
    const vaTime = numberify(r["Time Spent on Vehicle Assignment"]);
    const lpTime = numberify(r["Time Spent on Loading Process"]);
    const status = String(r.Status ?? "").toLowerCase();

    agg[warehouse] ??= {
      warehouse,
      totalWeightProcessed: 0,
      totalShipments: 0,
      processingLoad: 0,
      vehicleAssignmentTime: 0,
      loadingProcessTime: 0,
      shippedShipments: 0,
      delayedShipments: 0,
      averageLoadingTime: 0,
      vehicleCount: 0,
      loadingCount: 0,
    };

    const entry = agg[warehouse];
    entry.totalWeightProcessed += totalWeight;
    entry.totalShipments += 1;
    entry.vehicleAssignmentTime += vaTime;
    entry.vehicleCount += vaTime ? 1 : 0;
    entry.loadingProcessTime += lpTime;
    entry.loadingCount += lpTime ? 1 : 0;
    if (status === "shipped") entry.shippedShipments += 1;
    else entry.delayedShipments += 1;
  });

  return Object.values(agg).map((w) => ({
    warehouse: w.warehouse,
    totalWeightProcessed: w.totalWeightProcessed,
    totalShipments: w.totalShipments,
    processingLoad: w.processingLoad,
    vehicleAssignmentTime:
      w.vehicleCount > 0 ? Math.round(w.vehicleAssignmentTime / w.vehicleCount) : 0,
    loadingProcessTime:
      w.loadingCount > 0 ? Math.round(w.loadingProcessTime / w.loadingCount) : 0,
    shippedShipments: w.shippedShipments,
    delayedShipments: w.delayedShipments,
    averageLoadingTime:
      w.loadingCount > 0 ? Math.round(w.loadingProcessTime / w.loadingCount) : 0,
  }));
}

export function loadShipmentStatus(): ShipmentStatusRow[] {
  const metrics = loadWarehouseMetrics();
  return metrics.map((m) => ({
    warehouse: m.warehouse,
    shipped: m.shippedShipments,
    delayed: m.delayedShipments,
    onTime: 0,
  }));
}

export function loadCarrierPerformance(): CarrierPerformanceRow[] {
  const rows = loadWarehouseSheet();
  const list: CarrierPerformanceRow[] = [];
  rows.forEach((r) => {
    const carrier = String(r.Carrier ?? "").trim();
    if (!carrier) return;
    const warehouse = String(r.Warehouse ?? r.Facility ?? "").trim();
    list.push({ carrier, shipmentVolume: 1, warehouse: warehouse || undefined });
  });
  return list;
}

export function loadLoadingTimeTrend(): Array<Record<string, number | string>> {
  const rows = loadWarehouseSheet();
  const agg: Record<string, Record<string, { sum: number; count: number }>> = {};

  rows.forEach((r) => {
    const day = toDateOnly(r["Create Timestamp"]) || toDateOnly(r["First load Assignment"]);
    if (!day) return;
    const warehouse = String(r.Warehouse ?? r.Facility ?? "").trim() || "UNK";
    const lp = numberify(r["Time Spent on Loading Process"]);
    if (!agg[day]) agg[day] = {};
    if (!agg[day][warehouse]) agg[day][warehouse] = { sum: 0, count: 0 };
    agg[day][warehouse].sum += lp;
    agg[day][warehouse].count += lp ? 1 : 0;
  });

  const days = Object.keys(agg).sort().slice(-14); // last 14 days
  return days.map((day) => {
    const entry = agg[day];
    const warehouses = Object.keys(entry);
    const result: Record<string, any> = { day };
    warehouses.forEach((w) => {
      const { sum, count } = entry[w];
      result[w.toLowerCase()] = count ? Math.round(sum / count) : 0;
    });
    return result;
  });
}

