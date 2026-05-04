import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { Glyph } from "./Glyph";
import { Wordmark } from "./Wordmark";
import { setOnboarded } from "../lib/onboarding";
import { useLocale } from "../lib/useLocale";
import { serifMedium } from "../lib/typography";

type Props = {
  step: 0 | 1 | 2;
  nextHref?: "/(onboarding)/more" | "/(onboarding)/begin" | "/(tabs)";
};

const GLYPHS = ["wheat", "spark", "sun"] as const;

export function OnboardingStep({ step, nextHref }: Props) {
  const { t } = useTranslation();
  const { locale } = useLocale();
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
            fontFamily: serifMedium(locale),
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
