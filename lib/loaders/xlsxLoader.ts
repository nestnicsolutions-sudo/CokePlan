import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

const memo: Record<string, any[]> = {};

export function loadXlsxSheet(filename: string, sheetIndex = 0) {
  const key = `${filename}::${sheetIndex}`;
  if (memo[key]) return memo[key];
  const filePath = path.join(process.cwd(), "public", "Csv", filename);
  const buf = fs.readFileSync(filePath);
  const wb = XLSX.read(buf, { type: "buffer" });
  const sheet = wb.Sheets[wb.SheetNames[sheetIndex]];
  const json = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as any[];
  memo[key] = json;
  return json;
}

