import type { EmotionId, EmotionMeta } from "../lib/types";

// 6 spiritual-wellness categories.
// Palette: calm + differentiated — each category has its own mood.
export const emotions: EmotionMeta[] = [
  // 불안 — sage green, calm, grounding
  { id: "anxiety",    bg: "#D8DBC4", ink: "#2C2F22", glyph: "wave"   },
  // 우울한 마음 — cool grey-blue, quiet
  { id: "sadness",    bg: "#D4D8DC", ink: "#28303A", glyph: "drop"   },
  // 자신감 — warm gold, bright, energising
  { id: "confidence", bg: "#F2DEB5", ink: "#3A2C16", glyph: "spark"  },
  // 자신을 사랑하기 — warm rose, gentle, tender
  { id: "love",       bg: "#F0D9CC", ink: "#3D2418", glyph: "sun"    },
  // 내려놓기 — muted slate blue, quiet surrender
  { id: "release",    bg: "#C8D4E0", ink: "#1E2C3A", glyph: "leaf"   },
  // 힘이 되는 말씀 — warm neutral parchment, grounding hope
  { id: "strength",   bg: "#E8D9C0", ink: "#3A2E20", glyph: "shield" },
];

export const emotionIds: EmotionId[] = emotions.map((e) => e.id);

export function getEmotion(id: EmotionId): EmotionMeta | undefined {
  return emotions.find((e) => e.id === id);
}
