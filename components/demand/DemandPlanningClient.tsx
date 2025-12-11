"use client";

import { useState } from "react";
import type { DemandForecastRow } from "@/lib/types";
import { TabNav } from "@/components/common/TabNav";
import { MonthlySummary } from "@/components/demand/MonthlySummary";
import { ForecastData } from "@/components/demand/ForecastData";
import { DemandTrends } from "@/components/demand/DemandTrends";
import { ActualVsForecast } from "@/components/demand/ActualVsForecast";
import { DemandAlerts } from "@/components/demand/DemandAlerts";

const tabs = [
  { id: "summary", label: "Monthly Demand Summary" },
  { id: "forecast", label: "Demand Forecast Data" },
  { id: "trends", label: "Demand Forecast & Daily Targets" },
  { id: "actual", label: "Actual vs Forecasted" },
  { id: "alerts", label: "Demand Alerts" },
];

export default function DemandPlanningClient({
  forecast,
  actual,
}: {
  forecast: DemandForecastRow[];
  actual: DemandForecastRow[];
}) {
  const [activeTab, setActiveTab] = useState("summary");

  const renderTabContent = () => {
    switch (activeTab) {
      case "summary":
        return <MonthlySummary forecastRows={forecast} actualRows={actual} />;
      case "forecast":
        return <ForecastData forecastRows={forecast} />;
      case "trends":
        return <DemandTrends forecastRows={forecast} />;
      case "actual":
        return <ActualVsForecast forecastRows={forecast} actualRows={actual} />;
      case "alerts":
        return <DemandAlerts />;
      default:
        return <MonthlySummary forecastRows={forecast} actualRows={actual} />;
    }
  };

  return (
    <>
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </>
  );
}

