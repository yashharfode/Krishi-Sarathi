"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { FarmService } from "@/services/farm.service";
import { Save, User, MapPin, Target, Droplet, Sprout, Settings2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setProfile(FarmService.getProfile());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    FarmService.updateProfile(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (field: string, value: string | number) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  if (!profile) return null;

  return (
    <div className="space-y-6 pb-24 md:pb-6 text-foreground max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">Farm Profile</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <User className="w-3 h-3 mr-1" /> Settings
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Update your farm details to get more accurate AI recommendations.</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <Card className="border-border/40 shadow-sm bg-card/30">
          <CardHeader className="pb-4 pt-6 px-6">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" /> General Information
            </CardTitle>
            <CardDescription>This data is used by the Gemini AI Engine to generate your crop strategy.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="size" className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" /> Farm Size (Acres)
                </label>
                <Input 
                  id="size" 
                  type="number" 
                  step="0.1"
                  value={profile.size} 
                  onChange={(e) => handleChange("size", parseFloat(e.target.value))}
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </label>
                <Input 
                  id="location" 
                  type="text" 
                  value={profile.location} 
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="soilType" className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <Sprout className="w-3.5 h-3.5" /> Soil Type
                </label>
                <select 
                  id="soilType"
                  value={profile.soilType}
                  onChange={(e) => handleChange("soilType", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-border/50 bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Black Soil">Black Soil</option>
                  <option value="Alluvial Soil">Alluvial Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Laterite Soil">Laterite Soil</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="irrigation" className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <Droplet className="w-3.5 h-3.5" /> Irrigation Method
                </label>
                <select 
                  id="irrigation"
                  value={profile.irrigation}
                  onChange={(e) => handleChange("irrigation", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-border/50 bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Drip Irrigation">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Flood Irrigation">Flood Irrigation</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="experience" className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Farming Experience (Years)
                </label>
                <Input 
                  id="experience" 
                  type="number" 
                  value={profile.experience} 
                  onChange={(e) => handleChange("experience", parseInt(e.target.value))}
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="farmingType" className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <Settings2 className="w-3.5 h-3.5" /> Farming Type
                </label>
                <select 
                  id="farmingType"
                  value={profile.farmingType}
                  onChange={(e) => handleChange("farmingType", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-border/50 bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Integrated">Integrated</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Subsistence">Subsistence</option>
                  <option value="Organic">Organic</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 bg-background/20 border-t border-border/40 flex justify-end">
            <Button type="submit" className="gap-2 min-w-[120px] transition-all" variant={isSaved ? "secondary" : "default"}>
              {isSaved ? (
                <><CheckCircle2 className="w-4 h-4 text-green-500" /> Saved</>
              ) : (
                <><Save className="w-4 h-4" /> Save Profile</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
