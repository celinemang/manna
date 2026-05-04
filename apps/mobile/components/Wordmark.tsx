import { Text, View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useTranslation } from "react-i18next";

type Props = {
  size?: number;
  color?: string;
  showMark?: boolean;
};

// Hand-drawn wheat-stalk glyph, lifted from the designer's MannaGlyph 'wheat' kind.
function WheatGlyph({ size, color }: { size: number; color: string }) {
  const stroke = { stroke: color, strokeWidth: 1.3, fill: "none" as const };
  const fill = { fill: color };
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Path d="M32 56 V18" {...stroke} />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 50 - i * 7;
        return (
          <Path
            key={i}
            d={`M32 ${y} Q22 ${y - 4}, 18 ${y - 10} M32 ${y} Q42 ${y - 4}, 46 ${y - 10}`}
            {...stroke}
          />
        );
      })}
      <Circle cx={32} cy={14} r={2} {...fill} />
    </Svg>
  );
}

export function Wordmark({ size = 28, color = "#2A211A", showMark = true }: Props) {
  const { t } = useTranslation();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: size * 0.32 }}>
      {showMark && <WheatGlyph size={size * 0.95} color={color} />}
      <Text
        style={{
          fontFamily: "CormorantGaramond_500Medium",
          fontSize: size,
          fontWeight: "500",
          color,
          letterSpacing: size * 0.02,
          lineHeight: size * 1.1,
        }}
      >
        {t("appName")}
      </Text>
    </View>
  );
}
