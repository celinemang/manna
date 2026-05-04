# Manna — Developer Handoff

A bilingual Bible-verse devotional app. Pick what you're feeling, get an emotion-matched verse + an AI-generated reflection, prayer, and small action step. Save what speaks to you, share as a beautiful card.

This document is the single source of truth for what's been built and what's next. Read it top-to-bottom before continuing the build.

---

## Strategic decisions (locked, do not re-litigate)

These four were decided after the designer dropped a clickable HTML prototype + HANDOFF.md spec. All future work assumes them.

| Decision | Choice | Why |
|---|---|---|
| **Stack** | React Native + Expo (one TypeScript codebase → iOS + Android) | Lifts our existing TS data + i18n + Gemini prompt; fastest to App Store + Play Store |
| **Existing Next.js** | Keep as marketing site + `/api` backend | The mobile app calls `/api/devotion` and `/api/share/png`; no AI logic duplicated |
| **Translations (v1)** | English only — WEB (World English Bible, public domain) | Korean (개역한글) ships in v1.1 from a *verified* source; original 18 verses keep their hand-transcribed KO (still flagged for native-speaker review) |
| **v1 scope** | Match designer's spec fully | 10 emotions × 5 verses, splash, 3-step onboarding, Journey (streak + mood), Settings, share, daily local notification |

**Reversed mid-build:** bilingual was originally "from day one." User reversed on 2026-05-04 because hand-transcribed Korean Bible text is the most visible failure mode of a Christian devotional app. i18n scaffolding (react-i18next, dictionaries, useLocale) stays in place; only the user-facing toggle is hidden in v1.

---

## Repo structure

npm workspace:

```
manna/
├── apps/
│   ├── web/              ← Next.js 16 (existing, mostly untouched)
│   │   ├── src/app/
│   │   │   ├── [locale]/...    ← marketing/preview pages (en + ko)
│   │   │   └── api/
│   │   │       ├── devotion/route.ts       ← Gemini /api/devotion
│   │   │       └── share/png/route.tsx     ← next/og PNG renderer
│   │   ├── src/components/
│   │   ├── src/lib/                ← web-only (saved, share)
│   │   └── package.json            (@manna/web)
│   └── mobile/           ← Expo SDK 54 + Expo Router 6
│       ├── app/                    ← file-based routes
│       │   ├── _layout.tsx         ← root: fonts, splash gating, i18n boot
│       │   ├── index.tsx           ← splash
│       │   ├── (onboarding)/
│       │   │   ├── _layout.tsx
│       │   │   ├── welcome.tsx
│       │   │   ├── more.tsx
│       │   │   └── begin.tsx
│       │   ├── (tabs)/
│       │   │   ├── _layout.tsx
│       │   │   ├── index.tsx       ← Today (verse swipe-stack)
│       │   │   ├── feelings.tsx    ← 10-emotion grid
│       │   │   ├── saved.tsx       ← placeholder for Phase 3
│       │   │   └── you.tsx         ← placeholder for Phase 3
│       │   └── feelings/[emotion].tsx  ← Devotion result (calls /api/devotion)
│       ├── components/
│       │   ├── Glyph.tsx           ← all designer SVG glyphs
│       │   ├── OnboardingStep.tsx
│       │   ├── SwipeStack.tsx      ← reanimated vertical swipe
│       │   ├── VerseCard.tsx
│       │   └── Wordmark.tsx
│       ├── lib/
│       │   ├── devotion.ts         ← fetch /api/devotion (auto-detects host)
│       │   ├── i18n.ts             ← react-i18next + expo-localization
│       │   ├── onboarding.ts       ← AsyncStorage onboarded flag
│       │   └── useLocale.ts
│       ├── tailwind.config.js      ← cream/sage/dusk/rose palette
│       ├── metro.config.js         ← monorepo-aware + nativewind
│       ├── app.json                ← bundle id com.celinemang.manna
│       └── package.json            (@manna/mobile)
├── packages/
│   └── shared/                     ← cross-platform pure data + types
│       ├── data/
│       │   ├── verses.ts           ← 50 verses (10 emotions × 5)
│       │   └── emotions.ts         ← 10 emotion design tokens (bg/ink/glyph)
│       ├── i18n/
│       │   ├── config.ts           ← Locale type, defaultLocale, isLocale
│       │   └── dictionaries.ts     ← typed Dictionary, en + ko strings
│       ├── lib/types.ts            ← Verse, EmotionId, EmotionMeta, Devotion, SavedItem
│       └── package.json            (@manna/shared)
├── package.json                    ← workspaces + root overrides
├── package-lock.json               ← single root lock
└── .gitignore                      ← recursive patterns (node_modules/, .next/, .expo/)
```

Both apps import shared as `@manna/shared/data/verses`, `@manna/shared/i18n/config`, `@manna/shared/lib/types`, etc.

---

## Tech stack

### Web (apps/web)
- **Next.js 16** (Turbopack), **React 19.1.0**, **TypeScript 5**, **Tailwind 4**
- **@google/genai** (Gemini SDK) — `gemini-2.5-flash` with `responseSchema` for structured `{reflection, prayer, actionStep}`
- **zod** — request validation on `/api/devotion`
- **next/og** — server-side PNG rendering for share cards (Satori)
  - Critical: Satori does NOT support WOFF2. We fetch fonts via Google Fonts v1 endpoint (`?family=...`) with an iPhone OS 4 User-Agent so the response is TTF.
  - Per-request font subsetting via `?text=` so Korean payloads stay tiny.

### Mobile (apps/mobile)
- **Expo SDK 54**, **Expo Router 6** (file-based, like Next App Router)
- **React Native 0.81.5**, **React 19.1.0** (pinned via root `overrides`)
- **react-native-reanimated 4** + **react-native-gesture-handler** — swipe stack
- **react-native-svg 15.12.1** — emotion glyphs + wordmark
- **NativeWind 4** + **Tailwind 3.4** — shared color/font tokens
- **@expo-google-fonts/cormorant-garamond + inter + noto-serif-kr** — designer's type system
- **react-i18next 17** + **i18next 26** + **expo-localization** — locale detection + persistence
- **@react-native-async-storage/async-storage** — onboarded flag, locale, saved verses, streak
- **expo-notifications**, **expo-sharing**, **expo-file-system**, **react-native-view-shot 4.0.3** — Phase 3 dependencies (already installed)

### Shared (packages/shared)
- Pure TS — no React, no platform APIs. Imports straight from source via package `exports`.

---

## What's complete (Phases 1 + 2)

### Phase 1 — Foundation
- ✅ npm workspace restructure (apps/web + apps/mobile + packages/shared) — commit `c7f7e48`
- ✅ Expo app initialized, fonts loaded, theme tokens wired, NativeWind configured — commit `c9a96b5`
- ✅ Splash screen (1s wordmark, then redirect to onboarding or tabs)
- ✅ 3-step onboarding (Welcome / Verses, daily / Meet your heart) with skip + continue + begin
- ✅ Tab shell (Today / Feelings / Saved / You) with localized titles
- ✅ i18n: react-i18next wired, device locale detected, persisted in AsyncStorage, switchable via useLocale hook
- ✅ expo-doctor: 17/17 checks pass
- ✅ Web still builds; mobile typechecks clean

### Phase 2 — Core daily loop
- ✅ Verse data expanded 18 → 50 (10 emotions × 5) — commit `5a83d02`
- ✅ Today screen with reanimated vertical swipe-stack (drag up = next, drag down = previous, snap back below threshold) — commit `22628f5`
- ✅ Per-emotion verse cards with designer's bg/ink palette + ornament + emotion pill
- ✅ Page indicator dots on the right edge
- ✅ Feelings picker — 10-emotion grid with glyphs
- ✅ Devotion result screen — calls `/api/devotion`, renders reflection/prayer/action with loading + error states; Another Verse button re-rolls + re-fetches via AbortController
- ✅ Mobile auto-detects API base from Expo's `hostUri` so a phone on same wifi can reach laptop's Next dev server (override with `EXPO_PUBLIC_API_BASE`)

**Git history (most recent first):**
```
22628f5  Add Today swipe-stack, Feelings picker, Devotion result
5a83d02  Expand verse + emotion data to designer's spec; ship v1 English-only
c9a96b5  Stop tracking nested node_modules and build outputs
71bc1f4  Add Expo mobile app + onboarding flow
c7f7e48  Restructure into npm workspace (apps/web + packages/shared)
6c1aecd  Add shareable verse card PNG (web)
d163ca6  Add saved verses (web)
4d87c73  Switch /api/devotion from Anthropic to Gemini
6d11be7  Add bilingual i18n + AI devotion route (web)
bd034d0  Add Step 1 MVP: verse feed and emotion picker (web)
4b3f20e  Initial commit from Create Next App
44304c6  Initial commit (designer)
```

---

## What's next (Phase 3, 4, 5)

### Phase 3 — Round out the tabs
| Item | Notes |
|---|---|
| **Saved tab** | localStorage equivalent already exists for web at `apps/web/src/lib/saved.ts`. Mobile version needs a port to AsyncStorage. The `SavedItem` type is in `@manna/shared/lib/types` and ready. Designer's spec: grid of card thumbnails with filter chips + empty state, each card has the emotion's bg/glyph + reference + date. |
| **Journey tab** | Streak counter (current + best), 14-day mood strip (color bar per day, color = emotion that day), mood breakdown (horizontal stacked bar). Track `lastOpenedDate` + `current` + `best` + `moods[]` in AsyncStorage. Use `date-fns` for day diffs (already installed). |
| **Settings/You tab** | Designer's row layout: Daily reminder (time picker), streak toggle, quiet days, Translation (read-only WEB until v1.1), text size, theme, language (hidden in v1), App lock, AI generation toggle, export, disclaimer, feedback. Wire daily local notification via **expo-notifications** — schedule at user's chosen time, tap deep-links to Today. |
| **Share modal** | Designer's spec: dark backdrop, white verse card centered, style picker (Cream / Night / Sage / Rose / Dusk), Save image / Share buttons. Use **react-native-view-shot** to snapshot the card to a PNG, then **expo-sharing** to invoke the system sheet. Web fallback `/api/share/png` is already implemented and works. |

### Phase 4 — Polish + TestFlight
- Paper grain texture (ship as PNG asset; designer ships SVG noise but at runtime it's expensive)
- Animations: card stack micro-interactions, screen transitions, haptics on swipe (expo-haptics already installed)
- Empty states, error states, accessibility (VoiceOver labels)
- App icons + splash screen native config (icon already gestured in app.json)
- **EAS Build** + TestFlight submission via internal track

### Phase 5 — Android + Play Store
- Same Expo build → Android via `eas build --profile production --platform android`
- Play Console submission

---

## Backend details

### `/api/devotion` (POST)
Path: `apps/web/src/app/api/devotion/route.ts`
Provider: **Google Gemini** (`gemini-2.5-flash` via `@google/genai`)
Env: `GEMINI_API_KEY` in `apps/web/.env.local` (file is gitignored; example at `apps/web/.env.local.example`)

Request:
```json
{
  "verseId": "anxious-001",
  "emotion": "anxious",
  "locale": "en"
}
```

Response (zod-validated, structured output via `responseSchema`):
```json
{
  "reflection": "...",   // 3-5 sentences
  "prayer": "...",       // 3-5 sentences
  "actionStep": "..."    // single sentence
}
```

System prompt enforces the §11.3/11.4 safety rules from the original product plan: no inventing scripture, no shame, no diagnoses, locale-faithful output. Verse lookup happens server-side from `verseId` so the client can't smuggle text into the prompt.

### `/api/share/png` (GET)
Path: `apps/web/src/app/api/share/png/route.tsx`
Renderer: `next/og` (Satori) running in nodejs runtime.
Returns: 1080×1080 PNG, en or ko, ~85KB.
Querystring: `?verseId=anxious-001&locale=en`
Mobile uses this as a fallback share renderer; primary path will be local `react-native-view-shot` in Phase 3.

---

## Critical gotchas (read before touching things)

1. **`.gitignore` must use recursive patterns.** A previous commit accidentally tracked `apps/web/node_modules/` (560+ files) because the original `.gitignore` was root-anchored (`/node_modules`). Fixed in `c9a96b5`. Always check `git status` for nested `node_modules/`, `.next/`, `.expo/` before broad commits.

2. **Two API keys leaked into the chat transcript** (Gemini + Anthropic). Rotate at https://aistudio.google.com/app/apikey and https://console.anthropic.com/settings/keys when convenient. Local `.env.local` files are gitignored and never pushed.

3. **`@/api/devotion` = Gemini, not Anthropic.** The Anthropic SDK was uninstalled. Don't accidentally re-add it. Per the [`claude-api` skill](https://platform.claude.com/), never edit a non-Anthropic file with Anthropic SDK calls.

4. **React is pinned to 19.1.0** across the workspace via root `overrides`. Expo SDK 54 requires this exact version. Don't bump just one app — bump both or neither. Web running on React 19.2.4 caused expo-doctor to fail with duplicate-resolution warnings.

5. **Satori (next/og) does not support WOFF2.** When extending the share PNG to new fonts, fetch via Google Fonts v1 (`https://fonts.googleapis.com/css?family=...`) with the iPhone OS 4 User-Agent (`Mozilla/5.0 (iPhone; CPU iPhone OS 4_0 like Mac OS X)`) so the response is TTF.

6. **Korean Bible text needs verification.** The 18 originally-bilingual verses use my hand-transcribed 개역한글. The 32 newer verses use `ko = en` as a fallback. Before re-enabling the locale toggle in v1.1, pull all 50 from a verified KRV source (bibles.org/api/v3 or licensed Korean publisher).

7. **Mobile dev server + Next dev server need to run together.** The mobile app's `lib/devotion.ts` auto-detects the API host from `Constants.expoConfig.hostUri`. If you're testing on a physical phone, both devices must be on the same wifi, and `npm run --workspace=@manna/web dev` must be running on the laptop. For prod, set `EXPO_PUBLIC_API_BASE=https://manna.app` in EAS env.

8. **Designer's `MANNA_DEVOTION_I18N`** (pre-written reflection/prayer/action) is **not used.** We use AI generation via Gemini, which is locale-aware and personalizes to the user's specific verse pull. The pre-written set is a future offline fallback.

---

## How to test (Phases 1 + 2)

```bash
# Terminal 1 — Next.js backend (Gemini /api routes)
npm run --workspace=@manna/web dev

# Terminal 2 — Expo mobile
npm run --workspace=@manna/mobile start
```

Then either:
- **iOS simulator**: press `i` in the Expo terminal
- **Physical iPhone**: install Expo Go, scan the QR code (must be on same wifi as laptop)

**Walk:**
1. Splash holds ~1s on the wheat-stalk wordmark
2. Onboarding: 3 steps with kicker/title/body and dot indicator → tap **Begin**
3. Today (dark backdrop): swipe up = next verse, swipe down = previous, dots on right edge
4. Tap **Feelings** in bottom tab → 10-emotion grid
5. Tap any emotion → spinner → reflection + prayer + action arrive from Gemini in ~2-5s
6. **Another verse** → re-rolls + re-fetches
7. Saved + You tabs are placeholders (Phase 3 fills them)

To re-test onboarding: delete the app and reinstall, OR clear AsyncStorage in dev tools.

---

## Verification commands

```bash
# Web
npm run --workspace=@manna/web build       # Next.js production build
npm run --workspace=@manna/web lint        # eslint

# Mobile
cd apps/mobile && npx tsc --noEmit         # TypeScript
cd apps/mobile && npx expo-doctor          # 17 environment checks
cd apps/mobile && npx expo start           # dev server

# Both
npm install                                # workspace install
```

---

## Persistent context (memory + plans)

Saved at `~/.claude/projects/-Users-celine-manna/memory/`:
- `project_bilingual.md` — v1 = English-only, KO post-launch
- `project_ai_provider.md` — Gemini, not Anthropic
- `feedback_gitignore_monorepo.md` — recursive patterns required

Approved plan at `~/.claude/plans/these-are-information-from-snappy-honey.md` — full implementation plan including phases 3, 4, 5 details.

---

## Designer artifacts (reference only — not in repo)

The designer's prototype HTML files were dropped as conversation attachments. Re-reference them if you need:
- `tokens.jsx` — color palette + glyph SVGs (already translated to `apps/mobile/components/Glyph.tsx`)
- `screens.jsx` / `screens-extra.jsx` — JSX for every screen
- `i18n.js` — original full string set (only onboarding subset migrated so far)
- `verses.js` — original 50-verse list (already migrated to `packages/shared/data/verses.ts`)
- `Manna - Design Canvas.html` / `Manna - Prototype.html` — clickable visuals
- The designer's `HANDOFF.md` (separate from this file) — colors, type, brand mood

If extending Phase 3 needs more strings (saved/journey/settings labels), the original `i18n.js` has them in both en + ko.
