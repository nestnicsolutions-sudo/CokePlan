"use client";

import { useState } from "react";
import type { PrioritizationWeights } from "@/lib/types";
import { RotateCcw, Upload } from "lucide-react";

interface ShipmentPrioritizationControlsProps {
  weights: PrioritizationWeights;
  onWeightChange: (weights: PrioritizationWeights) => void;
  onReset: () => void;
}

/**
 * Controls for adjusting model weights and data source
 */
export function ShipmentPrioritizationControls({
  weights,
  onWeightChange,
  onReset,
}: ShipmentPrioritizationControlsProps) {
  const handleSliderChange = (key: keyof PrioritizationWeights, value: number) => {
    onWeightChange({
      ...weights,
      [key]: value,
    });
  };

  const weightSum =
    weights.delayFactorWeight +
    weights.orderLoadWeight +
    weights.lpnLoadWeight +
    weights.weightLoadWeight +
    weights.carrierRiskWeight;

  const isWeightSumValid = Math.abs(weightSum - 1.0) < 0.01; // Allow small floating point error

  return (
    <div className="space-y-6">
      {/* Model Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Model Weight Tuning
          </h3>
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm font-medium">Reset to Default</span>
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Adjust the weights to see how they affect shipment prioritization in
          real-time. Weights should sum to 1.0 (100%).
        </p>

        {/* Weight Sum Warning */}
        {!isWeightSumValid && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded-md">
            <p className="text-sm text-amber-800">
              ⚠️ Warning: Weights sum to {(weightSum * 100).toFixed(0)}%. They
              should sum to 100% for accurate prioritization.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Delay Factor Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Delay Factor Weight
              </label>
              <span className="text-sm font-semibold text-red-600">
                {(weights.delayFactorWeight * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={weights.delayFactorWeight}
              onChange={(e) =>
                handleSliderChange("delayFactorWeight", parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              style={{
                background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${
                  weights.delayFactorWeight * 100
                }%, #e5e7eb ${weights.delayFactorWeight * 100}%, #e5e7eb 100%)`,
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              How much delay impacts priority
            </p>
          </div>

          {/* Order Load Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Order Load Weight
              </label>
              <span className="text-sm font-semibold text-red-600">
                {(weights.orderLoadWeight * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={weights.orderLoadWeight}
              onChange={(e) =>
                handleSliderChange("orderLoadWeight", parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              style={{
                background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${
                  weights.orderLoadWeight * 100
                }%, #e5e7eb ${weights.orderLoadWeight * 100}%, #e5e7eb 100%)`,
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              How much number of orders impacts priority
            </p>
          </div>

          {/* LPN Load Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                LPN Load Weight
              </label>
              <span className="text-sm font-semibold text-red-600">
                {(weights.lpnLoadWeight * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={weights.lpnLoadWeight}
              onChange={(e) =>
                handleSliderChange("lpnLoadWeight", parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              style={{
                background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${
                  weights.lpnLoadWeight * 100
                }%, #e5e7eb ${weights.lpnLoadWeight * 100}%, #e5e7eb 100%)`,
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              How much LPN count impacts priority
            </p>
          </div>

          {/* Weight Load Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Weight Load Weight
              </label>
              <span className="text-sm font-semibold text-red-600">
                {(weights.weightLoadWeight * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={weights.weightLoadWeight}
              onChange={(e) =>
                handleSliderChange("weightLoadWeight", parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              style={{
                background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${
                  weights.weightLoadWeight * 100
                }%, #e5e7eb ${weights.weightLoadWeight * 100}%, #e5e7eb 100%)`,
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              How much shipment weight impacts priority
            </p>
          </div>

          {/* Carrier Risk Weight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Carrier Risk Weight
              </label>
              <span className="text-sm font-semibold text-red-600">
                {(weights.carrierRiskWeight * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={weights.carrierRiskWeight}
              onChange={(e) =>
                handleSliderChange("carrierRiskWeight", parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              style={{
                background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${
                  weights.carrierRiskWeight * 100
                }%, #e5e7eb ${weights.carrierRiskWeight * 100}%, #e5e7eb 100%)`,
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              How much carrier performance impacts priority
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Weight:</span>
            <span
              className={`text-sm font-bold ${
                isWeightSumValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {(weightSum * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Data Source */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Source</h3>
        <p className="text-sm text-gray-600 mb-4">
          In production, this table will be populated from CSV exports (e.g., coming
          from Google Drive / WMS). Currently, mock data is used.
        </p>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors cursor-not-allowed opacity-60"
          disabled
        >
          <Upload className="h-4 w-4" />
          <span className="text-sm font-medium">Upload CSV / Connect Data Source</span>
        </button>
        <p className="text-xs text-gray-500 mt-2">
          {/* TODO: Implement CSV upload and data source connection */}
          Coming soon: Direct integration with WMS and CSV uploads
        </p>
      </div>
    </div>
  );
}

