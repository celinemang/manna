import Svg, { Circle, Path } from "react-native-svg";

// Hand-drawn 1.4-stroke emotion glyphs, ported from the designer's
// MannaGlyph in tokens.jsx. Same shapes, just react-native-svg primitives.

type Kind =
  | "wave"
  | "moon"
  | "leaf"
  | "drop"
  | "flame"
  | "sun"
  | "shield"
  | "spark"
  | "wheat"
  | "mark"
  | "cross";

type Props = {
  kind: Kind;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function Glyph({ kind, size = 48, color = "#3A2E22", strokeWidth = 1.4 }: Props) {
  const stroke = {
    stroke: color,
    strokeWidth,
    fill: "none" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const fill = { fill: color };

  switch (kind) {
    case "wave":
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64">
          <Path d="M8 26 Q16 18, 24 26 T40 26 T56 26" {...stroke} />
          <Path d="M8 36 Q16 28, 24 36 T40 36 T56 36" {...stroke} strokeOpacity={0.55} />
          <Path d="M8 46 Q16 38, 24 46 T40 46 T56 46" {...stroke} strokeOpacity={0.3} />
        </Svg>
      );
    case "moon":
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64">
          <Path d="M44 14 A20 20 0 1 0 44 50 A15 15 0 1 1 44 14 Z" {...stroke} />
          <Circle cx={14} cy={20} r={0.9} {...fill} />
          <Circle cx={20} cy={48} r={0.9} {...fill} />
        </Svg>
      );
    case "leaf":
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64">
          <Path d="M14 50 C18 30, 30 16, 50 14 C48 34, 34 46, 14 50 Z" {...stroke} />
          <Path d="M14 50 L46 18" {...stroke} />
        </Svg>
      );
    case "drop":
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64">
          <Path
            d="M32 10 C20 28, 14 38, 14 44 A18 18 0 0 0 50 44 C50 38, 44 28, 32 10 Z"
            {...stroke}
          />
        </Svg>
      );
    case "flame":
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64">
          <Path
            d="M32 8 C26 18, 18 26, 18 38 A14 14 0 0 0 46 38 C46 30, 40 26, 38 22 C36 30, 30 28, 32 8 Z"
            {...stroke}
          />
        </Svg>
      );
    case "sun":
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64">
          <Circle cx={32} cy={36} r={10} {...stroke} />
          <Path d="M8 50 H56" {...stroke} />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = -90 + (i - 2) * 22;
            const r1 = 16,
              r2 = 22;
            const x1 = 32 + Math.cos((a * Math.PI) / 180) * r1;
            const y1 = 36 + Math.sin((a * Math.PI) / 180) * r1;
            const x2 = 32 + Math.cos((a * Math.PI) / 180) * r2;
            const y2 = 36 + Math.sin((a * Math.PI) / 180) * r2;
            return <Path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} {...stroke} />;
          })}
        </Svg>
      );
    case "shield":
      return (
        <Svg width={size} height={size} viewBox="0 0 64 64">
          <Path
            d="M32 8 L52 16 V32 C52 44, 42 52, 32 56 C22 52, 12 44, 12 32 V16 Z"
            {...stroke}
          />
          <Path d="M32 22 V40 M24 30 H40" {...stroke} />
        </Svg>
      );
    case "spark":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z"
            {...fill}
          />
        </Svg>
      );
    case "wheat":
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
    case "mark":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6 4 H18 V21 L12 17 L6 21 Z" {...stroke} />
        </Svg>
      );
    case "cross":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 4 V20 M6 9 H18" {...stroke} />
        </Svg>
      );
  }
}
