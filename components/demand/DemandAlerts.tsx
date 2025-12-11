import { AlertsList } from "@/components/common/AlertsList";
import { mockDemandAlerts } from "@/lib/mockDemandData";

export function DemandAlerts() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Demand Alerts</h3>
      <AlertsList alerts={mockDemandAlerts} />
    </div>
  );
}

