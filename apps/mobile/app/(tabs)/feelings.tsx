import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
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

  // 10 emotions / 2 columns / 5 rows. Each row gets flex:1 inside a flex:1
  // container so the grid stretches to fill the space between header and tab.
  const rows: typeof emotions[] = [];
  for (let i = 0; i < emotions.length; i += 2) {
    rows.push(emotions.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <PaperGrain />
      <View style={{ paddingHorizontal: 28, paddingTop: 4, paddingBottom: 8 }}>
        <Text
          style={{
            fontFamily: "InterTight_500Medium",
            fontSize: 12,
            color: "#8A7A66",
            letterSpacing: 1.6,
            textTransform: "uppercase",
          }}
        >
          {t("feelings.eyebrow")}
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontFamily: serifMedium(locale),
            fontSize: 30,
            color: "#2A211A",
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
            color: "#8A7A66",
            maxWidth: 320,
          }}
        >
          {t("feelings.subheading")}
        </Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 12, gap: 10 }}>
        {rows.map((row, ri) => (
          <View key={ri} style={{ flex: 1, flexDirection: "row", gap: 10 }}>
            {row.map((em) => {
              const label = t(`emotions.${em.id as EmotionId}.label`);
              const prompt = t(`emotions.${em.id as EmotionId}.prompt`);
              return (
                <Pressable
                  key={em.id}
                  onPress={() => router.push(`/feelings/${em.id}`)}
                  style={({ pressed }) => ({
                    flex: 1,
                    padding: 20,
                    paddingTop: 22,
                    paddingBottom: 18,
                    borderRadius: 22,
                    backgroundColor: em.bg,
                    justifyContent: "space-between",
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Glyph kind={em.glyph} size={34} color={em.ink} strokeWidth={1.4} />
                  <View>
                    <Text
                      style={{
                        fontFamily: serifMedium(locale),
                        fontSize: 24,
                        color: em.ink,
                        letterSpacing: -0.2,
                      }}
                    >
                      {label}
                    </Text>
                    <Text
                      style={{
                        marginTop: 4,
                        fontFamily: "InterTight_400Regular",
                        fontSize: 12,
                        lineHeight: 18,
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
      </View>
    </SafeAreaView>
  );
}
