"use client";

import { mockFinancialSummary } from "@/lib/mockFinancialData";
import { KpiCard } from "@/components/common/KpiCard";

export function FinancialSummary() {
  const kpis = [
    {
      title: "Total GSR",
      value: `₨${mockFinancialSummary.totalGSR.toLocaleString()}`,
      trend: "up" as const,
    },
    {
      title: "Total NSR",
      value: `₨${mockFinancialSummary.totalNSR.toLocaleString()}`,
      trend: "up" as const,
    },
    {
      title: "Total COM",
      value: `₨${mockFinancialSummary.totalCOM.toLocaleString()}`,
      trend: "neutral" as const,
    },
    {
      title: "Total COGs",
      value: `₨${mockFinancialSummary.totalCOGs.toLocaleString()}`,
      trend: "neutral" as const,
    },
    {
      title: "Total GP",
      value: `₨${mockFinancialSummary.totalGP.toLocaleString()}`,
      trend: "up" as const,
    },
    {
      title: "Overall GP % NSR",
      value: `${mockFinancialSummary.overallGPPercentNSR}%`,
      trend: "up" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Financial Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <KpiCard key={index} kpi={kpi} />
        ))}
      </div>
    </div>
  );
}

