import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Manna — Scripture for your heart",
  description:
    "A quiet space for Bible verses, reflection, and prayer — one moment at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-1 flex flex-col">{children}</main>
        <nav className="sticky bottom-0 border-t border-[var(--card-border)] bg-[var(--background)]/90 backdrop-blur">
          <ul className="mx-auto flex max-w-md justify-around py-3 text-xs uppercase tracking-widest text-[var(--muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--foreground)]">
                Today
              </Link>
            </li>
            <li>
              <Link href="/feelings" className="hover:text-[var(--foreground)]">
                Feelings
              </Link>
            </li>
          </ul>
        </nav>
      </body>
    </html>
  );
}
