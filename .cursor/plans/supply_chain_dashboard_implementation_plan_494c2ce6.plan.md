---
name: Supply Chain Dashboard Implementation Plan
overview: Build a frontend-only Supply Chain Planning Dashboard using Next.js, Tailwind CSS, and Recharts, organized into modular feature-based components with mock data.
todos:
  - id: scaffold
    content: Init Next.js App Router with TS, Tailwind, Recharts deps
    status: pending
  - id: structure
    content: Create layout shell, pages, and component scaffolding
    status: pending
  - id: mock-data
    content: Define types and mock datasets/utilities in lib/
    status: pending
  - id: demand
    content: Implement demand planning tabs with charts, tables, modals
    status: pending
  - id: supply
    content: Implement supply planning tabs with KPIs, tables, adjustments
    status: pending
  - id: warehouse
    content: Implement warehouse optimization KPIs and charts
    status: pending
  - id: finance
    content: Implement finance KPIs, editable table, charts, what-if UI
    status: pending
---

# Supply Chain Dashboard Implementation Plan

## Phase 1: Project Setup & Foundation

1.  **Initialize Project**

    -   Create Next.js app with TypeScript, Tailwind CSS, ESLint, App Router.
    -   Install dependencies: `recharts`, `lucide-react`, `clsx`, `tailwind-merge`, `date-fns`.

2.  **Directory Structure**

    -   Set up `app/(dashboard)`, `components/{layout,common,demand,supply,warehouse,finance}`, `lib`.

3.  **Type Definitions & Mock Data**

    -   Create `lib/types.ts` defining all interfaces (DemandForecastRow, ProductionRow, WarehouseMetrics, FinancialRow, etc.).
    -   Create `lib/mockDemandData.ts`, `lib/mockSupplyData.ts`, `lib/mockWarehouseData.ts`, `lib/mockFinancialData.ts`.

## Phase 2: Layout & Navigation

1.  **Shared Components**

    -   `components/common/KpiCard.tsx`: Reusable stat card.
    -   `components/common/FiltersBar.tsx`: Reusable filter inputs.
    -   `components/common/TabNav.tsx`: Tab navigation component.
    -   `components/common/AlertsList.tsx`: Reusable alerts display.

2.  **App Layout**

    -   `components/layout/Sidebar.tsx`: Navigation links (Demand, Supply, Warehouse, Finance).
    -   `components/layout/TopBar.tsx`: Page title, User profile, Date range picker.
    -   `components/layout/DashboardLayout.tsx`: Wrapper combining Sidebar and TopBar.
    -   `app/(dashboard)/layout.tsx`: Apply DashboardLayout.

## Phase 3: Demand Planning (`/demand-planning`)

1.  **Components**

    -   `components/demand/MonthlySummary.tsx`: KPI cards, trend charts.
    -   `components/demand/ForecastData.tsx`: Data table with "Adjust Forecast" modal and impact analysis.
    -   `components/demand/DemandTrends.tsx`: Trends & Insights charts (SKU/Brand/Plant).
    -   `components/demand/ActualVsForecast.tsx`: Comparison charts and error metrics (MAPE, RMSE).
    -   `components/demand/DemandAlerts.tsx`: List of demand-specific alerts.

2.  **Page Integration**

    -   `app/(dashboard)/demand-planning/page.tsx`: Manage tab state and render sub-components.

## Phase 4: Supply Planning (`/supply-planning`)

1.  **Components**

    -   `components/supply/ProductionOverall.tsx`: Yesterday's KPIs, gap analysis.
    -   `components/supply/PlantProduction.tsx`: Plant-wise table & chart, "Adjust Schedule" modal.
    -   `components/supply/WorkCentreProduction.tsx`: Visual status of work centres.
    -   `components/supply/SkuProduction.tsx`: Over/Under production table.
    -   `components/supply/InventoryStatus.tsx`: Stock position with risk indicators.

2.  **Page Integration**

    -   `app/(dashboard)/supply-planning/page.tsx`: Manage tab state and render sub-components.

## Phase 5: Warehouse Optimization (`/warehouse-optimization`)

1.  **Components**

    -   `components/warehouse/WarehouseOverview.tsx`: Metrics per warehouse (weight, shipments).
    -   `components/warehouse/TimeAnalysis.tsx`: Operation efficiency charts.
    -   `components/warehouse/ShipmentStatus.tsx`: Shipped vs Delayed metrics.
    -   `components/warehouse/CarrierPerformance.tsx`: Volume per carrier charts.
    -   `components/warehouse/LoadingOptimization.tsx`: Loading time analysis.

2.  **Page Integration**

    -   `app/(dashboard)/warehouse-optimization/page.tsx`: Render all sections (single page view or tabs).

## Phase 6: Financial Projections (`/financial-projections`)

1.  **Components**

    -   `components/finance/FinancialSummary.tsx`: Top-level aggregated KPIs (GSR, NSR, GP, etc.).
    -   `components/finance/FinancialTable.tsx`: Detailed table with calculated columns (GP, Margins).
    -   `components/finance/FinancialCharts.tsx`: GP by Pack, GSR vs NSR, Cost Breakdown, Trend Analysis.
    -   `components/finance/ScenarioControls.tsx`: "What-if" inputs (sliders for COM/NSR adjustments).
    -   `components/finance/ProfitabilityAnalysis.tsx`: Break-even visuals and dynamic insights.

2.  **Page Integration**

    -   `app/(dashboard)/financial-projections/page.tsx`: State management for scenarios and data rendering.

## Phase 7: Polish & Redirects

1.  **Root Redirect**

    -   `app/page.tsx`: Redirect to `/demand-planning`.

2.  **Styling & Review**

    -   Ensure consistent Tailwind styling.
    -   Verify "Human-in-the-Loop" features (modals/adjustments) work with local state.