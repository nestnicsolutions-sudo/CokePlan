import WarehouseOptimizationClient from "./WarehouseOptimizationClient";
import { loadActualShipmentData } from "@/lib/loaders/shipmentDataLoader";
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

  return <WarehouseOptimizationClient shipments={shipments} />;
}
