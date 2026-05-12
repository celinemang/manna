import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import type { Verse, EmotionMeta } from "@manna/shared/lib/types";
import type { Locale } from "@manna/shared/i18n/config";
import { Glyph } from "./Glyph";
import { serifMedium } from "../lib/typography";

type Props = {
  verse: Verse;
  emotion: EmotionMeta;
  emotionLabel: string;
  locale: Locale;
  saved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
};

// Single verse card. Background tinted by emotion. Designer reference:
// VerseCard component in screens.jsx — large quote glyph in the corner,
// serif body, tiny ornament before the reference, NIV/WEB pill top-right.
export function VerseCard({
  verse,
  emotion,
  emotionLabel,
  locale,
  saved,
  onToggleSave,
  onShare,
}: Props) {
  const { t } = useTranslation();
  const text = verse.text[locale] ?? verse.text.en;
  const reference = verse.reference[locale] ?? verse.reference.en;
  const translation = verse.translation[locale] ?? verse.translation.en;
  const isLong = text.length > 220;
  const handleSave = () => {
    void Haptics.impactAsync(
      saved ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Medium
    );
    onToggleSave?.();
  };
  const handleShare = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onShare?.();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: emotion.bg,
        borderRadius: 32,
        padding: 30,
        paddingVertical: 36,
        justifyContent: "space-between",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 0.35,
        shadowRadius: 60,
        elevation: 12,
      }}
    >
      {/* Top: emotion pill + translation */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 11,
            paddingVertical: 5,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.45)",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.06)",
          }}
        >
          <Glyph kind={emotion.glyph} size={12} color={emotion.ink} strokeWidth={1.6} />
          <Text
            style={{
              fontFamily: "InterTight_600SemiBold",
              fontSize: 10.5,
              color: emotion.ink,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            {emotionLabel}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "InterTight_500Medium",
            fontSize: 11,
            color: emotion.ink,
            opacity: 0.55,
            letterSpacing: 1.4,
          }}
        >
          {translation}
        </Text>
      </View>

      {/* Verse */}
      <View style={{ gap: 18 }}>
        <Text
          style={{
            fontFamily: serifMedium(locale),
            fontSize: 86,
            color: emotion.ink,
            opacity: 0.18,
            lineHeight: 50,
            marginLeft: -6,
          }}
        >
          “
        </Text>
        <Text
          style={{
            fontFamily: serifMedium(locale),
            fontSize: isLong ? 22 : 26,
            lineHeight: isLong ? 31 : 36,
            color: emotion.ink,
            letterSpacing: -0.2,
          }}
        >
          {text}
        </Text>
      </View>

      {/* Reference */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ width: 36, height: 1, backgroundColor: emotion.ink, opacity: 0.5 }} />
        <Text
          style={{
            fontFamily: "InterTight_600SemiBold",
            fontSize: 11.5,
            color: emotion.ink,
            opacity: 0.85,
            letterSpacing: 1.8,
            textTransform: "uppercase",
          }}
        >
          {reference}
        </Text>
      </View>

      {/* Bottom actions: Save + Share, centered */}
      {(onToggleSave || onShare) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            marginTop: 8,
          }}
        >
          {onToggleSave ? (
            <ActionPill
              ink={emotion.ink}
              filled={!!saved}
              label={saved ? t("feed.unsave") : t("feed.save")}
              onPress={handleSave}
              icon={
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M6 4h12v17l-6-4-6 4z"
                    stroke={saved ? "#FAF4E8" : emotion.ink}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={saved ? "#FAF4E8" : "none"}
                  />
                </Svg>
              }
            />
          ) : null}
          {onShare ? (
            <ActionPill
              ink={emotion.ink}
              filled={false}
              label={t("feed.share")}
              onPress={handleShare}
              icon={
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 3v12m0-12l-4 4m4-4l4 4M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"
                    stroke={emotion.ink}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
            />
          ) : null}
        </View>
      )}
    </View>
  );
}

function ActionPill({
  ink,
  filled,
  label,
  icon,
  onPress,
}: {
  ink: string;
  filled: boolean;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  const progress = useSharedValue(filled ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(filled ? 1 : 0, { duration: 220 });
  }, [filled]);

  const pillStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["rgba(255,255,255,0.55)", ink]
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      ["rgba(0,0,0,0.08)", ink]
    ),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [ink, "#FAF4E8"]),
  }));

  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 999,
            borderWidth: 1,
          },
          pillStyle,
        ]}
      >
        {icon}
        <Animated.Text
          style={[
            {
              fontFamily: "InterTight_600SemiBold",
              fontSize: 12,
              letterSpacing: 0.6,
            },
            labelStyle,
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}
