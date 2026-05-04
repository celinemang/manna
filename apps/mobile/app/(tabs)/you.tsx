import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

// Locale toggle is intentionally hidden in v1 (English-only launch). The
// useLocale hook + dictionaries stay wired so v1.1 can re-expose it after
// the Korean translation pass.

export default function You() {
  const { t } = useTranslation();
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
        <Text style={{ fontSize: 12, color: "#8A7A66" }}>{t("disclaimer")}</Text>
      </View>
    </SafeAreaView>
  );
}
