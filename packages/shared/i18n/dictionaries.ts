import type { Locale } from "./config";

type Dict = {
  appName: string;
  tagline: string;
  nav: { today: string; feelings: string; saved: string };
  home: { eyebrow: string; heading: string };
  feelings: {
    eyebrow: string;
    heading: string;
    subheading: string;
  };
  result: {
    eyebrowPrefix: string;
    change: string;
    anotherVerse: string;
    share: string;
    reflectionLabel: string;
    prayerLabel: string;
    actionLabel: string;
    loadingDevotion: string;
    devotionError: string;
  };
  feed: {
    previous: string;
    next: string;
    copy: string;
    share: string;
    save: string;
    unsave: string;
  };
  saved: {
    eyebrow: string;
    heading: string;
    empty: string;
    remove: string;
    open: string;
  };
  journey: {
    eyebrow: string;
    heading: string;
    streakCurrent: string;
    streakBest: string;
    streakDays: string;
    last14: string;
    breakdown: string;
    empty: string;
  };
  settings: {
    eyebrow: string;
    heading: string;
    rhythm: string;
    dailyReminder: string;
    dailyReminderHint: string;
    reminderTime: string;
    enable: string;
    disable: string;
    reading: string;
    translation: string;
    translationValue: string;
    privacy: string;
    appLock: string;
    aiGen: string;
    about: string;
    feedback: string;
    version: string;
    notifTitle: string;
    notifBody: string;
    language: string;
  };
  share: {
    heading: string;
    style: string;
    save: string;
    shareBtn: string;
    saved: string;
    close: string;
  };
  onboarding: {
    skip: string;
    continue: string;
    begin: string;
    steps: { kicker: string; title: string; body: string }[];
  };
  emotions: Record<
    | "anxious"
    | "lonely"
    | "tired"
    | "guilty"
    | "angry"
    | "grateful"
    | "afraid"
    | "discouraged"
    | "peaceful"
    | "hopeful",
    { label: string; prompt: string }
  >;
  localeSwitcher: { en: string; ko: string };
  disclaimer: string;
};

const en: Dict = {
  appName: "Manna",
  tagline: "Scripture for your heart, one moment at a time.",
  nav: { today: "Today", feelings: "Feelings", saved: "Saved" },
  home: { eyebrow: "Manna", heading: "A verse for today" },
  feelings: {
    eyebrow: "Feelings",
    heading: "How is your heart today?",
    subheading: "Choose one feeling and receive Scripture for this moment.",
  },
  result: {
    eyebrowPrefix: "",
    change: "Change",
    anotherVerse: "Another verse",
    share: "Share",
    reflectionLabel: "Reflection",
    prayerLabel: "Prayer",
    actionLabel: "A small step",
    loadingDevotion: "Preparing your reflection…",
    devotionError:
      "We couldn't prepare a reflection right now. The verse is still here for you.",
  },
  feed: {
    previous: "Previous",
    next: "Next",
    copy: "Copy",
    share: "Share",
    save: "Save",
    unsave: "Saved",
  },
  saved: {
    eyebrow: "Saved",
    heading: "Verses you've kept",
    empty: "Nothing saved yet. Tap Save on any verse to keep it here.",
    remove: "Remove",
    open: "Open",
  },
  journey: {
    eyebrow: "Journey",
    heading: "Your walk",
    streakCurrent: "Current streak",
    streakBest: "Best streak",
    streakDays: "days",
    last14: "Last 14 days",
    breakdown: "Mood breakdown",
    empty: "No moods logged yet. Pick a feeling to start your journey.",
  },
  settings: {
    eyebrow: "Settings",
    heading: "You",
    rhythm: "Daily rhythm",
    dailyReminder: "Daily reminder",
    dailyReminderHint: "A gentle nudge to open Manna at the same time each day.",
    reminderTime: "Reminder time",
    enable: "On",
    disable: "Off",
    reading: "Reading",
    translation: "Translation",
    translationValue: "WEB · World English Bible / 새번역",
    privacy: "Privacy",
    appLock: "App lock",
    aiGen: "AI-generated reflections",
    about: "About",
    feedback: "Send feedback",
    version: "Version",
    notifTitle: "A verse for today",
    notifBody: "Open Manna for a quiet word.",
    language: "Language",
  },
  share: {
    heading: "Share",
    style: "Style",
    save: "Save image",
    shareBtn: "Share",
    saved: "Saved to Photos",
    close: "Close",
  },
  onboarding: {
    skip: "Skip",
    continue: "Continue",
    begin: "Begin",
    steps: [
      {
        kicker: "Welcome",
        title: "Scripture for\nyour heart.",
        body: "Manna is a daily Bible verse companion. Open it any moment for a beautiful verse, a short prayer, and one small step.",
      },
      {
        kicker: "Verses, daily",
        title: "Swipe through\ndaily Scripture.",
        body: "Beautiful verse cards, refreshed every day. Save the ones that speak to your heart, and share them with people you love.",
      },
      {
        kicker: "Meet your heart",
        title: "Tell us how\nyou feel.",
        body: "When emotions feel heavy or full, choose a feeling. We'll meet you there with a verse, a prayer, and a small step.",
      },
    ],
  },
  emotions: {
    anxious: { label: "Anxious", prompt: "for an anxious heart" },
    lonely: { label: "Lonely", prompt: "when you feel alone" },
    tired: { label: "Tired", prompt: "when you have nothing left" },
    guilty: { label: "Guilty", prompt: "when shame is heavy" },
    angry: { label: "Angry", prompt: "to soften a hard moment" },
    grateful: { label: "Grateful", prompt: "to rest in thanks" },
    afraid: { label: "Afraid", prompt: "when fear feels close" },
    discouraged: { label: "Discouraged", prompt: "when the road feels long" },
    peaceful: { label: "Peaceful", prompt: "to keep the quiet" },
    hopeful: { label: "Hopeful", prompt: "to lean into hope" },
  },
  localeSwitcher: { en: "EN", ko: "KO" },
  disclaimer:
    "This app is a devotional tool and does not replace professional counseling, medical care, or pastoral care.",
};

const ko: Dict = {
  appName: "만나",
  tagline: "오늘, 마음에 닿는 한 구절.",
  nav: { today: "오늘", feelings: "마음", saved: "저장" },
  home: { eyebrow: "만나", heading: "오늘의 말씀" },
  feelings: {
    eyebrow: "나의 마음",
    heading: "오늘 마음이 어떠신가요?",
    subheading: "한 가지 감정을 고르면, 그 마음에 닿는 말씀과 기도, 작은 한 걸음을 드릴게요.",
  },
  result: {
    eyebrowPrefix: "",
    change: "다시 선택",
    anotherVerse: "다시 받기",
    share: "공유",
    reflectionLabel: "묵상",
    prayerLabel: "기도",
    actionLabel: "오늘의 작은 한 걸음",
    loadingDevotion: "잠깐 숨을 고르는 시간…",
    devotionError:
      "지금은 묵상을 준비하지 못했어요. 말씀은 여전히 당신과 함께 있습니다.",
  },
  feed: {
    previous: "이전",
    next: "다음",
    copy: "복사",
    share: "공유",
    save: "저장",
    unsave: "저장됨",
  },
  saved: {
    eyebrow: "나의 말씀",
    heading: "저장한 말씀",
    empty: "아직 저장된 말씀이 없어요.\n마음에 닿은 말씀을 만나면 여기에 저장해 다시 만나보세요.",
    remove: "삭제",
    open: "열기",
  },
  journey: {
    eyebrow: "여정",
    heading: "당신의 걸음",
    streakCurrent: "지금의 연속",
    streakBest: "가장 긴 연속",
    streakDays: "일",
    last14: "최근 14일",
    breakdown: "감정 분포",
    empty: "아직 기록된 마음이 없어요. 감정을 골라 여정을 시작해 보세요.",
  },
  settings: {
    eyebrow: "계정",
    heading: "나",
    rhythm: "매일의 리듬",
    dailyReminder: "매일 알림",
    dailyReminderHint: "매일 같은 시간에 만나를 열어 보세요.",
    reminderTime: "알림 시간",
    enable: "켜짐",
    disable: "꺼짐",
    reading: "말씀 읽기",
    translation: "번역본",
    translationValue: "새번역 · 새번역 (한국어), WEB (English)",
    privacy: "개인정보",
    appLock: "앱 잠금",
    aiGen: "AI 생성",
    about: "정보",
    feedback: "의견 보내기",
    version: "버전",
    notifTitle: "오늘의 말씀",
    notifBody: "잠시 만나를 열어보세요.",
    language: "언어",
  },
  share: {
    heading: "공유",
    style: "스타일",
    save: "이미지 저장",
    shareBtn: "공유",
    saved: "사진에 저장됨",
    close: "닫기",
  },
  onboarding: {
    skip: "건너뛰기",
    continue: "계속",
    begin: "시작하기",
    steps: [
      {
        kicker: "환영합니다",
        title: "오늘 마음에\n내려앉는 말씀.",
        body: "만나는 매일의 말씀 동반자예요. 언제든 열어 짧은 말씀, 기도, 그리고 작은 한 걸음을 받아보세요.",
      },
      {
        kicker: "매일의 말씀",
        title: "말씀을 넘기며\n하루를 시작해요.",
        body: "하루마다 새로운 말씀 카드. 마음에 닿은 구절은 저장하고, 사랑하는 사람과 나누세요.",
      },
      {
        kicker: "마음을 만나다",
        title: "지금 마음이\n어떠신가요?",
        body: "감정이 무겁거나 벅찰 때, 한 가지를 골라보세요. 그 마음에 닿는 말씀과 기도, 그리고 작은 한 걸음을 드릴게요.",
      },
    ],
  },
  emotions: {
    anxious: { label: "불안한", prompt: "마음이 불안해요" },
    lonely: { label: "외로운", prompt: "외로워요" },
    tired: { label: "지친", prompt: "지쳤어요" },
    guilty: { label: "죄책감", prompt: "죄책감이 들어요" },
    angry: { label: "화난", prompt: "화가 나요" },
    grateful: { label: "감사한", prompt: "감사한 마음이에요" },
    afraid: { label: "두려운", prompt: "두려워요" },
    discouraged: { label: "낙담한", prompt: "낙담했어요" },
    peaceful: { label: "평안한", prompt: "평안해요" },
    hopeful: { label: "소망", prompt: "소망이 있어요" },
  },
  localeSwitcher: { en: "EN", ko: "KO" },
  disclaimer:
    "이 앱은 묵상 도구이며 전문 상담, 의료, 또는 목회적 돌봄을 대체하지 않습니다.",
};

const dictionaries: Record<Locale, Dict> = { en, ko };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

export type Dictionary = Dict;
