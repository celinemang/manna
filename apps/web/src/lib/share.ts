import type { Locale } from "@manna/shared/i18n/config";

export async function shareVerseCard(args: {
  verseId: string;
  locale: Locale;
  fallbackText: string;
  shareTitle: string;
}) {
  const { verseId, locale, fallbackText, shareTitle } = args;
  const pngUrl = `/api/share/png?verseId=${encodeURIComponent(
    verseId,
  )}&locale=${locale}`;

  // Try the Web Share API with the rendered PNG attached. Mobile Safari and
  // Android Chrome both support this; it pops the native share sheet so the
  // user can post the image directly to Instagram, Messages, etc.
  try {
    const res = await fetch(pngUrl);
    if (res.ok) {
      const blob = await res.blob();
      const file = new File([blob], `manna-${verseId}.png`, {
        type: "image/png",
      });
      if (
        typeof navigator !== "undefined" &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          title: shareTitle,
          text: fallbackText,
          files: [file],
        });
        return;
      }
    }
  } catch {
    // fall through to the next strategy
  }

  // Desktop fallback: open the PNG in a new tab so the user can save it.
  if (typeof window !== "undefined") {
    window.open(pngUrl, "_blank", "noopener");
    return;
  }

  // Last-resort fallback: copy the text.
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(fallbackText);
  }
}
