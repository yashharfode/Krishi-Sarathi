"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Bell, Sun, MapPin, ChevronDown, Sparkles, Sprout, ArrowRight,
  Droplet, TestTube, Factory, Leaf, Info, Activity, LineChart, 
  CheckCircle2, Clock, TrendingDown, TrendingUp
} from "lucide-react";

const ROADMAP_STEPS = [
  { title: "Soil Detoxification", duration: "0 - 30 Days", desc: "Flush chemical residues and restore natural soil microbiology using bio-cultures.", icon: TestTube, status: "active" },
  { title: "Organic Input Planning", duration: "30 - 60 Days", desc: "Procure certified organic seeds, neem oil, and prepare vermicompost.", icon: Sprout, status: "pending" },
  { title: "Transition Period", duration: "60 - 100 Days", desc: "First crop cycle using 100% organic methods. Expect a slight initial yield drop.", icon: Leaf, status: "pending" },
  { title: "Organic Certification", duration: "100 - 210 Days", desc: "Apply for PGS (Participatory Guarantee System) organic certification.", icon: ShieldCheckIcon, status: "pending" },
];

function ShieldCheckIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  )
}

export default function OrganicFarmingPage() {
  return (
    <div className="space-y-6 pb-24 md:pb-6 text-foreground">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">Organic Farming</h1>
            <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-none font-semibold">
              <Sparkles className="w-3 h-3 mr-1" /> AI Transition Plan
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Step-by-step roadmap to transition your farm into a certified organic business.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Transition Mode Selector */}
          <Card className="border-border/40 shadow-sm bg-card/40">
            <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Choose Transition Mode</CardTitle>
              <Info className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 opacity-50 cursor-pointer hover:bg-secondary/20 transition-colors">
                  <Factory className="w-6 h-6 text-muted-foreground" />
                  <span className="font-semibold text-sm">Conventional</span>
                </div>
                <div className="border border-primary/50 bg-primary/10 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden ring-1 ring-primary">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-primary/20 rounded-bl-full"></div>
                  <Droplet className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-sm text-primary">Hybrid <Badge className="ml-1 bg-primary text-xs px-1 py-0">Recommended</Badge></span>
                </div>
                <div className="border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-secondary/20 transition-colors">
                  <Leaf className="w-6 h-6 text-green-500" />
                  <span className="font-semibold text-sm">100% Organic</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Timeline */}
          <Card className="border-border/40 shadow-sm bg-card/30">
            <CardHeader className="pb-4 pt-5 px-5">
              <CardTitle className="text-sm font-semibold">Organic Roadmap (Hybrid Mode)</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/50 before:to-transparent">
                {ROADMAP_STEPS.map((step, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:border-primary/20 group-hover:bg-primary/10">
                      <step.icon className={`w-4 h-4 ${step.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    {/* Content */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/50 bg-background/50 shadow-sm group-hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${step.status === 'active' ? 'text-primary' : 'text-foreground'}`}>{i+1}. {step.title}</span>
                        <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {step.duration}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Outcomes & Action */}
        <div className="space-y-6">
          
          <Card className="border-border/40 shadow-sm bg-card/30">
            <CardHeader className="pb-4 pt-5 px-5">
              <CardTitle className="text-sm font-semibold">Expected Outcome</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Cost Saving</p>
                  <p className="font-bold text-3xl text-green-500">22%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Profit Potential</p>
                  <p className="font-bold text-lg text-primary flex items-center gap-2">High <TrendingUp className="w-4 h-4" /></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Premium Pricing</p>
                  <p className="font-bold text-sm">+15% vs Market</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 shadow-sm bg-primary/5">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4" /> Ready to Transition?
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    AI will guide you step-by-step through the process, ensuring minimal yield loss and maximum organic premium.
                  </p>
                </div>
              </div>
              <Button className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                View Full Roadmap <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
