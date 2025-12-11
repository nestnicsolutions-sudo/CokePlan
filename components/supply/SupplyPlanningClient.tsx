"use client";

import { useState } from "react";
import type { PlantProductionRow, SkuProductionRow, WorkCentreRow, InventoryRow } from "@/lib/types";
import { TabNav } from "@/components/common/TabNav";
import { ProductionOverall } from "@/components/supply/ProductionOverall";
import { PlantProduction } from "@/components/supply/PlantProduction";
import { WorkCentreProduction } from "@/components/supply/WorkCentreProduction";
import { SkuProduction } from "@/components/supply/SkuProduction";
import { InventoryStatus } from "@/components/supply/InventoryStatus";

const tabs = [
  { id: "overall", label: "Production (Yesterday – Overall)" },
  { id: "plant", label: "Plant-Wise Production" },
  { id: "workcentre", label: "Work Centre-Wise Production" },
  { id: "sku", label: "SKU-Wise Production" },
  { id: "inventory", label: "Inventory (Stock Position)" },
];

export default function SupplyPlanningClient({
  plants,
  skus,
  centres,
  inventory,
}: {
  plants: PlantProductionRow[];
  skus: SkuProductionRow[];
  centres: WorkCentreRow[];
  inventory: InventoryRow[];
}) {
  const [activeTab, setActiveTab] = useState("overall");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overall":
        return <ProductionOverall plants={plants} />;
      case "plant":
        return <PlantProduction plants={plants} />;
      case "workcentre":
        return <WorkCentreProduction centres={centres} />;
      case "sku":
        return <SkuProduction skus={skus} />;
      case "inventory":
        return <InventoryStatus inventory={inventory} />;
      default:
        return <ProductionOverall plants={plants} />;
    }
  };

  return (
    <>
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </>
  );
}

