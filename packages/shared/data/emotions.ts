import type { EmotionId, EmotionMeta } from "../lib/types";

// Designer's emotion table (bg, ink, glyph) from tokens.jsx MANNA_EMOTIONS.
// Colors from PAGE-SPEC-Feelings.md designer spec (bilingual section)
export const emotions: EmotionMeta[] = [
  { id: "anxious",     bg: "#E8D9C0", ink: "#3A2E20", glyph: "wave"  },
  { id: "lonely",      bg: "#DAD1BD", ink: "#2E2A22", glyph: "moon"  },
  { id: "tired",       bg: "#D8DBC4", ink: "#2C2F22", glyph: "leaf"  },
  { id: "guilty",      bg: "#EADBC9", ink: "#3A2722", glyph: "drop"  },
  { id: "angry",       bg: "#E8C7A8", ink: "#3D2417", glyph: "flame" },
  { id: "grateful",    bg: "#F2DEB5", ink: "#3A2C16", glyph: "sun"   },
  { id: "afraid",      bg: "#E8D9C0", ink: "#3A2E20", glyph: "wave"  },
  { id: "discouraged", bg: "#DAD1BD", ink: "#2E2A22", glyph: "moon"  },
  { id: "peaceful",    bg: "#D8DBC4", ink: "#2C2F22", glyph: "leaf"  },
  { id: "hopeful",     bg: "#F2DEB5", ink: "#3A2C16", glyph: "sun"   },
];

export const emotionIds: EmotionId[] = emotions.map((e) => e.id);

export function getEmotion(id: EmotionId): EmotionMeta | undefined {
  return emotions.find((e) => e.id === id);
}
