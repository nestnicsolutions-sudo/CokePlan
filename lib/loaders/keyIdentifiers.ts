import { loadXlsxSheet } from "./xlsxLoader";

export interface KeyIdentifier {
  generic: string;
  articleNumber: string;
  articleText: string;
  brand: string;
  flavour: string;
  packageSize: string;
  packageGroup: string;
}

let keyIdentifiersCache: Map<string, KeyIdentifier> | null = null;

export function loadKeyIdentifiers(): Map<string, KeyIdentifier> {
  if (keyIdentifiersCache) {
    return keyIdentifiersCache;
  }

  const rows = loadXlsxSheet("Key-Identifiers.xlsx", 0);
  const map = new Map<string, KeyIdentifier>();

  rows.forEach((row: any) => {
    const generic = String(row["Generic"] || row["Article Generic[Generic Article Number]"] || "").trim();
    if (!generic) return;

    const identifier: KeyIdentifier = {
      generic,
      articleNumber: String(row["Article[Article Number]"] || ""),
      articleText: String(row["Article[Article Text Eng]"] || ""),
      brand: String(row["Article Brand[Article Brand Desc Eng]"] || ""),
      flavour: String(row["Article Flavour[Article Flavour Desc Eng]"] || ""),
      packageSize: String(row["Article Package Size[Article Package Size Desc Tur]"] || ""),
      packageGroup: String(row["Article Package Group[Article Package Group Desc Tur]"] || ""),
    };

    // Store by generic number - use the first occurrence
    if (!map.has(generic)) {
      map.set(generic, identifier);
    }
  });

  keyIdentifiersCache = map;
  return map;
}

export function getIdentifierByGeneric(generic: string): KeyIdentifier | undefined {
  const map = loadKeyIdentifiers();
  return map.get(String(generic).trim());
}
