import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FarmState {
  farmerName: string;
  location: string;
  farmScore: number;
  recommendedCrop: string;
  expectedProfit: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  confidence: number;
  reasons: string[];
  planner: {
    totalCost: number;
    totalRevenue: number;
    breakEven: string;
    roi: string;
    worstCase: number;
    bestCase: number;
  };
  setFarmData: (data: Partial<FarmState>) => void;
}

export const useFarmStore = create<FarmState>()(
  persist(
    (set) => ({
      farmerName: 'Ramesh',
      location: 'Betul, Madhya Pradesh',
      farmScore: 82,
      recommendedCrop: 'Maize',
      expectedProfit: 82000,
      riskLevel: 'Medium',
      confidence: 91,
      reasons: [
        'Good yield in your soil type',
        'Matches your water availability',
        'Market trend is positive',
        'Higher profit compared to other crops',
      ],
      planner: {
        totalCost: 42000,
        totalRevenue: 124000,
        breakEven: '18 Quintal',
        roi: '95%',
        worstCase: 48000,
        bestCase: 115000,
      },
      setFarmData: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'krishisarathi-storage', // unique name in localStorage
    }
  )
);
