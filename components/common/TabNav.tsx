"use client";

import { cn } from "@/lib/utils";

interface TabNavProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="mb-4 lg:mb-6">
      <nav className="flex space-x-2 lg:space-x-4 overflow-x-auto pb-2 scrollbar-hide" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "whitespace-nowrap py-2 px-3 lg:px-4 rounded-full text-xs lg:text-sm font-medium transition-all flex-shrink-0",
              activeTab === tab.id
                ? "bg-red-600 text-white shadow-lg"
                : "glass text-gray-100 hover:text-white hover:border-red-500/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

