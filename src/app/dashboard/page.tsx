import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Droplets, Target, CloudRain } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Good Morning, Ramesh 👋</h1>
        <p className="text-muted-foreground mt-1">Betul, Madhya Pradesh</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full md:col-span-2 lg:col-span-2 bg-primary text-primary-foreground border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium opacity-90">AI Farm Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-5xl font-bold">82</span>
                <span className="text-xl opacity-80">/100</span>
                <p className="text-sm opacity-90 mt-2">Optimal conditions for Kharif season.</p>
              </div>
              <div className="h-16 w-16 rounded-full border-4 border-primary-foreground/30 flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Water Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl dark:bg-blue-900/30 dark:text-blue-400">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">Good</div>
                <p className="text-xs text-muted-foreground">Soil moisture at 42%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weather Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/20 text-accent-foreground rounded-xl">
                <CloudRain className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">Rain</div>
                <p className="text-xs text-muted-foreground">Expected tomorrow (70%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Today&apos;s AI Decisions</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            View all
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-start gap-4">
               <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg shrink-0 dark:bg-blue-900/30 dark:text-blue-400">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-sm">No Irrigation Today</h4>
                <p className="text-sm text-muted-foreground">Save water. Rain is expected tomorrow with 70% probability.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-start gap-4">
               <div className="p-2.5 bg-orange-100 text-orange-600 rounded-lg shrink-0 dark:bg-orange-900/30 dark:text-orange-400">
                <Target className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-sm">Spray Recommended</h4>
                <p className="text-sm text-muted-foreground">High risk of Fall Armyworm detected in Maize for your region.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-4">
        <Link href="/dashboard/strategy">
          <Button className="w-full md:w-auto rounded-xl px-8 h-12 shadow-sm hover:shadow-md transition-all group">
            View My Farm Strategy
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
