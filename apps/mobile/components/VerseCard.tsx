import { Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
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
}: Props) {
  const text = verse.text[locale] ?? verse.text.en;
  const reference = verse.reference[locale] ?? verse.reference.en;
  const translation = verse.translation[locale] ?? verse.translation.en;
  const isLong = text.length > 220;

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
              fontFamily: "Inter_600SemiBold",
              fontSize: 10.5,
              color: emotion.ink,
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            {emotionLabel}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", gap: 6 }}>
          {onToggleSave ? (
            <Pressable
              onPress={onToggleSave}
              hitSlop={12}
              accessibilityLabel={saved ? "Saved" : "Save"}
              style={{ width: 28, height: 28, alignItems: "center", justifyContent: "center" }}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M6 4h12v17l-6-4-6 4z"
                  stroke={emotion.ink}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={saved ? emotion.ink : "none"}
                />
              </Svg>
            </Pressable>
          ) : null}
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 11,
              color: emotion.ink,
              opacity: 0.55,
              letterSpacing: 1.4,
            }}
          >
            {translation}
          </Text>
        </View>
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
            fontFamily: "Inter_600SemiBold",
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
    </View>
  );
}
