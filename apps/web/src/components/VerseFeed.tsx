"use client";

import { useState } from "react";
import { VerseCard } from "./VerseCard";
import { shareVerseCard } from "@/lib/share";
import { saveItem, removeByVerseId, useSaved } from "@/lib/saved";
import type { Verse } from "@manna/shared/lib/types";
import type { Locale } from "@manna/shared/i18n/config";
import type { Dictionary } from "@manna/shared/i18n/dictionaries";

type Props = { verses: Verse[]; locale: Locale; dict: Dictionary };

export function VerseFeed({ verses, locale, dict }: Props) {
  const [index, setIndex] = useState(0);
  const verse = verses[index];

  const next = () => setIndex((i) => (i + 1) % verses.length);
  const prev = () => setIndex((i) => (i - 1 + verses.length) % verses.length);

  const formatted = `“${verse.text[locale]}”\n— ${verse.reference[locale]}`;

  const copy = async () => {
    await navigator.clipboard.writeText(formatted);
  };

  const share = async () => {
    try {
      await shareVerseCard({
        verseId: verse.id,
        locale,
        fallbackText: formatted,
        shareTitle: dict.appName,
      });
    } catch {
      // user cancelled, or share failed — silent
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div
        className="flex flex-1 items-stretch"
        onTouchStart={(e) => {
          (e.currentTarget as HTMLElement).dataset.startY = String(
            e.touches[0].clientY,
          );
          (e.currentTarget as HTMLElement).dataset.startX = String(
            e.touches[0].clientX,
          );
        }}
        onTouchEnd={(e) => {
          const el = e.currentTarget as HTMLElement;
          const startY = Number(el.dataset.startY ?? 0);
          const startX = Number(el.dataset.startX ?? 0);
          const endY = e.changedTouches[0].clientY;
          const endX = e.changedTouches[0].clientX;
          const dy = endY - startY;
          const dx = endX - startX;
          if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
            if (dy < 0) next();
            else prev();
          } else if (Math.abs(dx) > 50) {
            if (dx < 0) next();
            else prev();
          }
        }}
      >
        <VerseCard verse={verse} locale={locale} />
      </div>

      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <button
          onClick={prev}
          className="rounded-full border border-[var(--card-border)] px-4 py-2 hover:bg-[var(--card)]"
        >
          ← {dict.feed.previous}
        </button>
        <span className="text-xs uppercase tracking-widest">
          {index + 1} / {verses.length}
        </span>
        <button
          onClick={next}
          className="rounded-full border border-[var(--card-border)] px-4 py-2 hover:bg-[var(--card)]"
        >
          {dict.feed.next} →
        </button>
      </div>

      <SaveAndShareRow
        verseId={verse.id}
        locale={locale}
        copy={copy}
        share={share}
        dict={dict}
      />
    </div>
  );
}

function SaveAndShareRow({
  verseId,
  locale,
  copy,
  share,
  dict,
}: {
  verseId: string;
  locale: Locale;
  copy: () => Promise<void>;
  share: () => Promise<void>;
  dict: Dictionary;
}) {
  const saved = useSaved();
  const isSaved = saved.some((i) => i.verseId === verseId);

  const toggle = () => {
    if (isSaved) removeByVerseId(verseId);
    else saveItem({ verseId, locale });
  };

  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={toggle}
        className={`rounded-full border px-5 py-2 text-sm transition ${
          isSaved
            ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--foreground)]"
            : "border-[var(--card-border)] bg-[var(--card)] hover:bg-[var(--background)]"
        }`}
        aria-pressed={isSaved}
      >
        {isSaved ? `♥ ${dict.feed.unsave}` : `♡ ${dict.feed.save}`}
      </button>
      <button
        onClick={copy}
        className="rounded-full bg-[var(--card)] border border-[var(--card-border)] px-5 py-2 text-sm hover:bg-[var(--background)]"
      >
        {dict.feed.copy}
      </button>
      <button
        onClick={share}
        className="rounded-full bg-[var(--foreground)] px-5 py-2 text-sm text-[var(--background)] hover:opacity-90"
      >
        {dict.feed.share}
      </button>
    </div>
  );
}
