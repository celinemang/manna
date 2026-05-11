import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Glyph } from "../../components/Glyph";
import { Wordmark } from "../../components/Wordmark";
import { PaperGrain } from "../../components/PaperGrain";
import { useLocale } from "../../lib/useLocale";
import { serifMedium, serifItalic } from "../../lib/typography";
import { tokens } from "../../lib/tokens";
import { ProgressDots } from "../../components/ProgressDots";

export default function Intro() {
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <PaperGrain />

      {/* Wordmark */}
      <Animated.View
        entering={FadeIn.duration(800)}
        style={{ alignItems: "center", paddingTop: 20 }}
      >
        <Wordmark size={20} color={tokens.ink} />
      </Animated.View>

      {/* Center content */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40 }}>
        <Animated.View entering={FadeIn.duration(1000).delay(200)} style={{ marginBottom: 40 }}>
          <Glyph kind="wheat" size={72} color={tokens.ink} strokeWidth={1.2} />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.duration(700).delay(400)}
          style={{
            fontFamily: serifMedium(locale),
            fontSize: 36,
            color: tokens.ink,
            textAlign: "center",
            lineHeight: 44,
            letterSpacing: -0.5,
          }}
        >
          {locale === "ko"
            ? "당신의 마음을\n위한 말씀"
            : "Scripture for\nyour heart."}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(700).delay(600)}
          style={{
            marginTop: 20,
            fontFamily: locale === "ko" ? "NotoSansKR_400Regular" : "InterTight_400Regular",
            fontSize: 15,
            color: tokens.ink3,
            textAlign: "center",
            lineHeight: 24,
            maxWidth: 300,
          }}
        >
          {locale === "ko"
            ? "지친 순간에도, 불안한 순간에도\n하나님의 말씀은 당신 곁에 있습니다."
            : "In every weary and anxious moment,\nGod's word is right beside you."}
        </Animated.Text>
      </View>

      {/* Bottom */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(800)}
        style={{
          paddingHorizontal: 28,
          paddingBottom: 40,
          gap: 16,
          alignItems: "center",
        }}
      >
        <ProgressDots current={0} total={5} />
        <Pressable
          onPress={() => router.push("/(onboarding)/empathy")}
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
              letterSpacing: 0.3,
            }}
          >
            {locale === "ko" ? "시작하기" : "Begin"}
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
