import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Noto_Serif_KR } from "next/font/google";
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

const serifKo = Noto_Serif_KR({
  variable: "--font-serif-ko",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${sans.variable} ${serif.variable} ${serifKo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
