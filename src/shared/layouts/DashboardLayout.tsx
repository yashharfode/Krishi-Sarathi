import { DesktopSidebar } from "@/features/dashboard/components/DesktopSidebar";
import { MobileBottomNav } from "@/features/dashboard/components/MobileBottomNav";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0 relative">
        {/* Top Header for Mobile only (Optional but good for UX) */}
        <header className="md:hidden h-16 border-b flex items-center px-4 bg-background sticky top-0 z-40">
          <span className="font-semibold text-lg tracking-tight">KrishiSarathi</span>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
