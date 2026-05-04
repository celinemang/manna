import type { EmotionId, EmotionMeta } from "../lib/types";

// Designer's emotion table (bg, ink, glyph) from tokens.jsx MANNA_EMOTIONS.
export const emotions: EmotionMeta[] = [
  { id: "anxious", bg: "#E7E1D2", ink: "#3A2E22", glyph: "wave" },
  { id: "lonely", bg: "#D8DCE3", ink: "#2A3142", glyph: "moon" },
  { id: "tired", bg: "#E6DCC4", ink: "#4A3A28", glyph: "leaf" },
  { id: "guilty", bg: "#D9CFC4", ink: "#3A2E22", glyph: "drop" },
  { id: "angry", bg: "#E8D4CA", ink: "#3A2620", glyph: "flame" },
  { id: "grateful", bg: "#E0E2CC", ink: "#2F3A2C", glyph: "sun" },
  { id: "afraid", bg: "#D6D8DD", ink: "#2A2E3A", glyph: "shield" },
  { id: "discouraged", bg: "#DCD4C8", ink: "#3A2E22", glyph: "wave" },
  { id: "peaceful", bg: "#DCE3DA", ink: "#2F3A2C", glyph: "sun" },
  { id: "hopeful", bg: "#E5DCC0", ink: "#3A2E22", glyph: "spark" },
];

export const emotionIds: EmotionId[] = emotions.map((e) => e.id);

export function getEmotion(id: EmotionId): EmotionMeta | undefined {
  return emotions.find((e) => e.id === id);
}
