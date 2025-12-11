import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TabNav } from "@/components/common/TabNav";
import { MonthlySummary } from "@/components/demand/MonthlySummary";
import { ForecastData } from "@/components/demand/ForecastData";
import { loadDemandForecast, loadDemandActual } from "@/lib/loaders/demandData";
import DemandPlanningClient from "@/components/demand/DemandPlanningClient";

const tabs = [
  { id: "summary", label: "Monthly Demand Summary" },
  { id: "forecast", label: "Demand Forecast Data" },
  { id: "trends", label: "Demand Forecast & Daily Targets" },
  { id: "actual", label: "Actual vs Forecasted & Error Metrics" },
  { id: "alerts", label: "Demand Alerts" },
];

export default function DemandPlanningPage() {
  const forecast = loadDemandForecast();
  const actual = loadDemandActual();
  // default to summary tab in the client via hash-less navigation
  return (
    <DashboardLayout title="Demand Planning">
      <DemandPlanningClient forecast={forecast} actual={actual} />
    </DashboardLayout>
  );
}

