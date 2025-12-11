"use client";

import { useState } from "react";
import { mockFinancialData } from "@/lib/mockFinancialData";
import type { FinancialRow } from "@/lib/types";

export function ScenarioControls() {
  const [data, setData] = useState<FinancialRow[]>(mockFinancialData);
  const [comAdjustment, setComAdjustment] = useState(0);
  const [nsrAdjustment, setNsrAdjustment] = useState(0);
  const [ucAdjustment, setUcAdjustment] = useState(0);

  const applyScenario = () => {
    const updated = data.map((row) => {
      const newCOM = row.com * (1 + comAdjustment / 100);
      const newNSR = row.nsr * (1 + nsrAdjustment / 100);
      const newTotalUC = row.totalUC * (1 + ucAdjustment / 100);
      const newGP = newNSR - newCOM - row.moh - row.cogs;
      const newGPPercentNSR = newNSR > 0 ? (newGP / newNSR) * 100 : 0;

      return {
        ...row,
        com: newCOM,
        nsr: newNSR,
        totalUC: newTotalUC,
        gp: newGP,
        gpPercentNsr: newGPPercentNSR,
      };
    });
    setData(updated);
  };

  const resetScenario = () => {
    setData(mockFinancialData);
    setComAdjustment(0);
    setNsrAdjustment(0);
    setUcAdjustment(0);
  };

  const totalGP = data.reduce((sum, row) => sum + row.gp, 0);
  const totalNSR = data.reduce((sum, row) => sum + row.nsr, 0);
  const totalUC = data.reduce((sum, row) => sum + row.totalUC, 0);
  const overallGPPercent = totalNSR > 0 ? (totalGP / totalNSR) * 100 : 0;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Scenario Modeling (What-If Analysis)
      </h3>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Increase COM by: {comAdjustment > 0 ? "+" : ""}
              {comAdjustment}%
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={comAdjustment}
              onChange={(e) => setComAdjustment(Number(e.target.value))}
              className="w-full accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-50%</span>
              <span>0%</span>
              <span>+50%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decrease NSR by: {nsrAdjustment < 0 ? "" : "-"}
              {Math.abs(nsrAdjustment)}%
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={nsrAdjustment}
              onChange={(e) => setNsrAdjustment(Number(e.target.value))}
              className="w-full accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-50%</span>
              <span>0%</span>
              <span>+50%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Volume (UC): {ucAdjustment > 0 ? "+" : ""}
              {ucAdjustment}%
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={ucAdjustment}
              onChange={(e) => setUcAdjustment(Number(e.target.value))}
              className="w-full accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-50%</span>
              <span>0%</span>
              <span>+50%</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={applyScenario}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Apply Scenario
            </button>
            <button
              onClick={resetScenario}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <h4 className="text-md font-semibold text-red-900 mb-3">
          Scenario Impact
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-red-700">Total GP</p>
            <p className="text-lg font-semibold text-red-900">
              ₨{totalGP.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-red-700">Total NSR</p>
            <p className="text-lg font-semibold text-red-900">
              ₨{totalNSR.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-red-700">Overall GP % NSR</p>
            <p className="text-lg font-semibold text-red-900">
              {overallGPPercent.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-red-700">Expected Volume (UC)</p>
            <p className="text-lg font-semibold text-red-900">
              {totalUC.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

