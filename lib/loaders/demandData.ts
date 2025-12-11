import { loadXlsxSheet } from "./xlsxLoader";
import type { DemandForecastRow } from "@/lib/types";
import { getIdentifierByGeneric } from "./keyIdentifiers";

const numberify = (v: any) => {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string"
      ? Number(v.replace(/,/g, ""))
      : 0;
  return Number.isFinite(n) ? n : 0;
};

const excelSerialToMonth = (serial: any) => {
  const n = Number(serial);
  if (!Number.isFinite(n)) return "Unknown";
  const d = new Date(Date.UTC(1899, 11, 30 + Math.floor(n)));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
};

const inTargetWindow = (month: string) => month >= "2025-12" && month <= "2026-02";

type RowShape = Record<string, any>;

function mapForecastRows(rows: RowShape[]): DemandForecastRow[] {
  return rows
    .map((r) => {
      const month =
        r.Forecast_Month !== undefined
          ? excelSerialToMonth(r.Forecast_Month)
          : r.Month
          ? String(r.Month)
          : "Unknown";
      
      const sku = String(r.Article ?? r.SKU_Key ?? r.Material ?? "");
      const identifier = getIdentifierByGeneric(sku);
      
      return {
        sku,
        brand: identifier?.brand || "",
        flavor: identifier?.flavour || "",
        packageSize: identifier?.packageSize || "",
        distributor: String(r.Distributor ?? ""),
        plantLocation: String(r.Plant ?? r["Plant Name"] ?? ""),
        forecastMonth: month,
        predictedSellOut: Math.round(numberify(r.Predicted_Sell_Out ?? r.Pr_Forecast_Demand ?? r.Forecast ?? 0)),
      };
    })
    .filter(
      (r) =>
        r.predictedSellOut > 0 &&
        r.forecastMonth !== "Unknown" &&
        inTargetWindow(r.forecastMonth)
    );
}

function mapActualRows(rows: RowShape[]): DemandForecastRow[] {
  return rows
    .map((r) => {
      const year = Number(r.Year ?? r.YEAR ?? 0);
      const monthNum = Number(r["Month Of Year"] ?? r.Month ?? 0);
      const month =
        year && monthNum
          ? `${year}-${String(monthNum).padStart(2, "0")}`
          : "Unknown";
      return {
        sku: String(r["Generic Article Number"] ?? r.Article ?? r.Material ?? ""),
        brand: "",
        flavor: "",
        packageSize: "",
        distributor: String(r["Distributor Outlet Location Code"] ?? ""),
        plantLocation: String(r["Plant Name"] ?? r.Plant ?? ""),
        forecastMonth: month,
        predictedSellOut: numberify(r.Sell_Out ?? r.Actual ?? 0),
      };
    })
    .filter(
      (r) =>
        r.predictedSellOut > 0 &&
        r.forecastMonth !== "Unknown" &&
        inTargetWindow(r.forecastMonth)
    );
}

const takeRecentMonths = (rows: DemandForecastRow[], count = 6) => {
  const months = Array.from(new Set(rows.map((r) => r.forecastMonth))).sort();
  const recent = months.slice(-count);
  return rows.filter((r) => recent.includes(r.forecastMonth));
};

export function loadDemandForecast(): DemandForecastRow[] {
  const xlsxRows = loadXlsxSheet("Forecasted Sell out.xlsx", 0);
  return mapForecastRows(xlsxRows);
}

export function loadDemandActual(): DemandForecastRow[] {
  // Use sheet 'Sell Out 25' (index 1) which contains detailed actuals
  const xlsxRows = loadXlsxSheet("Sell out original.xlsx", 1);
  // Keep only recent years (>=2024) to reduce payload
  const filtered = xlsxRows.filter((r) => Number(r.Year ?? r.YEAR ?? 0) >= 2024);
  return mapActualRows(filtered);
}

