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
  emotions: Record<
    "anxious" | "lonely" | "tired" | "guilty" | "grateful" | "hopeful",
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
  emotions: {
    anxious: { label: "Anxious", prompt: "for an anxious heart" },
    lonely: { label: "Lonely", prompt: "when you feel alone" },
    tired: { label: "Tired", prompt: "when you have nothing left" },
    guilty: { label: "Guilty", prompt: "when shame is heavy" },
    grateful: { label: "Grateful", prompt: "to rest in thanks" },
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
  emotions: {
    anxious: { label: "불안할 때", prompt: "불안한 마음을 위해" },
    lonely: { label: "외로울 때", prompt: "혼자라 느낄 때" },
    tired: { label: "지칠 때", prompt: "더 이상 힘이 없을 때" },
    guilty: { label: "죄책감", prompt: "마음이 무거울 때" },
    grateful: { label: "감사할 때", prompt: "감사 안에 머물기 위해" },
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
