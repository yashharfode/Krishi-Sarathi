"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Bell, Sun, MapPin, ChevronDown, Sparkles, TrendingUp, Info,
  Leaf, Droplet, LineChart, CloudSun, ShieldAlert,
  ArrowRight, CheckCircle2, ChevronRight, Sprout, ShieldCheck,
  Lightbulb, ShoppingCart, Activity, RefreshCcw
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { StrategyService } from "@/services/strategy.service";

// Mock Data
const KEY_FACTORS = [
  { label: "Soil Health", value: 85, status: "Good", icon: Leaf, color: "text-green-500" },
  { label: "Water Availability", value: 70, status: "Moderate", icon: Droplet, color: "text-blue-500" },
  { label: "Market Demand", value: 88, status: "High", icon: LineChart, color: "text-indigo-500" },
  { label: "Weather Outlook", value: 80, status: "Favorable", icon: CloudSun, color: "text-yellow-500" },
  { label: "Risk Level", value: 25, status: "Low Risk", icon: ShieldAlert, color: "text-purple-500" },
];

const INSIGHTS = [
  { title: "High Market Demand", desc: "Soybean demand is projected to rise by 15% and maize by 10% in the next 4 months.", icon: LineChart, color: "text-green-500" },
  { title: "Weather Advantage", desc: "Rainfall forecast is above average this season, ideal for soybean growth.", icon: Droplet, color: "text-blue-500" },
  { title: "Soil Compatibility", desc: "Your soil is well-suited for legumes like soybean and responds well to intercropping.", icon: Sprout, color: "text-emerald-500" },
  { title: "Profit Opportunity", desc: "This strategy offers 18.4% higher profit compared to your last season's average.", icon: Lightbulb, color: "text-orange-500" },
];

const ALTERNATIVES = [
  { rank: 2, name: "Cotton", profit: 61230, score: 78, risk: "Medium Risk", riskColor: "text-orange-500" },
  { rank: 3, name: "Groundnut", profit: 54870, score: 72, risk: "Medium Risk", riskColor: "text-orange-500" },
  { rank: 4, name: "Paddy", profit: 48920, score: 65, risk: "High Risk", riskColor: "text-red-500" },
];

const INPUTS = [
  { name: "Soybean Seeds (JS 335)", desc: "High yield variety", price: "₹ 1,850 /10kg", icon: Sprout },
  { name: "Maize Seeds (HQPM-1)", desc: "Drought tolerant", price: "₹ 1,650 /10kg", icon: Leaf },
  { name: "Bio Fertilizer Pack", desc: "Rhizobium + PSB", price: "₹ 450 /pack", icon: ShieldCheck },
];

const TIMELINE = [
  { title: "Prepare land", time: "within 5 days" },
  { title: "Buy seeds", time: "before 5 June" },
  { title: "Apply base fertilizer", time: "by 10 June" },
  { title: "First irrigation", time: "at 18-20 days" },
  { title: "Monitor pest", time: "weekly" },
];

export default function AIStrategyPage() {
  const [strategy, setStrategy] = useState<any>(null);

  useEffect(() => {
    setStrategy(StrategyService.getStrategy());
  }, []);

  if (!strategy) return null;

  return (
    <div className="space-y-6 pb-24 md:pb-6 text-foreground">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">AI Farm Strategy</h1>
            <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-none font-semibold">
              <Sparkles className="w-3 h-3 mr-1" /> AI Powered
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Personalized recommendations based on your farm profile, data, and real-time insights.</p>
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

      {/* Top KPI Bar */}
      <Card className="border-border/40 shadow-sm bg-card/40">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border/50">
            
            {/* Overall Score */}
            <div className="p-5 flex-1 lg:max-w-[280px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-1">Overall Farm Suitability Score <Info className="w-3.5 h-3.5 text-muted-foreground" /></h3>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-primary">82</span>
                <span className="text-lg font-medium text-muted-foreground mb-1">/100</span>
              </div>
              <p className="text-xs text-primary font-medium mt-1">Excellent Potential</p>
              {/* Mock Line Chart */}
              <div className="w-full h-8 mt-4 flex items-end justify-between">
                {[40, 50, 45, 60, 55, 70, 65, 82].map((h, i) => (
                  <div key={i} className="w-1.5 bg-primary/40 rounded-t-full" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>

            {/* Key Factors */}
            <div className="p-5 flex-[2]">
              <div className="flex items-center gap-1 mb-4">
                <h3 className="text-sm font-semibold">Key Farm Suitability Factors</h3>
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {KEY_FACTORS.map((f, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <f.icon className={`w-3.5 h-3.5 ${f.color}`} />
                      <span className="text-[10px] font-medium uppercase tracking-wider">{f.label}</span>
                    </div>
                    <div className="text-xl font-bold">{f.value}</div>
                    <div className="text-[10px] font-medium text-muted-foreground">{f.status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence */}
            <div className="p-5 flex-1 lg:max-w-[280px] flex flex-col items-end text-right">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-4">
                <RefreshCcw className="w-3 h-3" /> Last updated: Today, 8:30 AM
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-secondary" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-primary" strokeDasharray="87, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-sm font-bold text-foreground">87%</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold">High Confidence</p>
                  <p className="text-[10px] text-primary hover:underline cursor-pointer mt-0.5 flex items-center gap-0.5">How is this calculated? <ArrowRight className="w-2 h-2" /></p>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex items-center border-b border-border/50 overflow-x-auto scrollbar-hide">
        <div className="px-4 py-3 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap">Recommended Strategy</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap">Crop Recommendations</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap">Action Plan</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap">Rationale & Insights</div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Content (Strategy Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Strategy Hero Card */}
          <Card className="border-border/40 shadow-sm bg-card/30 overflow-hidden">
            <CardContent className="p-6 space-y-6">
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">AI Recommended Strategy</h2>
                    <Badge className="bg-primary/20 text-primary border-none hover:bg-primary/30 text-[10px]">Best Fit for Your Farm</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{strategy.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">High profit potential with balanced risk. Ideal for Kharif season in your region.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Stats List */}
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="w-4 h-4" /> Expected Profit</div>
                    <div className="font-semibold text-right flex items-center gap-2">
                      ₹ {(strategy.profit || 0).toLocaleString()} 
                      <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-1 rounded flex items-center"><TrendingUp className="w-2.5 h-2.5 mr-0.5" /> 18.4%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground"><Activity className="w-4 h-4" /> Break Even Yield</div>
                    <div className="font-semibold text-right">7.2 Q/acre</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground"><Info className="w-4 h-4" /> Duration</div>
                    <div className="font-semibold text-right">110 - 115 Days</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground"><Droplet className="w-4 h-4" /> Water Requirement</div>
                    <div className="font-semibold text-right">
                      Moderate <p className="text-[10px] text-muted-foreground font-normal">450 - 500 mm</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground"><ShieldCheck className="w-4 h-4" /> Risk Level</div>
                    <div className="font-semibold text-right text-green-500">
                      {strategy.riskLevel} <p className="text-[10px] text-muted-foreground font-normal text-right">Stable Conditions</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="w-4 h-4" /> Suitability Score</div>
                    <div className="font-semibold text-right">
                      {strategy.suitability}/100 <p className="text-[10px] text-muted-foreground font-normal text-right">Excellent Match</p>
                    </div>
                  </div>
                </div>

                {/* Hero Image / Block */}
                <div className="relative rounded-2xl overflow-hidden h-48 md:h-auto bg-secondary">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-900/40"></div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] px-3 py-1.5 rounded-lg">
                    <span className="font-bold text-primary-foreground">Intercropping Benefit</span><br/>+28% Land Efficiency
                  </div>
                </div>

              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-border/50 items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-primary mb-1">Why this Strategy?</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">This combination optimizes land use, improves soil nitrogen, and leverages strong market demand for both crops.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button variant="outline" className="flex-1 md:flex-none border-border/50 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Compare in Simulator
                  </Button>
                  <Button className="flex-1 md:flex-none bg-primary text-primary-foreground text-xs shadow-sm">
                    View Detailed Plan <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Strategy Snapshot (4 mini cards inside) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Strategy Snapshot</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-border/40 shadow-sm bg-card/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1">Cost Estimate</p>
                    <p className="font-bold text-sm">₹ 39,800</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Total for 2.5 Acres</p>
                  </div>
                  {/* CSS pie chart representation */}
                  <div className="w-8 h-8 rounded-full border-[3px] border-secondary border-t-destructive rotate-45"></div>
                </CardContent>
              </Card>
              <Card className="border-border/40 shadow-sm bg-card/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1">Expected Revenue</p>
                    <p className="font-bold text-sm text-primary">₹ 1,08,250</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">At Expected Yield</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border-[3px] border-secondary border-t-primary -rotate-45"></div>
                </CardContent>
              </Card>
              <Card className="border-border/40 shadow-sm bg-card/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1">Net Profit</p>
                    <p className="font-bold text-sm text-green-500">₹ 68,450</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Expected</p>
                  </div>
                  {/* CSS bar chart */}
                  <div className="flex items-end gap-0.5 h-8">
                    <div className="w-1.5 h-3 bg-secondary rounded-sm"></div>
                    <div className="w-1.5 h-5 bg-secondary rounded-sm"></div>
                    <div className="w-1.5 h-4 bg-green-500/50 rounded-sm"></div>
                    <div className="w-1.5 h-8 bg-green-500 rounded-sm"></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/40 shadow-sm bg-card/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1">ROI</p>
                    <p className="font-bold text-sm">172%</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Return on Investment</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border-[3px] border-primary border-t-transparent border-l-transparent -rotate-12"></div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Next Best Action Timeline */}
          <Card className="border-border/40 shadow-sm bg-card/30">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-semibold">Next Best Action for You</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 overflow-x-auto scrollbar-hide">
              <div className="flex items-center min-w-max pt-2">
                {TIMELINE.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-semibold">{step.title}</p>
                        <p className="text-[9px] text-muted-foreground">{step.time}</p>
                      </div>
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-12 h-px bg-border/50 mx-2 -mt-6">
                        <ChevronRight className="w-3 h-3 text-border mx-auto -mt-1.5 bg-card/30" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* AI Key Insights */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> AI Key Insights</h3>
            <div className="space-y-3">
              {INSIGHTS.map((insight, i) => (
                <div key={i} className="bg-secondary/20 border border-border/40 rounded-xl p-4 flex gap-3 hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="shrink-0 p-2 bg-secondary rounded-lg h-fit">
                    <insight.icon className={`w-4 h-4 ${insight.color}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold mb-1 group-hover:text-primary transition-colors">{insight.title}</h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{insight.desc}</p>
                  </div>
                  <div className="ml-auto shrink-0 self-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity group-hover:text-primary group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Strategies */}
          <Card className="border-border/40 shadow-sm bg-card/30">
            <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Alternative Strategies <span className="text-muted-foreground text-[10px] font-normal ml-1">(Ranked)</span></CardTitle>
              <span className="text-[10px] text-primary hover:underline cursor-pointer">View All</span>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {ALTERNATIVES.map((alt, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">{alt.rank}</div>
                      <span className="text-xs font-semibold">{alt.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-bold">Profit: ₹ {alt.profit.toLocaleString()}</p>
                      <div className="flex items-center gap-2 text-[9px] text-muted-foreground mt-0.5 justify-end">
                        <span>Score: {alt.score}/100</span>
                        <span className="flex items-center gap-0.5"><div className={`w-1.5 h-1.5 rounded-full bg-current ${alt.riskColor}`}></div> {alt.risk}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Inputs */}
          <Card className="border-border/40 shadow-sm bg-card/30">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-semibold">Recommended Inputs</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {INPUTS.map((input, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <input.icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold">{input.name}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{input.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-medium whitespace-nowrap">{input.price}</span>
                      <Button size="icon" variant="outline" className="w-6 h-6 rounded bg-background shrink-0">
                        <ShoppingCart className="w-3 h-3 text-primary" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border/50 text-center">
                <span className="text-[10px] text-primary font-medium hover:underline cursor-pointer flex items-center justify-center gap-1">
                  View All Recommended Inputs <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
}
