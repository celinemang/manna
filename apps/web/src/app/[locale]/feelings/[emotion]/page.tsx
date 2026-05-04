import { notFound } from "next/navigation";
import Link from "next/link";
import { emotionIds } from "@manna/shared/data/emotions";
import { versesByEmotion } from "@manna/shared/data/verses";
import { isLocale } from "@manna/shared/i18n/config";
import { getDictionary } from "@manna/shared/i18n/dictionaries";
import { EmotionResult } from "./EmotionResult";
import type { EmotionId } from "@manna/shared/lib/types";

export default async function EmotionPage({
  params,
}: {
  params: Promise<{ locale: string; emotion: string }>;
}) {
  const { locale, emotion } = await params;
  if (!isLocale(locale)) notFound();
  if (!emotionIds.includes(emotion as EmotionId)) notFound();
  const pool = versesByEmotion(emotion);
  if (pool.length === 0) notFound();

  const dict = getDictionary(locale);
  const meta = dict.emotions[emotion as EmotionId];

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 pb-6 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            {meta.label}
          </p>
          <h1 className="mt-1 font-serif text-2xl text-[var(--foreground)]">
            {meta.prompt}
          </h1>
        </div>
        <Link
          href={`/${locale}/feelings`}
          className="text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          {dict.result.change}
        </Link>
      </header>

      <EmotionResult
        verses={pool}
        emotion={emotion as EmotionId}
        locale={locale}
        dict={dict}
      />
    </div>
  );
}
