---
name: ui_glass_upgrade
overview: Upgrade dashboard UI to glassmorphism with animations, loaders, and consistent theming across all modules
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

# Glassmorphism UI Upgrade Plan

## Scope & Goals

- Apply a glassmorphic theme, interactive motion, and loading states across all dashboard sections (layout, tabs, cards, tables, charts, forms).
- Keep brand palette (red/black/white) while adding translucent glass surfaces and consistent shadows.

## Implementation Steps

1) **Design Tokens & Global Styling**

- Add glass variables (blur, translucency, borders, shadows, radii, spacing) in `app/globals.css` and Tailwind theme.
- Set global background (subtle gradient/noise) and typography tweaks.
- Standardize transitions/easing for hover/focus/enter/exit.

2) **Shell Components**

- Update `components/layout/Sidebar.tsx` and `TopBar.tsx` for glass surfaces, hover/active states, and focus rings.
- Enhance `components/common/TabNav.tsx`, buttons, inputs, filters to adopt glass styles and motion.

3) **Cards, KPIs, Loaders**

- Apply glass card styles to KPI components (`components/common/KpiCard.tsx`), alerts, and section wrappers.
- Introduce shared skeleton/loading components and wire them into KPIs, tables, and charts for initial render and data changes.

4) **Tables & Pagination**

- Add sticky glass headers, row hover lift, and pagination polish in data-heavy components (e.g., `ForecastData`, supply tables, warehouse tables).

5) **Charts**

- Wrap chart containers in glass cards; add entrance animations and styled tooltips/legends across demand/supply/warehouse/finance charts.

6) **Section Passes**

- Demand, Supply, Warehouse, Finance: apply the shared glass styles, loaders, and motion to each section’s cards, tables, and charts to ensure consistency.

7) **Accessibility & Performance**

- Honor `prefers-reduced-motion`; maintain contrast; use GPU-friendly transforms/opacity; validate against brand palette.

## Notes

- No functional/data changes—visual and UX enhancements only.
- Reuse shared tokens/components to keep the theme consistent.