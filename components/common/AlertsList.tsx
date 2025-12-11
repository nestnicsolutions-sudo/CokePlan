import type { DemandAlert } from "@/lib/types";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { format } from "date-fns";

interface AlertsListProps {
  alerts: DemandAlert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  const getSeverityIcon = (severity: DemandAlert["severity"]) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case "low":
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSeverityBadgeColor = (severity: DemandAlert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-red-50 text-red-600";
      case "low":
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadgeColor(
                      alert.severity
                    )}`}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(alert.timestamp), "MMM d, yyyy HH:mm")}
                  </span>
                </div>
                <p className="text-sm text-gray-900">{alert.message}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {alert.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

