import fs from "fs";
import path from "path";
import Papa from "papaparse";

const memo: Record<string, any[]> = {};

export function loadCsv<T = any>(filename: string): T[] {
  if (memo[filename]) return memo[filename] as T[];
  const filePath = path.join(process.cwd(), "public", "Csv", filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = Papa.parse<T>(raw, { header: true, skipEmptyLines: true });
  memo[filename] = data;
  return data as T[];
}

