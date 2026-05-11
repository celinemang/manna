import type { Locale } from "../i18n/config";

// 6 spiritual-wellness categories — "감정 + 자기회복 + 삶의 방향성"
export type EmotionId =
  | "anxiety"    // 불안
  | "sadness"    // 우울한 마음
  | "confidence" // 자신감
  | "love"       // 자신을 사랑하기
  | "release"    // 내려놓기
  | "strength";  // 힘이 되는 말씀

export type EmotionMeta = {
  id: EmotionId;
  bg: string;
  ink: string;
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
