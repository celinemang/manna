# Manna — Developer Handoff (최신판)

> 이 문서가 유일한 진실의 원천입니다. 새 세션 시작 전 반드시 처음부터 끝까지 읽으세요.

---

## 전략적 결정 (확정, 재논의 금지)

| 결정 | 선택 | 이유 |
|---|---|---|
| **스택** | React Native + Expo (단일 TS → iOS + Android) | 기존 TS 데이터·i18n·Gemini 재사용 |
| **Next.js** | 마케팅 사이트 + `/api` 백엔드로 유지 | 모바일 앱이 `/api/devotion` 호출 |
| **언어** | EN + KO 동시 지원 (bilingual v1) | 디자이너 검증된 새번역 데이터 제공 |
| **카테고리** | 6개 영적 회복 카테고리 (10개 단순 감정 → 대체) | Motivation 앱 감성 + 말씀 기반 wellness |
| **AI** | Google Gemini `gemini-2.5-flash` via `@google/genai` | Anthropic SDK 제거, GEMINI_API_KEY 사용 |
| **결제/로그인** | MVP에서 없음 | 핵심 루프 먼저 |

---

## 6개 카테고리 (최신)

| ID | 한국어 | 분위기 | 배경색 | 글리프 |
|---|---|---|---|---|
| `anxiety` | 불안 | sage green, calm | `#D8DBC4` / ink `#2C2F22` | wave |
| `sadness` | 우울한 마음 | cool grey, quiet | `#D4D8DC` / ink `#28303A` | drop |
| `confidence` | 자신감 | warm gold, bright | `#F2DEB5` / ink `#3A2C16` | spark |
| `love` | 나를 사랑하기 | soft rose, tender | `#F0D9CC` / ink `#3D2418` | sun |
| `release` | 내려놓기 | muted blue, still | `#C8D4E0` / ink `#1E2C3A` | leaf |
| `strength` | 힘이 되는 말씀 | warm parchment | `#E8D9C0` / ink `#3A2E20` | shield |

각 카테고리 5개 말씀 = 총 30개. EN(NIV-style) + KO(새번역/개역개정).

---

## 레포 구조

npm workspace:

```
manna/
├── apps/
│   ├── web/                    ← Next.js 16 (마케팅 + /api 백엔드)
│   │   └── src/app/api/
│   │       ├── devotion/route.ts   ← Gemini /api/devotion
│   │       └── share/png/route.tsx ← next/og PNG 렌더러
│   └── mobile/                 ← Expo SDK 54 + Expo Router 6
│       ├── app/
│       │   ├── _layout.tsx         ← root: 폰트, splash, 터치스트릭
│       │   ├── index.tsx           ← splash (1초 wordmark → 온보딩 or 탭)
│       │   ├── (onboarding)/
│       │   │   ├── _layout.tsx
│       │   │   ├── intro.tsx       ← Step 1: 감성 hook (wheat glyph)
│       │   │   ├── empathy.tsx     ← Step 2: 공감
│       │   │   ├── emotions.tsx    ← Step 3: 카테고리 멀티셀렉트
│       │   │   ├── value.tsx       ← Step 4: 기능 소개 카드 3개
│       │   │   ├── notification.tsx← Step 5: 알림 시간 설정
│       │   │   └── verse.tsx       ← Step 6: 첫 말씀 카드
│       │   ├── (tabs)/
│       │   │   ├── _layout.tsx     ← 탭바 (오늘/마음/저장/나)
│       │   │   ├── index.tsx       ← 오늘: swipe-stack
│       │   │   ├── feelings.tsx    ← 마음: 6개 카테고리 그리드
│       │   │   ├── saved.tsx       ← 저장: 세로 리스트
│       │   │   └── you.tsx         ← 나: Journey + Settings
│       │   ├── feelings/[emotion].tsx ← Devotion 결과
│       │   └── share/[verseId].tsx    ← Share 모달
│       ├── components/
│       │   ├── Glyph.tsx           ← 11개 SVG 글리프
│       │   ├── OnboardingStep.tsx  ← 구 온보딩 (미사용, dead route)
│       │   ├── PaperGrain.tsx      ← 노이즈 오버레이 (react-native-svg)
│       │   ├── ProgressDots.tsx    ← 온보딩 진행 도트
│       │   ├── SwipeStack.tsx      ← Reanimated v4 수직 스와이프
│       │   ├── VerseCard.tsx       ← 감정색 카드 + 저장/공유 버튼
│       │   └── Wordmark.tsx        ← Manna 로고
│       └── lib/
│           ├── devotion.ts         ← fetchDevotion (hostUri 자동감지)
│           ├── i18n.ts             ← react-i18next 초기화
│           ├── journey.ts          ← 스트릭·무드 기록 (AsyncStorage)
│           ├── notifications.ts    ← expo-notifications daily trigger
│           ├── onboarding.ts       ← 온보딩 완료·감정선택·알림시간 저장
│           ├── saved.ts            ← 저장 말씀 (AsyncStorage 리스너)
│           ├── tokens.ts           ← 디자인 토큰 (색상)
│           ├── typography.ts       ← serifMedium/sansMedium(locale) 헬퍼
│           └── useLocale.ts        ← 언어 감지·전환·AsyncStorage 저장
├── packages/
│   └── shared/
│       ├── data/
│       │   ├── verses.ts           ← 30개 말씀 (6×5, EN+KO)
│       │   └── emotions.ts         ← 6개 카테고리 (bg/ink/glyph)
│       ├── i18n/
│       │   ├── config.ts           ← Locale 타입, defaultLocale
│       │   └── dictionaries.ts     ← EN+KO 전체 문자열
│       └── lib/types.ts            ← EmotionId, Verse, Devotion, SavedItem
├── package.json                    ← workspaces + root overrides
└── .gitignore                      ← 재귀 패턴 (node_modules/, .next/, .expo/)
```

---

## 기술 스택

### Web (apps/web)
- Next.js 16, React 19.1.0, TypeScript 5, Tailwind 4
- `@google/genai` Gemini SDK — `gemini-2.5-flash` + `responseSchema`
- `next/og` — 1080×1080 PNG 공유 카드 (Satori)
  - **주의**: Satori는 WOFF2 미지원. Google Fonts v1 엔드포인트 + iPhone OS 4 UA → TTF

### Mobile (apps/mobile)
- Expo SDK 54, Expo Router 6
- React Native 0.81.5, React 19.1.0 (root overrides로 고정)
- react-native-reanimated 4 + gesture-handler — swipe stack
- react-native-svg — 글리프 + PaperGrain
- @expo-google-fonts: cormorant-garamond, inter, inter-tight, noto-serif-kr, noto-sans-kr
- react-i18next 17 + i18next 26 + expo-localization
- @react-native-async-storage/async-storage
- expo-notifications — 매일 알림 (DAILY trigger)
- expo-sharing + react-native-view-shot 4.0.3 — 공유 모달

---

## 디자인 토큰 (`lib/tokens.ts`)

```ts
cream:     "#F5EBD7"  // 앱 배경
card:      "#ECE0C5"  // 카드 표면
parchment: "#E8DBC4"
ivory:     "#FAF4E8"
ink:       "#2A211A"  // 주 텍스트 (순검정 아닌 따뜻한 갈색)
ink2:      "#5A4A38"
ink3:      "#8A7A66"
hairline:  "#D6C7A8"
night:     "#1A1310"  // Today 다크 배경
gold:      "#B89556"
```

### 폰트 (`lib/typography.ts`)
```ts
serifMedium(locale)  // EN: Cormorant Garamond, KO: Noto Serif KR
serifItalic(locale)  // EN: Cormorant Italic, KO: Noto Serif (이탤릭 없음)
sansMedium(locale)   // EN: Inter Tight,       KO: Noto Sans KR
```

### PaperGrain
- `<PaperGrain opacity={0.06} />` — 전체 화면 배경
- `<PaperGrain opacity={0.07} color={em.ink} />` — 카드 안쪽 (overflow: hidden으로 잘림)

---

## 완성된 것 (화면 목록)

### 온보딩 (6단계)
1. **intro.tsx** — Wheat glyph + "당신의 마음을 위한 말씀" + fade-in
2. **empathy.tsx** — Wave glyph + "오늘 마음은 어떤가요?" 공감 카피
3. **emotions.tsx** — 6개 카테고리 멀티셀렉트 (AsyncStorage 저장)
4. **value.tsx** — 3개 기능 카드 (오늘의 말씀/짧은 기도/하루의 위로)
5. **notification.tsx** — 아침/점심/저녁/직접설정 + 권한요청 + DAILY 스케줄
6. **verse.tsx** — 선택 카테고리 첫 말씀 + AI 묵상/기도 (offline fallback 내장)

### 메인 탭
- **오늘 (index.tsx)** — 다크 배경 수직 swipe-stack, 세션별 셔플, 저장/공유 pill 버튼 (하단 중앙), 사선 스와이프 OK
- **마음 (feelings.tsx)** — 6개 카테고리 2열 그리드, min-height 116, radius 18, 카드 안쪽 grain overlay, TopBar 뒤로가기
- **저장 (saved.tsx)** — 세로 리스트 (glyph badge + 레퍼런스 + 날짜 + 짧은 미리보기), 32px 필터 칩, 검색 아이콘(v1 시각)
- **나 (you.tsx)** — Journey (streak + 14일 무드스트립 + 감정 분포) + Settings (알림토글·번역·언어 EN/KO 전환·앱버전)

### Devotion 결과 (`feelings/[emotion].tsx`)
- Cream 인용 카드 + 3개 섹션 (묵상/기도/오늘의 한 걸음)
- 섹션 라벨은 로딩 중에도 항상 표시 (skeleton 바 + 스피너)
- AbortController로 race-safe re-fetch
- 저장 토글 + 공유 버튼 (Save icon 색 변화 + 햅틱)

### Share 모달 (`share/[verseId].tsx`)
- 다크 배경 모달, 5가지 팔레트 스타일 (Cream/Night/Sage/Rose/Dusk)
- react-native-view-shot → expo-sharing

---

## AsyncStorage 키 목록

```
manna:onboarded                ← "1" = 온보딩 완료
manna:onboarding:emotions      ← JSON EmotionId[] (선택 카테고리)
manna:onboarding:notifHour     ← 알림 시간 (숫자)
manna:locale                   ← "en" | "ko"
manna:saved:v1                 ← JSON SavedItem[]
manna:streak:lastOpenedDate    ← "2026-05-11"
manna:streak:current           ← 숫자
manna:streak:best              ← 숫자
manna:moods                    ← JSON MoodEntry[] (최대 90개)
manna:reminder:enabled         ← "0" | "1"
manna:reminder:hour            ← 숫자
manna:reminder:min             ← 숫자
```

---

## 백엔드 상세

### `/api/devotion` (POST)
- 파일: `apps/web/src/app/api/devotion/route.ts`
- 요청: `{ verseId, emotion, locale }`
- 응답: `{ reflection, prayer, actionStep }` (Gemini structured output)
- 환경변수: `GEMINI_API_KEY` in `apps/web/.env.local` (gitignored)

### `/api/share/png` (GET)
- 파일: `apps/web/src/app/api/share/png/route.tsx`
- 쿼리: `?verseId=anxiety-001&locale=ko`
- 반환: 1080×1080 PNG (next/og + Satori)

### 모바일 API 연결
- `lib/devotion.ts`가 `Constants.expoConfig.hostUri`에서 자동 감지
- 프로덕션: `EXPO_PUBLIC_API_BASE=https://manna.app` (EAS env)

---

## 주요 주의사항

1. **`.gitignore` 재귀 패턴 필수** — `/node_modules` 루트 앵커는 workspace node_modules 누락. `node_modules/` 형태로 사용.

2. **AI = Gemini (Anthropic 아님)** — `@google/genai`, `GEMINI_API_KEY`. Anthropic SDK 재설치 금지.

3. **React 19.1.0 고정** — root `overrides: { "react": "19.1.0", "react-dom": "19.1.0" }`. Expo SDK 54 요구사항.

4. **Satori WOFF2 미지원** — share/png route에서 Google Fonts는 v1 엔드포인트 + iPhone OS 4 UA로 TTF 받기.

5. **KO 성경 텍스트** — 30개 말씀 모두 새번역/개역개정. 출시 전 한국어 원어민 검토 권장.

6. **개발 서버 2개 필요** — `npm run --workspace=@manna/web dev` + `npm run --workspace=@manna/mobile start`. 같은 wifi여야 phone에서 API 호출됨.

7. **캐시 오류 시** — `npm run --workspace=@manna/mobile start -- --clear` 또는 Expo Go에서 흔들기 → Reload.

8. **온보딩 재테스트** — 흔들기 → Clear AsyncStorage → `manna:onboarded` 초기화됨.

9. **구 온보딩 파일** (`welcome.tsx`, `more.tsx`, `begin.tsx`) — 코드는 남아있지만 어디서도 참조 안 됨. Dead routes. 필요시 삭제 가능.

---

## 테스트 방법

```bash
# 터미널 1 — Next.js 백엔드
npm run --workspace=@manna/web dev

# 터미널 2 — Expo
npm run --workspace=@manna/mobile start

# 타입체크
cd apps/mobile && npx tsc --noEmit  # EXIT=0 확인

# expo-doctor
cd apps/mobile && npx expo-doctor   # 17/17 passes
```

**Walk (전체 플로우):**
1. 앱 실행 → Splash (1초) → 온보딩 Step 1
2. Step 1→6 진행: 카테고리 최소 1개 선택, 알림 시간 설정 (or 건너뛰기)
3. Step 6: 첫 말씀 카드 → "탐색 시작하기" → 메인 탭
4. 오늘 탭: 수직/사선 스와이프로 카드 넘김, 하단 저장/공유 탭
5. 마음 탭: 6개 카테고리 → 카테고리 탭 → 스피너 → 묵상/기도/한 걸음
6. 저장 탭: 저장된 말씀 세로 리스트, 필터 칩
7. 나 탭: 스트릭, 14일 무드, 언어 전환 (EN ↔ 한국어)

---

## 미완성 (다음 단계)

### Phase 4 — 폴리시 + TestFlight
- [ ] 앱 아이콘 + 스플래시 네이티브 설정 확인 (app.json에 경로 있음, 실제 이미지 필요)
- [ ] EAS Build 설정 + TestFlight 제출
- [ ] `eas.json` 생성 (development / preview / production profiles)
- [ ] 앱 스토어 메타데이터 (설명, 스크린샷)
- [ ] 구 온보딩 파일 삭제 (welcome.tsx, more.tsx, begin.tsx)
- [ ] Journey 탭 → 나 탭 통합 UX 개선 (You 탭이 너무 길어짐)

### Phase 5 — Android + Play Store
- [ ] EAS Android 빌드
- [ ] Play Console 제출

### v1.1 — 추후
- [ ] 30개 말씀 한국어 원어민 검토
- [ ] 카테고리별 추가 말씀 (각 5 → 10개)
- [ ] 오프라인 묵상 fallback 개선 (현재 정적 텍스트, AI 생성 아님)
- [ ] 공유 카드 Story 포맷 (1080×1920)
- [ ] 저장 말씀 검색 기능 (UI 아이콘 있음, 기능 미구현)

---

## 영속 메모리 파일 위치
```
~/.claude/projects/-Users-celine-manna/memory/
├── MEMORY.md                    ← 인덱스
├── project_bilingual.md         ← EN+KO 동시 지원 (v1 확정)
├── project_ai_provider.md       ← Gemini (Anthropic 아님)
└── feedback_gitignore_monorepo.md ← 재귀 패턴 필수
```

---

## 최신 Git 히스토리

```
55ed1a6  Restructure to 6 spiritual-wellness categories
4b7d195  New 6-step Motivation-style onboarding
7814048  Rebuild Feelings screen 1:1 per PAGE-SPEC-Feelings.md
1f488f8  Warm up surfaces: paper grain, tokens, Inter Tight
9806fc1  Polish Today, Feelings, Saved per device feedback
b016faf  Ship bilingual EN + KO with verified Korean verses
74f8e67  Add bookmark on Today cards + roomier Feelings grid
b2e5865  Add Saved, Journey, Settings, Share modal (Phase 3)
3c4bcf3  Add DEV_HANDOFF.md for session resumption
22628f5  Add Today swipe-stack, Feelings picker, Devotion result
5a83d02  Expand verse + emotion data to designer's spec
c9a96b5  Stop tracking nested node_modules
71bc1f4  Add Expo mobile app + onboarding flow
c7f7e48  Restructure into npm workspace
```
