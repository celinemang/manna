import { useRef, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams, useRouter } from "expo-router";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { getVerseById } from "@manna/shared/data/verses";
import { getEmotion } from "@manna/shared/data/emotions";
import type { EmotionId } from "@manna/shared/lib/types";
import { useLocale } from "../../lib/useLocale";

type Style = {
  id: string;
  label: string;
  bg: string;
  ink: string;
  rule: string;
};

const STYLES: Style[] = [
  { id: "cream", label: "Cream", bg: "#F4ECDF", ink: "#3A2E22", rule: "rgba(58,46,34,0.5)" },
  { id: "night", label: "Night", bg: "#1F1812", ink: "#F4ECDF", rule: "rgba(244,236,223,0.5)" },
  { id: "sage", label: "Sage", bg: "#D9DFC8", ink: "#3A4030", rule: "rgba(58,64,48,0.5)" },
  { id: "rose", label: "Rose", bg: "#F2DAD2", ink: "#5C3A30", rule: "rgba(92,58,48,0.5)" },
  { id: "dusk", label: "Dusk", bg: "#C9C2D6", ink: "#322B4A", rule: "rgba(50,43,74,0.5)" },
];

export default function ShareModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = useLocale();
  const params = useLocalSearchParams<{ verseId: string; emotion?: EmotionId }>();
  const verse = params.verseId ? getVerseById(params.verseId) : undefined;
  const emotion = params.emotion ? getEmotion(params.emotion) : undefined;
  const [styleId, setStyleId] = useState(STYLES[0].id);
  const style = STYLES.find((s) => s.id === styleId) ?? STYLES[0];
  const shotRef = useRef<ViewShot>(null);
  const [working, setWorking] = useState(false);

  if (!verse) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000A" }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#fff" }}>Verse not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const text = verse.text[locale] ?? verse.text.en;
  const reference = verse.reference[locale] ?? verse.reference.en;
  const translation = verse.translation[locale] ?? verse.translation.en;

  const onShare = async () => {
    if (working) return;
    setWorking(true);
    try {
      const uri = await captureRef(shotRef, { format: "png", quality: 1, result: "tmpfile" });
      const available = await Sharing.isAvailableAsync();
      if (available) {
        await Sharing.shareAsync(uri, { mimeType: "image/png", dialogTitle: t("share.heading") });
      } else {
        Alert.alert(t("share.heading"), `Saved at ${uri}`);
      }
    } catch (e) {
      Alert.alert(t("share.heading"), String((e as Error).message ?? e));
    } finally {
      setWorking(false);
    }
  };

  const onSave = async () => {
    if (working) return;
    setWorking(true);
    try {
      const uri = await captureRef(shotRef, { format: "png", quality: 1, result: "tmpfile" });
      // We don't pull MediaLibrary in v1 — use the share sheet's "Save Image"
      // action which exists on both iOS and Android without an extra perm.
      const available = await Sharing.isAvailableAsync();
      if (available) {
        await Sharing.shareAsync(uri, { mimeType: "image/png", dialogTitle: t("share.save") });
      } else {
        Alert.alert(t("share.heading"), `Saved at ${uri}`);
      }
    } catch (e) {
      Alert.alert(t("share.heading"), String((e as Error).message ?? e));
    } finally {
      setWorking(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1612" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 22,
          paddingVertical: 12,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 13,
            color: "#F4ECDF",
            letterSpacing: 1.6,
            textTransform: "uppercase",
          }}
        >
          {t("share.heading")}
        </Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={{ color: "#F4ECDF", fontSize: 15 }}>{t("share.close")}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}>
        {/* Captured card (square, 320 wide → captures at native scale) */}
        <ViewShot
          ref={shotRef}
          options={{ format: "png", quality: 1 }}
          style={{
            width: 320,
            aspectRatio: 1,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: style.bg,
          }}
        >
          <View style={{ flex: 1, padding: 32, justifyContent: "space-between" }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 10,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: style.ink,
                opacity: 0.7,
              }}
            >
              Manna
            </Text>
            <View style={{ gap: 14 }}>
              <Text
                style={{
                  fontFamily: "CormorantGaramond_500Medium",
                  fontSize: 64,
                  lineHeight: 40,
                  color: style.ink,
                  opacity: 0.18,
                  marginLeft: -4,
                }}
              >
                “
              </Text>
              <Text
                style={{
                  fontFamily: "CormorantGaramond_500Medium",
                  fontSize: text.length > 180 ? 17 : 20,
                  lineHeight: text.length > 180 ? 24 : 28,
                  color: style.ink,
                  letterSpacing: -0.1,
                }}
              >
                {text}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={{ width: 28, height: 1, backgroundColor: style.rule }} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 10.5,
                  letterSpacing: 1.6,
                  textTransform: "uppercase",
                  color: style.ink,
                  opacity: 0.85,
                }}
              >
                {reference} · {translation}
              </Text>
            </View>
          </View>
        </ViewShot>

        {/* Style picker */}
        <View
          style={{
            marginTop: 28,
            paddingHorizontal: 22,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 10.5,
              color: "rgba(244,236,223,0.5)",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {t("share.style")}
          </Text>
          <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
            {STYLES.map((s) => (
              <Pressable
                key={s.id}
                onPress={() => setStyleId(s.id)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: s.bg,
                  borderWidth: 2,
                  borderColor: s.id === styleId ? "#F4ECDF" : "transparent",
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 28,
          borderTopWidth: 1,
          borderTopColor: "rgba(244,236,223,0.12)",
        }}
      >
        <Pressable
          onPress={onSave}
          disabled={working}
          style={({ pressed }) => ({
            flex: 1,
            height: 52,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "rgba(244,236,223,0.4)",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed || working ? 0.7 : 1,
          })}
        >
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: "#F4ECDF" }}>
            {t("share.save")}
          </Text>
        </Pressable>
        <Pressable
          onPress={onShare}
          disabled={working}
          style={({ pressed }) => ({
            flex: 1.2,
            height: 52,
            borderRadius: 999,
            backgroundColor: "#F4ECDF",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed || working ? 0.85 : 1,
          })}
        >
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: "#1F1812" }}>
            {t("share.shareBtn")}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
