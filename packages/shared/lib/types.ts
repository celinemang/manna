import type { Locale } from "../i18n/config";

export type EmotionId =
  | "anxious"
  | "lonely"
  | "tired"
  | "guilty"
  | "angry"
  | "grateful"
  | "afraid"
  | "discouraged"
  | "peaceful"
  | "hopeful";

export type EmotionMeta = {
  id: EmotionId;
  // Designer's per-emotion paper tones — bg fills the verse card, ink colors
  // the type. See HANDOFF + tokens.jsx (MANNA_EMOTIONS).
  bg: string;
  ink: string;
  // Glyph kind from MannaGlyph (wave / moon / leaf / drop / flame / sun /
  // shield / spark / wheat).
  glyph:
    | "wave"
    | "moon"
    | "leaf"
    | "drop"
    | "flame"
    | "sun"
    | "shield"
    | "spark";
};

export type LocalizedText = Record<Locale, string>;

export type Verse = {
  id: string;
  emotion: EmotionId;
  reference: LocalizedText;
  text: LocalizedText;
  translation: LocalizedText;
  tags: string[];
};

export type Devotion = {
  reflection: string;
  prayer: string;
  actionStep: string;
};

export type SavedItem = {
  key: string;
  verseId: string;
  emotion?: EmotionId;
  locale: Locale;
  savedAt: number;
  devotion?: Devotion;
};
