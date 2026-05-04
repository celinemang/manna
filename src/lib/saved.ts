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

function emit() {
  for (const l of listeners) l();
}

function read(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: SavedItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  emit();
}

export function getSaved(): SavedItem[] {
  return read();
}

export function isVerseSaved(verseId: string): boolean {
  return read().some((i) => i.verseId === verseId);
}

export function saveItem(input: Omit<SavedItem, "key" | "savedAt">) {
  const items = read();
  const savedAt = Date.now();
  const key = `${input.verseId}-${savedAt}`;
  // Dedupe: if the same verse is saved again, replace the older entry
  // (keeps the latest devotion if one was attached this time).
  const filtered = items.filter((i) => i.verseId !== input.verseId);
  write([{ ...input, key, savedAt }, ...filtered]);
}

export function removeItem(key: string) {
  write(read().filter((i) => i.key !== key));
}

export function removeByVerseId(verseId: string) {
  write(read().filter((i) => i.verseId !== verseId));
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Cross-tab sync via the storage event.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSaved(): SavedItem[] {
  return useSyncExternalStore(
    subscribe,
    read,
    () => [], // server snapshot
  );
}
