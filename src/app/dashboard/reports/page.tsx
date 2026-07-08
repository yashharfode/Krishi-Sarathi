"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  Bell, Sun, MapPin, ChevronDown, Download, Calendar, 
  TrendingUp, TrendingDown, PieChart, Activity, CheckCircle2, 
  Leaf, Droplet, LineChart as LineChartIcon, ShieldCheck, 
  ArrowRight, FileText, CloudRain, ThermometerSun, Thermometer, MoreHorizontal
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell, Legend
} from "recharts";
import { useEffect, useState } from "react";
import { WeatherService } from "@/services/weather.service";

// Mock Data
const KPI_DATA = [
  { title: "Total Profit", value: "₹ 68,450", trend: "+18.4%", icon: IndianRupeeIcon, color: "text-green-500", bg: "bg-green-500/10", data: [30, 40, 45, 50, 49, 60, 70, 90, 100] },
  { title: "Total Revenue", value: "₹ 1,08,250", trend: "+15.7%", icon: PieChart, color: "text-blue-500", bg: "bg-blue-500/10", data: [40, 50, 48, 60, 65, 70, 80, 85, 100] },
  { title: "Total Cost", value: "₹ 39,800", trend: "+9.2%", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10", data: [20, 25, 30, 28, 35, 40, 45, 50, 60] },
  { title: "Average Yield", value: "7.2 Q/acre", trend: "+11.1%", icon: Leaf, color: "text-orange-500", bg: "bg-orange-500/10", data: [30, 35, 40, 45, 50, 60, 70, 80, 90] },
  { title: "AI Accuracy", value: "87%", trend: "+6%", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10", data: [60, 65, 70, 75, 80, 82, 85, 87, 90] },
];

const TREND_DATA = [
  { date: 'Apr 1', profit: 30000, revenue: 60000, cost: 30000 },
  { date: 'Apr 6', profit: 35000, revenue: 65000, cost: 30000 },
  { date: 'Apr 11', profit: 40000, revenue: 75000, cost: 35000 },
  { date: 'Apr 16', profit: 45000, revenue: 85000, cost: 40000 },
  { date: 'Apr 21', profit: 55000, revenue: 95000, cost: 40000 },
  { date: 'Apr 26', profit: 60000, revenue: 105000, cost: 45000 },
  { date: 'Apr 30', profit: 68450, revenue: 108250, cost: 39800 },
];

const CROP_DATA = [
  { name: 'Soybean', value: 1.0, profit: 28450, percent: 41, color: '#22c55e' },
  { name: 'Maize', value: 0.8, profit: 21300, percent: 31, color: '#eab308' },
  { name: 'Paddy', value: 0.5, profit: 12600, percent: 19, color: '#3b82f6' },
  { name: 'Vegetables', value: 0.2, profit: 5900, percent: 9, color: '#a855f7' },
];

const INSIGHTS = [
  { title: "Profit Increased", desc: "Your profit has increased by 18.4% compared to last month.", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Good Rainfall Impact", desc: "Rainfall was optimal this month with 85% irrigation efficiency.", icon: Droplet, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "High Market Demand", desc: "Soybean and Maize demand increased by 12%.", icon: LineChartIcon, color: "text-orange-500", bg: "bg-orange-500/10" },
  { title: "Cost Optimization", desc: "Fertilizer cost reduced by 8% through smart planning.", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "AI Accuracy Improved", desc: "AI recommendations accuracy improved by 6% this month.", icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const RECENT_REPORTS = [
  { name: "Monthly Performance Report", period: "Apr 1 - Apr 30, 2025", generated: "Apr 30, 2025 08:30 AM", type: "Performance" },
  { name: "Crop Analysis Report", period: "Apr 1 - Apr 30, 2025", generated: "Apr 30, 2025 08:30 AM", type: "Crop" },
  { name: "Financial Summary Report", period: "Apr 1 - Apr 30, 2025", generated: "Apr 30, 2025 08:30 AM", type: "Financial" },
  { name: "AI Recommendations Report", period: "Apr 1 - Apr 30, 2025", generated: "Apr 30, 2025 08:30 AM", type: "AI" },
];

const DOWNLOADS = [
  { title: "Performance Report (PDF)", desc: "Detailed farm performance analysis" },
  { title: "Financial Report (PDF)", desc: "Income, expenses and profit breakdown" },
  { title: "Crop Report (PDF)", desc: "Crop wise yield and profit analysis" },
  { title: "AI Recommendations Report (PDF)", desc: "AI insights and action plan" },
];

function IndianRupeeIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/>
    </svg>
  );
}

export default function ReportsPage() {
  const [weather, setWeather] = useState<{temperature: number, humidity: number, windSpeed: number, precipitation: number} | null>(null);

  useEffect(() => {
    WeatherService.getCurrentWeather().then(setWeather);
  }, []);

  return (
    <div className="space-y-6 pb-24 md:pb-6 text-foreground">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Insights, analysis and performance reports for smarter farming decisions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-secondary/50 border border-border/50 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-secondary transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            Farm 1 - Korba, CG
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-2" />
          </div>
          <div className="flex items-center gap-2 bg-background border border-border/50 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-secondary transition-colors">
            Apr 1 - Apr 30, 2025
            <Calendar className="w-4 h-4 text-muted-foreground ml-2" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm rounded-xl px-4 py-2 h-auto flex items-center gap-2">
            Export Report <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-none hidden md:flex">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-none hidden md:flex">
            <Sun className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-border/50 overflow-x-auto scrollbar-hide text-sm">
        <div className="px-4 py-3 border-b-2 border-primary text-primary font-medium whitespace-nowrap">Overview</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium cursor-pointer transition-colors whitespace-nowrap">Crop Performance</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium cursor-pointer transition-colors whitespace-nowrap">Financial Summary</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium cursor-pointer transition-colors whitespace-nowrap">Input Usage</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium cursor-pointer transition-colors whitespace-nowrap">Weather Impact</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium cursor-pointer transition-colors whitespace-nowrap">AI Recommendations</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium cursor-pointer transition-colors whitespace-nowrap">Custom Report</div>
      </div>

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {KPI_DATA.map((kpi, index) => (
          <Card key={index} className="border-border/40 shadow-sm bg-card/40 flex flex-col justify-between overflow-hidden">
            <CardContent className="p-4 flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${kpi.bg}`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-0.5">{kpi.title}</p>
              <h3 className="text-xl font-bold">{kpi.value}</h3>
              <p className="text-[10px] text-green-500 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> {kpi.trend} <span className="text-muted-foreground font-normal">vs last month</span>
              </p>
            </CardContent>
            {/* Sparkline */}
            <div className="h-10 w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpi.data.map((val, i) => ({ val, i }))}>
                  <Line type="monotone" dataKey="val" stroke={kpi.color === 'text-green-500' ? '#22c55e' : kpi.color === 'text-blue-500' ? '#3b82f6' : kpi.color === 'text-purple-500' ? '#a855f7' : kpi.color === 'text-orange-500' ? '#f97316' : '#10b981'} strokeWidth={2} dot={{ r: 2, fill: "currentColor" }} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Profit Trend (Main Chart) */}
        <Card className="border-border/40 shadow-sm bg-card/30 lg:col-span-2">
          <CardHeader className="pb-0 pt-5 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Profit Trend</CardTitle>
            <div className="flex items-center gap-2 bg-background border px-3 py-1.5 rounded-lg text-xs cursor-pointer hover:border-primary/50 transition-colors">
              This Month <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
            </div>
          </CardHeader>
          <CardContent className="p-5 h-[280px] flex flex-col">
            {/* Custom Legend */}
            <div className="flex gap-4 text-[10px] font-medium text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Profit (₹)</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Revenue (₹)</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400"></div> Cost (₹)</div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(val) => `₹${val/1000}K`} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} labelStyle={{ color: 'hsl(var(--foreground))' }} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6" }} />
                <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e" }} />
                <Line type="monotone" dataKey="cost" stroke="#f87171" strokeWidth={2} dot={{ r: 3, fill: "#f87171" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crop Performance Summary */}
        <Card className="border-border/40 shadow-sm bg-card/30">
          <CardHeader className="pb-0 pt-5 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">Crop Performance Summary</CardTitle>
            <span className="text-[10px] text-primary font-medium hover:underline cursor-pointer flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></span>
          </CardHeader>
          <CardContent className="p-5 flex flex-col md:flex-row items-center gap-6 h-[280px]">
            <div className="w-40 h-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={CROP_DATA} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                    {CROP_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">Total</span>
                <span className="text-xl font-bold">2.5</span>
                <span className="text-[10px] text-muted-foreground">Acres</span>
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-3">
              {CROP_DATA.map((crop, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: crop.color }}></div>
                    <span className="font-semibold">{crop.name}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-12 text-right">{crop.value} Acre</span>
                    <span className="w-14 font-semibold text-right">₹ {crop.profit.toLocaleString()}</span>
                    <span className="w-8 text-right text-muted-foreground">{crop.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Summary */}
        <Card className="border-border/40 shadow-sm bg-card/30">
          <CardHeader className="pb-4 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Report Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 h-[280px] flex flex-col">
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-green-500/10 rounded-lg text-green-500 shrink-0"><Leaf className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Best Performing Crop</p>
                  <h4 className="font-bold text-sm">Soybean</h4>
                  <p className="text-[10px] text-green-500">₹ 28,450 Profit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500 shrink-0"><TrendingUp className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Highest Yield</p>
                  <h4 className="font-bold text-sm">Maize</h4>
                  <p className="text-[10px] text-blue-500">8.2 Q/acre</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-purple-500/10 rounded-lg text-purple-500 shrink-0"><Activity className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Lowest Cost</p>
                  <h4 className="font-bold text-sm">Vegetables</h4>
                  <p className="text-[10px] text-purple-500">₹ 5,900 Total</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500 shrink-0"><PieChart className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Highest ROI</p>
                  <h4 className="font-bold text-sm">Soybean</h4>
                  <p className="text-[10px] text-orange-500">135%</p>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-border/50 text-center mt-2">
              <span className="text-[10px] text-primary font-medium hover:underline cursor-pointer flex items-center justify-center gap-1">
                View Full Summary <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Highlights Horizontal Scroll */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Insights & Highlights</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {INSIGHTS.map((item, index) => (
            <div key={index} className="flex-none w-[280px] snap-center bg-card/40 border border-border/40 rounded-xl p-4 flex gap-3 hover:border-primary/30 transition-colors">
              <div className={`p-2 rounded-lg shrink-0 h-fit ${item.bg}`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <h4 className="text-xs font-semibold mb-1">{item.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Recent Reports Table & Weather Impact */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recent Reports */}
            <Card className="border-border/40 shadow-sm bg-card/30">
              <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary/20 text-muted-foreground text-[10px]">
                      <tr>
                        <th className="px-5 py-3 font-medium">Report Name</th>
                        <th className="px-5 py-3 font-medium">Period</th>
                        <th className="px-5 py-3 font-medium hidden md:table-cell">Generated On</th>
                        <th className="px-5 py-3 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {RECENT_REPORTS.map((row, i) => (
                        <tr key={i} className="hover:bg-secondary/10 transition-colors">
                          <td className="px-5 py-3 font-medium">{row.name}</td>
                          <td className="px-5 py-3 text-muted-foreground">{row.period}</td>
                          <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{row.generated}</td>
                          <td className="px-5 py-3 text-right flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:bg-primary/10 hover:text-primary"><Download className="w-3.5 h-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-secondary"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Weather Impact */}
            <Card className="border-border/40 shadow-sm bg-card/30">
              <CardHeader className="pb-4 pt-5 px-5">
                <CardTitle className="text-sm font-semibold">Weather Impact</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-6 flex flex-col h-full justify-between pb-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><CloudRain className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">Total Rainfall</p>
                      <p className="font-bold text-sm">112 mm</p>
                      <p className="text-[9px] text-green-500 flex items-center gap-0.5 mt-0.5"><TrendingUp className="w-2.5 h-2.5" /> 12% vs last month</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg"><Calendar className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-0.5">Rainy Days</p>
                      <p className="font-bold text-sm">8 Days</p>
                      <p className="text-[9px] text-green-500 flex items-center gap-0.5 mt-0.5"><TrendingUp className="w-2.5 h-2.5" /> 1 day vs last month</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-border/50 bg-background/50 rounded-xl p-4">
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg"><ThermometerSun className="w-5 h-5" /></div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">Current Temp</p>
                        <p className="font-bold text-sm">{weather ? `${weather.temperature}°C` : '...'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-border/50 bg-background/50 rounded-xl p-4">
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><CloudRain className="w-5 h-5" /></div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">Precipitation</p>
                        <p className="font-bold text-sm">{weather ? `${weather.precipitation} mm` : '...'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-border/50 bg-background/50 rounded-xl p-4">
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg"><Thermometer className="w-5 h-5" /></div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">Humidity</p>
                        <p className="font-bold text-sm">{weather ? `${weather.humidity}%` : '...'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-border/50 bg-background/50 rounded-xl p-4">
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg"><Activity className="w-5 h-5" /></div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">Wind Speed</p>
                        <p className="font-bold text-sm">{weather ? `${weather.windSpeed} km/h` : '...'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center mt-auto">
                  <Button variant="ghost" className="w-full text-[10px] text-primary hover:bg-primary/10 hover:text-primary">
                    View Weather Report <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar (Download Reports) */}
        <Card className="border-border/40 shadow-sm bg-card/30 lg:col-span-1">
          <CardHeader className="pb-4 pt-5 px-5">
            <CardTitle className="text-sm font-semibold flex items-center gap-2"><Download className="w-4 h-4 text-muted-foreground" /> Download Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 h-full flex flex-col pb-6">
            <div className="space-y-4 flex-1">
              {DOWNLOADS.map((doc, i) => (
                <div key={i} className="flex gap-3 items-start group cursor-pointer">
                  <div className="mt-0.5 p-1.5 bg-secondary/50 rounded text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold group-hover:text-primary transition-colors">{doc.title}</h5>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-auto">
              <Button variant="outline" className="w-full text-xs">
                View All Reports <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
