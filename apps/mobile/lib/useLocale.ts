import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./i18n";
import { defaultLocale, isLocale, type Locale } from "@manna/shared/i18n/config";

const KEY = "manna:locale";

export function useLocale(): {
  locale: Locale;
  setLocale: (next: Locale) => Promise<void>;
} {
  const [locale, setLocaleState] = useState<Locale>(
    isLocale(i18n.language) ? i18n.language : defaultLocale,
  );

  // Hydrate from AsyncStorage on mount; fall back to whatever i18n detected
  // from the device on first launch.
  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(KEY).then((stored) => {
      if (cancelled) return;
      if (stored && isLocale(stored) && stored !== i18n.language) {
        void i18n.changeLanguage(stored);
        setLocaleState(stored);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLocale = useCallback(async (next: Locale) => {
    await AsyncStorage.setItem(KEY, next);
    await i18n.changeLanguage(next);
    setLocaleState(next);
  }, []);

  return { locale, setLocale };
}
