import { ImageResponse } from "next/og";
import { getVerseById } from "@/data/verses";
import { isLocale } from "@/i18n/config";

export const runtime = "nodejs";

const SIZE = 1080;

async function loadGoogleFont(family: string, weight: number, text: string) {
  // Satori (powering next/og) accepts TTF and WOFF but NOT WOFF2.
  // Modern UAs cause Google Fonts to return WOFF2; pre-WOFF mobile UAs
  // (like iPhone OS 4) get raw TTF. Subset via ?text= to keep payload tiny.
  const variant = weight >= 600 ? `:b${weight}` : weight === 400 ? "" : "";
  const url = `https://fonts.googleapis.com/css?family=${encodeURIComponent(
    family,
  )}${variant}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 4_0 like Mac OS X)",
    },
  }).then((r) => r.text());

  const fontUrl = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error(`Could not parse font URL for ${family}`);
  return fetch(fontUrl).then((r) => r.arrayBuffer());
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const verseId = url.searchParams.get("verseId");
  const locale = url.searchParams.get("locale") ?? "en";

  if (!verseId || !isLocale(locale)) {
    return new Response("invalid_request", { status: 400 });
  }

  const verse = getVerseById(verseId);
  if (!verse) return new Response("verse_not_found", { status: 404 });

  const text = verse.text[locale];
  const reference = verse.reference[locale];
  const wordmark = locale === "ko" ? "만나" : "MANNA";
  const tagline =
    locale === "ko" ? "만나 · 오늘의 말씀" : "MANNA · SCRIPTURE FOR YOUR HEART";

  const family = locale === "ko" ? "Noto Serif KR" : "Cormorant Garamond";
  const allChars = text + reference + wordmark + tagline + "“”—";

  const [bodyFont, italicFont] = await Promise.all([
    loadGoogleFont(family, 500, allChars),
    loadGoogleFont(family, 400, reference + "—"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#FAF7F0",
          color: "#4B3A2F",
          fontFamily: "Body",
        }}
      >
        <div
          style={{
            fontSize: locale === "ko" ? 28 : 22,
            letterSpacing: locale === "ko" ? 4 : 8,
            color: "#8A6F56",
            textTransform: locale === "ko" ? "none" : "uppercase",
          }}
        >
          {wordmark}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <p
            style={{
              fontSize: text.length > 220 ? 44 : 56,
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            “{text}”
          </p>
          <p
            style={{
              fontSize: 32,
              fontStyle: "italic",
              fontFamily: "Italic",
              color: "#8A6F56",
              margin: 0,
            }}
          >
            — {reference}
          </p>
        </div>

        <div
          style={{
            fontSize: 20,
            letterSpacing: locale === "ko" ? 2 : 4,
            color: "#C8A96A",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      width: SIZE,
      height: SIZE,
      fonts: [
        { name: "Body", data: bodyFont, weight: 500, style: "normal" },
        { name: "Italic", data: italicFont, weight: 400, style: "normal" },
      ],
    },
  );
}
