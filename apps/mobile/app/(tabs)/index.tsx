import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { verses } from "@manna/shared/data/verses";
import { getEmotion } from "@manna/shared/data/emotions";
import type { EmotionId } from "@manna/shared/lib/types";
import { SwipeStack } from "../../components/SwipeStack";
import { VerseCard } from "../../components/VerseCard";
import { Wordmark } from "../../components/Wordmark";
import { PaperGrain } from "../../components/PaperGrain";
import { useLocale } from "../../lib/useLocale";
import { tokens } from "../../lib/tokens";
import { removeByVerseId, saveItem, useSaved } from "../../lib/saved";

export default function Today() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { locale } = useLocale();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const { items: savedItems } = useSaved();

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
    <View style={{ flex: 1, backgroundColor: tokens.night }}>
      <PaperGrain color={tokens.cream} opacity={0.04} />
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
        <Wordmark size={18} color="#F5EBD7" />
      </View>

      {/* Card stack */}
      <View style={{ flex: 1, paddingHorizontal: 18, paddingBottom: 28 }}>
        <SwipeStack
          items={ordered}
          onIndexChange={setIndex}
          renderCard={(verse) => {
            const meta = getEmotion(verse.emotion);
            if (!meta) return null;
            const saved = savedItems.some((i) => i.verseId === verse.id);
            const onToggleSave = () => {
              if (saved) void removeByVerseId(verse.id);
              else void saveItem({ verseId: verse.id, emotion: verse.emotion, locale });
            };
            const onShare = () => {
              router.push({
                pathname: "/share/[verseId]",
                params: { verseId: verse.id, emotion: verse.emotion },
              });
            };
            return (
              <VerseCard
                verse={verse}
                emotion={meta}
                emotionLabel={t(`emotions.${verse.emotion as EmotionId}.label`)}
                locale={locale}
                saved={saved}
                onToggleSave={onToggleSave}
                onShare={onShare}
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
                i === index % 8 ? "#F5EBD7" : "rgba(244,236,223,0.3)",
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
            fontFamily: "InterTight_500Medium",
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
