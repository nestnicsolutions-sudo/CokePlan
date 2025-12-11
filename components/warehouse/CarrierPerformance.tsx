"use client";

import type { CarrierPerformanceRow } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function CarrierPerformance({ carriers }: { carriers: CarrierPerformanceRow[] }) {
  // Group by carrier
  const carrierData = carriers.reduce((acc, item) => {
    const existing = acc.find((c) => c.carrier === item.carrier);
    if (existing) {
      existing.volume += item.shipmentVolume;
    } else {
      acc.push({ carrier: item.carrier, volume: item.shipmentVolume });
    }
    return acc;
  }, [] as { carrier: string; volume: number }[]);

  // Group by carrier and warehouse
  const groupedData = carriers.reduce((acc, item) => {
    const key = item.carrier;
    if (!acc[key]) {
      acc[key] = { carrier: key, LHR: 0, GUJ: 0, FSB: 0 };
    }
    if (item.warehouse) {
      acc[key][item.warehouse as "LHR" | "GUJ" | "FSB"] = item.shipmentVolume;
    }
    return acc;
  }, {} as Record<string, { carrier: string; LHR: number; GUJ: number; FSB: number }>);

  const stackedData = Object.values(groupedData);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Shipment Volume vs Carrier Performance
      </h3>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Total Shipments by Carrier
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={carrierData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="carrier" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="volume" fill="#e11d48" name="Shipment Volume" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Shipments by Carrier and Warehouse
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stackedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="carrier" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="LHR" stackId="a" fill="#e11d48" />
            <Bar dataKey="GUJ" stackId="a" fill="#b91c1c" />
            <Bar dataKey="FSB" stackId="a" fill="#111111" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

