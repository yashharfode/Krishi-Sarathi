"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, Target, Beaker, Leaf, FileText, Settings, User } from "lucide-react";
import { cn } from "@/core/utils";
import { Badge } from "@/shared/components/ui/badge";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "AI Strategy", href: "/dashboard/strategy", icon: Target },
  { name: "Profit Planner", href: "/dashboard/planner", icon: LineChart },
  { name: "Simulator", href: "/dashboard/simulator", icon: Beaker },
  { name: "Farm DNA", href: "/dashboard/farm", icon: Leaf },
  { name: "Organic", href: "/dashboard/organic", icon: Leaf },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card h-screen sticky top-0">
      <div className="p-4 md:p-6 pb-2 md:pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg md:text-xl leading-tight">KrishiSarathi</h1>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              AI Decision OS
            </p>
          </div>
        </Link>
      </div>
      <div className="px-6 pb-6">
        <Badge variant="outline" className="w-full justify-center bg-primary/5 text-[10px] text-primary border-primary/20">
          Hackathon Demo (Local AI)
        </Badge>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Menu</div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <User className="w-5 h-5" />
          Profile
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
