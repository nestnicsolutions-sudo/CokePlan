"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/finance/FinancialSummary";
import { FinancialTable } from "@/components/finance/FinancialTable";
import { FinancialCharts } from "@/components/finance/FinancialCharts";
import { ScenarioControls } from "@/components/finance/ScenarioControls";
import { ProfitabilityAnalysis } from "@/components/finance/ProfitabilityAnalysis";

export default function FinancialProjectionsPage() {
  return (
    <DashboardLayout title="Financial Projections">
      <div className="space-y-8">
        <FinancialSummary />
        <FinancialTable />
        <FinancialCharts />
        <ScenarioControls />
        <ProfitabilityAnalysis />
      </div>
    </DashboardLayout>
  );
}

