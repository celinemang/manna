import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { format } from "date-fns";
import { emotions, getEmotion } from "@manna/shared/data/emotions";
import { getVerseById } from "@manna/shared/data/verses";
import type { EmotionId } from "@manna/shared/lib/types";
import { Glyph } from "../../components/Glyph";
import { useLocale } from "../../lib/useLocale";
import { removeItem, useSaved } from "../../lib/saved";

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4ECDF" }}>
      <View style={{ paddingHorizontal: 28, paddingTop: 4, paddingBottom: 8 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 12,
            color: "#8A7A66",
            letterSpacing: 1.6,
            textTransform: "uppercase",
          }}
        >
          {t("saved.eyebrow")}
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontFamily: "CormorantGaramond_500Medium",
            fontSize: 30,
            color: "#3A2E22",
            letterSpacing: -0.3,
            lineHeight: 36,
          }}
        >
          {t("saved.heading")}
        </Text>
      </View>

      {/* Filter chips */}
      {items.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 22, paddingVertical: 8, gap: 8 }}
        >
          <Chip label="All" active={filter === "all"} onPress={() => setFilter("all")} />
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
                fontFamily: "CormorantGaramond_500Medium_Italic",
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
            const text = verse.text[locale] ?? verse.text.en;
            const reference = verse.reference[locale] ?? verse.reference.en;
            const preview = text.length > 110 ? `${text.slice(0, 108)}…` : text;
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
                  minHeight: 168,
                  padding: 14,
                  borderRadius: 18,
                  backgroundColor: meta.bg,
                  justifyContent: "space-between",
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Glyph kind={meta.glyph} size={18} color={meta.ink} strokeWidth={1.5} />
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 9.5,
                      color: meta.ink,
                      opacity: 0.55,
                      letterSpacing: 0.6,
                    }}
                  >
                    {format(new Date(item.savedAt), "MMM d")}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "CormorantGaramond_500Medium",
                    fontSize: 14.5,
                    lineHeight: 19,
                    color: meta.ink,
                    letterSpacing: -0.1,
                  }}
                  numberOfLines={5}
                >
                  {preview}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 9.5,
                    color: meta.ink,
                    opacity: 0.75,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                  }}
                >
                  {reference}
                </Text>
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
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: active ? "#3A2E22" : "#D9CBB1",
        backgroundColor: active ? "#3A2E22" : "transparent",
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 12,
          color: active ? "#F4ECDF" : "#5A4A38",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
