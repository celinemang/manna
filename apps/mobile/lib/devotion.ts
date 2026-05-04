import Constants from "expo-constants";
import type { Devotion, EmotionId } from "@manna/shared/lib/types";
import type { Locale } from "@manna/shared/i18n/config";

// Where the Next.js /api/* routes live. Override with EXPO_PUBLIC_API_BASE
// in EAS env or via app.config when we ship; defaults to localhost dev so
// `npm --workspace=@manna/web dev` Just Works alongside `expo start`.
function apiBase(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_BASE;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  // In dev, prefer the host that served the Expo bundle so a phone on the
  // same wifi can reach our laptop's Next dev server.
  const debuggerHost =
    (Constants.expoConfig?.hostUri ?? "").split(":")[0] || "localhost";
  return `http://${debuggerHost}:3000`;
}

export async function fetchDevotion(args: {
  verseId: string;
  emotion: EmotionId;
  locale: Locale;
  signal?: AbortSignal;
}): Promise<Devotion> {
  const res = await fetch(`${apiBase()}/api/devotion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      verseId: args.verseId,
      emotion: args.emotion,
      locale: args.locale,
    }),
    signal: args.signal,
  });
  if (!res.ok) throw new Error(`devotion_${res.status}`);
  return (await res.json()) as Devotion;
}
