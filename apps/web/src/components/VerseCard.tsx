import type { Verse } from "@/lib/types";
import type { Locale } from "@/i18n/config";

type Props = {
  verse: Verse;
  locale: Locale;
};

export function VerseCard({ verse, locale }: Props) {
  return (
    <article className="flex h-full w-full flex-col justify-between rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-8 shadow-sm">
      <p className="font-serif text-2xl leading-relaxed text-[var(--foreground)] sm:text-3xl">
        “{verse.text[locale]}”
      </p>
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="font-serif text-lg italic text-[var(--muted)]">
            {verse.reference[locale]}
          </p>
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]/70">
            {verse.translation[locale]}
          </p>
        </div>
      </div>
    </article>
  );
}
