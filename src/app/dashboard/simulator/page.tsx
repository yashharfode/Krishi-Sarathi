"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { 
  Bell, Sun, MapPin, ChevronDown, Sparkles, CheckCircle2, 
  Droplet, TrendingUp, CloudSun, Download, 
  Leaf, ArrowRight, FlaskConical, Users, Sprout, Landmark
} from "lucide-react";

// Mock Data for Scenarios
const SCENARIOS = [
  {
    id: "A",
    crop: "Soybean",
    emoji: "🫛",
    subtitle: "High Yield • Low Input",
    recommended: true,
    profit: 68450,
    margin: "42%",
    cost: 39800,
    revenue: 108250,
    water: "Low",
    waterIcon: <Droplet className="w-4 h-4 text-blue-400" />,
    risk: "Low",
    riskColor: "text-green-500",
    minProfit: 58200,
    maxProfit: 79300,
    progress: 70, // visually for the bar
  },
  {
    id: "B",
    crop: "Maize",
    emoji: "🌽",
    subtitle: "Moderate Yield • Moderate Input",
    recommended: false,
    profit: 54320,
    margin: "34%",
    cost: 48500,
    revenue: 102850,
    water: "Medium",
    waterIcon: <Droplet className="w-4 h-4 text-blue-500 fill-blue-500/20" />,
    risk: "Medium",
    riskColor: "text-orange-500",
    minProfit: 44100,
    maxProfit: 64800,
    progress: 45,
  },
  {
    id: "C",
    crop: "Cotton",
    emoji: "☁️",
    subtitle: "High Return • High Risk",
    recommended: false,
    profit: 71980,
    margin: "28%",
    cost: 68700,
    revenue: 140680,
    water: "High",
    waterIcon: <Droplet className="w-4 h-4 text-blue-600 fill-blue-600" />,
    risk: "High",
    riskColor: "text-red-500",
    minProfit: 40200,
    maxProfit: 105600,
    progress: 85,
  }
];

export default function SimulatorPage() {
  return (
    <div className="space-y-6 pb-24 md:pb-6 text-foreground">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">What-If Simulator</h1>
          <p className="text-muted-foreground text-sm mt-1">Compare different crops, strategies, and scenarios to make the best decision.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-secondary/50 border px-3 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-secondary transition-colors">
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
            <label className="text-xs font-medium text-muted-foreground">Land Area</label>
            <div className="flex items-center justify-between bg-background border px-3 py-2.5 rounded-xl text-sm cursor-pointer hover:border-primary/50 transition-colors">
              <span>2.5 Acres</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Irrigation Type</label>
            <div className="flex items-center justify-between bg-background border px-3 py-2.5 rounded-xl text-sm cursor-pointer hover:border-primary/50 transition-colors">
              <span>Drip Irrigation</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Risk Preference</label>
            <div className="flex items-center justify-between bg-background border px-3 py-2.5 rounded-xl text-sm cursor-pointer hover:border-primary/50 transition-colors">
              <span>Balanced</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
          <Button className="w-full h-[42px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            Run Simulation
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex items-center border-b border-border/50">
        <div className="px-4 py-3 border-b-2 border-primary text-primary font-medium text-sm">Scenario Compare</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors">Advanced Simulation</div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Scenarios */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCENARIOS.map((s) => (
            <Card key={s.id} className={`border-border/40 shadow-sm relative transition-all ${s.recommended ? 'ring-2 ring-primary bg-primary/5' : 'bg-card/40'}`}>
              <CardContent className="p-5 space-y-6">
                
                {/* Scenario Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">Scenario {s.id}</span>
                      {s.recommended && (
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none text-[10px] px-1.5 rounded-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> RECOMMENDED
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold">{s.crop}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.subtitle}</p>
                  </div>
                  <div className="text-4xl">{s.emoji}</div>
                </div>

                {/* Profit Highlight */}
                <div className="flex justify-between items-end border-b border-border/50 pb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Expected Profit</p>
                    <p className="text-2xl font-bold text-primary">₹ {s.profit.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">per 2.5 acres</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Profit Margin</p>
                    <p className="text-xl font-semibold">{s.margin}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
                    <p className="font-semibold">₹ {s.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                    <p className="font-semibold">₹ {s.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Water Usage</p>
                    <div className="flex items-center gap-1.5 font-medium">
                      {s.waterIcon} {s.water}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                    <div className={`flex items-center gap-1.5 font-medium ${s.riskColor}`}>
                      <CheckCircle2 className="w-4 h-4" /> {s.risk}
                    </div>
                  </div>
                </div>

                {/* Profit Range */}
                <div className="pt-2">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Profit Range (90% Confidence)</p>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Min</span>
                    <span>Max</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span>₹ {s.minProfit.toLocaleString()}</span>
                    <span className="text-primary">₹ {s.profit.toLocaleString()}</span>
                    <span>₹ {s.maxProfit.toLocaleString()}</span>
                  </div>
                  {/* Progress Bar visual */}
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden relative">
                    <div className={`absolute top-0 bottom-0 left-[20%] right-[${100 - s.progress}%] bg-primary rounded-full`} style={{ right: `${100 - s.progress}%` }}></div>
                    <div className="absolute top-0 bottom-0 w-1 bg-white dark:bg-black left-1/2"></div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full text-primary border-primary/20 hover:bg-primary/10 transition-colors">
                    View Full Analysis <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right: AI Insights */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/40 bg-card/40 shadow-sm h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex-1 flex flex-col gap-6">
              
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Best Choice
                </div>
                <h4 className="font-bold mb-1">Soybean (Scenario A)</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Provides a balanced combination of good profit, low risk, and low water usage.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-4">Key Factors</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="p-2 bg-secondary rounded-lg shrink-0 h-fit">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold">Market Trend</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Soybean demand is expected to rise by 12%</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-2 bg-secondary rounded-lg shrink-0 h-fit">
                      <CloudSun className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold">Weather Suitability</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">90% suitable conditions for Soybean</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-2 bg-secondary rounded-lg shrink-0 h-fit">
                      <FlaskConical className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold">Soil Compatibility</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Excellent match for your soil type</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-2 bg-secondary rounded-lg shrink-0 h-fit">
                      <Droplet className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold">Water Availability</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Low irrigation requirement is ideal</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4">
                <Button variant="outline" className="w-full">
                  Download Full Report <Download className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Common Assumptions */}
      <Card className="border-border/40 bg-card/30 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">Common Assumptions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-border/50">
          {[
            { label: "Current soil health", value: "Good", icon: <Sprout className="w-4 h-4 text-green-500" /> },
            { label: "Fertilizer cost", value: "As per market rate", icon: <FlaskConical className="w-4 h-4 text-emerald-500" /> },
            { label: "Pesticide cost", value: "As per market rate", icon: <Leaf className="w-4 h-4 text-teal-500" /> },
            { label: "Labor cost", value: "As per local rate", icon: <Users className="w-4 h-4 text-blue-500" /> },
            { label: "Market price", value: "As per current trend", icon: <TrendingUp className="w-4 h-4 text-indigo-500" /> },
            { label: "Government schemes", value: "Applicable", icon: <Landmark className="w-4 h-4 text-purple-500" /> },
          ].map((item, i) => (
            <div key={i} className="p-4 flex gap-3 items-center hover:bg-secondary/20 transition-colors">
              <div className="shrink-0">{item.icon}</div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground">{item.label}</p>
                <p className="text-xs font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>AI simulations are based on historical data, current trends, and ML models. Results may vary.</p>
          <div className="flex items-center gap-3">
            <span className="font-medium text-foreground">Model Confidence</span>
            <div className="w-32 h-1.5 bg-background rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[87%]"></div>
            </div>
            <span className="font-bold text-foreground">87%</span>
          </div>
        </div>
      </Card>

    </div>
  );
}
