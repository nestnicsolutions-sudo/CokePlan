"use client";

import { Calendar, User, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
  title: string;
  onMenuClick?: () => void;
}

export function TopBar({ title, onMenuClick }: TopBarProps) {
  const [user, setUser] = useState<"Lubaba" | "Faizan">("Lubaba");
  const toggleUser = () => {
    setUser((u) => (u === "Lubaba" ? "Faizan" : "Lubaba"));
  };

  return (
    <div className="h-14 lg:h-16 fixed top-0 left-0 lg:left-64 right-0 z-20 px-2 lg:px-6 flex items-center justify-between text-white">
      <div className="glass flex items-center justify-between w-full h-12 px-2 lg:px-4">
        <div className="flex items-center space-x-2 lg:space-x-3">
          <button
            className="lg:hidden p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-sm md:text-lg lg:text-xl font-semibold truncate max-w-[150px] sm:max-w-none">{title}</h2>
        </div>
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="hidden sm:flex items-center space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur hover:border-red-400 transition">
            <Calendar className="h-3 lg:h-4 w-3 lg:w-4 text-white" />
            <span className="text-xs lg:text-sm text-white">Jan 2025</span>
          </div>
          <button
            onClick={toggleUser}
            className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur hover:border-red-400 transition"
          >
            <div className="h-6 lg:h-8 w-6 lg:w-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40">
              <User className="h-3 lg:h-5 w-3 lg:w-5 text-white" />
            </div>
            <span className="hidden sm:inline text-xs lg:text-sm font-medium text-white">{user}</span>
            <ChevronDown className="hidden sm:inline h-3 lg:h-4 w-3 lg:w-4 text-white/80" />
          </button>
        </div>
      </div>
    </div>
  );
}

