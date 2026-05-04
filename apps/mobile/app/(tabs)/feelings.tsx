import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { emotions } from "@manna/shared/data/emotions";
import type { EmotionId } from "@manna/shared/lib/types";
import { Glyph } from "../../components/Glyph";

export default function Feelings() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4ECDF" }}>
      <View style={{ paddingHorizontal: 28, paddingTop: 4, paddingBottom: 8 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
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
            fontFamily: "CormorantGaramond_500Medium",
            fontSize: 30,
            color: "#3A2E22",
            letterSpacing: -0.3,
            lineHeight: 36,
          }}
        >
          {t("feelings.heading")}
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontFamily: "Inter_400Regular",
            fontSize: 13,
            lineHeight: 20,
            color: "#8A7A66",
            maxWidth: 320,
          }}
        >
          {t("feelings.subheading")}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {emotions.map((em) => {
            const label = t(`emotions.${em.id as EmotionId}.label`);
            const prompt = t(`emotions.${em.id as EmotionId}.prompt`);
            return (
              <Pressable
                key={em.id}
                onPress={() => router.push(`/feelings/${em.id}`)}
                style={({ pressed }) => ({
                  width: "48.5%",
                  minHeight: 168,
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
                      fontFamily: "CormorantGaramond_500Medium",
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
                      fontFamily: "Inter_400Regular",
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
      </ScrollView>
    </SafeAreaView>
  );
}
