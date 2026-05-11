import { View } from "react-native";
import { tokens } from "../lib/tokens";

export function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            width: i === current ? 22 : 6,
            height: 6,
            borderRadius: 3,
            backgroundColor:
              i === current ? tokens.ink : "rgba(42,33,26,0.18)",
          }}
        />
      ))}
    </View>
  );
}
