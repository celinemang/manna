import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import {
  CormorantGaramond_500Medium,
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
  useFonts,
} from "@expo-google-fonts/cormorant-garamond";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  InterTight_400Regular,
  InterTight_500Medium,
  InterTight_600SemiBold,
} from "@expo-google-fonts/inter-tight";
import {
  NotoSerifKR_400Regular,
  NotoSerifKR_500Medium,
} from "@expo-google-fonts/noto-serif-kr";
import {
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_600SemiBold,
} from "@expo-google-fonts/noto-sans-kr";
import "../lib/i18n";
import "../global.css";
import { touchStreak } from "../lib/journey";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    CormorantGaramond_500Medium,
    CormorantGaramond_500Medium_Italic,
    CormorantGaramond_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    InterTight_400Regular,
    InterTight_500Medium,
    InterTight_600SemiBold,
    NotoSerifKR_400Regular,
    NotoSerifKR_500Medium,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    void touchStreak();
  }, []);

  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#F5EBD7" } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="share/[verseId]"
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
        </Stack>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
