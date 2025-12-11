import WarehouseOptimizationClient from "./WarehouseOptimizationClient";
import { loadActualShipmentData } from "@/lib/loaders/shipmentDataLoader";
import {
  loadWarehouseMetrics,
  loadShipmentStatus,
  loadCarrierPerformance,
  loadLoadingTimeTrend,
} from "@/lib/loaders/warehouseData";
import { mockShipmentRows } from "@/lib/mockWarehousePrioritizationData";

/**
 * Server component that loads shipment data and passes it to the client component
 */
export default function WarehouseOptimizationPage() {
  // Try to load actual data, fallback to mock data if file not found or error
  let shipments;
  try {
    shipments = loadActualShipmentData();
    // If no data loaded, use mock data as fallback
    if (shipments.length === 0) {
      console.warn("No actual shipment data found, using mock data");
      shipments = mockShipmentRows;
    }
  } catch (error) {
    console.error("Error loading shipment data, using mock data:", error);
    shipments = mockShipmentRows;
  }

  const metrics = loadWarehouseMetrics();
  const shipmentStatus = loadShipmentStatus();
  const carriers = loadCarrierPerformance();
  const loadingTrend = loadLoadingTimeTrend();

  return (
    <WarehouseOptimizationClient
      shipments={shipments}
      metrics={metrics}
      shipmentStatus={shipmentStatus}
      carriers={carriers}
      loadingTrend={loadingTrend}
    />
  );
}
