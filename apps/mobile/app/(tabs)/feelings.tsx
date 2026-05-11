import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { emotions } from "@manna/shared/data/emotions";
import type { EmotionId } from "@manna/shared/lib/types";
import { Glyph } from "../../components/Glyph";
import { PaperGrain } from "../../components/PaperGrain";
import { useLocale } from "../../lib/useLocale";
import { serifMedium } from "../../lib/typography";
import { tokens } from "../../lib/tokens";

export default function Feelings() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const router = useRouter();

  const eyebrow = t("feelings.eyebrow");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      {/* Global paper grain — sits behind all content */}
      <PaperGrain />

      {/* TopBar */}
      <View
        style={{
          height: 48,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Pressable
          onPress={() => router.push("/(tabs)")}
          hitSlop={12}
          accessibilityLabel={locale === "ko" ? "뒤로" : "Back"}
          style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center" }}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 6l-6 6 6 6"
              stroke={tokens.ink}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </View>

      {/* Header */}
      <View style={{ paddingHorizontal: 28, paddingBottom: 8 }}>
        <Text
          style={{
            fontFamily: "InterTight_500Medium",
            fontSize: 12,
            color: tokens.ink3,
            letterSpacing: locale === "ko" ? 0.5 : 1.6,
            textTransform: locale === "ko" ? "none" : "uppercase",
          }}
        >
          {eyebrow}
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontFamily: serifMedium(locale),
            fontSize: 30,
            color: tokens.ink,
            letterSpacing: -0.3,
            lineHeight: 36,
          }}
        >
          {t("feelings.heading")}
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontFamily: "InterTight_400Regular",
            fontSize: 13,
            lineHeight: 20,
            color: tokens.ink3,
            maxWidth: 320,
          }}
        >
          {t("feelings.subheading")}
        </Text>
      </View>

      {/* Emotion card grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingTop: 22,
          paddingBottom: 130,
          gap: 10,
        }}
      >
        {chunk2(emotions).map((row, ri) => (
          <View key={ri} style={{ flexDirection: "row", gap: 10 }}>
            {row.map((em) => {
              const label = t(`emotions.${em.id as EmotionId}.label`);
              const prompt = t(`emotions.${em.id as EmotionId}.prompt`);
              return (
                <Pressable
                  key={em.id}
                  onPress={() => router.push(`/feelings/${em.id}`)}
                  accessibilityLabel={`${label}, ${prompt}`}
                  style={({ pressed }) => ({
                    flex: 1,
                    minHeight: 116,
                    paddingVertical: 18,
                    paddingHorizontal: 16,
                    borderRadius: 18,
                    backgroundColor: em.bg,
                    justifyContent: "space-between",
                    overflow: "hidden",
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  })}
                >
                  {/* Per-card paper grain overlay */}
                  <PaperGrain opacity={0.07} color={em.ink} />

                  {/* Glyph top-left */}
                  <Glyph kind={em.glyph} size={28} color={em.ink} strokeWidth={1.4} />

                  {/* Label + prompt bottom */}
                  <View>
                    <Text
                      style={{
                        fontFamily: serifMedium(locale),
                        fontSize: 22,
                        color: em.ink,
                        letterSpacing: -0.2,
                      }}
                    >
                      {label}
                    </Text>
                    <Text
                      style={{
                        marginTop: 2,
                        fontFamily: "InterTight_400Regular",
                        fontSize: 11,
                        color: em.ink,
                        opacity: 0.6,
                        letterSpacing: 0.4,
                      }}
                    >
                      {prompt}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function chunk2<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
  return out;
}
