import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { emotions } from "@manna/shared/data/emotions";
import type { EmotionId } from "@manna/shared/lib/types";
import { Glyph } from "../../components/Glyph";
import { PaperGrain } from "../../components/PaperGrain";
import { ProgressDots } from "../../components/ProgressDots";
import { tokens } from "../../lib/tokens";
import { saveSelectedEmotions } from "../../lib/onboarding";

export default function EmotionsStep() {
  const { t } = useTranslation();
  const router = useRouter();
  const [selected, setSelected] = useState<Set<EmotionId>>(new Set());

  const toggle = (id: EmotionId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onContinue = async () => {
    await saveSelectedEmotions(Array.from(selected));
    router.push("/(onboarding)/value");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <PaperGrain />

      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={{ paddingHorizontal: 28, paddingTop: 16, paddingBottom: 8 }}
      >
        <Text
          style={{
            fontFamily: "NotoSerifKR_500Medium",
            fontSize: 28,
            color: tokens.ink,
            lineHeight: 36,
            letterSpacing: -0.3,
          }}
        >
          {"지금 마음을\n골라주세요"}
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontFamily: "NotoSansKR_400Regular",
            fontSize: 13,
            color: tokens.ink3,
            lineHeight: 20,
          }}
        >
          {t("onboarding.selectHint")}
        </Text>
      </Animated.View>

      {/* Emotion pills */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 16, paddingBottom: 24, gap: 10 }}
      >
        {chunk2(emotions).map((row, ri) => (
          <Animated.View
            key={ri}
            entering={FadeInDown.duration(500).delay(100 + ri * 60)}
            style={{ flexDirection: "row", gap: 10 }}
          >
            {row.map((em) => {
              const label = t(`emotions.${em.id as EmotionId}.label`);
              const active = selected.has(em.id as EmotionId);
              return (
                <Pressable
                  key={em.id}
                  onPress={() => toggle(em.id as EmotionId)}
                  style={({ pressed }) => ({
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderRadius: 14,
                    backgroundColor: active ? tokens.ink : tokens.card,
                    borderWidth: 1,
                    borderColor: active ? tokens.ink : tokens.hairline,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Glyph
                    kind={em.glyph}
                    size={20}
                    color={active ? tokens.cream : em.ink}
                    strokeWidth={1.5}
                  />
                  <Text
                    style={{
                      fontFamily: "NotoSerifKR_500Medium",
                      fontSize: 18,
                      color: active ? tokens.cream : em.ink,
                      letterSpacing: -0.2,
                    }}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </Animated.View>
        ))}
      </ScrollView>

      {/* Bottom */}
      <View
        style={{
          paddingHorizontal: 28,
          paddingBottom: 40,
          paddingTop: 12,
          gap: 16,
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: `rgba(42,33,26,0.08)`,
          backgroundColor: tokens.cream,
        }}
      >
        <ProgressDots current={2} total={5} />
        <Pressable
          onPress={onContinue}
          disabled={selected.size === 0}
          style={({ pressed }) => ({
            width: "100%",
            height: 56,
            borderRadius: 999,
            backgroundColor: selected.size === 0 ? "rgba(42,33,26,0.15)" : tokens.ink,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: "NotoSansKR_600SemiBold",
              fontSize: 16,
              color: selected.size === 0 ? tokens.ink3 : tokens.cream,
            }}
          >
            다음
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function chunk2<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
  return out;
}
