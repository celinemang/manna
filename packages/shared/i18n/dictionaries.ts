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
    eyebrow: "마음",
    heading: "오늘 마음은 어떠신가요?",
    subheading: "한 가지 감정을 골라 그 순간을 위한 말씀을 받아 보세요.",
  },
  result: {
    eyebrowPrefix: "",
    change: "다시 선택",
    anotherVerse: "다른 말씀",
    share: "공유",
    reflectionLabel: "묵상",
    prayerLabel: "기도",
    actionLabel: "오늘의 한 걸음",
    loadingDevotion: "묵상을 준비하고 있어요…",
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
    eyebrow: "저장",
    heading: "내가 간직한 말씀",
    empty: "아직 저장된 말씀이 없어요. 마음에 닿는 구절을 저장해 보세요.",
    remove: "삭제",
    open: "열기",
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
    anxious: { label: "불안할 때", prompt: "불안한 마음을 위해" },
    lonely: { label: "외로울 때", prompt: "혼자라 느낄 때" },
    tired: { label: "지칠 때", prompt: "더 이상 힘이 없을 때" },
    guilty: { label: "죄책감", prompt: "마음이 무거울 때" },
    angry: { label: "화날 때", prompt: "굳은 순간을 부드럽게" },
    grateful: { label: "감사할 때", prompt: "감사 안에 머물기 위해" },
    afraid: { label: "두려울 때", prompt: "두려움이 가까울 때" },
    discouraged: { label: "낙심할 때", prompt: "길이 멀게 느껴질 때" },
    peaceful: { label: "평안할 때", prompt: "그 고요를 지키기 위해" },
    hopeful: { label: "소망", prompt: "소망에 기대고 싶을 때" },
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
