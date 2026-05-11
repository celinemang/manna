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

// Static offline devotions shown while AI is loading or on network failure
const STATIC: Record<string, { reflection: string; prayer: string }> = {
  anxious: {
    reflection:
      "하나님은 당신의 불안을 가벼이 여기지 않으십니다. 오히려 그 마음을 기도로 가져오라 부르십니다. 평안은 짐을 내려놓는 자에게 주시는 선물입니다.",
    prayer:
      "주님, 불안한 마음을 그대로 주님께 가져갑니다. 주님의 평안을 부어 주시고, 가까이 계심을 신뢰하게 하소서. 아멘.",
  },
  lonely: {
    reflection:
      "곁에 아무도 없을 때에도 하나님은 함께하신다 약속하십니다. 그분은 지금 당신을 보고 계십니다.",
    prayer:
      "아버지, 외로움의 아픔을 주님의 가까우심으로 채워 주소서. 아멘.",
  },
  tired: {
    reflection:
      "예수님은 지친 사람을 책망하지 않으시고 가까이 부르십니다. 쉼은 그저 나아오는 자에게 주시는 선물입니다.",
    prayer: "주님, 저는 지쳤습니다. 주님 안에서 쉬게 하소서. 아멘.",
  },
  guilty: {
    reflection:
      "그리스도 안에서 당신을 향한 판결은 더 이상 정죄가 아닙니다. 자비는 얻는 것이 아니라 주어지는 것입니다.",
    prayer: "예수님, 부끄러움을 씻어 주시고 용서 안에서 걷게 하소서. 아멘.",
  },
  angry: {
    reflection:
      "분노가 늘 죄는 아닙니다. 그러나 하나님은 말하기 전에 잠시 멈추라 부르십니다.",
    prayer:
      "주님, 제 마음의 속도를 늦춰 주소서. 분노 아래 무엇이 있는지 보게 하소서. 아멘.",
  },
  grateful: {
    reflection:
      "감사는 망각을 거스르는 조용한 저항입니다. 오늘, 그 감사가 예배가 되게 하소서.",
    prayer: "아버지, 이 하루를 감사로 빚어 주소서. 아멘.",
  },
  afraid: {
    reflection:
      "두려움은 세상을 작게 만듭니다. 그러나 하나님은 어두운 골짜기를 당신 곁에서 함께 걸으십니다.",
    prayer: "주님, 두려움이 올라올 때 주님의 임재에 저를 묶어 주소서. 아멘.",
  },
  discouraged: {
    reflection:
      "길이 길게 느껴질 때에도 하나님의 자비는 여전히 옵니다 — 아침마다 새롭게. 포기하지 마세요.",
    prayer: "아버지, 제 눈이 낮아질 때 들어 올려 주소서. 아멘.",
  },
  peaceful: {
    reflection:
      "고요함은 비어 있는 것이 아니라, 하나님의 음성이 자라나는 토양입니다.",
    prayer: "주님, 이 고요를 주심에 감사합니다. 아멘.",
  },
  hopeful: {
    reflection:
      "소망은 순진함이 아니라 신뢰의 실체입니다. 하나님은 기댈 수 있는 미래를 쓰고 계십니다.",
    prayer: "소망의 하나님, 오늘 주님을 신뢰함으로 기쁨이 가득하게 하소서. 아멘.",
  },
};

export default function VerseStep() {
  const { locale } = useLocale();
  const router = useRouter();
  const [emotionId, setEmotionId] = useState<EmotionId>("anxious");
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
