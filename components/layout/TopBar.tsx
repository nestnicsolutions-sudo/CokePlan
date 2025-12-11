"use client";

import { Calendar, User } from "lucide-react";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  return (
    <div className="h-16 bg-black border-b border-black flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10 text-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 px-3 py-2 border border-red-400 rounded-md cursor-pointer hover:bg-red-700/60">
          <Calendar className="h-4 w-4 text-white" />
          <span className="text-sm text-white">Jan 2025</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-white">John Doe</span>
        </div>
      </div>
    </div>
  );
}

