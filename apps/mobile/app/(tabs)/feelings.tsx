import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export default function Feelings() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4ECDF" }}>
      <View style={{ flex: 1, padding: 24, gap: 8 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 12,
            color: "#8A7A66",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {t("feelings.eyebrow")}
        </Text>
        <Text
          style={{
            fontFamily: "CormorantGaramond_500Medium",
            fontSize: 30,
            color: "#3A2E22",
          }}
        >
          {t("feelings.heading")}
        </Text>
      </View>
    </SafeAreaView>
  );
}
