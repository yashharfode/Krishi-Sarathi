"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Bell, Sun, MapPin, ChevronDown, Sparkles, Edit2, CheckCircle2,
  Leaf, Droplet, LineChart, ShieldCheck, TrendingUp, Info, History,
  Settings2, Box, Users, Tractor, CloudSun, Target, ArrowRight
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FarmService } from "@/services/farm.service";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer 
} from "recharts";

// Mock Data (Keeping static arrays that don't need persistence for now, moving core data to state)
const RADAR_DATA = [
  { subject: 'Water Effic.', A: 85, fullMark: 100 },
  { subject: 'Resource Util.', A: 80, fullMark: 100 },
  { subject: 'Profitability', A: 88, fullMark: 100 },
  { subject: 'Resilience', A: 75, fullMark: 100 },
  { subject: 'Sustainability', A: 90, fullMark: 100 },
];

const STRENGTHS = [
  { label: "Soil Fertility", value: "High", icon: Leaf },
  { label: "Water Management", value: "High", icon: Droplet },
  { label: "Crop Diversity", value: "High", icon: SproutIcon },
  { label: "Sustainability", value: "Medium", icon: ShieldCheck },
];

const INSIGHTS = [
  { title: "High Organic Matter", desc: "Your soil organic matter is 1.2%, which is above average for your region.", icon: Leaf, color: "text-green-500" },
  { title: "Good Water Efficiency", desc: "Your irrigation efficiency is 85%, keep using drip for better results.", icon: Droplet, color: "text-blue-500" },
  { title: "Market Advantage", desc: "You are in a high-demand crop belt for Soybean and Maize.", icon: TrendingUp, color: "text-indigo-500" },
  { title: "Low Risk Profile", desc: "Your farm has low climate and market risk compared to similar farms.", icon: ShieldCheck, color: "text-teal-500" },
];

const SOIL_METRICS = [
  { label: "Organic Matter", value: "1.20%", status: "High", color: "text-green-500" },
  { label: "pH Level", value: "6.8", status: "Optimal", color: "text-emerald-500" },
  { label: "Nitrogen (N)", value: "280 kg/ha", status: "High", color: "text-green-500" },
  { label: "Phosphorus (P)", value: "18 kg/ha", status: "Medium", color: "text-orange-500" },
  { label: "Potassium (K)", value: "320 kg/ha", status: "High", color: "text-green-500" },
];

const HISTORY = [
  { season: "2023-24", kharif: "Soybean", rabi: "Wheat", yield: "8.5 Q/acre", profit: "High", color: "text-green-500" },
  { season: "2022-23", kharif: "Maize", rabi: "Chickpea", yield: "7.8 Q/acre", profit: "Medium", color: "text-orange-500" },
  { season: "2021-22", kharif: "Paddy", rabi: "Mustard", yield: "9.2 Q/acre", profit: "High", color: "text-green-500" },
];

const SUSTAINABILITY = [
  { label: "Soil Conservation", value: 90 },
  { label: "Water Conservation", value: 85 },
  { label: "Chemical Usage", value: 65 },
  { label: "Biodiversity", value: 80 },
];

function SproutIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 20h10"/><path d="M10 20c5.5-1.25 12-4.25 12-12.5 0-.85-.65-1.5-1.5-1.5-.25 0-.5.25-.5.5-1 4.25-5.5 7-10 7s-9-2.75-10-7c0-.25-.25-.5-.5-.5-.85 0-1.5.65-1.5 1.5 0 8.25 6.5 11.25 12 12.5Z"/><path d="M12 20v-8"/>
    </svg>
  );
}

export default function FarmDNAPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Load from local storage service on mount to avoid SSR mismatch
    setProfile(FarmService.getProfile());
  }, []);

  if (!profile) return null; // Or a loading skeleton

  return (
    <div className="space-y-6 pb-24 md:pb-6 text-foreground">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">Farm DNA</h1>
            <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-none font-semibold">
              <Sparkles className="w-3 h-3 mr-1" /> Powered by AI
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Your unique farm profile & intelligence that powers every recommendation.</p>
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

      {/* Top Farm Profile Card */}
      <Card className="border-border/40 shadow-sm bg-card/40 overflow-hidden">
        <CardContent className="p-0 flex flex-col md:flex-row">
          {/* Mock Farm Image */}
          <div className="relative w-full md:w-64 h-40 md:h-auto bg-secondary">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop" 
              alt="Farm landscape" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold">My Farm Profile</h2>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10">
                <Edit2 className="w-3 h-3 mr-1" /> Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Farm Size</p>
                <p className="font-bold text-sm">{profile.size} Acres</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Location</p>
                <p className="font-bold text-sm">{profile.location}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold flex items-center gap-1.5"><SproutIcon className="w-3.5 h-3.5" /> Soil Type</p>
                <p className="font-bold text-sm">{profile.soilType}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold flex items-center gap-1.5"><Droplet className="w-3.5 h-3.5" /> Irrigation</p>
                <p className="font-bold text-sm">{profile.irrigation}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold flex items-center gap-1.5"><History className="w-3.5 h-3.5" /> Farming Exp.</p>
                <p className="font-bold text-sm">{profile.experience} Years</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5" /> Farming Type</p>
                <p className="font-bold text-sm">{profile.farmingType}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex items-center border-b border-border/50 overflow-x-auto scrollbar-hide">
        <div className="px-4 py-3 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap flex items-center gap-2"><Target className="w-4 h-4"/> Overview</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"><Leaf className="w-4 h-4"/> Soil & Land</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"><Droplet className="w-4 h-4"/> Water</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"><CloudSun className="w-4 h-4"/> Climate</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"><Box className="w-4 h-4"/> Resources</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"><History className="w-4 h-4"/> History</div>
        <div className="px-4 py-3 text-muted-foreground hover:text-foreground font-medium text-sm cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2"><Settings2 className="w-4 h-4"/> Preferences</div>
      </div>

      {/* Main Grid Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Farm DNA Score */}
        <Card className="border-border/40 shadow-sm bg-card/30">
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="text-sm font-semibold flex items-center gap-1">Farm DNA Score <Info className="w-3.5 h-3.5 text-muted-foreground" /></CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-secondary" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary" strokeDasharray="87, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-foreground">87</span>
                <span className="text-[10px] text-muted-foreground font-medium">/100</span>
              </div>
            </div>
            <h3 className="font-bold text-primary mb-1">Excellent Farm DNA</h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-4">Your farm is well-optimized for productive and sustainable farming.</p>
            <div className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 12 points vs last season
            </div>
          </CardContent>
        </Card>

        {/* DNA Strengths */}
        <Card className="border-border/40 shadow-sm bg-card/30">
          <CardHeader className="pb-3 pt-5 px-5">
            <CardTitle className="text-sm font-semibold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-primary"/> DNA Strengths</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-4">
            {STRENGTHS.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-secondary rounded shrink-0">
                    <s.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                <span className={`text-[10px] font-bold ${s.value === 'High' ? 'text-green-500' : 'text-orange-500'}`}>{s.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Farm DNA Radar */}
        <Card className="border-border/40 shadow-sm bg-card/30 lg:col-span-2 flex flex-col relative overflow-hidden">
          <CardHeader className="pb-0 pt-5 px-5 absolute z-10">
            <CardTitle className="text-sm font-semibold">Farm DNA Radar</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 relative h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={RADAR_DATA}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Farm DNA" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-[10px] font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-primary rounded-full"></div> Your Farm</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-border rounded-full border border-dashed"></div> Ideal Range</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Soil Health Summary */}
        <Card className="border-border/40 shadow-sm bg-card/30 lg:col-span-2">
          <CardHeader className="pb-4 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Soil Health Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 flex flex-col md:flex-row gap-6 items-center md:items-start">
            
            {/* Overall Score Circle */}
            <div className="flex flex-col items-center justify-center text-center w-full md:w-1/3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Overall Score</p>
              <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-secondary" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary" strokeDasharray="85, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-bold text-primary">85</span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-primary">Good</p>
            </div>

            {/* Metrics List */}
            <div className="w-full md:w-2/3 space-y-3">
              {SOIL_METRICS.map((m, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex-1">{m.label}</span>
                  <span className="font-semibold w-24 text-right">{m.value}</span>
                  <span className={`font-bold w-20 text-right ${m.color}`}>{m.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Water Profile */}
        <Card className="border-border/40 shadow-sm bg-card/30">
          <CardHeader className="pb-3 pt-5 px-5">
            <CardTitle className="text-sm font-semibold flex items-center gap-2"><Droplet className="w-4 h-4 text-blue-500" /> Water Profile</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span>Water Availability</span>
                <span>70%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Annual Rainfall</span><span className="font-semibold">1,150 mm</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Irrigation Source</span><span className="font-semibold">Borewell</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Water Table Depth</span><span className="font-semibold">18 ft</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Irrigation Efficiency</span><span className="font-semibold">85%</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Inventory */}
        <Card className="border-border/40 shadow-sm bg-card/30">
          <CardHeader className="pb-3 pt-5 px-5">
            <CardTitle className="text-sm font-semibold flex items-center gap-2"><Box className="w-4 h-4 text-muted-foreground" /> Resource Inventory</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground"><Tractor className="w-3.5 h-3.5" /> Tractor</div>
              <span className="font-semibold">1</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground"><Tractor className="w-3.5 h-3.5" /> Power Tiller</div>
              <span className="font-semibold">1</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground"><Droplet className="w-3.5 h-3.5" /> Sprayer</div>
              <span className="font-semibold">1</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground"><Users className="w-3.5 h-3.5" /> Labor (Family)</div>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground"><Box className="w-3.5 h-3.5" /> Storage Capacity</div>
              <span className="font-semibold">25 Quintals</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground"><ShieldCheck className="w-3.5 h-3.5" /> Livestock</div>
              <span className="font-semibold">2 Cows</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Grid Row 3 (Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Crop History */}
        <Card className="border-border/40 shadow-sm bg-card/30 lg:col-span-2">
          <CardHeader className="pb-3 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Crop History <span className="text-muted-foreground text-[10px] font-normal">(Last 3 Seasons)</span></CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/20 text-muted-foreground text-[10px] uppercase">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Season</th>
                    <th className="px-5 py-3 font-semibold">Kharif Crop</th>
                    <th className="px-5 py-3 font-semibold">Rabi Crop</th>
                    <th className="px-5 py-3 font-semibold">Yield (Avg)</th>
                    <th className="px-5 py-3 font-semibold text-right">Profitability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {HISTORY.map((row, i) => (
                    <tr key={i} className="hover:bg-secondary/10 transition-colors">
                      <td className="px-5 py-3 font-medium">{row.season}</td>
                      <td className="px-5 py-3">{row.kharif}</td>
                      <td className="px-5 py-3">{row.rabi}</td>
                      <td className="px-5 py-3">{row.yield}</td>
                      <td className="px-5 py-3 text-right">
                        <span className={`inline-flex items-center gap-1 font-bold ${row.color}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${row.color.replace('text-', 'bg-')}`}></div> {row.profit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 text-center border-t border-border/50">
              <span className="text-[10px] text-primary font-medium hover:underline cursor-pointer flex items-center justify-center gap-1">
                View Full History <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Sustainability Score */}
        <Card className="border-border/40 shadow-sm bg-card/30">
          <CardHeader className="pb-4 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Your Sustainability Score</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-4">
            <div className="space-y-3">
              {SUSTAINABILITY.map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground min-w-[110px]">
                    <Leaf className="w-3.5 h-3.5" /> {s.label}
                  </div>
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${s.value}%` }}></div>
                  </div>
                  <span className="text-[10px] font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-2 border-t border-border/50 flex items-center justify-between">
              <span className="text-xs font-bold">Overall Sustainability</span>
              <div className="flex items-center gap-3">
                <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <span className="font-bold text-sm">80%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar Stack (Insights + Recommendations) */}
        <div className="space-y-6">
          
          {/* Farm DNA Recommendations */}
          <Card className="border-border/40 shadow-sm bg-card/30">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-semibold">Farm DNA Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3">
              <div className="flex gap-2 items-start text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                Maintain organic matter with green manure
              </div>
              <div className="flex gap-2 items-start text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                Rotate crops to improve soil health
              </div>
              <div className="flex gap-2 items-start text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                Use bio-fertilizers for better soil microbiome
              </div>
              <div className="flex gap-2 items-start text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                Consider mulching to retain soil moisture
              </div>
              <div className="pt-2 text-center">
                <span className="text-[10px] text-primary font-medium hover:underline cursor-pointer flex items-center justify-center gap-1">
                  View All Recommendations <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Recommendation Badge */}
          <Card className="border-primary/30 shadow-sm bg-primary/5">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> AI Recommendation
                </h4>
                <Badge className="bg-primary/20 text-primary border-none hover:bg-primary/30 text-[10px]">Best For You</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Based on your Farm DNA, Soybean + Maize intercropping is the most profitable and sustainable choice this season.
              </p>
              <Button className="w-full text-xs h-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                View AI Strategy <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
