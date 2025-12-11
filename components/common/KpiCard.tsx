import type { KpiCard as KpiCardType } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  kpi: KpiCardType;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const getTrendIcon = () => {
    if (kpi.trend === "up") return <TrendingUp className="h-4 w-4 text-white" />;
    if (kpi.trend === "down") return <TrendingDown className="h-4 w-4 text-white/80" />;
    return <Minus className="h-4 w-4 text-white/80" />;
  };

  const getChangeColor = () => {
    if (kpi.change === undefined) return "text-white";
    if (kpi.change > 0) return "text-white";
    if (kpi.change < 0) return "text-white/80";
    return "text-white";
  };

  return (
    <div className="glass bg-red-600/80 border border-red-500/60 rounded-xl p-4 lg:p-6 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-xs lg:text-sm font-medium text-white/90">{kpi.title}</h3>
        {kpi.trend && getTrendIcon()}
      </div>
      <div className="mt-2">
        <p className="text-xl lg:text-2xl font-semibold text-white">{kpi.value}</p>
        {kpi.change !== undefined && kpi.changeLabel && (
          <p className={`text-xs lg:text-sm mt-1 ${getChangeColor()}`}>
            {kpi.change > 0 ? "+" : ""}
            {kpi.change}% {kpi.changeLabel}
          </p>
        )}
      </div>
    </div>
  );
}

