import type { Verse } from "@/lib/types";

type Props = {
  verse: Verse;
  showEmotion?: boolean;
};

export function VerseCard({ verse, showEmotion = false }: Props) {
  return (
    <article className="flex h-full w-full flex-col justify-between rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-8 shadow-sm">
      {showEmotion && (
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
          {verse.emotion}
        </span>
      )}
      <p className="font-serif text-2xl leading-relaxed text-[var(--foreground)] sm:text-3xl">
        “{verse.text}”
      </p>
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="font-serif text-lg italic text-[var(--muted)]">
            {verse.reference}
          </p>
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]/70">
            {verse.translation}
          </p>
        </div>
      </div>
    </article>
  );
}
