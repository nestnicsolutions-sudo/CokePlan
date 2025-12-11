"use client";

import { ArrowRight } from "lucide-react";

/**
 * Process flow visualization for shipment prioritization
 */
export function ShipmentPrioritizationFlow() {
  const steps = [
    {
      number: 1,
      title: "New Shipment Arrives",
      description: "Shipment enters the outbound queue from WMS",
    },
    {
      number: 2,
      title: "Extract Shipment Features",
      description: "Capture delay, orders, LPNs, weight, carrier data",
    },
    {
      number: 3,
      title: "Normalize Variables",
      description: "Scale all features to 0-1 range for comparison",
    },
    {
      number: 4,
      title: "Calculate Priority Score",
      description: "Apply weighted formula to compute urgency score",
    },
    {
      number: 5,
      title: "Sort Shipments by Score",
      description: "Rank all shipments from highest to lowest priority",
    },
    {
      number: 6,
      title: "Allocate Loading Slots",
      description: "Assign loading bays starting with highest priority",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Prioritization Process Flow
      </h3>

      {/* Desktop: Horizontal Flow */}
      <div className="hidden lg:flex items-start space-x-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-start flex-1">
            <div className="flex-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold mb-3">
                {step.number}
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">
                {step.title}
              </h4>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="h-6 w-6 text-gray-400 mt-2 mx-2 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical Flow */}
      <div className="lg:hidden space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold flex-shrink-0">
              {step.number}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          This automated process ensures that the most urgent shipments are loaded
          first, minimizing delays and optimizing warehouse throughput.
        </p>
      </div>
    </div>
  );
}

