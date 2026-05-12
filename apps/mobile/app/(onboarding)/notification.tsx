import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { PaperGrain } from "../../components/PaperGrain";
import { ProgressDots } from "../../components/ProgressDots";
import { tokens } from "../../lib/tokens";
import {
  cancelDailyReminder,
  scheduleDailyReminder,
} from "../../lib/notifications";
import { saveOnboardingNotifHour, setOnboarded } from "../../lib/onboarding";

type TimeOption = "morning" | "afternoon" | "evening" | "custom";

const PRESETS: { id: TimeOption; hour: number }[] = [
  { id: "morning", hour: 8 },
  { id: "afternoon", hour: 12 },
  { id: "evening", hour: 21 },
  { id: "custom", hour: -1 },
];

export default function NotificationStep() {
  const router = useRouter();
  const [chosen, setChosen] = useState<TimeOption | null>(null);
  const [customHour, setCustomHour] = useState(8);
  const [busy, setBusy] = useState(false);

  const effectiveHour = chosen === "custom" ? customHour : (PRESETS.find((p) => p.id === chosen)?.hour ?? 8);
  const fmtHour = (h: number) => {
    const ampm = h < 12 ? "AM" : "PM";
    const display = h % 12 === 0 ? 12 : h % 12;
    return `${h}시`;
  };

  const onAllow = async () => {
    if (!chosen || busy) return;
    setBusy(true);
    const hour = effectiveHour;
    await saveOnboardingNotifHour(hour);
    await scheduleDailyReminder({
      hour,
      minute: 0,
      title: "오늘의 말씀",
      body: "잠시 말씀과 함께해요.",
    });
    await setOnboarded();
    router.replace("/(onboarding)/verse");
  };

  const onSkip = async () => {
    await cancelDailyReminder();
    await setOnboarded();
    router.replace("/(onboarding)/verse");
  };

  const labelFor = (id: TimeOption) => {
    if (id === "morning") return "아침";
    if (id === "afternoon") return "점심";
    if (id === "evening") return "저녁";
    return "직접 설정";
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <PaperGrain />

      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 28, gap: 36 }}>
        <Animated.View entering={FadeInDown.duration(600)} style={{ gap: 14 }}>
          <Text
            style={{
              fontFamily: "NotoSerifKR_500Medium",
              fontSize: 32,
              color: tokens.ink,
              lineHeight: 40,
              letterSpacing: -0.4,
            }}
          >
            {"언제 말씀을\n받고 싶으신가요?"}
          </Text>
          <Text
            style={{
              fontFamily: "NotoSansKR_400Regular",
              fontSize: 14,
              color: tokens.ink3,
              lineHeight: 22,
            }}
          >
            하루 중 조용히 말씀을 읽기 좋은 시간을 골라주세요.
          </Text>
        </Animated.View>

        {/* Time options */}
        <Animated.View entering={FadeInDown.duration(600).delay(150)} style={{ gap: 10 }}>
          {PRESETS.map((p, i) => {
            const active = chosen === p.id;
            return (
              <Pressable
                key={p.id}
                onPress={() => setChosen(p.id)}
                style={({ pressed }) => ({
                  height: 56,
                  borderRadius: 16,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: active ? tokens.ink : tokens.card,
                  borderWidth: 1,
                  borderColor: active ? tokens.ink : tokens.hairline,
                  opacity: pressed ? 0.88 : 1,
                })}
              >
                <Text
                  style={{
                    fontFamily: "NotoSansKR_500Medium",
                    fontSize: 15,
                    color: active ? tokens.cream : tokens.ink,
                  }}
                >
                  {labelFor(p.id)}
                </Text>
                {active && p.id !== "custom" && (
                  <Text
                    style={{
                      fontFamily: "NotoSansKR_400Regular",
                      fontSize: 13,
                      color: active ? "rgba(245,235,215,0.65)" : tokens.ink3,
                    }}
                  >
                    {fmtHour(p.hour)}
                  </Text>
                )}
                {!active && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: tokens.hairline,
                    }}
                  />
                )}
                {active && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: tokens.cream,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tokens.ink }} />
                  </View>
                )}
              </Pressable>
            );
          })}

          {/* Custom hour picker */}
          {chosen === "custom" && (
            <Animated.View
              entering={FadeInDown.duration(400)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
                padding: 18,
                borderRadius: 16,
                backgroundColor: tokens.card,
                borderWidth: 1,
                borderColor: tokens.hairline,
              }}
            >
              <Pressable
                onPress={() => setCustomHour((h) => (h - 1 + 24) % 24)}
                style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ fontSize: 24, color: tokens.ink }}>−</Text>
              </Pressable>
              <Text
                style={{
                  fontFamily: "NotoSerifKR_500Medium",
                  fontSize: 28,
                  color: tokens.ink,
                  minWidth: 80,
                  textAlign: "center",
                }}
              >
                {fmtHour(customHour)}
              </Text>
              <Pressable
                onPress={() => setCustomHour((h) => (h + 1) % 24)}
                style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ fontSize: 24, color: tokens.ink }}>+</Text>
              </Pressable>
            </Animated.View>
          )}
        </Animated.View>
      </View>

      {/* Bottom */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(400)}
        style={{ paddingHorizontal: 28, paddingBottom: 40, gap: 12, alignItems: "center" }}
      >
        <ProgressDots current={4} total={5} />
        <Pressable
          onPress={onAllow}
          disabled={!chosen || busy}
          style={({ pressed }) => ({
            width: "100%",
            height: 56,
            borderRadius: 999,
            backgroundColor: !chosen ? "rgba(42,33,26,0.15)" : tokens.ink,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: "NotoSansKR_600SemiBold",
              fontSize: 16,
              color: !chosen ? tokens.ink3 : tokens.cream,
            }}
          >
            알림 설정하기
          </Text>
        </Pressable>
        <Pressable onPress={onSkip} hitSlop={12}>
          <Text
            style={{
              fontFamily: "NotoSansKR_400Regular",
              fontSize: 13,
              color: tokens.ink3,
              textDecorationLine: "underline",
            }}
          >
            나중에 설정할게요
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
