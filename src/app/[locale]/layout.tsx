import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const otherLocale = locale === "en" ? "ko" : "en";

  return (
    <div className="flex flex-1 flex-col" lang={locale}>
      <header className="mx-auto flex w-full max-w-md items-center justify-end px-5 pt-4 text-xs uppercase tracking-widest text-[var(--muted)]">
        <Link
          href={`/${otherLocale}`}
          className="rounded-full border border-[var(--card-border)] px-3 py-1 hover:text-[var(--foreground)]"
          aria-label={`Switch language to ${otherLocale}`}
        >
          {dict.localeSwitcher[otherLocale]}
        </Link>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <nav className="sticky bottom-0 border-t border-[var(--card-border)] bg-[var(--background)]/90 backdrop-blur">
        <ul className="mx-auto flex max-w-md justify-around py-3 text-xs uppercase tracking-widest text-[var(--muted)]">
          <li>
            <Link
              href={`/${locale}`}
              className="hover:text-[var(--foreground)]"
            >
              {dict.nav.today}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/feelings`}
              className="hover:text-[var(--foreground)]"
            >
              {dict.nav.feelings}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
