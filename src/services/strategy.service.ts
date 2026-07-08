import { getStorageItem, setStorageItem } from "@/lib/storage/storage";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import { FarmService } from "./farm.service";

export class StrategyService {
  static async generateStrategy() {
    const profile = FarmService.getProfile();
    
    try {
      const response = await fetch('/api/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });

      if (response.ok) {
        const data = await response.json();
        setStorageItem(STORAGE_KEYS.STRATEGY, data.strategy);
        return data.strategy;
      }
    } catch (error) {
      console.error("Failed to fetch from Gemini API, falling back to local simulation.", error);
    }
    
    // Fallback Local Simulation Logic
    let expectedProfit = 68450;
    let strategyName = "Soybean + Maize (Intercrop)";
    
    if (profile.size > 5) {
      expectedProfit = profile.size * 30000;
      strategyName = "Commercial Soybean (High Yield)";
    }

    const fallbackStrategy = {
      name: strategyName,
      profit: expectedProfit,
      riskLevel: profile.size > 5 ? "Medium" : "Low",
      suitability: 86,
      generatedAt: new Date().toISOString()
    };

    setStorageItem(STORAGE_KEYS.STRATEGY, fallbackStrategy);
    return fallbackStrategy;
  }

  static async getStrategy() {
    const existing = getStorageItem(STORAGE_KEYS.STRATEGY, null);
    if (existing) return existing as any;
    
    // Generate initial if not exists
    return await this.generateStrategy();
  }
}
