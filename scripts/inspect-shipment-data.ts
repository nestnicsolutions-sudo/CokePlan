/**
 * Script to inspect shipment data Excel files
 * Run with: npx tsx scripts/inspect-shipment-data.ts
 */

import { inspectShipmentFiles } from "../lib/loaders/shipmentDataLoader";

console.log("🔍 Inspecting Shipment Load Optimization Excel files...\n");
inspectShipmentFiles();
console.log("\n✅ Inspection complete!");

