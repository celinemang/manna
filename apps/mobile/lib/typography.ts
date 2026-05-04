import type { Locale } from "@manna/shared/i18n/config";

// Verse bodies and onboarding hero titles use a serif. Cormorant Garamond
// has no Korean glyphs, so for Korean we swap to Noto Serif KR. Inter has
// usable Korean fallback via the system font on both platforms — leaving
// labels/captions on Inter avoids a heavier per-screen font swap.

export function serifMedium(locale: Locale): string {
  return locale === "ko" ? "NotoSerifKR_500Medium" : "CormorantGaramond_500Medium";
}

export function serifItalic(locale: Locale): string {
  // Noto Serif KR has no italic — fall back to medium for KO, since italic
  // is decorative here (loading + error microcopy).
  return locale === "ko" ? "NotoSerifKR_500Medium" : "CormorantGaramond_500Medium_Italic";
}
