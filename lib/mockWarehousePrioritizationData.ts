/**
 * Mock data for Shipment Load Prioritization
 * 
 * TODO: Replace with actual data from CSV/WMS exports (e.g., Google Drive)
 */

import type { RawShipmentRow } from "@/lib/types";

/**
 * Generate mock shipment data with varied priority characteristics
 */
export const mockShipmentRows: RawShipmentRow[] = [
  {
    id: "1",
    shipmentId: "SHP-20250101-001",
    numOrders: 45,
    numOutboundLPNs: 120,
    totalWeight: 2400,
    createTimestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    timeSpentVehicleAssignment: 45,
    timeSpentLoadingProcess: 60,
    carrierName: "FastTrack Logistics",
    carrierPerformanceScore: 85,
  },
  {
    id: "2",
    shipmentId: "SHP-20250101-002",
    numOrders: 32,
    numOutboundLPNs: 85,
    totalWeight: 1800,
    createTimestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    timeSpentVehicleAssignment: 30,
    timeSpentLoadingProcess: 45,
    carrierName: "QuickShip Express",
    carrierPerformanceScore: 92,
  },
  {
    id: "3",
    shipmentId: "SHP-20250101-003",
    numOrders: 68,
    numOutboundLPNs: 180,
    totalWeight: 3200,
    createTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 90 min ago
    timeSpentVehicleAssignment: 20,
    timeSpentLoadingProcess: 35,
    carrierName: "MegaFreight Inc",
    carrierPerformanceScore: 78,
  },
  {
    id: "4",
    shipmentId: "SHP-20250101-004",
    numOrders: 15,
    numOutboundLPNs: 40,
    totalWeight: 900,
    createTimestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
    timeSpentVehicleAssignment: 15,
    timeSpentLoadingProcess: 20,
    carrierName: "FastTrack Logistics",
    carrierPerformanceScore: 85,
  },
  {
    id: "5",
    shipmentId: "SHP-20250101-005",
    numOrders: 52,
    numOutboundLPNs: 140,
    totalWeight: 2800,
    createTimestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 6.5 * 60 * 60 * 1000).toISOString(), // 6.5 hours ago
    timeSpentVehicleAssignment: 55,
    timeSpentLoadingProcess: 70,
    carrierName: "SlowMo Transport",
    carrierPerformanceScore: 45,
  },
  {
    id: "6",
    shipmentId: "SHP-20250101-006",
    numOrders: 28,
    numOutboundLPNs: 75,
    totalWeight: 1500,
    createTimestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), // 2.5 hours ago
    timeSpentVehicleAssignment: 25,
    timeSpentLoadingProcess: 30,
    carrierName: "QuickShip Express",
    carrierPerformanceScore: 92,
  },
  {
    id: "7",
    shipmentId: "SHP-20250101-007",
    numOrders: 80,
    numOutboundLPNs: 220,
    totalWeight: 4200,
    createTimestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 7.5 * 60 * 60 * 1000).toISOString(), // 7.5 hours ago
    timeSpentVehicleAssignment: 65,
    timeSpentLoadingProcess: 80,
    carrierName: "MegaFreight Inc",
    carrierPerformanceScore: 78,
  },
  {
    id: "8",
    shipmentId: "SHP-20250101-008",
    numOrders: 12,
    numOutboundLPNs: 35,
    totalWeight: 750,
    createTimestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 min ago
    timeSpentVehicleAssignment: 10,
    timeSpentLoadingProcess: 15,
    carrierName: "FastTrack Logistics",
    carrierPerformanceScore: 85,
  },
  {
    id: "9",
    shipmentId: "SHP-20250101-009",
    numOrders: 95,
    numOutboundLPNs: 250,
    totalWeight: 5000,
    createTimestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9 hours ago
    timeSpentVehicleAssignment: 90,
    timeSpentLoadingProcess: 120,
    carrierName: "SlowMo Transport",
    carrierPerformanceScore: 45,
  },
  {
    id: "10",
    shipmentId: "SHP-20250101-010",
    numOrders: 38,
    numOutboundLPNs: 95,
    totalWeight: 1900,
    createTimestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(), // 4.5 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    timeSpentVehicleAssignment: 35,
    timeSpentLoadingProcess: 40,
    carrierName: "QuickShip Express",
    carrierPerformanceScore: 92,
  },
  {
    id: "11",
    shipmentId: "SHP-20250101-011",
    numOrders: 22,
    numOutboundLPNs: 60,
    totalWeight: 1200,
    createTimestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), // 2.5 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    timeSpentVehicleAssignment: 20,
    timeSpentLoadingProcess: 25,
    carrierName: "MegaFreight Inc",
    carrierPerformanceScore: 78,
  },
  {
    id: "12",
    shipmentId: "SHP-20250101-012",
    numOrders: 58,
    numOutboundLPNs: 155,
    totalWeight: 3100,
    createTimestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(), // 5.5 hours ago
    firstLoadAssignmentTimestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    timeSpentVehicleAssignment: 50,
    timeSpentLoadingProcess: 55,
    carrierName: "FastTrack Logistics",
    carrierPerformanceScore: 85,
  },
];

