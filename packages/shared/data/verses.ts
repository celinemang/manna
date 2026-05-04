import type { LocalizedText, Verse } from "../lib/types";

// Bilingual launch — EN (NIV-style public-domain rendering per designer's
// handoff) + KO (새번역 / 개역개정 mix). The user-facing language toggle
// is enabled and the device locale auto-selects KO on first launch.
const TR: LocalizedText = { en: "Manna", ko: "만나" };

function ref(en: string, ko: string): LocalizedText {
  return { en, ko };
}

export const verses: Verse[] = [
  // ───────── ANXIOUS ─────────
  {
    id: "anxious-001",
    emotion: "anxious",
    reference: ref("Philippians 4:6-7", "빌립보서 4:6-7"),
    text: {
      en: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      ko: "아무것도 염려하지 말고, 모든 일에 감사하는 마음으로 기도하고 간구하면서, 여러분이 바라는 것을 하나님께 아뢰십시오.",
    },
    translation: TR,
    tags: ["anxiety","peace"],
  },
  {
    id: "anxious-002",
    emotion: "anxious",
    reference: ref("Isaiah 41:10", "이사야 41:10"),
    text: {
      en: "So do not fear, for I am with you; do not be dismayed, for I am your God.",
      ko: "내가 너와 함께 있으니 두려워하지 말아라. 내가 너의 하나님이니 떨지 말아라.",
    },
    translation: TR,
    tags: ["anxiety","peace"],
  },
  {
    id: "anxious-003",
    emotion: "anxious",
    reference: ref("1 Peter 5:7", "베드로전서 5:7"),
    text: {
      en: "Cast all your anxiety on him because he cares for you.",
      ko: "여러분의 모든 염려를 주님께 맡기십시오. 주님께서 여러분을 돌보십니다.",
    },
    translation: TR,
    tags: ["anxiety","peace"],
  },
  {
    id: "anxious-004",
    emotion: "anxious",
    reference: ref("John 14:27", "요한복음 14:27"),
    text: {
      en: "Peace I leave with you; my peace I give you. Do not let your hearts be troubled and do not be afraid.",
      ko: "나는 평화를 너희에게 남겨 준다. 내 평화를 너희에게 준다. 너희는 마음에 근심하지도 말고, 두려워하지도 말아라.",
    },
    translation: TR,
    tags: ["anxiety","peace"],
  },
  {
    id: "anxious-005",
    emotion: "anxious",
    reference: ref("Psalm 94:19", "시편 94:19"),
    text: {
      en: "When anxiety was great within me, your consolation brought me joy.",
      ko: "내 마음 속 근심이 많을 때에, 주님의 위로가 내 영혼을 즐겁게 합니다.",
    },
    translation: TR,
    tags: ["anxiety","peace"],
  },
  // ───────── LONELY ─────────
  {
    id: "lonely-001",
    emotion: "lonely",
    reference: ref("Matthew 28:20", "마태복음 28:20"),
    text: {
      en: "And surely I am with you always, to the very end of the age.",
      ko: "내가 세상 끝날까지 항상 너희와 함께 있을 것이다.",
    },
    translation: TR,
    tags: ["loneliness","presence"],
  },
  {
    id: "lonely-002",
    emotion: "lonely",
    reference: ref("Deuteronomy 31:6", "신명기 31:6"),
    text: {
      en: "Be strong and courageous… for the Lord your God goes with you; he will never leave you nor forsake you.",
      ko: "강하고 담대하여라. 주 너의 하나님이 너와 함께 가시며, 너를 떠나지도 버리지도 않으신다.",
    },
    translation: TR,
    tags: ["loneliness","presence"],
  },
  {
    id: "lonely-003",
    emotion: "lonely",
    reference: ref("Psalm 34:18", "시편 34:18"),
    text: {
      en: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
      ko: "주님은 마음이 상한 사람에게 가까이 계시고, 영이 짓밟힌 사람을 구원해 주신다.",
    },
    translation: TR,
    tags: ["loneliness","presence"],
  },
  {
    id: "lonely-004",
    emotion: "lonely",
    reference: ref("Psalm 68:6", "시편 68:6"),
    text: {
      en: "God sets the lonely in families, he leads out the prisoners with singing.",
      ko: "하나님은 외로운 사람들을 가족 안에 두시고, 갇힌 자들을 노래 가운데 이끌어 내신다.",
    },
    translation: TR,
    tags: ["loneliness","presence"],
  },
  {
    id: "lonely-005",
    emotion: "lonely",
    reference: ref("Hebrews 13:5", "히브리서 13:5"),
    text: {
      en: "Never will I leave you; never will I forsake you.",
      ko: "내가 결코 너를 떠나지도 않고 버리지도 않으리라.",
    },
    translation: TR,
    tags: ["loneliness","presence"],
  },
  // ───────── TIRED ─────────
  {
    id: "tired-001",
    emotion: "tired",
    reference: ref("Matthew 11:28", "마태복음 11:28"),
    text: {
      en: "Come to me, all you who are weary and burdened, and I will give you rest.",
      ko: "수고하며 무거운 짐을 진 사람들아, 모두 내게로 오너라. 내가 너희를 쉬게 하겠다.",
    },
    translation: TR,
    tags: ["weariness","rest"],
  },
  {
    id: "tired-002",
    emotion: "tired",
    reference: ref("Isaiah 40:31", "이사야 40:31"),
    text: {
      en: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
      ko: "주님을 기다리는 사람은 새 힘을 얻을 것이며, 독수리처럼 날개치며 솟아오를 것이다.",
    },
    translation: TR,
    tags: ["weariness","rest"],
  },
  {
    id: "tired-003",
    emotion: "tired",
    reference: ref("Psalm 23:1-2", "시편 23:1-2"),
    text: {
      en: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures.",
      ko: "주님은 나의 목자, 내게 부족함 없어라. 그는 푸른 풀밭에 나를 누이신다.",
    },
    translation: TR,
    tags: ["weariness","rest"],
  },
  {
    id: "tired-004",
    emotion: "tired",
    reference: ref("Exodus 33:14", "출애굽기 33:14"),
    text: {
      en: "My Presence will go with you, and I will give you rest.",
      ko: "내가 친히 너와 함께 가며, 너를 쉬게 하겠다.",
    },
    translation: TR,
    tags: ["weariness","rest"],
  },
  {
    id: "tired-005",
    emotion: "tired",
    reference: ref("Psalm 62:1", "시편 62:1"),
    text: {
      en: "Truly my soul finds rest in God; my salvation comes from him.",
      ko: "나의 영혼이 잠잠히 하나님만 바람이여, 나의 구원이 그에게서 나오는도다.",
    },
    translation: TR,
    tags: ["weariness","rest"],
  },
  // ───────── GUILTY ─────────
  {
    id: "guilty-001",
    emotion: "guilty",
    reference: ref("Romans 8:1", "로마서 8:1"),
    text: {
      en: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
      ko: "그러므로 그리스도 예수 안에 있는 사람들은 결코 정죄를 받지 않습니다.",
    },
    translation: TR,
    tags: ["forgiveness","shame"],
  },
  {
    id: "guilty-002",
    emotion: "guilty",
    reference: ref("1 John 1:9", "요한일서 1:9"),
    text: {
      en: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us.",
      ko: "우리가 우리의 죄를 자백하면, 그분은 신실하시고 의로우셔서 우리 죄를 용서하시고 모든 불의에서 우리를 깨끗하게 해 주십니다.",
    },
    translation: TR,
    tags: ["forgiveness","shame"],
  },
  {
    id: "guilty-003",
    emotion: "guilty",
    reference: ref("Psalm 103:12", "시편 103:12"),
    text: {
      en: "As far as the east is from the west, so far has he removed our transgressions from us.",
      ko: "동쪽이 서쪽에서 먼 것 같이, 우리의 죄를 우리에게서 멀리 옮겨 주셨다.",
    },
    translation: TR,
    tags: ["forgiveness","shame"],
  },
  {
    id: "guilty-004",
    emotion: "guilty",
    reference: ref("Isaiah 1:18", "이사야 1:18"),
    text: {
      en: "Though your sins are like scarlet, they shall be as white as snow.",
      ko: "너희의 죄가 주홍빛 같다 하여도 눈과 같이 희어질 것이다.",
    },
    translation: TR,
    tags: ["forgiveness","shame"],
  },
  {
    id: "guilty-005",
    emotion: "guilty",
    reference: ref("Micah 7:19", "미가 7:19"),
    text: {
      en: "You will again have compassion on us; you will tread our sins underfoot.",
      ko: "주께서 다시 우리를 불쌍히 여기시며, 우리의 죄악을 발 아래에 밟으실 것입니다.",
    },
    translation: TR,
    tags: ["forgiveness","shame"],
  },
  // ───────── ANGRY ─────────
  {
    id: "angry-001",
    emotion: "angry",
    reference: ref("James 1:19-20", "야고보서 1:19-20"),
    text: {
      en: "Everyone should be quick to listen, slow to speak and slow to become angry.",
      ko: "누구든지 듣기는 빨리 하고, 말하기는 더디 하며, 노하기도 더디 해야 합니다.",
    },
    translation: TR,
    tags: ["anger","patience"],
  },
  {
    id: "angry-002",
    emotion: "angry",
    reference: ref("Ephesians 4:26", "에베소서 4:26"),
    text: {
      en: "In your anger do not sin: do not let the sun go down while you are still angry.",
      ko: "화가 나더라도, 죄를 짓는 데까지 이르지 않도록 하십시오. 해가 지도록 노여움을 품고 있지 마십시오.",
    },
    translation: TR,
    tags: ["anger","patience"],
  },
  {
    id: "angry-003",
    emotion: "angry",
    reference: ref("Proverbs 15:1", "잠언 15:1"),
    text: {
      en: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
      ko: "부드러운 대답은 분노를 가라앉히지만, 거친 말은 노를 격동시킨다.",
    },
    translation: TR,
    tags: ["anger","patience"],
  },
  {
    id: "angry-004",
    emotion: "angry",
    reference: ref("Psalm 4:4", "시편 4:4"),
    text: {
      en: "Tremble and do not sin; when you are on your beds, search your hearts and be silent.",
      ko: "떨면서 죄를 짓지 말아라. 잠자리에 누워서도 마음 속으로 말하고, 잠잠하라.",
    },
    translation: TR,
    tags: ["anger","patience"],
  },
  {
    id: "angry-005",
    emotion: "angry",
    reference: ref("Proverbs 14:29", "잠언 14:29"),
    text: {
      en: "Whoever is patient has great understanding, but one who is quick-tempered displays folly.",
      ko: "노하기를 더디 하는 사람은 크게 명철하지만, 성격이 조급한 사람은 어리석음을 드러낸다.",
    },
    translation: TR,
    tags: ["anger","patience"],
  },
  // ───────── GRATEFUL ─────────
  {
    id: "grateful-001",
    emotion: "grateful",
    reference: ref("1 Thessalonians 5:16-18", "데살로니가전서 5:16-18"),
    text: {
      en: "Rejoice always, pray continually, give thanks in all circumstances.",
      ko: "항상 기뻐하십시오. 끊임없이 기도하십시오. 모든 일에 감사하십시오.",
    },
    translation: TR,
    tags: ["gratitude","thanksgiving"],
  },
  {
    id: "grateful-002",
    emotion: "grateful",
    reference: ref("Psalm 107:1", "시편 107:1"),
    text: {
      en: "Give thanks to the Lord, for he is good; his love endures forever.",
      ko: "주님께 감사하여라. 그는 선하시며, 그의 인자하심이 영원하다.",
    },
    translation: TR,
    tags: ["gratitude","thanksgiving"],
  },
  {
    id: "grateful-003",
    emotion: "grateful",
    reference: ref("James 1:17", "야고보서 1:17"),
    text: {
      en: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights.",
      ko: "온갖 좋은 선물과 모든 완전한 은사는 다 위에서 오는 것이며, 빛들의 아버지께로부터 내려옵니다.",
    },
    translation: TR,
    tags: ["gratitude","thanksgiving"],
  },
  {
    id: "grateful-004",
    emotion: "grateful",
    reference: ref("Colossians 3:17", "골로새서 3:17"),
    text: {
      en: "Whatever you do, whether in word or deed, do it all in the name of the Lord, giving thanks to God.",
      ko: "말이든지 행동이든지, 무엇을 하든지, 모든 것을 주 예수의 이름으로 하고, 그분으로 말미암아 하나님 아버지께 감사를 드리십시오.",
    },
    translation: TR,
    tags: ["gratitude","thanksgiving"],
  },
  {
    id: "grateful-005",
    emotion: "grateful",
    reference: ref("Psalm 100:4", "시편 100:4"),
    text: {
      en: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
      ko: "감사함으로 그분의 문에 들어가며, 찬송함으로 그분의 뜰에 들어가서, 그분께 감사하며 그 이름을 송축하여라.",
    },
    translation: TR,
    tags: ["gratitude","thanksgiving"],
  },
  // ───────── AFRAID ─────────
  {
    id: "afraid-001",
    emotion: "afraid",
    reference: ref("Psalm 23:4", "시편 23:4"),
    text: {
      en: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.",
      ko: "내가 비록 죽음의 그늘 골짜기로 다닐지라도, 주께서 나와 함께 계시니, 두려워하지 않을 것입니다.",
    },
    translation: TR,
    tags: ["fear","courage"],
  },
  {
    id: "afraid-002",
    emotion: "afraid",
    reference: ref("2 Timothy 1:7", "디모데후서 1:7"),
    text: {
      en: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
      ko: "하나님께서는 우리에게 두려워하는 마음을 주신 것이 아니라, 능력과 사랑과 절제하는 마음을 주셨습니다.",
    },
    translation: TR,
    tags: ["fear","courage"],
  },
  {
    id: "afraid-003",
    emotion: "afraid",
    reference: ref("Joshua 1:9", "여호수아 1:9"),
    text: {
      en: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you.",
      ko: "강하고 담대하여라. 두려워하거나 낙담하지 말아라. 네가 어디로 가든지, 주 너의 하나님이 너와 함께 하신다.",
    },
    translation: TR,
    tags: ["fear","courage"],
  },
  {
    id: "afraid-004",
    emotion: "afraid",
    reference: ref("Psalm 27:1", "시편 27:1"),
    text: {
      en: "The Lord is my light and my salvation — whom shall I fear?",
      ko: "주님은 나의 빛, 나의 구원이시니, 내가 누구를 두려워하랴.",
    },
    translation: TR,
    tags: ["fear","courage"],
  },
  {
    id: "afraid-005",
    emotion: "afraid",
    reference: ref("1 John 4:18", "요한일서 4:18"),
    text: {
      en: "There is no fear in love. But perfect love drives out fear.",
      ko: "사랑 안에는 두려움이 없습니다. 완전한 사랑은 두려움을 내쫓습니다.",
    },
    translation: TR,
    tags: ["fear","courage"],
  },
  // ───────── DISCOURAGED ─────────
  {
    id: "discouraged-001",
    emotion: "discouraged",
    reference: ref("Galatians 6:9", "갈라디아서 6:9"),
    text: {
      en: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
      ko: "선한 일을 하다가 낙심하지 맙시다. 지치지 않으면, 때가 이를 때에 거두게 될 것입니다.",
    },
    translation: TR,
    tags: ["discouragement","perseverance"],
  },
  {
    id: "discouraged-002",
    emotion: "discouraged",
    reference: ref("Psalm 42:11", "시편 42:11"),
    text: {
      en: "Why, my soul, are you downcast? Put your hope in God, for I will yet praise him.",
      ko: "내 영혼아, 어찌하여 네가 낙심하느냐. 너는 하나님을 기다려라. 나는 여전히 그를 찬송하리라.",
    },
    translation: TR,
    tags: ["discouragement","perseverance"],
  },
  {
    id: "discouraged-003",
    emotion: "discouraged",
    reference: ref("Romans 8:28", "로마서 8:28"),
    text: {
      en: "And we know that in all things God works for the good of those who love him.",
      ko: "하나님을 사랑하는 사람들에게는, 모든 일이 합력하여 선을 이룬다는 것을 우리는 압니다.",
    },
    translation: TR,
    tags: ["discouragement","perseverance"],
  },
  {
    id: "discouraged-004",
    emotion: "discouraged",
    reference: ref("Lamentations 3:22-23", "예레미야애가 3:22-23"),
    text: {
      en: "Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning.",
      ko: "주님의 인자하심이 끝이 없고 그의 자비가 다함이 없기에, 우리가 멸망하지 않는다. 주의 자비는 아침마다 새롭다.",
    },
    translation: TR,
    tags: ["discouragement","perseverance"],
  },
  {
    id: "discouraged-005",
    emotion: "discouraged",
    reference: ref("2 Corinthians 4:16", "고린도후서 4:16"),
    text: {
      en: "Therefore we do not lose heart. Though outwardly we are wasting away, inwardly we are being renewed day by day.",
      ko: "그러므로 우리는 낙심하지 않습니다. 우리의 겉사람은 낡아지지만, 우리의 속사람은 날로 새로워집니다.",
    },
    translation: TR,
    tags: ["discouragement","perseverance"],
  },
  // ───────── PEACEFUL ─────────
  {
    id: "peaceful-001",
    emotion: "peaceful",
    reference: ref("Psalm 46:10", "시편 46:10"),
    text: {
      en: "Be still, and know that I am God.",
      ko: "너희는 잠잠히 있어라. 내가 하나님임을 알아라.",
    },
    translation: TR,
    tags: ["peace","stillness"],
  },
  {
    id: "peaceful-002",
    emotion: "peaceful",
    reference: ref("Isaiah 26:3", "이사야 26:3"),
    text: {
      en: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
      ko: "주님을 의지하는 그 마음이 한결같으니, 주님은 그를 평화에 평화로 지켜 주십니다.",
    },
    translation: TR,
    tags: ["peace","stillness"],
  },
  {
    id: "peaceful-003",
    emotion: "peaceful",
    reference: ref("Numbers 6:24-26", "민수기 6:24-26"),
    text: {
      en: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.",
      ko: "주님께서 너에게 복을 주시고, 너를 지켜 주시며, 그 얼굴을 너에게 비추시고, 너에게 은혜를 베푸시기를.",
    },
    translation: TR,
    tags: ["peace","stillness"],
  },
  {
    id: "peaceful-004",
    emotion: "peaceful",
    reference: ref("Philippians 4:8", "빌립보서 4:8"),
    text: {
      en: "Whatever is true, whatever is noble, whatever is right — think about such things.",
      ko: "무엇이든지 참된 것과 무엇이든지 경건한 것과 무엇이든지 옳은 것을 생각하십시오.",
    },
    translation: TR,
    tags: ["peace","stillness"],
  },
  {
    id: "peaceful-005",
    emotion: "peaceful",
    reference: ref("John 16:33", "요한복음 16:33"),
    text: {
      en: "I have told you these things, so that in me you may have peace.",
      ko: "내가 너희에게 이 말을 한 것은, 너희가 내 안에서 평안을 얻게 하려는 것이다.",
    },
    translation: TR,
    tags: ["peace","stillness"],
  },
  // ───────── HOPEFUL ─────────
  {
    id: "hopeful-001",
    emotion: "hopeful",
    reference: ref("Jeremiah 29:11", "예레미야 29:11"),
    text: {
      en: "For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future.",
      ko: "내가 너희를 두고 세운 계획은 내가 잘 안다. 그것은 재앙이 아니라 곧 너희에게 평안을 주려는 것이며, 너희에게 미래와 희망을 주려는 것이다.",
    },
    translation: TR,
    tags: ["hope","future"],
  },
  {
    id: "hopeful-002",
    emotion: "hopeful",
    reference: ref("Romans 15:13", "로마서 15:13"),
    text: {
      en: "May the God of hope fill you with all joy and peace as you trust in him.",
      ko: "소망의 하나님께서 믿음에서 오는 모든 기쁨과 평화를 여러분에게 충만히 채워 주시기를.",
    },
    translation: TR,
    tags: ["hope","future"],
  },
  {
    id: "hopeful-003",
    emotion: "hopeful",
    reference: ref("Hebrews 11:1", "히브리서 11:1"),
    text: {
      en: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      ko: "믿음은 바라는 것들의 확신이요, 보이지 않는 것들의 증거입니다.",
    },
    translation: TR,
    tags: ["hope","future"],
  },
  {
    id: "hopeful-004",
    emotion: "hopeful",
    reference: ref("Psalm 130:5", "시편 130:5"),
    text: {
      en: "I wait for the Lord, my whole being waits, and in his word I put my hope.",
      ko: "나는 주님을 기다린다. 내 영혼이 주님을 기다리니, 나는 주님의 말씀에 소망을 둔다.",
    },
    translation: TR,
    tags: ["hope","future"],
  },
  {
    id: "hopeful-005",
    emotion: "hopeful",
    reference: ref("Romans 5:5", "로마서 5:5"),
    text: {
      en: "And hope does not put us to shame, because God’s love has been poured out into our hearts.",
      ko: "소망은 우리를 부끄럽게 하지 않습니다. 하나님께서 우리에게 주신 성령으로 우리 마음에 그분의 사랑을 부어 주셨기 때문입니다.",
    },
    translation: TR,
    tags: ["hope","future"],
  },
];

export function versesByEmotion(emotion: string): Verse[] {
  return verses.filter((v) => v.emotion === emotion);
}

export function getVerseById(id: string): Verse | undefined {
  return verses.find((v) => v.id === id);
}
