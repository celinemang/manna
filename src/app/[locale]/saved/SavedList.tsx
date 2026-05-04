"use client";

import Link from "next/link";
import { removeItem, useSaved } from "@/lib/saved";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Verse } from "@/lib/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
  verseMap: Record<string, Verse>;
};

export function SavedList({ locale, dict, verseMap }: Props) {
  const items = useSaved();

  if (items.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-[var(--card-border)] bg-[var(--card)] p-8 text-center text-sm italic text-[var(--muted)]">
        {dict.saved.empty}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => {
        const verse = verseMap[item.verseId];
        if (!verse) return null;
        const text = verse.text[locale];
        const reference = verse.reference[locale];
        const date = new Date(item.savedAt).toLocaleDateString(
          locale === "ko" ? "ko-KR" : "en-US",
          { year: "numeric", month: "short", day: "numeric" },
        );

        const target = item.emotion
          ? `/${locale}/feelings/${item.emotion}`
          : `/${locale}`;

        return (
          <li
            key={item.key}
            className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6"
          >
            <div className="flex items-baseline justify-between text-xs text-[var(--muted)]">
              <span className="font-serif italic">{reference}</span>
              <span>{date}</span>
            </div>
            <p className="mt-3 font-serif text-lg leading-relaxed text-[var(--foreground)] line-clamp-4">
              “{text}”
            </p>
            {item.devotion && (
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
                {item.devotion.reflection}
              </p>
            )}
            <div className="mt-4 flex justify-end gap-2 text-xs uppercase tracking-widest">
              <Link
                href={target}
                className="rounded-full border border-[var(--card-border)] px-3 py-1 hover:text-[var(--foreground)]"
              >
                {dict.saved.open}
              </Link>
              <button
                onClick={() => removeItem(item.key)}
                className="rounded-full border border-[var(--card-border)] px-3 py-1 hover:text-[var(--foreground)]"
              >
                {dict.saved.remove}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
