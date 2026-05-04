import type { Locale } from "@manna/shared/i18n/config";

// Type system per designer:
// - Big text (titles, emotion names, verse body) = Cormorant Garamond + Noto Serif KR
// - UI labels (eyebrows, buttons, captions) = Inter Tight + Noto Sans KR
//
// On Korean locale we swap the family entirely instead of relying on font
// fallback because Cormorant ships no Hangul glyphs and Inter Tight's KR
// fallback is uneven across iOS/Android system versions.

export function serifMedium(locale: Locale): string {
  return locale === "ko" ? "NotoSerifKR_500Medium" : "CormorantGaramond_500Medium";
}

export function serifRegular(locale: Locale): string {
  return locale === "ko" ? "NotoSerifKR_400Regular" : "CormorantGaramond_500Medium";
}

export function serifItalic(locale: Locale): string {
  // Noto Serif KR has no italic — fall back to medium for KO.
  return locale === "ko" ? "NotoSerifKR_500Medium" : "CormorantGaramond_500Medium_Italic";
}

export function sansRegular(locale: Locale): string {
  return locale === "ko" ? "NotoSansKR_400Regular" : "InterTight_400Regular";
}

export function sansMedium(locale: Locale): string {
  return locale === "ko" ? "NotoSansKR_500Medium" : "InterTight_500Medium";
}

export function sansSemiBold(locale: Locale): string {
  return locale === "ko" ? "NotoSansKR_600SemiBold" : "InterTight_600SemiBold";
}
