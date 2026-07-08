import { getStorageItem, setStorageItem } from "@/lib/storage/storage";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import { INITIAL_FARM_PROFILE } from "@/lib/demo-data/farmProfile";

export class FarmService {
  static getProfile() {
    return getStorageItem(STORAGE_KEYS.FARM_PROFILE, INITIAL_FARM_PROFILE);
  }

  static updateProfile(updates: Partial<typeof INITIAL_FARM_PROFILE>) {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    setStorageItem(STORAGE_KEYS.FARM_PROFILE, updated);
    return updated;
  }
}
