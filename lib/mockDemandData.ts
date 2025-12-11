import type { DemandForecastRow, DemandTrendPoint, DemandAlert, ForecastAdjustment } from "./types";

export const mockDemandForecastData: DemandForecastRow[] = [
  {
    sku: "SKU-001",
    brand: "Coca-Cola",
    flavor: "Original",
    packageSize: "500 ML",
    distributor: "Dist-A",
    plantLocation: "LHR",
    forecastMonth: "2025-01",
    predictedSellOut: 15000,
  },
  {
    sku: "SKU-002",
    brand: "Coca-Cola",
    flavor: "Original",
    packageSize: "1000 ML",
    distributor: "Dist-A",
    plantLocation: "LHR",
    forecastMonth: "2025-01",
    predictedSellOut: 12000,
  },
  {
    sku: "SKU-003",
    brand: "Sprite",
    flavor: "Lemon-Lime",
    packageSize: "500 ML",
    distributor: "Dist-B",
    plantLocation: "GUJ",
    forecastMonth: "2025-01",
    predictedSellOut: 18000,
  },
  {
    sku: "SKU-004",
    brand: "Fanta",
    flavor: "Orange",
    packageSize: "500 ML",
    distributor: "Dist-C",
    plantLocation: "FSB",
    forecastMonth: "2025-01",
    predictedSellOut: 14000,
  },
  {
    sku: "SKU-001",
    brand: "Coca-Cola",
    flavor: "Original",
    packageSize: "500 ML",
    distributor: "Dist-A",
    plantLocation: "LHR",
    forecastMonth: "2025-02",
    predictedSellOut: 16000,
  },
  {
    sku: "SKU-002",
    brand: "Coca-Cola",
    flavor: "Original",
    packageSize: "1000 ML",
    distributor: "Dist-A",
    plantLocation: "LHR",
    forecastMonth: "2025-02",
    predictedSellOut: 13000,
  },
];

export const mockDemandTrends: DemandTrendPoint[] = [
  { month: "2024-10", predictedSellOut: 12000, plant: "LHR" },
  { month: "2024-11", predictedSellOut: 13500, plant: "LHR" },
  { month: "2024-12", predictedSellOut: 15000, plant: "LHR" },
  { month: "2025-01", predictedSellOut: 15000, plant: "LHR" },
  { month: "2025-02", predictedSellOut: 16000, plant: "LHR" },
  { month: "2025-03", predictedSellOut: 16500, plant: "LHR" },
  { month: "2024-10", predictedSellOut: 10000, plant: "GUJ" },
  { month: "2024-11", predictedSellOut: 11000, plant: "GUJ" },
  { month: "2024-12", predictedSellOut: 12000, plant: "GUJ" },
  { month: "2025-01", predictedSellOut: 18000, plant: "GUJ" },
  { month: "2025-02", predictedSellOut: 19000, plant: "GUJ" },
  { month: "2025-03", predictedSellOut: 20000, plant: "GUJ" },
];

export const mockDemandAlerts: DemandAlert[] = [
  {
    id: "1",
    severity: "high",
    message: "High demand spike detected for SKU-001 in Plant LHR (+30% vs last year same month)",
    tags: ["SKU-001", "Plant LHR", "High Demand"],
    timestamp: "2025-01-15T10:30:00Z",
    sku: "SKU-001",
    plant: "LHR",
  },
  {
    id: "2",
    severity: "medium",
    message: "Demand drop detected for Brand Sprite in region North (-18% YoY)",
    tags: ["Sprite", "Region North", "Demand Drop"],
    timestamp: "2025-01-14T14:20:00Z",
    distributor: "Dist-B",
  },
  {
    id: "3",
    severity: "low",
    message: "Forecast accuracy below threshold for SKU-003",
    tags: ["SKU-003", "Accuracy"],
    timestamp: "2025-01-13T09:15:00Z",
    sku: "SKU-003",
  },
];

export const mockForecastAdjustments: ForecastAdjustment[] = [
  {
    id: "adj-1",
    date: "2025-01-10",
    user: "John Doe",
    sku: "SKU-001",
    oldValue: 14000,
    newValue: 15000,
    reason: "Expected promotional campaign",
  },
  {
    id: "adj-2",
    date: "2025-01-08",
    user: "Jane Smith",
    sku: "SKU-002",
    oldValue: 11000,
    newValue: 12000,
    reason: "Market analysis indicates higher demand",
  },
];

export const mockMonthlySummary = {
  totalPredictedSellOut: 59000,
  previousPeriod2024: 52000,
  previousPeriod2025: 55000,
  previousPeriod2023: 48000,
  lastMonthForecastAccuracy: 94.5,
  trend: "up" as const,
};

