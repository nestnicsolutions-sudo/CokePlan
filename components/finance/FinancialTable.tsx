"use client";

import { useState } from "react";
import { mockFinancialData } from "@/lib/mockFinancialData";
import type { FinancialRow } from "@/lib/types";

export function FinancialTable() {
  const [data, setData] = useState<FinancialRow[]>(mockFinancialData);
  const [editingCell, setEditingCell] = useState<{
    pack: string;
    field: keyof FinancialRow;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  const calculateDerivedFields = (row: FinancialRow): FinancialRow => {
    const gp = row.nsr - row.com - row.moh - row.cogs;
    const gsrPercentNsr = row.nsr > 0 ? (row.gsr / row.nsr) * 100 : 0;
    const gpPercentNsr = row.nsr > 0 ? (gp / row.nsr) * 100 : 0;

    return {
      ...row,
      gp,
      gsrPercentNsr,
      gpPercentNsr,
    };
  };

  const handleCellClick = (pack: string, field: keyof FinancialRow, value: number) => {
    setEditingCell({ pack, field });
    setEditValue(value.toString());
  };

  const handleSave = () => {
    if (!editingCell) return;

    const updated = data.map((row) => {
      if (row.pack === editingCell.pack) {
        const updatedRow = {
          ...row,
          [editingCell.field]: Number(editValue),
        };
        return calculateDerivedFields(updatedRow);
      }
      return row;
    });

    setData(updated);
    setEditingCell(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Financial Table</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pack
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total UC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GSR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NSR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                COM
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MOH
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                COGs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GSR % NSR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GP % NSR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.pack}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.totalUC.toLocaleString()}
                </td>
                {(["gsr", "nsr", "com", "moh", "cogs"] as const).map((field) => (
                  <td
                    key={field}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:bg-red-50"
                    onClick={() => handleCellClick(row.pack, field, row[field])}
                  >
                    {editingCell?.pack === row.pack && editingCell?.field === field ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSave();
                          if (e.key === "Escape") handleCancel();
                        }}
                        className="w-24 px-2 py-1 border border-red-500 rounded"
                        autoFocus
                      />
                    ) : (
                      `₨${row[field].toLocaleString()}`
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₨{row.gp.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.gsrPercentNsr.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-700">
                  {row.gpPercentNsr.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

