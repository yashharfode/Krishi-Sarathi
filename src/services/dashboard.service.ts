import { getStorageItem, setStorageItem } from "@/lib/storage/storage";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import { WeatherService } from "./weather.service";

const INITIAL_DASHBOARD_DATA = {
  notifications: [
    { title: "Upcoming Rain", time: "Tomorrow", type: "warning" },
    { title: "Pesticide Schedule", time: "In 3 Days", type: "info" }
  ],
  tasks: [
    { text: "Apply organic fertilizer to Sector A", done: false },
    { text: "Check moisture sensors in Sector B", done: true },
    { text: "Prepare soil for upcoming sowing", done: false }
  ],
  marketPrices: {
    soybean: { price: 4200, trend: "up", change: 2.4 },
    maize: { price: 2100, trend: "down", change: -1.2 },
    wheat: { price: 2850, trend: "up", change: 0.5 }
  }
};

export class DashboardService {
  static getDashboardData() {
    return getStorageItem(STORAGE_KEYS.DASHBOARD, INITIAL_DASHBOARD_DATA);
  }

  static async getFullDashboardContext() {
    const data = this.getDashboardData();
    const weather = await WeatherService.getCurrentWeather();
    
    return {
      ...data,
      weather
    };
  }
}
