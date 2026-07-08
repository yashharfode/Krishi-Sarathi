"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Bell, Sun, MapPin, ChevronDown, Sparkles, TrendingUp, TrendingDown,
  PieChart, Activity, CheckCircle2, ShieldCheck, Sprout, FlaskConical,
  Bug, Users, Droplet, Tractor, MoreHorizontal, Info, ArrowRight,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { useState } from "react";

// --- Mock Data ---
const COST_BREAKDOWN = [
  { category: "Seeds", icon: Sprout, amount: 6200, percentage: 15.6, color: "bg-green-500" },
  { category: "Fertilizers", icon: FlaskConical, amount: 10800, percentage: 27.1, color: "bg-green-600" },
  { category: "Pesticides", icon: Bug, amount: 4900, percentage: 12.3, color: "bg-green-400" },
  { category: "Labor", icon: Users, amount: 7500, percentage: 18.8, color: "bg-green-500" },
  { category: "Irrigation", icon: Droplet, amount: 3200, percentage: 8.0, color: "bg-blue-500" },
  { category: "Machinery", icon: Tractor, amount: 3200, percentage: 8.0, color: "bg-green-600" },
  { category: "Others", icon: MoreHorizontal, amount: 4000, percentage: 10.2, color: "bg-green-700" },
];

const PROJECTION_DATA = [
  { yield: 2, profit: -25000 },
  { yield: 4, profit: 0 },
  { yield: 6, profit: 25000 },
  { yield: 8, profit: 50000 },
  { yield: 10, profit: 68450 },
  { yield: 12, profit: 90000 },
  { yield: 14, profit: 110000 },
];

const COST_RETURN_DATA = [
  { yield: "4", cost: 39800, return: 25000 },
  { yield: "6", cost: 39800, return: 50000 },
  { yield: "8", cost: 39800, return: 75000 },
  { yield: "10", cost: 39800, return: 108250 },
  { yield: "12", cost: 39800, return: 130000 },
  { yield: "14", cost: 39800, return: 150000 },
];

const ACTIONS = [
  { title: "Buy seeds before 5 June", desc: "Best quality seeds available" },
  { title: "First irrigation after 18-20 days", desc: "Ensure good germination" },
  { title: "Use recommended fertilizers", desc: "For maximum yield" },
  { title: "Monitor pest in flowering stage", desc: "Follow IPM practices" },
];

export default function ProfitPlannerPage() {
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => setIsRecalculating(false), 1000);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6 text-foreground">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">Profit Planner</h1>
            <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-none font-semibold">
              <Sparkles className="w-3 h-3 mr-1" /> AI Powered
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Plan your season, estimate profit, and make smarter decisions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-secondary/50 border border-border/50 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-secondary transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            Farm 1 - Korba, CG
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-2" />
          </div>
          <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-none">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-secondary/50 border-none">
            <Sun className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Control Bar */}
      <Card className="border-border/40 bg-card/50 shadow-sm">
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Season</label>
            <div className="flex items-center justify-between bg-background border px-3 py-2.5 rounded-xl text-sm cursor-pointer hover:border-primary/50 transition-colors">
              <span>Kharif 2025</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Crop</label>
            <div className="flex items-center justify-between bg-background border px-3 py-2.5 rounded-xl text-sm cursor-pointer hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2"><span className="text-lg">🫛</span> Soybean</div>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Land Area</label>
            <div className="flex items-center justify-between bg-background border px-3 py-2.5 rounded-xl text-sm cursor-pointer hover:border-primary/50 transition-colors">
              <span>2.5 Acres</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Irrigation</label>
            <div className="flex items-center justify-between bg-background border px-3 py-2.5 rounded-xl text-sm cursor-pointer hover:border-primary/50 transition-colors">
              <span>Drip Irrigation</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
          <Button 
            className="w-full h-[42px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
            onClick={handleRecalculate}
            disabled={isRecalculating}
          >
            {isRecalculating ? "Calculating..." : "Recalculate Plan"}
            {!isRecalculating && <Activity className="w-4 h-4 ml-2" />}
          </Button>
        </CardContent>
      </Card>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <Card className="border-border/40 shadow-sm bg-card/40 hover:border-primary/30 transition-colors col-span-2 lg:col-span-1">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-serif font-bold text-xl text-primary">₹</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-500">
                <TrendingUp className="w-3 h-3" /> 18.4%
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Estimated Profit</p>
              <h3 className="text-2xl font-bold">₹ 68,450</h3>
              <p className="text-[10px] text-muted-foreground mt-1 flex justify-between">
                <span>per 2.5 acres</span>
                <span>vs last year</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm bg-card/40 hover:border-primary/30 transition-colors">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-500">
                <TrendingUp className="w-3 h-3" /> 6%
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Profit Margin</p>
              <h3 className="text-2xl font-bold">42%</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Good</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm bg-card/40 hover:border-primary/30 transition-colors">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-red-500">
                <TrendingDown className="w-3 h-3" /> 1.1
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Break Even Yield</p>
              <h3 className="text-2xl font-bold">7.2</h3>
              <p className="text-[10px] text-muted-foreground mt-1 flex justify-between">
                <span>Quintal per acre</span>
                <span>vs last year</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm bg-card/40 hover:border-primary/30 transition-colors">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-500">
                <TrendingUp className="w-3 h-3" /> 22%
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">ROI</p>
              <h3 className="text-2xl font-bold">132%</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Return on Investment</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm bg-card/40 hover:border-primary/30 transition-colors">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Risk Level</p>
              <h3 className="text-2xl font-bold text-green-500">Low</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Stable Conditions</p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Data) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cost Breakdown */}
            <Card className="border-border/40 shadow-sm bg-card/30">
              <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  Cost Breakdown <Info className="w-4 h-4 text-muted-foreground" />
                </CardTitle>
                <span className="text-sm font-bold">Total Cost: <span className="text-primary">₹ 39,800</span></span>
              </CardHeader>
              <CardContent className="p-5 pt-2">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-4 uppercase tracking-wider font-semibold">
                  <span>Category</span>
                  <div className="flex gap-8">
                    <span>Amount (₹)</span>
                    <span>% of Total</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {COST_BREAKDOWN.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 w-1/3">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{item.category}</span>
                      </div>
                      <div className="flex items-center justify-between flex-1 pl-4">
                        <span className="font-semibold">{item.amount.toLocaleString()}</span>
                        <div className="flex items-center gap-3 w-1/2 justify-end">
                          <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden shrink-0">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground w-8 text-right">{item.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-6">* Costs are estimated based on your location and farm profile.</p>
              </CardContent>
            </Card>

            {/* Profit Projection Chart */}
            <Card className="border-border/40 shadow-sm bg-card/30 flex flex-col">
              <CardHeader className="pb-2 pt-5 px-5 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  Profit Projection <Info className="w-4 h-4 text-muted-foreground" />
                </CardTitle>
                <div className="flex bg-secondary rounded-lg p-0.5">
                  <div className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-md shadow-sm">By Yield</div>
                  <div className="px-3 py-1 text-xs font-semibold text-muted-foreground cursor-pointer">By Price</div>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 flex-1 flex flex-col">
                <div className="h-[200px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={PROJECTION_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                      <XAxis dataKey="yield" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(val) => `${val/1000}K`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                        formatter={(value: any) => [`₹ ${Number(value || 0).toLocaleString()}`, 'Profit']}
                        labelFormatter={(label) => `Yield: ${label} Q/acre`}
                      />
                      <Line type="monotone" dataKey="profit" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-border/50">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Break Even</p>
                    <p className="font-semibold text-sm text-foreground">7.2 Q/acre</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Min Profit</p>
                    <p className="font-bold text-sm text-primary">₹ 8,200</p>
                    <p className="text-[10px] text-muted-foreground">at 7.5 Q/acre</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Max Profit</p>
                    <p className="font-bold text-sm text-primary">₹ 1,05,300</p>
                    <p className="text-[10px] text-muted-foreground">at 13 Q/acre</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cost vs Return */}
            <Card className="border-border/40 shadow-sm bg-card/30">
              <CardHeader className="pb-0 pt-5 px-5">
                <CardTitle className="text-sm font-semibold">Cost vs Return</CardTitle>
              </CardHeader>
              <CardContent className="p-5 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COST_RETURN_DATA} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="yield" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(val) => `${val/1000}K`} />
                    <Tooltip cursor={{ fill: 'hsl(var(--secondary)/0.5)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="cost" name="Total Cost" fill="hsl(var(--destructive)/0.7)" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="return" name="Total Return" fill="hsl(var(--primary)/0.7)" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Scenario Summary */}
            <Card className="border-border/40 shadow-sm bg-card/30">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-sm font-semibold">Scenario Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 flex gap-3 h-[220px]">
                
                <div className="flex-1 border border-border/50 bg-secondary/20 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-colors">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Conservative</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">Low Yield (7 Q/acre)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-0.5">Profit</p>
                    <p className="font-bold text-base text-foreground">₹ 24,800</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-green-500">
                    <CheckCircle2 className="w-3 h-3" /> Low Risk
                  </div>
                </div>

                <div className="flex-1 border border-primary/50 bg-primary/10 rounded-xl p-3 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -z-10"></div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1"><Sparkles className="w-3 h-3" /> Most Likely</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">Expected (10 Q/acre)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-primary mb-0.5 font-medium">Profit</p>
                    <p className="font-bold text-lg text-primary">₹ 68,450</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-green-500">
                    <CheckCircle2 className="w-3 h-3" /> Low Risk
                  </div>
                </div>

                <div className="flex-1 border border-border/50 bg-secondary/20 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-colors">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Optimistic</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">High Yield (13 Q/acre)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-0.5">Profit</p>
                    <p className="font-bold text-base text-foreground">₹ 1,05,300</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-orange-500">
                    <ShieldCheck className="w-3 h-3" /> Medium Risk
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>

        {/* Right Column (Sidebar Insights) */}
        <div className="space-y-6">
          <Card className="border-border/40 shadow-sm bg-card/40">
            <CardHeader className="pb-4 pt-5 px-5">
              <CardTitle className="text-sm font-semibold">Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-5">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">High Profit Potential</h4>
                  <p className="text-xs text-muted-foreground mt-1">Expected profit is 18.4% higher than last year for the same season.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Droplet className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Low Water Requirement</h4>
                  <p className="text-xs text-muted-foreground mt-1">Drip irrigation reduces water usage by 35%.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Stable Market</h4>
                  <p className="text-xs text-muted-foreground mt-1">Soybean prices are expected to remain stable for the next 4 months.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Optimal Choice</h4>
                  <p className="text-xs text-muted-foreground mt-1">Based on soil, weather, and market conditions, this is a good choice.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 shadow-sm bg-primary/5">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> AI Recommendation
                </h4>
                <Badge className="bg-primary/20 text-primary border-none hover:bg-primary/30">Best Choice</Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Soybean is a profitable option for your farm this season. Follow the recommended sowing window and input plan for maximum returns.
              </p>
              <Button className="w-full text-xs h-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                View AI Strategy <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/40 shadow-sm bg-card/40">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-semibold">Action Plan</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              {ACTIONS.map((action, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold">{action.title}</h5>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{action.desc}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="ghost" className="w-full text-xs text-primary hover:text-primary hover:bg-primary/10">
                  View Full Plan <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Footer Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border border-border/50 rounded-2xl bg-secondary/20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <p>This plan is created using AI analysis of your farm profile, historical data, current market trends, and weather forecast.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <span className="font-medium text-foreground">Model Confidence</span>
          <div className="w-32 h-1.5 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-[87%]"></div>
          </div>
          <span className="font-bold text-foreground">87%</span>
        </div>
      </div>

    </div>
  );
}
