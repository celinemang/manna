import { useEffect, useMemo, useState } from "react";
import { Alert, Linking, Platform, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import Constants from "expo-constants";
import { emotions, getEmotion } from "@manna/shared/data/emotions";
import type { EmotionId } from "@manna/shared/lib/types";
import { last14Days, moodCounts, useJourney } from "../../lib/journey";
import {
  cancelDailyReminder,
  getReminderState,
  scheduleDailyReminder,
} from "../../lib/notifications";

const CREAM = "#F4ECDF";
const INK = "#3A2E22";
const SUB = "#8A7A66";
const HAIRLINE = "#D9CBB1";

export default function You() {
  const { t } = useTranslation();
  const journey = useJourney();
  const [reminderOn, setReminderOn] = useState(false);
  const [hour, setHour] = useState(8);

  useEffect(() => {
    void getReminderState().then(({ enabled, hour }) => {
      setReminderOn(enabled);
      setHour(hour);
    });
  }, []);

  const days = useMemo(() => last14Days(), [journey.moods]);
  const counts = useMemo(() => moodCounts(), [journey.moods]);
  const totalMoods = Object.values(counts).reduce((a, b) => a + b, 0);

  const onToggleReminder = async (next: boolean) => {
    setReminderOn(next);
    if (next) {
      const ok = await scheduleDailyReminder({
        hour,
        minute: 0,
        title: t("settings.notifTitle"),
        body: t("settings.notifBody"),
      });
      if (!ok) {
        setReminderOn(false);
        Alert.alert(t("settings.dailyReminder"), "Notifications permission was not granted.");
      }
    } else {
      await cancelDailyReminder();
    }
  };

  const cycleHour = async () => {
    const next = (hour + 1) % 24;
    setHour(next);
    if (reminderOn) {
      await scheduleDailyReminder({
        hour: next,
        minute: 0,
        title: t("settings.notifTitle"),
        body: t("settings.notifBody"),
      });
    } else {
      // Persist the selected time even when off so it sticks if turned on later.
      await scheduleDailyReminder({
        hour: next,
        minute: 0,
        title: t("settings.notifTitle"),
        body: t("settings.notifBody"),
        persistOnly: true,
      });
    }
  };

  const fmtHour = (h: number) => {
    const am = h < 12;
    const display = h % 12 === 0 ? 12 : h % 12;
    return `${display}:00 ${am ? "AM" : "PM"}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: CREAM }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Heading */}
        <View style={{ paddingHorizontal: 28, paddingTop: 4, paddingBottom: 16 }}>
          <Text style={eyebrow}>{t("journey.eyebrow")}</Text>
          <Text style={heading}>{t("journey.heading")}</Text>
        </View>

        {/* Streak cards */}
        <View style={{ flexDirection: "row", gap: 12, paddingHorizontal: 22 }}>
          <StreakCard
            label={t("journey.streakCurrent")}
            value={journey.current}
            unit={t("journey.streakDays")}
            tone="dark"
          />
          <StreakCard
            label={t("journey.streakBest")}
            value={journey.best}
            unit={t("journey.streakDays")}
            tone="light"
          />
        </View>

        {/* 14-day strip */}
        <Section label={t("journey.last14")}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 4,
              height: 64,
              marginTop: 14,
            }}
          >
            {days.map((d) => {
              const meta = d.emotion ? getEmotion(d.emotion) : null;
              return (
                <View
                  key={d.date}
                  style={{
                    flex: 1,
                    height: meta ? 64 : 22,
                    borderRadius: 6,
                    backgroundColor: meta?.bg ?? "rgba(58,46,34,0.08)",
                    borderWidth: meta ? 1 : 0,
                    borderColor: HAIRLINE,
                  }}
                />
              );
            })}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
            <Text style={smallSub}>{format(parseISO(days[0].date), "MMM d")}</Text>
            <Text style={smallSub}>{format(parseISO(days[days.length - 1].date), "MMM d")}</Text>
          </View>
        </Section>

        {/* Mood breakdown */}
        <Section label={t("journey.breakdown")}>
          {totalMoods === 0 ? (
            <Text
              style={{
                marginTop: 12,
                fontFamily: "CormorantGaramond_500Medium_Italic",
                fontSize: 16,
                color: SUB,
                lineHeight: 24,
              }}
            >
              {t("journey.empty")}
            </Text>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  height: 12,
                  borderRadius: 999,
                  overflow: "hidden",
                  marginTop: 14,
                  backgroundColor: "rgba(58,46,34,0.08)",
                }}
              >
                {emotions
                  .map((e) => ({ e, n: counts[e.id as EmotionId] ?? 0 }))
                  .filter((x) => x.n > 0)
                  .map(({ e, n }) => (
                    <View
                      key={e.id}
                      style={{ flex: n, backgroundColor: e.bg, borderRightWidth: 1, borderColor: HAIRLINE }}
                    />
                  ))}
              </View>
              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {emotions
                  .map((e) => ({ e, n: counts[e.id as EmotionId] ?? 0 }))
                  .filter((x) => x.n > 0)
                  .sort((a, b) => b.n - a.n)
                  .map(({ e, n }) => (
                    <View
                      key={e.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        backgroundColor: e.bg,
                        borderRadius: 999,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_600SemiBold",
                          fontSize: 11,
                          color: e.ink,
                          letterSpacing: 0.4,
                        }}
                      >
                        {t(`emotions.${e.id as EmotionId}.label`)} · {n}
                      </Text>
                    </View>
                  ))}
              </View>
            </>
          )}
        </Section>

        {/* Settings */}
        <View style={{ paddingHorizontal: 28, paddingTop: 32, paddingBottom: 8 }}>
          <Text style={eyebrow}>{t("settings.eyebrow")}</Text>
          <Text style={heading}>{t("settings.heading")}</Text>
        </View>

        <Group label={t("settings.rhythm")}>
          <Row
            label={t("settings.dailyReminder")}
            hint={t("settings.dailyReminderHint")}
            right={<Switch value={reminderOn} onValueChange={onToggleReminder} />}
          />
          <Row
            label={t("settings.reminderTime")}
            right={
              <Pressable
                onPress={cycleHour}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: HAIRLINE,
                }}
              >
                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: INK }}>
                  {fmtHour(hour)}
                </Text>
              </Pressable>
            }
          />
        </Group>

        <Group label={t("settings.reading")}>
          <Row
            label={t("settings.translation")}
            right={<Text style={rowValue}>{t("settings.translationValue")}</Text>}
          />
        </Group>

        <Group label={t("settings.about")}>
          <Row
            label={t("settings.feedback")}
            onPress={() => Linking.openURL("mailto:hello@manna.app")}
            right={<Chevron />}
          />
          <Row
            label={t("settings.version")}
            right={
              <Text style={rowValue}>
                {Constants.expoConfig?.version ?? "0.1.0"}
                {Platform.OS === "ios" ? " · iOS" : " · Android"}
              </Text>
            }
          />
        </Group>

        <Text
          style={{
            marginTop: 24,
            paddingHorizontal: 28,
            fontFamily: "Inter_400Regular",
            fontSize: 11,
            lineHeight: 17,
            color: SUB,
          }}
        >
          {t("disclaimer")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function StreakCard({
  label,
  value,
  unit,
  tone,
}: {
  label: string;
  value: number;
  unit: string;
  tone: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <View
      style={{
        flex: 1,
        padding: 18,
        borderRadius: 18,
        backgroundColor: dark ? INK : "transparent",
        borderWidth: dark ? 0 : 1,
        borderColor: HAIRLINE,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 10.5,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          color: dark ? "rgba(244,236,223,0.65)" : SUB,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          marginTop: 8,
          fontFamily: "CormorantGaramond_500Medium",
          fontSize: 42,
          color: dark ? CREAM : INK,
          letterSpacing: -1,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 11,
          color: dark ? "rgba(244,236,223,0.6)" : SUB,
          letterSpacing: 0.4,
        }}
      >
        {unit}
      </Text>
    </View>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ paddingHorizontal: 22, marginTop: 22 }}>
      <Text style={sectionLabel}>{label}</Text>
      {children}
    </View>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[sectionLabel, { paddingHorizontal: 28 }]}>{label}</Text>
      <View
        style={{
          marginTop: 8,
          marginHorizontal: 22,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: HAIRLINE,
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.4)",
        }}
      >
        {children}
      </View>
    </View>
  );
}

function Row({
  label,
  hint,
  right,
  onPress,
}: {
  label: string;
  hint?: string;
  right?: React.ReactNode;
  onPress?: () => void;
}) {
  const Inner = (
    <View
      style={{
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderColor: "rgba(217,203,177,0.6)",
      }}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: INK }}>{label}</Text>
        {hint ? (
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11.5, color: SUB, lineHeight: 16 }}>
            {hint}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
  return onPress ? (
    <Pressable onPress={onPress} android_ripple={{ color: "rgba(0,0,0,0.05)" }}>
      {Inner}
    </Pressable>
  ) : (
    Inner
  );
}

function Chevron() {
  return (
    <Text style={{ fontFamily: "Inter_500Medium", fontSize: 18, color: SUB }}>›</Text>
  );
}

const eyebrow = {
  fontFamily: "Inter_500Medium",
  fontSize: 12,
  color: SUB,
  letterSpacing: 1.6,
  textTransform: "uppercase",
} as const;

const heading = {
  marginTop: 6,
  fontFamily: "CormorantGaramond_500Medium",
  fontSize: 30,
  color: INK,
  letterSpacing: -0.3,
  lineHeight: 36,
} as const;

const sectionLabel = {
  fontFamily: "Inter_600SemiBold",
  fontSize: 11,
  color: SUB,
  letterSpacing: 2.2,
  textTransform: "uppercase",
} as const;

const rowValue = {
  fontFamily: "Inter_500Medium",
  fontSize: 13,
  color: SUB,
} as const;

const smallSub = {
  fontFamily: "Inter_500Medium",
  fontSize: 10,
  color: SUB,
  letterSpacing: 0.6,
  textTransform: "uppercase",
} as const;
