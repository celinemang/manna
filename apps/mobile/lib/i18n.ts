import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import { defaultLocale, isLocale, type Locale } from "@manna/shared/i18n/config";
import { getDictionary } from "@manna/shared/i18n/dictionaries";

// Detect the device locale once at boot. The user can override this from
// Settings; persistence lives in AsyncStorage under manna:locale (handled by
// useLocale, not here, so this module stays pure).
function detectInitialLocale(): Locale {
  const device = getLocales()[0]?.languageCode ?? defaultLocale;
  return isLocale(device) ? device : defaultLocale;
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: getDictionary("en") },
    ko: { translation: getDictionary("ko") },
  },
  lng: detectInitialLocale(),
  fallbackLng: defaultLocale,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
