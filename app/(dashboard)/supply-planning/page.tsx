import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TabNav } from "@/components/common/TabNav";
import { ProductionOverall } from "@/components/supply/ProductionOverall";
import { PlantProduction } from "@/components/supply/PlantProduction";
import { WorkCentreProduction } from "@/components/supply/WorkCentreProduction";
import { SkuProduction } from "@/components/supply/SkuProduction";
import { InventoryStatus } from "@/components/supply/InventoryStatus";
import {
  loadSupplyPlanned,
  loadSupplyActual,
  mapPlantProduction,
  mapSkuProduction,
  mapWorkCentreProduction,
  mapInventory,
  getAvailableYearsMonths,
} from "@/lib/loaders/supplyData";
import SupplyPlanningClient from "@/components/supply/SupplyPlanningClient";

const tabs = [
  { id: "overall", label: "Production Summary" },
  { id: "plant", label: "Plant-Wise Production" },
  { id: "workcentre", label: "Work Centre-Wise Production" },
  { id: "sku", label: "SKU-Wise Production" },
  { id: "inventory", label: "Inventory (Stock Position)" },
];

export default function SupplyPlanningPage() {
  // Planned: December (current month), Actual: All months (for filtering)
  const planned = loadSupplyPlanned(12);
  const actualAll = loadSupplyActual(); // Load all actual data for filtering
  const actual = loadSupplyActual(11); // For default display (November)
  const plants = mapPlantProduction(planned, actual);
  const skus = mapSkuProduction(planned, actual);
  const centres = mapWorkCentreProduction(actual);
  const inventory = mapInventory(actual);
  
  // Get available year/month options from actual data
  const yearMonthOptions = getAvailableYearsMonths();

  return (
    <DashboardLayout title="Supply Planning">
      <SupplyPlanningClient
        plants={plants}
        skus={skus}
        centres={centres}
        inventory={inventory}
        plannedRows={planned}
        actualRows={actualAll}
        yearMonthOptions={yearMonthOptions}
      />
    </DashboardLayout>
  );
}