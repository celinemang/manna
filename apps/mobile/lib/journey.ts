import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInCalendarDays, format, parseISO, subDays } from "date-fns";
import type { EmotionId } from "@manna/shared/lib/types";

const KEY_LAST = "manna:streak:lastOpenedDate";
const KEY_CUR = "manna:streak:current";
const KEY_BEST = "manna:streak:best";
const KEY_MOODS = "manna:moods";

export type MoodEntry = { date: string; emotion: EmotionId };
export type JourneyState = {
  current: number;
  best: number;
  lastOpenedDate: string | null;
  moods: MoodEntry[];
  ready: boolean;
};

const listeners = new Set<() => void>();
let state: JourneyState = {
  current: 0,
  best: 0,
  lastOpenedDate: null,
  moods: [],
  ready: false,
};
let hydratePromise: Promise<void> | null = null;

function todayStr(): string {
  return format(new Date(), "yyyy-MM-dd");
}

function emit() {
  for (const l of listeners) l();
}

async function hydrate(): Promise<void> {
  if (state.ready) return;
  if (!hydratePromise) {
    hydratePromise = (async () => {
      const [last, cur, best, moods] = await Promise.all([
        AsyncStorage.getItem(KEY_LAST),
        AsyncStorage.getItem(KEY_CUR),
        AsyncStorage.getItem(KEY_BEST),
        AsyncStorage.getItem(KEY_MOODS),
      ]);
      let parsedMoods: MoodEntry[] = [];
      if (moods) {
        try {
          const p = JSON.parse(moods);
          if (Array.isArray(p)) parsedMoods = p as MoodEntry[];
        } catch {}
      }
      state = {
        current: cur ? Number(cur) || 0 : 0,
        best: best ? Number(best) || 0 : 0,
        lastOpenedDate: last,
        moods: parsedMoods,
        ready: true,
      };
      emit();
    })();
  }
  return hydratePromise;
}

export async function touchStreak(): Promise<void> {
  await hydrate();
  const today = todayStr();
  if (state.lastOpenedDate === today) return;

  let next = 1;
  if (state.lastOpenedDate) {
    const diff = differenceInCalendarDays(
      parseISO(today),
      parseISO(state.lastOpenedDate),
    );
    if (diff === 1) next = state.current + 1;
    else if (diff <= 0) next = state.current; // clock skew safety
    else next = 1;
  }
  const best = Math.max(state.best, next);
  state = { ...state, current: next, best, lastOpenedDate: today };
  await Promise.all([
    AsyncStorage.setItem(KEY_LAST, today),
    AsyncStorage.setItem(KEY_CUR, String(next)),
    AsyncStorage.setItem(KEY_BEST, String(best)),
  ]);
  emit();
}

export async function recordMood(emotion: EmotionId): Promise<void> {
  await hydrate();
  const date = todayStr();
  // One mood per day — the latest pull wins (most recent feeling).
  const filtered = state.moods.filter((m) => m.date !== date);
  const next = [{ date, emotion }, ...filtered].slice(0, 90);
  state = { ...state, moods: next };
  await AsyncStorage.setItem(KEY_MOODS, JSON.stringify(next));
  emit();
  // Touching the streak when a mood is recorded too — opening the devotion
  // counts as engagement even if the user didn't open the app's first tab.
  await touchStreak();
}

export function moodFor(date: string): EmotionId | null {
  return state.moods.find((m) => m.date === date)?.emotion ?? null;
}

export function last14Days(): { date: string; emotion: EmotionId | null }[] {
  const out: { date: string; emotion: EmotionId | null }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = format(subDays(new Date(), i), "yyyy-MM-dd");
    out.push({ date: d, emotion: state.moods.find((m) => m.date === d)?.emotion ?? null });
  }
  return out;
}

export function moodCounts(): Record<EmotionId, number> {
  const counts: Partial<Record<EmotionId, number>> = {};
  for (const m of state.moods) {
    counts[m.emotion] = (counts[m.emotion] ?? 0) + 1;
  }
  return counts as Record<EmotionId, number>;
}

export function useJourney(): JourneyState {
  const [, force] = useState(0);
  useEffect(() => {
    const cb = () => force((n) => n + 1);
    listeners.add(cb);
    void hydrate();
    return () => {
      listeners.delete(cb);
    };
  }, []);
  return state;
}
