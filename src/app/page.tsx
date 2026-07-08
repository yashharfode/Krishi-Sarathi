import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Leaf, TrendingUp, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <header className="px-6 lg:px-14 h-20 flex items-center justify-between border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="font-semibold text-xl tracking-tight">KrishiSarathi</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="#about" className="hover:text-primary transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button className="rounded-full px-6">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 lg:py-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-accent"></span>
          AI-Powered Farming is Here
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight max-w-4xl mb-6">
          Plan Smarter. <br />
          <span className="text-primary">Farm Better. </span>
          Earn More.
        </h1>
        
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10">
          The first Decision Operating System for modern farmers. Use AI reasoning, government datasets, and personalized farm intelligence to make profitable decisions before investing a single rupee.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-sm hover:shadow-md transition-all group">
              Start Your Strategy
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl text-left">
          <div className="flex flex-col gap-3 p-6 rounded-3xl bg-secondary/50 border border-border/50">
            <div className="bg-background w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-2">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Higher Profit Potential</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI analyzes market trends, weather, and your soil to recommend the most profitable crop strategies.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-6 rounded-3xl bg-secondary/50 border border-border/50">
            <div className="bg-background w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Lower Farming Risk</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Simulate worst-case scenarios and understand your exact break-even point before the season begins.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-6 rounded-3xl bg-secondary/50 border border-border/50">
            <div className="bg-background w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-2">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Personalized Farm DNA</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every farm is unique. KrishiSarathi builds a custom profile for your land, budget, and experience.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
