import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Svg, { Circle, Path } from "react-native-svg";
import { Wordmark } from "./Wordmark";
import { setOnboarded } from "../lib/onboarding";

type Props = {
  step: 0 | 1 | 2;
  nextHref?: "/(onboarding)/more" | "/(onboarding)/begin" | "/(tabs)";
};

const GLYPHS = ["wheat", "spark", "sun"] as const;

function Glyph({ kind, size = 48, color = "#3A2E22" }: { kind: (typeof GLYPHS)[number]; size?: number; color?: string }) {
  const s = { stroke: color, strokeWidth: 1.3, fill: "none" as const };
  if (kind === "wheat") {
    return (
      <Svg width={size} height={size} viewBox="0 0 64 64">
        <Path d="M32 56 V18" {...s} />
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 50 - i * 7;
          return (
            <Path
              key={i}
              d={`M32 ${y} Q22 ${y - 4}, 18 ${y - 10} M32 ${y} Q42 ${y - 4}, 46 ${y - 10}`}
              {...s}
            />
          );
        })}
        <Circle cx={32} cy={14} r={2} fill={color} />
      </Svg>
    );
  }
  if (kind === "spark") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z"
          fill={color}
        />
      </Svg>
    );
  }
  // sun
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Circle cx={32} cy={36} r={10} {...s} />
      <Path d="M8 50 H56" {...s} />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = -90 + (i - 2) * 22;
        const r1 = 16,
          r2 = 22;
        const x1 = 32 + Math.cos((a * Math.PI) / 180) * r1;
        const y1 = 36 + Math.sin((a * Math.PI) / 180) * r1;
        const x2 = 32 + Math.cos((a * Math.PI) / 180) * r2;
        const y2 = 36 + Math.sin((a * Math.PI) / 180) * r2;
        return <Path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} {...s} />;
      })}
    </Svg>
  );
}

export function OnboardingStep({ step, nextHref }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const data = t(`onboarding.steps.${step}`, { returnObjects: true }) as {
    kicker: string;
    title: string;
    body: string;
  };
  const isLast = step === 2;

  const onContinue = async () => {
    if (isLast) {
      await setOnboarded();
      router.replace("/(tabs)");
      return;
    }
    if (nextHref) router.push(nextHref);
  };

  const onSkip = async () => {
    await setOnboarded();
    router.replace("/(tabs)");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F4ECDF",
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom + 32,
        paddingHorizontal: 32,
      }}
    >
      {/* Top: wordmark + skip */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Wordmark size={20} />
        {!isLast && (
          <Pressable onPress={onSkip} hitSlop={12}>
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: "#8A7A66" }}>
              {t("onboarding.skip")}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Middle: glyph + copy */}
      <View style={{ flex: 1, justifyContent: "center", gap: 26 }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: "#EDE2CF",
            borderWidth: 1,
            borderColor: "#D9CBB1",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Glyph kind={GLYPHS[step]} size={48} />
        </View>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 11,
            color: "#8A7A66",
            letterSpacing: 2.2,
            textTransform: "uppercase",
          }}
        >
          {data.kicker}
        </Text>
        <Text
          style={{
            fontFamily: "CormorantGaramond_500Medium",
            fontSize: 40,
            lineHeight: 46,
            color: "#3A2E22",
            letterSpacing: -0.3,
          }}
        >
          {data.title}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            lineHeight: 26,
            color: "#5A4A38",
            maxWidth: 320,
          }}
        >
          {data.body}
        </Text>
      </View>

      {/* Bottom: dots + continue */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={{
                width: i === step ? 22 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === step ? "#3A2E22" : "#D9CBB1",
              }}
            />
          ))}
        </View>
        <Pressable
          onPress={onContinue}
          style={({ pressed }) => ({
            backgroundColor: "#3A2E22",
            paddingHorizontal: 22,
            height: 52,
            borderRadius: 999,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 15,
              color: "#FAF4E8",
            }}
          >
            {isLast ? t("onboarding.begin") : t("onboarding.continue")}
          </Text>
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <Path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="#FAF4E8"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}
