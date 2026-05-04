"use client";

import { useEffect, useState } from "react";
import { VerseCard } from "@/components/VerseCard";
import type { Devotion, EmotionId, Verse } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

function pickIndex(length: number, exclude: number) {
  if (length <= 1) return 0;
  let i = Math.floor(Math.random() * length);
  if (i === exclude) i = (i + 1) % length;
  return i;
}

type Props = {
  verses: Verse[];
  emotion: EmotionId;
  locale: Locale;
  dict: Dictionary;
};

export function EmotionResult({ verses, emotion, locale, dict }: Props) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * verses.length),
  );
  const verse = verses[index];

  const [devotion, setDevotion] = useState<Devotion | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setDevotion(null);

    fetch("/api/devotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verseId: verse.id, emotion, locale }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        return (await r.json()) as Devotion;
      })
      .then((d) => {
        if (cancelled) return;
        setDevotion(d);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [verse.id, emotion, locale]);

  const share = async () => {
    const text = `“${verse.text[locale]}”\n— ${verse.reference[locale]}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: dict.appName, text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <VerseCard verse={verse} locale={locale} />

      <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        {status === "loading" && (
          <p className="text-sm italic text-[var(--muted)]">
            {dict.result.loadingDevotion}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm italic text-[var(--muted)]">
            {dict.result.devotionError}
          </p>
        )}
        {status === "ready" && devotion && (
          <div className="flex flex-col gap-5 text-[var(--foreground)]">
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                {dict.result.reflectionLabel}
              </h2>
              <p className="mt-2 font-serif text-lg leading-relaxed">
                {devotion.reflection}
              </p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                {dict.result.prayerLabel}
              </h2>
              <p className="mt-2 font-serif italic text-lg leading-relaxed">
                {devotion.prayer}
              </p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                {dict.result.actionLabel}
              </h2>
              <p className="mt-2 text-base leading-relaxed">
                {devotion.actionStep}
              </p>
            </div>
          </div>
        )}
      </section>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIndex(pickIndex(verses.length, index))}
          className="rounded-full bg-[var(--card)] border border-[var(--card-border)] px-5 py-2 text-sm hover:bg-[var(--background)]"
        >
          {dict.result.anotherVerse}
        </button>
        <button
          onClick={share}
          className="rounded-full bg-[var(--foreground)] px-5 py-2 text-sm text-[var(--background)] hover:opacity-90"
        >
          {dict.result.share}
        </button>
      </div>
    </div>
  );
}
