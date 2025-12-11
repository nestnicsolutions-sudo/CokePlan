/**
 * Script to inspect shipment data Excel files
 * Run with: node scripts/inspect-shipment-data.js
 */

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

function inspectFile(filename) {
  const filePath = path.join(process.cwd(), "public", "ShipLoadOpt", filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filename}`);
    return;
  }

  try {
    const buf = fs.readFileSync(filePath);
    const wb = XLSX.read(buf, { type: "buffer" });
    
    console.log(`\n📊 File: ${filename}`);
    console.log(`   Sheets: ${wb.SheetNames.join(", ")}`);
    
    // Inspect first sheet
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      console.log(`   Total rows: ${data.length}`);
      console.log(`   Columns (${columns.length}):`);
      columns.forEach((col, idx) => {
        console.log(`     ${idx + 1}. ${col}`);
      });
      
      // Show sample row
      console.log(`\n   Sample row (first 5 fields):`);
      const sample = data[0];
      Object.keys(sample).slice(0, 5).forEach(key => {
        console.log(`     ${key}: ${sample[key]}`);
      });
    } else {
      console.log(`   ⚠️  No data rows found`);
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
}

console.log("🔍 Inspecting Shipment Load Optimization Excel files...\n");

const files = [
  "Warehouse Shipment Time Optimization Data V6.xlsx",
  "Randomized Data File for SCA Backup File.xlsx",
  "Randomized Data File for SCA Backup File AII.xlsx",
];

files.forEach(inspectFile);

console.log("\n✅ Inspection complete!");

