import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import {
  differenceInCalendarDays,
  format,
  getDay,
} from "date-fns";
import Svg, { Circle, Path } from "react-native-svg";
import { emotions, getEmotion } from "@manna/shared/data/emotions";
import { getVerseById } from "@manna/shared/data/verses";
import type { EmotionId } from "@manna/shared/lib/types";
import { Glyph } from "../../components/Glyph";
import { useLocale } from "../../lib/useLocale";
import { serifMedium } from "../../lib/typography";
import { removeItem, useSaved } from "../../lib/saved";

const KO_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function Saved() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const router = useRouter();
  const { items, ready } = useSaved();
  const [filter, setFilter] = useState<EmotionId | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.emotion === filter)),
    [items, filter],
  );

  const uniqueEmotions = useMemo(
    () => new Set(items.map((i) => i.emotion).filter(Boolean)).size,
    [items],
  );

  const formatDate = (savedAt: number) => {
    const d = new Date(savedAt);
    const diff = differenceInCalendarDays(new Date(), d);
    if (diff === 0) return t("saved.today");
    if (diff === 1) return t("saved.yesterday");
    if (locale === "ko") {
      return `${format(d, "M월 d일")} (${KO_DAYS[getDay(d)]})`;
    }
    return format(d, "MMM d");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4ECDF" }}>
      <View
        style={{
          paddingHorizontal: 28,
          paddingTop: 4,
          paddingBottom: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={eyebrow}>{t("saved.eyebrow")}</Text>
          <Text style={[heading, { fontFamily: serifMedium(locale) }]}>
            {t("saved.heading")}
          </Text>
          {items.length > 0 && (
            <Text
              style={{
                marginTop: 8,
                fontFamily: "Inter_400Regular",
                fontSize: 13,
                color: "#8A7A66",
                letterSpacing: 0.2,
              }}
            >
              {t("saved.countSummary", { n: items.length, e: uniqueEmotions })}
            </Text>
          )}
        </View>
        {/* Search affordance — visual only for v1 */}
        <Pressable
          hitSlop={12}
          onPress={() => {}}
          style={{ width: 36, height: 36, alignItems: "center", justifyContent: "center" }}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Circle cx={11} cy={11} r={7} stroke="#3A2E22" strokeWidth={1.6} />
            <Path
              d="M20 20l-3.5-3.5"
              stroke="#3A2E22"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </Svg>
        </Pressable>
      </View>

      {/* Filter chips */}
      {items.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 22, paddingVertical: 10, gap: 8 }}
        >
          <Chip
            label={locale === "ko" ? "전체" : "All"}
            active={filter === "all"}
            onPress={() => setFilter("all")}
          />
          {emotions
            .filter((e) => items.some((i) => i.emotion === e.id))
            .map((e) => (
              <Chip
                key={e.id}
                label={t(`emotions.${e.id as EmotionId}.label`)}
                active={filter === e.id}
                onPress={() => setFilter(e.id)}
              />
            ))}
        </ScrollView>
      )}

      <ScrollView
        contentContainerStyle={{ padding: 22, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {ready && items.length === 0 && (
          <View
            style={{
              marginTop: 40,
              padding: 32,
              borderRadius: 22,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#D9CBB1",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontFamily: serifMedium(locale),
                fontSize: 18,
                color: "#8A7A66",
                textAlign: "center",
                lineHeight: 26,
              }}
            >
              {t("saved.empty")}
            </Text>
          </View>
        )}

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {filtered.map((item) => {
            const verse = getVerseById(item.verseId);
            const meta = item.emotion ? getEmotion(item.emotion) : undefined;
            if (!verse || !meta) return null;
            const reference = verse.reference[locale] ?? verse.reference.en;
            const emotionLabel = t(`emotions.${meta.id as EmotionId}.label`);
            return (
              <Pressable
                key={item.key}
                onPress={() =>
                  router.push({
                    pathname: "/feelings/[emotion]",
                    params: { emotion: meta.id },
                  })
                }
                onLongPress={() => removeItem(item.key)}
                style={({ pressed }) => ({
                  width: "48.5%",
                  aspectRatio: 1,
                  padding: 16,
                  borderRadius: 18,
                  backgroundColor: meta.bg,
                  justifyContent: "space-between",
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Glyph kind={meta.glyph} size={18} color={meta.ink} strokeWidth={1.5} />
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 11,
                      color: meta.ink,
                      opacity: 0.55,
                      letterSpacing: 0.4,
                    }}
                  >
                    {formatDate(item.savedAt)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 11,
                      color: meta.ink,
                      opacity: 0.6,
                      letterSpacing: 0.4,
                    }}
                  >
                    {emotionLabel}
                  </Text>
                  <Text
                    style={{
                      marginTop: 4,
                      fontFamily: serifMedium(locale),
                      fontSize: 22,
                      lineHeight: 28,
                      color: meta.ink,
                      letterSpacing: -0.2,
                    }}
                    numberOfLines={2}
                  >
                    {reference}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: active ? "#3A2E22" : "#D9CBB1",
        backgroundColor: active ? "#3A2E22" : "transparent",
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 13,
          color: active ? "#F4ECDF" : "#5A4A38",
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const eyebrow = {
  fontFamily: "Inter_500Medium",
  fontSize: 12,
  color: "#8A7A66",
  letterSpacing: 1.6,
  textTransform: "uppercase",
} as const;

const heading = {
  marginTop: 6,
  fontSize: 30,
  color: "#3A2E22",
  letterSpacing: -0.3,
  lineHeight: 36,
} as const;
