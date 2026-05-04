import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { SavedItem } from "@manna/shared/lib/types";

export type { SavedItem };

const STORAGE_KEY = "manna:saved:v1";

const listeners = new Set<() => void>();
let cache: SavedItem[] = [];
let hydrated = false;
let hydratePromise: Promise<void> | null = null;

async function hydrate(): Promise<void> {
  if (hydrated) return;
  if (!hydratePromise) {
    hydratePromise = AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) cache = parsed as SavedItem[];
        } catch {}
      }
      hydrated = true;
      for (const l of listeners) l();
    });
  }
  return hydratePromise;
}

async function persist(next: SavedItem[]): Promise<void> {
  cache = next;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  for (const l of listeners) l();
}

export function getSaved(): SavedItem[] {
  return cache;
}

export function isVerseSaved(verseId: string): boolean {
  return cache.some((i) => i.verseId === verseId);
}

export async function saveItem(
  input: Omit<SavedItem, "key" | "savedAt">,
): Promise<void> {
  await hydrate();
  const savedAt = Date.now();
  const key = `${input.verseId}-${savedAt}`;
  const filtered = cache.filter((i) => i.verseId !== input.verseId);
  await persist([{ ...input, key, savedAt }, ...filtered]);
}

export async function removeItem(key: string): Promise<void> {
  await hydrate();
  await persist(cache.filter((i) => i.key !== key));
}

export async function removeByVerseId(verseId: string): Promise<void> {
  await hydrate();
  await persist(cache.filter((i) => i.verseId !== verseId));
}

export function useSaved(): { items: SavedItem[]; ready: boolean } {
  const [, force] = useState(0);
  const [ready, setReady] = useState(hydrated);

  useEffect(() => {
    const cb = () => force((n) => n + 1);
    listeners.add(cb);
    if (!hydrated) {
      void hydrate().then(() => setReady(true));
    } else {
      setReady(true);
    }
    return () => {
      listeners.delete(cb);
    };
  }, []);

  return { items: cache, ready };
}

export function useIsVerseSaved(verseId: string): boolean {
  const { items } = useSaved();
  return items.some((i) => i.verseId === verseId);
}
