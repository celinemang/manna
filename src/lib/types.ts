import type { Locale } from "@/i18n/config";

export type EmotionId =
  | "anxious"
  | "lonely"
  | "tired"
  | "guilty"
  | "grateful"
  | "hopeful";

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
