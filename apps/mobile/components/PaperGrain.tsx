import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import { tokens } from "../lib/tokens";

// React Native's SVG doesn't ship feTurbulence reliably across iOS / Android,
// so we emulate the designer's `MANNA_GRAIN` filter with a fixed-seed scatter
// of tiny ink dots. Rendered once into a 240×240 tile, then stretched at low
// opacity. Stays under 1 KB of XML and ~5 KB of JS at runtime.

const TILE = 240;
const DOTS = 360;

// Mulberry32 — small, deterministic. Same dots every render → no flicker.
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Props = {
  /** 0..1 — overall darkness of the texture. Default tuned for cream bg. */
  opacity?: number;
  /** Override the dot color (e.g. on dark backdrops use cream dots). */
  color?: string;
};

export function PaperGrain({ opacity = 0.06, color = tokens.ink }: Props) {
  const dots = useMemo(() => {
    const rand = rng(7919);
    const out: { x: number; y: number; r: number; o: number }[] = [];
    for (let i = 0; i < DOTS; i++) {
      out.push({
        x: rand() * TILE,
        y: rand() * TILE,
        r: 0.4 + rand() * 0.9,
        o: 0.3 + rand() * 0.7,
      });
    }
    return out;
  }, []);

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity }]}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${TILE} ${TILE}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <Rect width={TILE} height={TILE} fill="transparent" />
        {dots.map((d, i) => (
          <Circle key={i} cx={d.x} cy={d.y} r={d.r} fill={color} fillOpacity={d.o} />
        ))}
      </Svg>
    </View>
  );
}
