"use client";

import { cn } from "@/lib/utils";

interface TabNavProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === tab.id
                ? "border-red-600 text-red-700"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

