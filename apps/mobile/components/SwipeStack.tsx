import { useState } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props<T> = {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  // Called whenever the displayed index changes (after a successful swipe).
  onIndexChange?: (index: number) => void;
};

const SCREEN_HEIGHT = Dimensions.get("window").height;
// Distance the user has to drag before a swipe commits. ~12% of screen.
const COMMIT_THRESHOLD = SCREEN_HEIGHT * 0.12;
// How far the card slides off before we snap to the next one.
const OFFSCREEN = SCREEN_HEIGHT * 0.6;

// Vertical swipe-stack inspired by Motivation. Drag up to advance, drag down
// to go back. The card behind peeks out, scaled down + slightly offset, so
// you sense the next verse before you see it. Indexing wraps.
export function SwipeStack<T>({ items, renderCard, onIndexChange }: Props<T>) {
  const [index, setIndex] = useState(0);
  const translateY = useSharedValue(0);

  const advance = (delta: 1 | -1) => {
    const next = (index + delta + items.length) % items.length;
    setIndex(next);
    onIndexChange?.(next);
    // Reset the active card position to its rest state for the new index.
    translateY.value = 0;
  };

  const gesture = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onUpdate((e) => {
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY < -COMMIT_THRESHOLD) {
        // Swipe up → next
        translateY.value = withTiming(-OFFSCREEN, { duration: 220 }, () => {
          runOnJS(advance)(1);
        });
      } else if (e.translationY > COMMIT_THRESHOLD) {
        // Swipe down → previous
        translateY.value = withTiming(OFFSCREEN, { duration: 220 }, () => {
          runOnJS(advance)(-1);
        });
      } else {
        // Snap back
        translateY.value = withSpring(0, { damping: 18, stiffness: 220 });
      }
    });

  const activeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const next = items[(index + 1) % items.length];

  return (
    <View style={{ flex: 1 }}>
      {/* Peek of the next card */}
      <View
        style={{
          position: "absolute",
          top: 18,
          left: 14,
          right: 14,
          bottom: 30,
          opacity: 0.55,
          transform: [{ scale: 0.96 }],
        }}
        pointerEvents="none"
      >
        {renderCard(next, (index + 1) % items.length)}
      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ flex: 1 }, activeStyle]}>
          {renderCard(items[index], index)}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
