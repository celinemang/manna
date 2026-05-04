import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { verses } from "@/data/verses";
import { SavedList } from "./SavedList";

export default async function SavedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // Pass the verse table so the client component doesn't have to import the
  // full data set (and we keep the lookup centralized).
  const verseMap = Object.fromEntries(verses.map((v) => [v.id, v]));

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 pb-6 pt-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          {dict.saved.eyebrow}
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">
          {dict.saved.heading}
        </h1>
      </header>
      <SavedList locale={locale} dict={dict} verseMap={verseMap} />
    </div>
  );
}
