import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { PaperGrain } from "../../components/PaperGrain";
import { ProgressDots } from "../../components/ProgressDots";
import { useLocale } from "../../lib/useLocale";
import { serifMedium } from "../../lib/typography";
import { tokens } from "../../lib/tokens";

const FEATURES_KO = [
  { icon: "📖", title: "오늘의 말씀", body: "매일 새로운 성경 구절로 하루를 시작해요." },
  { icon: "🙏", title: "짧은 기도", body: "지금 마음을 담은 기도문을 받아보세요." },
  { icon: "💛", title: "하루의 위로", body: "당신의 감정에 맞춘 말씀 묵상이에요." },
] as const;

const FEATURES_EN = [
  { icon: "📖", title: "Daily verse", body: "Start each day with a fresh Scripture reading." },
  { icon: "🙏", title: "A short prayer", body: "A quiet prayer tailored to how you feel." },
  { icon: "💛", title: "Daily comfort", body: "A reflection written for your heart's moment." },
] as const;

export default function Value() {
  const router = useRouter();
  const { locale } = useLocale();
  const features = locale === "ko" ? FEATURES_KO : FEATURES_EN;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <PaperGrain />

      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 28, gap: 40 }}>
        <Animated.Text
          entering={FadeInDown.duration(600)}
          style={{
            fontFamily: serifMedium(locale),
            fontSize: 32,
            color: tokens.ink,
            lineHeight: 40,
            letterSpacing: -0.4,
          }}
        >
          {locale === "ko" ? "하루에 잠시,\n말씀과 머무는 시간" : "A quiet moment\nwith God's word, daily."}
        </Animated.Text>

        <View style={{ gap: 16 }}>
          {features.map((f, i) => (
            <Animated.View
              key={f.title}
              entering={FadeInDown.duration(600).delay(150 + i * 100)}
              style={{
                flexDirection: "row",
                gap: 18,
                padding: 20,
                borderRadius: 18,
                backgroundColor: tokens.card,
                borderWidth: 1,
                borderColor: tokens.hairline,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 28 }}>{f.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: serifMedium(locale),
                    fontSize: 18,
                    color: tokens.ink,
                    letterSpacing: -0.1,
                  }}
                >
                  {f.title}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: locale === "ko" ? "NotoSansKR_400Regular" : "InterTight_400Regular",
                    fontSize: 13,
                    color: tokens.ink3,
                    lineHeight: 20,
                  }}
                >
                  {f.body}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Bottom */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(500)}
        style={{ paddingHorizontal: 28, paddingBottom: 40, gap: 16, alignItems: "center" }}
      >
        <ProgressDots current={3} total={5} />
        <Pressable
          onPress={() => router.push("/(onboarding)/notification")}
          style={({ pressed }) => ({
            width: "100%",
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
            {locale === "ko" ? "계속" : "Continue"}
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
