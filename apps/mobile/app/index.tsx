import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";
import { Wordmark } from "../components/Wordmark";
import { getOnboarded } from "../lib/onboarding";

export default function Splash() {
  const { t } = useTranslation();
  const [target, setTarget] = useState<"/(onboarding)/welcome" | "/(tabs)" | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    // Brief pause so the wordmark gets a beat on screen even if AsyncStorage
    // resolves instantly. ~1s feels devotional, not laggy.
    Promise.all([
      getOnboarded(),
      new Promise<void>((resolve) => setTimeout(resolve, 1000)),
    ]).then(([onboarded]) => {
      if (cancelled) return;
      setTarget(onboarded ? "/(tabs)" : "/(onboarding)/welcome");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (target) return <Redirect href={target} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5EBD7",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
      }}
    >
      <Wordmark size={44} color="#2A211A" />
      <Text
        style={{
          fontFamily: "CormorantGaramond_500Medium_Italic",
          fontSize: 16,
          color: "#8A7A66",
          marginTop: -6,
        }}
      >
        {t("tagline")}
      </Text>
    </View>
  );
}
