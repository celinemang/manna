"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import type { Devotion, EmotionId } from "@/lib/types";

const STORAGE_KEY = "manna:saved:v1";

export type SavedItem = {
  key: string;
  verseId: string;
  emotion?: EmotionId;
  locale: Locale;
  savedAt: number;
  devotion?: Devotion;
};

const listeners = new Set<() => void>();
const EMPTY: SavedItem[] = [];
const getServerSnapshot = () => EMPTY;

// useSyncExternalStore requires a stable reference between calls when nothing
// has changed; otherwise React loops re-rendering. We cache the parsed array
// and only swap it for a new one on actual mutations / cross-tab updates.
let snapshot: SavedItem[] = EMPTY;
let hydrated = false;

function parse(): SavedItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function refresh() {
  snapshot = parse();
  for (const l of listeners) l();
}

function getSnapshot(): SavedItem[] {
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true;
    snapshot = parse();
  }
  return snapshot;
}

function persist(next: SavedItem[]) {
  snapshot = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  for (const l of listeners) l();
}

export function getSaved(): SavedItem[] {
  return getSnapshot();
}

export function isVerseSaved(verseId: string): boolean {
  return getSnapshot().some((i) => i.verseId === verseId);
}

export function saveItem(input: Omit<SavedItem, "key" | "savedAt">) {
  const items = getSnapshot();
  const savedAt = Date.now();
  const key = `${input.verseId}-${savedAt}`;
  // Dedupe: if the same verse is saved again, replace the older entry
  // (keeps the latest devotion if one was attached this time).
  const filtered = items.filter((i) => i.verseId !== input.verseId);
  persist([{ ...input, key, savedAt }, ...filtered]);
}

export function removeItem(key: string) {
  persist(getSnapshot().filter((i) => i.key !== key));
}

export function removeByVerseId(verseId: string) {
  persist(getSnapshot().filter((i) => i.verseId !== verseId));
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) refresh();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSaved(): SavedItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
