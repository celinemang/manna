import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { verses } from "@manna/shared/data/verses";
import { getEmotion } from "@manna/shared/data/emotions";
import type { EmotionId } from "@manna/shared/lib/types";
import { SwipeStack } from "../../components/SwipeStack";
import { VerseCard } from "../../components/VerseCard";
import { Wordmark } from "../../components/Wordmark";
import { useLocale } from "../../lib/useLocale";

export default function Today() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [index, setIndex] = useState(0);

  // Stable shuffled order per session — feels more "today" than always
  // starting at anxious-001. Real "today's verse" logic comes in Phase 4
  // (date-seeded selection so the same verse appears all day).
  const ordered = useMemo(() => {
    const copy = [...verses];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  const current = ordered[index];
  const emotion = getEmotion(current.emotion);
  if (!emotion) return null;

  const emotionLabel = t(`emotions.${current.emotion as EmotionId}.label`);

  return (
    <View style={{ flex: 1, backgroundColor: "#1F1812" }}>
      {/* Top chrome */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 18,
          paddingBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Wordmark size={18} color="#F4ECDF" />
      </View>

      {/* Card stack */}
      <View style={{ flex: 1, paddingHorizontal: 18, paddingBottom: 28 }}>
        <SwipeStack
          items={ordered}
          onIndexChange={setIndex}
          renderCard={(verse) => {
            const meta = getEmotion(verse.emotion);
            if (!meta) return null;
            return (
              <VerseCard
                verse={verse}
                emotion={meta}
                emotionLabel={t(`emotions.${verse.emotion as EmotionId}.label`)}
                locale={locale}
              />
            );
          }}
        />
      </View>

      {/* Page indicator */}
      <View
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: [{ translateY: -50 }],
          gap: 3,
        }}
        pointerEvents="none"
      >
        {ordered.slice(0, 8).map((_, i) => (
          <View
            key={i}
            style={{
              width: 3,
              height: i === index % 8 ? 16 : 4,
              borderRadius: 999,
              backgroundColor:
                i === index % 8 ? "#F4ECDF" : "rgba(244,236,223,0.3)",
            }}
          />
        ))}
      </View>

      {/* Up-swipe hint */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 12,
          alignItems: "center",
        }}
        pointerEvents="none"
      >
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 11,
            color: "rgba(244,236,223,0.45)",
            letterSpacing: 1,
          }}
        >
          ↑ {emotionLabel.toLowerCase() ? `Swipe for next` : "Swipe for next"}
        </Text>
      </View>
    </View>
  );
}
