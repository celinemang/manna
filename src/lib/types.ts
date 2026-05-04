export type EmotionId =
  | "anxious"
  | "lonely"
  | "tired"
  | "guilty"
  | "grateful"
  | "hopeful";

export type Emotion = {
  id: EmotionId;
  label: string;
  prompt: string;
};

export type Verse = {
  id: string;
  emotion: EmotionId;
  reference: string;
  text: string;
  translation: string;
  tags: string[];
};
