"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Package,
  Warehouse,
  DollarSign,
  X,
} from "lucide-react";

const navigation = [
  { name: "Demand Planning", href: "/demand-planning", icon: TrendingUp },
  { name: "Supply Planning", href: "/supply-planning", icon: Package },
  { name: "Warehouse Optimization", href: "/warehouse-optimization", icon: Warehouse },
  { name: "Financial Projections", href: "/financial-projections", icon: DollarSign },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      <div className="glass flex items-center justify-between h-16 px-4 mb-4">
        <Image
          src="/Images/Logo/cola-logo.png"
          alt="Coca-Cola Logo"
          width={140}
          height={35}
          className="object-contain"
          priority
        />
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="text-center px-4 mb-6 pb-4 border-b border-gray-600">
        <h1 className="text-lg font-bold text-red-500 tracking-wide">CokePlan</h1>
        <p className="text-xs text-white/60 mt-1">Supply Chain Dashboard</p>
      </div>
      <nav className="flex-1 px-1 py-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all",
                isActive
                  ? "bg-red-600 text-white shadow-lg"
                  : "glass hover:border-red-500/40 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium text-sm lg:text-base">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 max-w-full text-white h-screen fixed left-0 top-0 px-3 pt-4 pb-6">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          "lg:hidden fixed top-0 left-0 h-screen w-64 bg-gray-900/95 backdrop-blur-xl border-r border-white/10 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full text-white px-3 pt-4 pb-6">
          {sidebarContent}
        </div>
      </div>
    </>
  );
}

