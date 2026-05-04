import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useLocale } from "../../lib/useLocale";

export default function You() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const other = locale === "en" ? "ko" : "en";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4ECDF" }}>
      <View style={{ flex: 1, padding: 24, gap: 16 }}>
        <Text
          style={{
            fontFamily: "CormorantGaramond_500Medium",
            fontSize: 30,
            color: "#3A2E22",
          }}
        >
          You
        </Text>
        <Pressable
          onPress={() => void setLocale(other)}
          style={({ pressed }) => ({
            alignSelf: "flex-start",
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 999,
            backgroundColor: "#FAF4E8",
            borderWidth: 1,
            borderColor: "#D9CBB1",
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 13,
              color: "#3A2E22",
              letterSpacing: 1.4,
            }}
          >
            {t("localeSwitcher.en")} ↔ {t("localeSwitcher.ko")} · {locale.toUpperCase()}
          </Text>
        </Pressable>
        <Text style={{ fontSize: 12, color: "#8A7A66" }}>{t("disclaimer")}</Text>
      </View>
    </SafeAreaView>
  );
}
