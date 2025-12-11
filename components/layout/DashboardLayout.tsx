"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen text-white bg-transparent">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 w-full">
        <TopBar title={title} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="pt-16 lg:pt-20 p-2 sm:p-4 lg:p-6 overflow-x-hidden min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

