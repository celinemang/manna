import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams, useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { getEmotion } from "@manna/shared/data/emotions";
import { versesByEmotion } from "@manna/shared/data/verses";
import type { Devotion, EmotionId, Verse } from "@manna/shared/lib/types";
import { Glyph } from "../../components/Glyph";
import { fetchDevotion } from "../../lib/devotion";
import { useLocale } from "../../lib/useLocale";

function pickIndex(length: number, exclude: number) {
  if (length <= 1) return 0;
  let i = Math.floor(Math.random() * length);
  if (i === exclude) i = (i + 1) % length;
  return i;
}

export default function EmotionResult() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const router = useRouter();
  const params = useLocalSearchParams<{ emotion: EmotionId }>();
  const emotionId = params.emotion as EmotionId;
  const meta = getEmotion(emotionId);
  const pool = useMemo(() => versesByEmotion(emotionId), [emotionId]);
  const [index, setIndex] = useState(() =>
    pool.length > 0 ? Math.floor(Math.random() * pool.length) : 0,
  );
  const verse: Verse | undefined = pool[index];

  const [devotion, setDevotion] = useState<Devotion | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!verse || !meta) return;
    const ctrl = new AbortController();
    setStatus("loading");
    setDevotion(null);
    fetchDevotion({
      verseId: verse.id,
      emotion: emotionId,
      locale,
      signal: ctrl.signal,
    })
      .then((d) => {
        setDevotion(d);
        setStatus("ready");
      })
      .catch(() => {
        if (ctrl.signal.aborted) return;
        setStatus("error");
      });
    return () => ctrl.abort();
  }, [verse?.id, emotionId, locale]);

  if (!meta || !verse) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF4E8" }}>
        <Text style={{ padding: 24 }}>Not found</Text>
      </SafeAreaView>
    );
  }

  const emotionLabel = t(`emotions.${emotionId}.label`);
  const text = verse.text[locale] ?? verse.text.en;
  const reference = verse.reference[locale] ?? verse.reference.en;
  const translation = verse.translation[locale] ?? verse.translation.en;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF4E8" }}>
      {/* Top bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          gap: 4,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center" }}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 6l-6 6 6 6"
              stroke="#3A2E22"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "Inter_500Medium",
            fontSize: 13,
            color: "#5A4A38",
            letterSpacing: 1.6,
            textTransform: "uppercase",
          }}
        >
          devotion
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
      >
        {/* Emotion chip */}
        <View
          style={{
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingLeft: 8,
            paddingRight: 14,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: "#EDE2CF",
            borderWidth: 1,
            borderColor: "#D9CBB1",
            marginTop: 8,
          }}
        >
          <Glyph kind={meta.glyph} size={16} color="#3A2E22" strokeWidth={1.5} />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: "#3A2E22",
              letterSpacing: 0.4,
            }}
          >
            {emotionLabel}
          </Text>
        </View>

        {/* Verse card */}
        <View
          style={{
            marginTop: 22,
            padding: 26,
            paddingTop: 28,
            borderRadius: 22,
            backgroundColor: meta.bg,
            borderWidth: 1,
            borderColor: "#D9CBB1",
          }}
        >
          <Text
            style={{
              position: "absolute",
              top: 8,
              left: 18,
              fontFamily: "CormorantGaramond_500Medium",
              fontSize: 90,
              color: meta.ink,
              opacity: 0.16,
              lineHeight: 90,
            }}
          >
            “
          </Text>
          <Text
            style={{
              fontFamily: "CormorantGaramond_500Medium",
              fontSize: 22,
              lineHeight: 31,
              color: meta.ink,
              letterSpacing: -0.1,
            }}
          >
            {text}
          </Text>
          <View
            style={{
              marginTop: 18,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={{ width: 36, height: 1, backgroundColor: meta.ink, opacity: 0.5 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 11.5,
                color: meta.ink,
                opacity: 0.85,
                letterSpacing: 1.6,
                textTransform: "uppercase",
              }}
            >
              {reference} · {translation}
            </Text>
          </View>
        </View>

        {/* Reflection / Prayer / Action */}
        {status === "loading" && (
          <View style={{ marginTop: 30, alignItems: "center", gap: 12 }}>
            <ActivityIndicator color="#8A7A66" />
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "#8A7A66" }}>
              {t("result.loadingDevotion")}
            </Text>
          </View>
        )}

        {status === "error" && (
          <Text
            style={{
              marginTop: 30,
              fontFamily: "CormorantGaramond_500Medium_Italic",
              fontSize: 16,
              color: "#8A7A66",
              lineHeight: 24,
            }}
          >
            {t("result.devotionError")}
          </Text>
        )}

        {status === "ready" && devotion && (
          <>
            <Section label={t("result.reflectionLabel")}>
              <Text style={bodyStyle}>{devotion.reflection}</Text>
            </Section>
            <Section label={t("result.prayerLabel")}>
              <View
                style={{
                  marginTop: 12,
                  paddingVertical: 16,
                  paddingHorizontal: 22,
                  borderLeftWidth: 2,
                  borderLeftColor: "#B89556",
                }}
              >
                <Text
                  style={{
                    fontFamily: "CormorantGaramond_500Medium_Italic",
                    fontSize: 16.5,
                    lineHeight: 27,
                    color: "#5A4A38",
                  }}
                >
                  {devotion.prayer}
                </Text>
              </View>
            </Section>
            <Section label={t("result.actionLabel")}>
              <View
                style={{
                  marginTop: 12,
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "#8A7A66",
                  backgroundColor: "rgba(232,219,196,0.35)",
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    borderWidth: 1.4,
                    borderColor: "#3A2E22",
                    marginTop: 2,
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Inter_500Medium",
                    fontSize: 15,
                    lineHeight: 23,
                    color: "#3A2E22",
                  }}
                >
                  {devotion.actionStep}
                </Text>
              </View>
            </Section>
          </>
        )}
      </ScrollView>

      {/* Bottom action bar */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 30,
          backgroundColor: "#FAF4E8",
          borderTopColor: "#D9CBB1",
          borderTopWidth: 1,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => setIndex((i) => pickIndex(pool.length, i))}
          style={({ pressed }) => ({
            flex: 1,
            height: 52,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "#D9CBB1",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FAF4E8",
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: "#3A2E22" }}>
            {t("result.anotherVerse")}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => ({
            flex: 1.2,
            height: 52,
            borderRadius: 999,
            backgroundColor: "#3A2E22",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: "#FAF4E8" }}>
            {t("result.share")}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const bodyStyle = {
  marginTop: 12,
  fontFamily: "CormorantGaramond_500Medium",
  fontSize: 17,
  lineHeight: 27,
  color: "#3A2E22",
} as const;

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 28 }}>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 11,
          color: "#8A7A66",
          letterSpacing: 2.2,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}
