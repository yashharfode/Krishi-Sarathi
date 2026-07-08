"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Target, LineChart, Beaker, User } from "lucide-react";
import { cn } from "@/core/utils";

const BOTTOM_NAV_ITEMS = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Strategy", href: "/dashboard/strategy", icon: Target },
  { name: "Planner", href: "/dashboard/planner", icon: LineChart },
  { name: "Simulator", href: "/dashboard/simulator", icon: Beaker },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center justify-around px-2 pb-safe z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      {BOTTOM_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-full transition-all duration-300",
              isActive ? "bg-primary/10" : "bg-transparent"
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
