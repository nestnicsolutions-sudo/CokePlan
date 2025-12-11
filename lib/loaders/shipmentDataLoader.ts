/**
 * Loader for Shipment Load Optimization data from Excel files
 * 
 * TODO: Replace mock data with actual data from ShipLoadOpt folder
 */

import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import type { RawShipmentRow } from "@/lib/types";

const cache = new Map<string, any[]>();

/**
 * Load an Excel sheet from the ShipLoadOpt folder
 */
export function loadShipmentXlsxSheet(
  filename: string,
  sheetIndex: number = 0
): any[] {
  const cacheKey = `${filename}-${sheetIndex}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const filePath = path.join(process.cwd(), "public", "ShipLoadOpt", filename);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return [];
  }

  const buf = fs.readFileSync(filePath);
  const wb = XLSX.read(buf, { type: "buffer" });
  
  const ws = wb.Sheets[wb.SheetNames[sheetIndex]];
  const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

  cache.set(cacheKey, data);
  return data;
}

/**
 * Inspect the structure of shipment data files
 */
export function inspectShipmentFiles() {
  const files = [
    "Warehouse Shipment Time Optimization Data V6.xlsx",
    "Randomized Data File for SCA Backup File.xlsx",
    "Randomized Data File for SCA Backup File AII.xlsx",
  ];

  files.forEach((filename) => {
    try {
      const data = loadShipmentXlsxSheet(filename, 0);
      if (data.length > 0) {
        console.log(`\n✅ ${filename}:`);
        console.log(`   Sample row keys:`, Object.keys(data[0]));
        if (data.length > 0) {
          console.log(`   Sample row:`, JSON.stringify(data[0], null, 2));
        }
      }
    } catch (error) {
      console.error(`❌ Error loading ${filename}:`, error);
    }
  });
}

/**
 * Helper to convert various date formats to ISO string
 */
function parseDate(value: any): string {
  if (!value) return new Date().toISOString();
  
  if (value instanceof Date) {
    return value.toISOString();
  }
  
  if (typeof value === "number") {
    // Excel serial date
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    return new Date(excelEpoch.getTime() + value * 24 * 60 * 60 * 1000).toISOString();
  }
  
  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }
  
  return new Date().toISOString();
}

/**
 * Helper to safely convert to number
 */
function numberify(value: any): number {
  if (typeof value === "number" && !isNaN(value)) {
    return value;
  }
  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

/**
 * Map raw Excel data to RawShipmentRow format
 * Based on actual column structure from "Warehouse Shipment Time Optimization Data V6.xlsx"
 */
export function mapToRawShipmentRow(row: any, index: number): RawShipmentRow | null {
  // Map based on actual column names from the Excel file
  const shipmentId =
    row["Shipment Nbr"] ||
    row["Shipment ID"] ||
    row["SHIPMENT_ID"] ||
    row["Shipment_ID"] ||
    row["ShipmentID"] ||
    `SHP-${Date.now()}-${index}`;

  const numOrders = numberify(
    row["Num orders"] ||
    row["Num Orders"] ||
    row["NUM_ORDERS"] ||
    row["Number of Orders"] ||
    0
  );

  const numOutboundLPNs = numberify(
    row["Num ob LPNs"] ||
    row["Num Outbound LPNs"] ||
    row["NUM_OUTBOUND_LPNS"] ||
    row["Outbound LPNs"] ||
    0
  );

  const totalWeight = numberify(
    row["Total Weight"] ||
    row["TOTAL_WEIGHT"] ||
    row["Weight"] ||
    0
  );

  const createTimestamp = parseDate(
    row["Create Timestamp"] ||
    row["CREATE_TS"] ||
    row["Created Date"]
  );

  const firstLoadAssignmentTimestamp = parseDate(
    row["First load Assignment"] ||
    row["First Load Assignment"] ||
    row["First Load Assignment Timestamp"] ||
    row["FIRST_LOAD_ASSIGNMENT_TS"]
  );

  const timeSpentVehicleAssignment = numberify(
    row["Time Spent on Vehicle Assignment"] ||
    row["Time Spent Vehicle Assignment"] ||
    row["TIME_VEHICLE_ASSIGNMENT"] ||
    0
  );

  const timeSpentLoadingProcess = numberify(
    row["Time Spent on Loading Process"] ||
    row["Time Spent Loading Process"] ||
    row["TIME_LOADING_PROCESS"] ||
    0
  );

  const carrierName =
    row["Carrier"] ||
    row["Carrier Name"] ||
    row["CARRIER_NAME"] ||
    "Unknown Carrier";

  // Carrier Performance Score is not in the Excel file
  // We'll calculate a mock score based on carrier name or use a default
  // TODO: Add carrier performance data from another source or calculate from historical data
  const carrierPerformanceScore = numberify(
    row["Carrier Performance Score"] ||
    row["CARRIER_PERFORMANCE"] ||
    row["Carrier_Score"] ||
    75 // Default to 75 (moderate performance) if not found
  );

  // Skip rows with missing critical data
  if (!shipmentId || numOrders === 0) {
    return null;
  }

  return {
    id: `shipment-${index}`,
    shipmentId: String(shipmentId),
    numOrders,
    numOutboundLPNs,
    totalWeight,
    createTimestamp,
    firstLoadAssignmentTimestamp,
    timeSpentVehicleAssignment,
    timeSpentLoadingProcess,
    carrierName: String(carrierName),
    carrierPerformanceScore: Math.min(100, Math.max(0, carrierPerformanceScore)),
  };
}

/**
 * Load actual shipment data from Excel files
 * @param limit - Maximum number of shipments to load (default: 1000 for performance)
 */
export function loadActualShipmentData(limit: number = 1000): RawShipmentRow[] {
  try {
    // Try loading from the Warehouse Shipment Time Optimization file first
    const data = loadShipmentXlsxSheet(
      "Warehouse Shipment Time Optimization Data V6.xlsx",
      0
    );

    if (data.length === 0) {
      console.warn("No data found in Warehouse Shipment Time Optimization Data V6.xlsx");
      return [];
    }

    // Limit the data to avoid performance issues with very large datasets
    const limitedData = data.slice(0, limit);

    // Map rows to RawShipmentRow format
    const mapped = limitedData
      .map((row, index) => mapToRawShipmentRow(row, index))
      .filter((row): row is RawShipmentRow => row !== null);

    console.log(`✅ Loaded ${mapped.length} shipments from Excel file (${data.length} total rows available)`);
    return mapped;
  } catch (error) {
    console.error("Error loading actual shipment data:", error);
    return [];
  }
}

