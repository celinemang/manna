import AsyncStorage from "@react-native-async-storage/async-storage";
import type { EmotionId } from "@manna/shared/lib/types";

const KEY_ONBOARDED = "manna:onboarded";
const KEY_EMOTIONS = "manna:onboarding:emotions";
const KEY_NOTIF_HOUR = "manna:onboarding:notifHour";

export async function getOnboarded(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEY_ONBOARDED)) === "1";
}

export async function setOnboarded(): Promise<void> {
  await AsyncStorage.setItem(KEY_ONBOARDED, "1");
}

export async function saveSelectedEmotions(ids: EmotionId[]): Promise<void> {
  await AsyncStorage.setItem(KEY_EMOTIONS, JSON.stringify(ids));
}

export async function getSelectedEmotions(): Promise<EmotionId[]> {
  const raw = await AsyncStorage.getItem(KEY_EMOTIONS);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as EmotionId[]) : [];
  } catch {
    return [];
  }
}

export async function saveOnboardingNotifHour(hour: number): Promise<void> {
  await AsyncStorage.setItem(KEY_NOTIF_HOUR, String(hour));
}
