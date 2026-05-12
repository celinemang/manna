import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Glyph } from "../../components/Glyph";
import { PaperGrain } from "../../components/PaperGrain";
import { ProgressDots } from "../../components/ProgressDots";
import { tokens } from "../../lib/tokens";

export default function Empathy() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <PaperGrain />

      {/* Top spacer */}
      <View style={{ height: 24 }} />

      {/* Main content */}
      <View style={{ flex: 1, paddingHorizontal: 36, justifyContent: "center", gap: 32 }}>
        <Animated.View entering={FadeInDown.duration(600)} style={{ alignSelf: "flex-start" }}>
          <Glyph kind="wave" size={48} color={tokens.ink} strokeWidth={1.3} />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(700).delay(150)} style={{ gap: 16 }}>
          <Text
            style={{
              fontFamily: "NotoSerifKR_500Medium",
              fontSize: 34,
              color: tokens.ink,
              lineHeight: 42,
              letterSpacing: -0.4,
            }}
          >
            {"오늘 마음은\n어떤가요?"}
          </Text>
          <Text
            style={{
              fontFamily: "NotoSansKR_400Regular",
              fontSize: 15,
              color: tokens.ink3,
              lineHeight: 24,
              maxWidth: 300,
            }}
          >
            {"불안하거나, 외롭거나, 지쳐 있을 때에도\n말씀은 당신을 만날 수 있습니다."}
          </Text>
        </Animated.View>
      </View>

      {/* Bottom */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(300)}
        style={{
          paddingHorizontal: 28,
          paddingBottom: 40,
          gap: 16,
          alignItems: "center",
        }}
      >
        <ProgressDots current={1} total={5} />
        <Pressable
          onPress={() => router.push("/(onboarding)/emotions")}
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
              fontFamily: "NotoSansKR_600SemiBold",
              fontSize: 16,
              color: tokens.cream,
            }}
          >
            다음
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
