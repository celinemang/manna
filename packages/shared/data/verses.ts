import type { LocalizedText, Verse } from "../lib/types";

// English: World English Bible (WEB) — public domain.
// Korean:  개역한글 (1961) — public domain in Korea.
//
// V1 ships English-only. The 18 verses below with verified Korean text are
// kept (still flagged for native-speaker review). The 32 newer verses use
// `ko: <english>` as a graceful fallback — if a user toggles to Korean
// before v1.1, they see the English text rather than a blank or broken
// rendering. Real Korean text comes in v1.1 from a verified KRV source.
const KO_VERIFIED = "개역한글";
const EN = "WEB";

// Helper: build a LocalizedText where ko silently falls back to en. Use
// this for verses whose Korean text has not yet been verified.
function mono(en: string): LocalizedText {
  return { en, ko: en };
}

function ref(en: string, ko: string): LocalizedText {
  return { en, ko };
}

const TR_BOTH: LocalizedText = { en: EN, ko: KO_VERIFIED };
// For monolingual entries, label the Korean side as the EN translation too
// (so Korean toggle shows "WEB" rather than a Korean translation that doesn't
// match the displayed text).
const TR_EN_ONLY: LocalizedText = { en: EN, ko: EN };

export const verses: Verse[] = [
  // ───────── ANXIOUS ─────────
  {
    id: "anxious-001",
    emotion: "anxious",
    reference: ref("Philippians 4:6–7", "빌립보서 4:6–7"),
    text: {
      en: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.",
      ko: "아무 것도 염려하지 말고 오직 모든 일에 기도와 간구로 너희 구할 것을 감사함으로 하나님께 아뢰라 그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라",
    },
    translation: TR_BOTH,
    tags: ["anxiety", "peace", "prayer"],
  },
  {
    id: "anxious-002",
    emotion: "anxious",
    reference: ref("Matthew 6:34", "마태복음 6:34"),
    text: {
      en: "Therefore don't be anxious for tomorrow, for tomorrow will be anxious for itself. Each day's own evil is sufficient.",
      ko: "그러므로 내일 일을 위하여 염려하지 말라 내일 일은 내일 염려할 것이요 한 날 괴로움은 그 날에 족하니라",
    },
    translation: TR_BOTH,
    tags: ["anxiety", "today"],
  },
  {
    id: "anxious-003",
    emotion: "anxious",
    reference: ref("1 Peter 5:7", "베드로전서 5:7"),
    text: {
      en: "Casting all your worries on him, because he cares for you.",
      ko: "너희 염려를 다 주께 맡겨 버리라 이는 저가 너희를 권고하심이니라",
    },
    translation: TR_BOTH,
    tags: ["anxiety", "care"],
  },
  {
    id: "anxious-004",
    emotion: "anxious",
    reference: mono("Isaiah 41:10"),
    text: mono(
      "Don't you be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.",
    ),
    translation: TR_EN_ONLY,
    tags: ["anxiety", "presence"],
  },
  {
    id: "anxious-005",
    emotion: "anxious",
    reference: mono("Psalm 94:19"),
    text: mono(
      "In the multitude of my thoughts within me, your comforts delight my soul.",
    ),
    translation: TR_EN_ONLY,
    tags: ["anxiety", "comfort"],
  },

  // ───────── LONELY ─────────
  {
    id: "lonely-001",
    emotion: "lonely",
    reference: ref("Deuteronomy 31:6", "신명기 31:6"),
    text: {
      en: "Be strong and courageous. Don't be afraid or scared of them; for Yahweh your God himself is who goes with you. He will not fail you nor forsake you.",
      ko: "너는 마음을 강하게 하고 담대히 하라 그들을 두려워 말라 그들 앞에서 떨지 말라 이는 네 하나님 여호와 그가 너와 함께 행하실 것임이라 결코 너를 떠나지 아니하시며 버리지 아니하시리라",
    },
    translation: TR_BOTH,
    tags: ["loneliness", "presence"],
  },
  {
    id: "lonely-002",
    emotion: "lonely",
    reference: ref("Psalm 34:18", "시편 34:18"),
    text: {
      en: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.",
      ko: "여호와는 마음이 상한 자에게 가까이 하시고 중심에 통회하는 자를 구원하시는도다",
    },
    translation: TR_BOTH,
    tags: ["loneliness", "comfort"],
  },
  {
    id: "lonely-003",
    emotion: "lonely",
    reference: ref("Matthew 28:20", "마태복음 28:20"),
    text: {
      en: "Behold, I am with you always, even to the end of the age.",
      ko: "볼지어다 내가 세상 끝날까지 너희와 항상 함께 있으리라",
    },
    translation: TR_BOTH,
    tags: ["loneliness", "presence"],
  },
  {
    id: "lonely-004",
    emotion: "lonely",
    reference: mono("Psalm 68:6"),
    text: mono(
      "God sets the lonely in families. He brings out the prisoners with singing.",
    ),
    translation: TR_EN_ONLY,
    tags: ["loneliness", "family"],
  },
  {
    id: "lonely-005",
    emotion: "lonely",
    reference: mono("Hebrews 13:5"),
    text: mono(
      "Be free from the love of money, content with such things as you have, for he has said, 'I will in no way leave you, neither will I in any way forsake you.'",
    ),
    translation: TR_EN_ONLY,
    tags: ["loneliness", "presence"],
  },

  // ───────── TIRED ─────────
  {
    id: "tired-001",
    emotion: "tired",
    reference: ref("Matthew 11:28–29", "마태복음 11:28–29"),
    text: {
      en: "Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and lowly in heart; and you will find rest for your souls.",
      ko: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라 나는 마음이 온유하고 겸손하니 나의 멍에를 메고 내게 배우라 그러면 너희 마음이 쉼을 얻으리니",
    },
    translation: TR_BOTH,
    tags: ["rest", "weariness"],
  },
  {
    id: "tired-002",
    emotion: "tired",
    reference: ref("Isaiah 40:31", "이사야 40:31"),
    text: {
      en: "But those who wait for Yahweh will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint.",
      ko: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리의 날개치며 올라감 같을 것이요 달음박질하여도 곤비치 아니하겠고 걸어가도 피곤치 아니하리로다",
    },
    translation: TR_BOTH,
    tags: ["strength", "weariness"],
  },
  {
    id: "tired-003",
    emotion: "tired",
    reference: ref("Psalm 23:1–3", "시편 23:1–3"),
    text: {
      en: "Yahweh is my shepherd; I shall lack nothing. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
      ko: "여호와는 나의 목자시니 내게 부족함이 없으리로다 그가 나를 푸른 초장에 누이시며 쉴 만한 물 가으로 인도하시는도다 내 영혼을 소생시키시고",
    },
    translation: TR_BOTH,
    tags: ["rest", "shepherd"],
  },
  {
    id: "tired-004",
    emotion: "tired",
    reference: mono("Exodus 33:14"),
    text: mono("My presence will go with you, and I will give you rest."),
    translation: TR_EN_ONLY,
    tags: ["rest", "presence"],
  },
  {
    id: "tired-005",
    emotion: "tired",
    reference: mono("Psalm 62:1"),
    text: mono("My soul rests in God alone. My salvation is from him."),
    translation: TR_EN_ONLY,
    tags: ["rest", "salvation"],
  },

  // ───────── GUILTY ─────────
  {
    id: "guilty-001",
    emotion: "guilty",
    reference: ref("1 John 1:9", "요한일서 1:9"),
    text: {
      en: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.",
      ko: "만일 우리가 우리 죄를 자백하면 저는 미쁘시고 의로우사 우리 죄를 사하시며 모든 불의에서 우리를 깨끗케 하실 것이요",
    },
    translation: TR_BOTH,
    tags: ["forgiveness", "guilt"],
  },
  {
    id: "guilty-002",
    emotion: "guilty",
    reference: ref("Romans 8:1", "로마서 8:1"),
    text: {
      en: "There is therefore now no condemnation to those who are in Christ Jesus, who don't walk according to the flesh, but according to the Spirit.",
      ko: "그러므로 이제 그리스도 예수 안에 있는 자에게는 결코 정죄함이 없나니",
    },
    translation: TR_BOTH,
    tags: ["grace", "guilt"],
  },
  {
    id: "guilty-003",
    emotion: "guilty",
    reference: ref("Psalm 103:12", "시편 103:12"),
    text: {
      en: "As far as the east is from the west, so far has he removed our transgressions from us.",
      ko: "동이 서에서 먼 것 같이 우리 죄과를 우리에게서 멀리 옮기셨으며",
    },
    translation: TR_BOTH,
    tags: ["forgiveness", "mercy"],
  },
  {
    id: "guilty-004",
    emotion: "guilty",
    reference: mono("Isaiah 1:18"),
    text: mono(
      "'Come now, and let us reason together,' says Yahweh: 'Though your sins be as scarlet, they shall be as white as snow. Though they be red like crimson, they shall be as wool.'",
    ),
    translation: TR_EN_ONLY,
    tags: ["forgiveness", "mercy"],
  },
  {
    id: "guilty-005",
    emotion: "guilty",
    reference: mono("Micah 7:19"),
    text: mono(
      "He will again have compassion on us. He will tread our iniquities under foot; and you will cast all their sins into the depths of the sea.",
    ),
    translation: TR_EN_ONLY,
    tags: ["forgiveness", "mercy"],
  },

  // ───────── ANGRY ─────────
  {
    id: "angry-001",
    emotion: "angry",
    reference: mono("James 1:19–20"),
    text: mono(
      "So, then, my beloved brothers, let every man be swift to hear, slow to speak, and slow to anger; for the anger of man doesn't produce the righteousness of God.",
    ),
    translation: TR_EN_ONLY,
    tags: ["anger", "patience"],
  },
  {
    id: "angry-002",
    emotion: "angry",
    reference: mono("Ephesians 4:26"),
    text: mono(
      "'Be angry, and don't sin.' Don't let the sun go down on your wrath.",
    ),
    translation: TR_EN_ONLY,
    tags: ["anger", "self-control"],
  },
  {
    id: "angry-003",
    emotion: "angry",
    reference: mono("Proverbs 15:1"),
    text: mono(
      "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    ),
    translation: TR_EN_ONLY,
    tags: ["anger", "speech"],
  },
  {
    id: "angry-004",
    emotion: "angry",
    reference: mono("Psalm 4:4"),
    text: mono(
      "Stand in awe, and don't sin. Search your own heart on your bed, and be still.",
    ),
    translation: TR_EN_ONLY,
    tags: ["anger", "stillness"],
  },
  {
    id: "angry-005",
    emotion: "angry",
    reference: mono("Proverbs 14:29"),
    text: mono(
      "He who is slow to anger has great understanding, but he who has a quick temper displays folly.",
    ),
    translation: TR_EN_ONLY,
    tags: ["anger", "wisdom"],
  },

  // ───────── GRATEFUL ─────────
  {
    id: "grateful-001",
    emotion: "grateful",
    reference: ref("1 Thessalonians 5:16–18", "데살로니가전서 5:16–18"),
    text: {
      en: "Always rejoice. Pray without ceasing. In everything give thanks, for this is the will of God in Christ Jesus toward you.",
      ko: "항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라 이는 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라",
    },
    translation: TR_BOTH,
    tags: ["gratitude", "joy"],
  },
  {
    id: "grateful-002",
    emotion: "grateful",
    reference: ref("Psalm 118:24", "시편 118:24"),
    text: {
      en: "This is the day that Yahweh has made. We will rejoice and be glad in it!",
      ko: "이 날은 여호와의 정하신 것이라 이 날에 우리가 즐거워하고 기뻐하리로다",
    },
    translation: TR_BOTH,
    tags: ["gratitude", "today"],
  },
  {
    id: "grateful-003",
    emotion: "grateful",
    reference: ref("James 1:17", "야고보서 1:17"),
    text: {
      en: "Every good gift and every perfect gift is from above, coming down from the Father of lights, with whom can be no variation, nor turning shadow.",
      ko: "각양 좋은 은사와 온전한 선물이 다 위로부터 빛들의 아버지께로서 내려오나니 그는 변함도 없으시고 회전하는 그림자도 없으시니라",
    },
    translation: TR_BOTH,
    tags: ["gratitude", "gift"],
  },
  {
    id: "grateful-004",
    emotion: "grateful",
    reference: mono("Psalm 107:1"),
    text: mono(
      "Give thanks to Yahweh, for he is good, for his loving kindness endures forever.",
    ),
    translation: TR_EN_ONLY,
    tags: ["gratitude", "love"],
  },
  {
    id: "grateful-005",
    emotion: "grateful",
    reference: mono("Colossians 3:17"),
    text: mono(
      "Whatever you do, in word or in deed, do all in the name of the Lord Jesus, giving thanks to God the Father through him.",
    ),
    translation: TR_EN_ONLY,
    tags: ["gratitude", "everyday"],
  },

  // ───────── AFRAID ─────────
  {
    id: "afraid-001",
    emotion: "afraid",
    reference: mono("Psalm 23:4"),
    text: mono(
      "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.",
    ),
    translation: TR_EN_ONLY,
    tags: ["fear", "presence"],
  },
  {
    id: "afraid-002",
    emotion: "afraid",
    reference: mono("2 Timothy 1:7"),
    text: mono(
      "For God didn't give us a spirit of fear, but of power, love, and self-control.",
    ),
    translation: TR_EN_ONLY,
    tags: ["fear", "courage"],
  },
  {
    id: "afraid-003",
    emotion: "afraid",
    reference: mono("Joshua 1:9"),
    text: mono(
      "Haven't I commanded you? Be strong and courageous. Don't be afraid. Don't be dismayed, for Yahweh your God is with you wherever you go.",
    ),
    translation: TR_EN_ONLY,
    tags: ["fear", "courage"],
  },
  {
    id: "afraid-004",
    emotion: "afraid",
    reference: mono("Psalm 27:1"),
    text: mono(
      "Yahweh is my light and my salvation. Whom shall I fear? Yahweh is the strength of my life. Of whom shall I be afraid?",
    ),
    translation: TR_EN_ONLY,
    tags: ["fear", "light"],
  },
  {
    id: "afraid-005",
    emotion: "afraid",
    reference: mono("1 John 4:18"),
    text: mono(
      "There is no fear in love; but perfect love casts out fear, because fear has punishment. He who fears is not made perfect in love.",
    ),
    translation: TR_EN_ONLY,
    tags: ["fear", "love"],
  },

  // ───────── DISCOURAGED ─────────
  {
    id: "discouraged-001",
    emotion: "discouraged",
    reference: mono("Galatians 6:9"),
    text: mono(
      "Let's not be weary in doing good, for we will reap in due season, if we don't give up.",
    ),
    translation: TR_EN_ONLY,
    tags: ["discouragement", "perseverance"],
  },
  {
    id: "discouraged-002",
    emotion: "discouraged",
    reference: mono("Psalm 42:11"),
    text: mono(
      "Why are you in despair, my soul? Why are you disturbed within me? Hope in God! For I shall still praise him, the saving help of my countenance, and my God.",
    ),
    translation: TR_EN_ONLY,
    tags: ["discouragement", "hope"],
  },
  {
    id: "discouraged-003",
    emotion: "discouraged",
    reference: mono("Romans 8:28"),
    text: mono(
      "We know that all things work together for good for those who love God, for those who are called according to his purpose.",
    ),
    translation: TR_EN_ONLY,
    tags: ["discouragement", "purpose"],
  },
  {
    id: "discouraged-004",
    emotion: "discouraged",
    reference: mono("Lamentations 3:22–23"),
    text: mono(
      "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail. They are new every morning. Great is your faithfulness.",
    ),
    translation: TR_EN_ONLY,
    tags: ["discouragement", "morning"],
  },
  {
    id: "discouraged-005",
    emotion: "discouraged",
    reference: mono("2 Corinthians 4:16"),
    text: mono(
      "Therefore we don't faint, but though our outward man is decaying, yet our inward man is renewed day by day.",
    ),
    translation: TR_EN_ONLY,
    tags: ["discouragement", "renewal"],
  },

  // ───────── PEACEFUL ─────────
  {
    id: "peaceful-001",
    emotion: "peaceful",
    reference: mono("Psalm 46:10"),
    text: mono('"Be still, and know that I am God."'),
    translation: TR_EN_ONLY,
    tags: ["peace", "stillness"],
  },
  {
    id: "peaceful-002",
    emotion: "peaceful",
    reference: mono("Isaiah 26:3"),
    text: mono(
      "You will keep whoever's mind is steadfast in perfect peace, because he trusts in you.",
    ),
    translation: TR_EN_ONLY,
    tags: ["peace", "trust"],
  },
  {
    id: "peaceful-003",
    emotion: "peaceful",
    reference: mono("Numbers 6:24–26"),
    text: mono(
      "'Yahweh bless you, and keep you. Yahweh make his face to shine on you, and be gracious to you. Yahweh lift up his face toward you, and give you peace.'",
    ),
    translation: TR_EN_ONLY,
    tags: ["peace", "blessing"],
  },
  {
    id: "peaceful-004",
    emotion: "peaceful",
    reference: mono("Philippians 4:8"),
    text: mono(
      "Whatever things are true, whatever things are honorable, whatever things are just, whatever things are pure, whatever things are lovely, whatever things are of good report — think about these things.",
    ),
    translation: TR_EN_ONLY,
    tags: ["peace", "mind"],
  },
  {
    id: "peaceful-005",
    emotion: "peaceful",
    reference: mono("John 16:33"),
    text: mono(
      "I have told you these things, that in me you may have peace. In the world you have trouble; but cheer up! I have overcome the world.",
    ),
    translation: TR_EN_ONLY,
    tags: ["peace", "victory"],
  },

  // ───────── HOPEFUL ─────────
  {
    id: "hopeful-001",
    emotion: "hopeful",
    reference: ref("Jeremiah 29:11", "예레미야 29:11"),
    text: {
      en: "For I know the thoughts that I think toward you, says Yahweh, thoughts of peace, and not of evil, to give you hope and a future.",
      ko: "나 여호와가 말하노라 너희를 향한 나의 생각은 내가 아나니 재앙이 아니라 곧 평안이요 너희 장래에 소망을 주려하는 생각이라",
    },
    translation: TR_BOTH,
    tags: ["hope", "future"],
  },
  {
    id: "hopeful-002",
    emotion: "hopeful",
    reference: ref("Romans 15:13", "로마서 15:13"),
    text: {
      en: "Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope, in the power of the Holy Spirit.",
      ko: "소망의 하나님이 모든 기쁨과 평강을 믿음 안에서 너희에게 충만케 하사 성령의 능력으로 소망이 넘치게 하시기를 원하노라",
    },
    translation: TR_BOTH,
    tags: ["hope", "joy"],
  },
  {
    id: "hopeful-003",
    emotion: "hopeful",
    reference: ref("Lamentations 3:22–23", "예레미야애가 3:22–23"),
    text: {
      en: "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail. They are new every morning. Great is your faithfulness.",
      ko: "여호와의 자비와 긍휼이 무궁하시므로 우리가 진멸되지 아니함이니이다 이것이 아침마다 새로우니 주의 성실이 크도소이다",
    },
    translation: TR_BOTH,
    tags: ["hope", "morning"],
  },
  {
    id: "hopeful-004",
    emotion: "hopeful",
    reference: mono("Hebrews 11:1"),
    text: mono(
      "Now faith is assurance of things hoped for, proof of things not seen.",
    ),
    translation: TR_EN_ONLY,
    tags: ["hope", "faith"],
  },
  {
    id: "hopeful-005",
    emotion: "hopeful",
    reference: mono("Psalm 130:5"),
    text: mono(
      "I wait for Yahweh. My soul waits. I hope in his word.",
    ),
    translation: TR_EN_ONLY,
    tags: ["hope", "waiting"],
  },
];

export function versesByEmotion(emotion: string): Verse[] {
  return verses.filter((v) => v.emotion === emotion);
}

export function getVerseById(id: string): Verse | undefined {
  return verses.find((v) => v.id === id);
}
