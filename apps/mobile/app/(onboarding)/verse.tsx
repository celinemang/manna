import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { getEmotion } from "@manna/shared/data/emotions";
import { versesByEmotion } from "@manna/shared/data/verses";
import type { EmotionId } from "@manna/shared/lib/types";
import { PaperGrain } from "../../components/PaperGrain";
import { Glyph } from "../../components/Glyph";
import { useLocale } from "../../lib/useLocale";
import { serifMedium, serifItalic } from "../../lib/typography";
import { tokens } from "../../lib/tokens";
import { saveItem } from "../../lib/saved";
import { getSelectedEmotions } from "../../lib/onboarding";
import { fetchDevotion } from "../../lib/devotion";

// Static offline devotions for each of the 6 categories (shown while AI loads)
const STATIC: Record<string, { reflection: string; prayer: string }> = {
  anxiety: {
    reflection:
      "하나님은 당신의 불안을 가벼이 여기지 않으십니다. 오히려 그 마음을 기도로 가져오라 부르십니다. 평안은 짐을 내려놓는 자에게 주시는 선물입니다.",
    prayer:
      "주님, 불안한 마음을 그대로 주님께 가져갑니다. 주님의 평안을 부어 주시고, 가까이 계심을 신뢰하게 하소서. 아멘.",
  },
  sadness: {
    reflection:
      "마음이 무거울 때, 하나님은 가장 가까이 계십니다. 그분은 상한 마음을 외면하지 않으시고 오히려 더 가까이 다가오십니다.",
    prayer:
      "아버지, 이 무거운 마음을 당신 앞에 내려놓습니다. 당신의 위로가 내 영혼을 채워 주소서. 아멘.",
  },
  confidence: {
    reflection:
      "당신 안에 하나님의 능력이 있습니다. 두려움은 당신을 정의할 수 없습니다. 그분이 주신 힘으로 오늘을 살아갈 수 있습니다.",
    prayer:
      "주님, 내게 능력과 사랑과 절제하는 마음을 주셔서 감사합니다. 그 힘으로 오늘을 담대히 걸어가게 하소서. 아멘.",
  },
  love: {
    reflection:
      "당신은 하나님의 작품입니다. 실수도, 약함도 당신의 가치를 줄이지 않습니다. 그분은 먼저 당신을 사랑하셨고, 지금도 사랑하고 계십니다.",
    prayer:
      "주님, 내가 하나님의 형상으로 지음 받았음을 감사드립니다. 오늘 나 자신을 더 사랑할 수 있도록 도와주소서. 아멘.",
  },
  release: {
    reflection:
      "손을 펴는 것은 포기가 아닙니다. 그것은 하나님을 신뢰하는 행위입니다. 내가 잡고 있던 것을 내려놓을 때 비로소 하나님의 평안이 채워집니다.",
    prayer:
      "주님, 내 힘으로 붙잡고 있던 것들을 오늘 당신께 드립니다. 당신의 뜻이 이루어지게 하소서. 아멘.",
  },
  strength: {
    reflection:
      "소망은 순진함이 아니라 신뢰의 실체입니다. 하나님은 당신을 위한 미래를 이미 알고 계시며, 좋은 계획으로 이끌고 계십니다.",
    prayer:
      "소망의 하나님, 오늘 주님을 신뢰함으로 기쁨과 평화가 가득하게 하소서. 아멘.",
  },
};

export default function VerseStep() {
  const { locale } = useLocale();
  const router = useRouter();
  const [emotionId, setEmotionId] = useState<EmotionId>("anxiety");
  const [saved, setSaved] = useState(false);

  const [aiReflection, setAiReflection] = useState<string | null>(null);
  const [aiPrayer, setAiPrayer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(true);

  const pool = useMemo(() => versesByEmotion(emotionId), [emotionId]);
  const verse = pool[0];
  const meta = getEmotion(emotionId);

  const staticContent = STATIC[emotionId] ?? STATIC.anxious;
  const reflection = aiReflection ?? staticContent.reflection;
  const prayer = aiPrayer ?? staticContent.prayer;

  useEffect(() => {
    getSelectedEmotions().then((ids) => {
      if (ids.length > 0) setEmotionId(ids[0]);
    });
  }, []);

  useEffect(() => {
    if (!verse) return;
    const ctrl = new AbortController();
    setAiLoading(true);
    fetchDevotion({ verseId: verse.id, emotion: emotionId, locale, signal: ctrl.signal })
      .then((d) => {
        setAiReflection(d.reflection);
        setAiPrayer(d.prayer);
        setAiLoading(false);
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setAiLoading(false);
      });
    return () => ctrl.abort();
  }, [verse?.id, emotionId, locale]);

  const onSave = () => {
    if (!verse) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    void saveItem({ verseId: verse.id, emotion: emotionId, locale });
    setSaved(true);
  };

  const onStart = () => {
    router.replace("/(tabs)");
  };

  if (!verse || !meta) return null;

  const text = verse.text[locale] ?? verse.text.en;
  const reference = verse.reference[locale] ?? verse.reference.en;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <PaperGrain />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 140 }}
      >
        {/* Kicker */}
        <Animated.View
          entering={FadeIn.duration(600)}
          style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 }}
        >
          <Glyph kind={meta.glyph} size={16} color={tokens.ink3} strokeWidth={1.4} />
          <Text
            style={{
              fontFamily: "InterTight_500Medium",
              fontSize: 12,
              color: tokens.ink3,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            {locale === "ko" ? "오늘의 첫 말씀" : "Your first verse"}
          </Text>
        </Animated.View>

        {/* Verse card */}
        <Animated.View
          entering={FadeInDown.duration(700).delay(150)}
          style={{
            padding: 28,
            paddingTop: 32,
            borderRadius: 22,
            backgroundColor: meta.bg,
            borderWidth: 1,
            borderColor: tokens.hairline,
            overflow: "hidden",
          }}
        >
          <PaperGrain opacity={0.07} color={meta.ink} />
          <Text
            style={{
              fontFamily: serifMedium(locale),
              fontSize: 72,
              color: meta.ink,
              opacity: 0.15,
              lineHeight: 50,
              marginLeft: -4,
            }}
          >
            "
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontFamily: serifMedium(locale),
              fontSize: text.length > 140 ? 19 : 22,
              lineHeight: text.length > 140 ? 29 : 33,
              color: meta.ink,
              letterSpacing: -0.1,
            }}
          >
            {text}
          </Text>
          <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ width: 28, height: 1, backgroundColor: meta.ink, opacity: 0.45 }} />
            <Text
              style={{
                fontFamily: "InterTight_600SemiBold",
                fontSize: 11,
                color: meta.ink,
                opacity: 0.8,
                letterSpacing: 1.6,
                textTransform: "uppercase",
              }}
            >
              {reference}
            </Text>
          </View>
        </Animated.View>

        {/* Reflection */}
        <Animated.View entering={FadeInDown.duration(600).delay(350)} style={{ marginTop: 28, gap: 6 }}>
          <Text
            style={{
              fontFamily: "InterTight_600SemiBold",
              fontSize: 11,
              color: tokens.ink3,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {locale === "ko" ? "묵상" : "Reflection"}
          </Text>
          {aiLoading ? (
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginTop: 10 }}>
              <ActivityIndicator size="small" color={tokens.ink3} />
              <Text style={{ fontFamily: "InterTight_400Regular", fontSize: 13, color: tokens.ink3 }}>
                {locale === "ko" ? "준비 중…" : "Preparing…"}
              </Text>
            </View>
          ) : (
            <Text
              style={{
                marginTop: 10,
                fontFamily: serifMedium(locale),
                fontSize: 17,
                lineHeight: 27,
                color: tokens.ink,
              }}
            >
              {reflection}
            </Text>
          )}
        </Animated.View>

        {/* Prayer */}
        <Animated.View entering={FadeInDown.duration(600).delay(500)} style={{ marginTop: 24, gap: 6 }}>
          <Text
            style={{
              fontFamily: "InterTight_600SemiBold",
              fontSize: 11,
              color: tokens.ink3,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {locale === "ko" ? "기도" : "Prayer"}
          </Text>
          {aiLoading ? (
            <View style={{ height: 16, width: "70%", borderRadius: 4, backgroundColor: "rgba(42,33,26,0.07)", marginTop: 10 }} />
          ) : (
            <View
              style={{
                marginTop: 10,
                paddingLeft: 18,
                borderLeftWidth: 2,
                borderLeftColor: tokens.gold,
              }}
            >
              <Text
                style={{
                  fontFamily: serifItalic(locale),
                  fontSize: 16,
                  lineHeight: 26,
                  color: tokens.ink2,
                }}
              >
                {prayer}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Bottom actions */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(700)}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingTop: 14,
          paddingBottom: 40,
          backgroundColor: tokens.cream,
          borderTopWidth: 1,
          borderTopColor: `rgba(42,33,26,0.08)`,
          gap: 10,
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={onSave}
          style={({ pressed }) => ({
            width: 56,
            height: 56,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: saved ? tokens.ink : tokens.hairline,
            backgroundColor: saved ? tokens.ink : "transparent",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text style={{ fontSize: 20 }}>{saved ? "🔖" : "🤍"}</Text>
        </Pressable>
        <Pressable
          onPress={onStart}
          style={({ pressed }) => ({
            flex: 1,
            height: 56,
            borderRadius: 999,
            backgroundColor: tokens.ink,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: locale === "ko" ? "NotoSansKR_600SemiBold" : "InterTight_600SemiBold",
              fontSize: 16,
              color: tokens.cream,
            }}
          >
            {locale === "ko" ? "탐색 시작하기" : "Start exploring"}
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
