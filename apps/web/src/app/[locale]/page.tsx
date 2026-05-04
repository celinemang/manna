import { notFound } from "next/navigation";
import { VerseFeed } from "@/components/VerseFeed";
import { verses } from "@manna/shared/data/verses";
import { isLocale } from "@manna/shared/i18n/config";
import { getDictionary } from "@manna/shared/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 pb-6 pt-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          {dict.home.eyebrow}
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">
          {dict.home.heading}
        </h1>
      </header>
      <VerseFeed verses={verses} locale={locale} dict={dict} />
    </div>
  );
}
