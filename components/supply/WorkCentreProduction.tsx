"use client";

import type { WorkCentreRow } from "@/lib/types";
import { useEffect, useState } from "react";

const activeAnimation = `
  @keyframes shimmer-loader {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  .loader-bar {
    animation: shimmer-loader 2s linear infinite;
    background-size: 1000px 100%;
  }
`;

export function WorkCentreProduction({ centres }: { centres: WorkCentreRow[] }) {
  useEffect(() => {
    // Inject animation styles into the document
    const style = document.createElement("style");
    style.innerHTML = activeAnimation;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="space-y-4 lg:space-y-6">
      <h3 className="text-base lg:text-lg font-semibold text-white">
        Work Centre-Wise Production
      </h3>

      <div className="glass p-4 lg:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-transparent">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Work Centre
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Current SKU
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Units Produced (Yesterday)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {centres.map((row, index) => (
                <tr key={index} className="transition-colors hover:bg-red-700 hover:text-white">
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm font-medium text-white">
                    {row.workCentre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.status === "active" ? (
                      <div className="space-y-1">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white mb-2">
                          Active
                        </span>
                        <div className="space-y-1.5 w-32">
                          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                            <div className="loader-bar h-1.5 rounded-full" style={{ 
                              width: '100%',
                              background: 'repeating-linear-gradient(90deg, #ef4444, #ef4444 10px, #dc2626 10px, #dc2626 20px)'
                            }} />
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                            <div className="loader-bar h-1.5 rounded-full" style={{ 
                              width: '100%',
                              background: 'repeating-linear-gradient(90deg, #eab308, #eab308 10px, #ca8a04 10px, #ca8a04 20px)'
                            }} />
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                            <div className="loader-bar h-1.5 rounded-full" style={{ 
                              width: '100%',
                              background: 'repeating-linear-gradient(90deg, #22c55e, #22c55e 10px, #16a34a 10px, #16a34a 20px)'
                            }} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-white/90">
                    {row.currentSku || "N/A"}
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-white/90">
                    {row.actual.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {centres
          .filter((row) => row.status === "active")
          .map((row) => (
            <div
              key={row.workCentre}
              className="glass p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">
                  {row.workCentre}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                  Active
                </span>
              </div>
              <p className="text-xs text-white/70 mb-1">Current SKU:</p>
              <p className="text-sm font-semibold text-white">
                {row.currentSku || "N/A"}
              </p>
              <p className="text-xs text-white/70 mt-2">Units Produced:</p>
              <p className="text-lg font-semibold text-white">
                {row.actual.toLocaleString()}
              </p>
              <p className="text-xs text-white/70 mt-3 mb-1">Production Status:</p>
              <div className="space-y-1.5">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="loader-bar h-2 rounded-full" style={{ 
                    width: '100%',
                    background: 'repeating-linear-gradient(90deg, #ef4444, #ef4444 10px, #dc2626 10px, #dc2626 20px)'
                  }} />
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="loader-bar h-2 rounded-full" style={{ 
                    width: '100%',
                    background: 'repeating-linear-gradient(90deg, #eab308, #eab308 10px, #ca8a04 10px, #ca8a04 20px)'
                  }} />
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="loader-bar h-2 rounded-full" style={{ 
                    width: '100%',
                    background: 'repeating-linear-gradient(90deg, #22c55e, #22c55e 10px, #16a34a 10px, #16a34a 20px)'
                  }} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

