import Link from "next/link";
import { notFound } from "next/navigation";
import { emotionIds } from "@manna/shared/data/emotions";
import { isLocale } from "@manna/shared/i18n/config";
import { getDictionary } from "@manna/shared/i18n/dictionaries";

export default async function FeelingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-5 pb-6 pt-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          {dict.feelings.eyebrow}
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">
          {dict.feelings.heading}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {dict.feelings.subheading}
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-3">
        {emotionIds.map((id) => {
          const e = dict.emotions[id];
          return (
            <li key={id}>
              <Link
                href={`/${locale}/feelings/${id}`}
                className="block rounded-2xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-6 text-center transition hover:border-[var(--accent)] hover:bg-[var(--background)]"
              >
                <span className="font-serif text-xl text-[var(--foreground)]">
                  {e.label}
                </span>
                <span className="mt-1 block text-xs text-[var(--muted)]">
                  {e.prompt}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
