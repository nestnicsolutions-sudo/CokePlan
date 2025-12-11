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
} from "lucide-react";

const navigation = [
  { name: "Demand Planning", href: "/demand-planning", icon: TrendingUp },
  { name: "Supply Planning", href: "/supply-planning", icon: Package },
  { name: "Warehouse Optimization", href: "/warehouse-optimization", icon: Warehouse },
  { name: "Financial Projections", href: "/financial-projections", icon: DollarSign },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-black text-white h-screen fixed left-0 top-0">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800 pt-2">
        <Image
          src="/Images/Logo/cola-logo.png"
          alt="Coca-Cola Logo"
          width={160}
          height={40}
          className="object-contain"
          priority
        />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

