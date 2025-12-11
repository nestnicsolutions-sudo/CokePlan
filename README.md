# AI Supply Chain Planning Dashboard

A comprehensive frontend-only web application for AI-powered Supply Chain Planning, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 1. Demand Planning
- Monthly Demand Summary with KPIs and trends
- Demand Forecast Data with human-in-the-loop adjustments
- Demand Trends & Insights with segmentation analysis
- Actual vs Forecasted comparison with error metrics
- Demand Alerts system

### 2. Supply Planning
- Production Overview (Yesterday's metrics)
- Plant-Wise Production tracking
- Work Centre-Wise Production status
- SKU-Wise Production analysis
- Inventory (Stock Position) with risk indicators

### 3. Warehouse Optimization
- Warehouse Overview metrics
- Time Spent on Warehouse Operations
- Shipment Status Breakdown
- Shipment Volume vs Carrier Performance
- Loading Time Optimization

### 4. Financial Projections
- Financial Summary with aggregated KPIs
- Detailed Financial Table with inline editing
- Comprehensive Financial Charts
- Scenario Modeling (What-If Analysis)
- Profitability Break-Even Analysis

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **date-fns** for date formatting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect to `/demand-planning`.

## Project Structure

```
├── app/
│   ├── (dashboard)/
│   │   ├── demand-planning/
│   │   ├── supply-planning/
│   │   ├── warehouse-optimization/
│   │   └── financial-projections/
│   ├── layout.tsx
│   ├── page.tsx (redirects to demand-planning)
│   └── globals.css
├── components/
│   ├── common/          # Shared components (KpiCard, FiltersBar, etc.)
│   ├── layout/          # Layout components (Sidebar, TopBar, DashboardLayout)
│   ├── demand/          # Demand Planning components
│   ├── supply/          # Supply Planning components
│   ├── warehouse/       # Warehouse Optimization components
│   └── finance/         # Financial Projections components
└── lib/
    ├── types.ts         # TypeScript interfaces
    ├── utils.ts         # Utility functions
    └── mock*.ts         # Mock data files
```

## Key Features

### Human-in-the-Loop Functionality

The dashboard includes several "Human-in-the-Loop" features that allow users to modify AI-generated values:

- **Modify AI Forecast** (Demand Planning): Adjust forecast values with reason tracking
- **Adjust Production Schedule** (Supply Planning): Modify planned production values
- **Financial Table Editing**: Inline editing of financial metrics
- **Scenario Modeling**: What-if analysis with sliders for COM and NSR adjustments

### Mock Data

All data is currently mocked and stored in `lib/mock*.ts` files. The code is structured to easily replace mock data with real API calls:

```typescript
// TODO: Replace mock data with API call
const data = await fetch('/api/demand-forecast').then(res => res.json());
```

## Development

### Building for Production

```bash
npm run build
npm start
```

### Code Organization

- Components are modular and focused on single responsibilities
- TypeScript interfaces are centralized in `lib/types.ts`
- Mock data is separated by domain (demand, supply, warehouse, finance)
- Reusable components are in `components/common/`

## Future Enhancements

- Replace mock data with real API integration
- Add authentication and user management
- Implement real-time data updates
- Add export functionality (CSV, PDF)
- Enhanced filtering and search capabilities
- Data persistence for user adjustments

## License

ISC

