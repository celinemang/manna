import type { LocalizedText, Verse } from "../lib/types";

// EN: NIV-style (public-domain rendering per designer handoff)
// KO: 새번역 / 개역개정
const TR: LocalizedText = { en: "Manna", ko: "만나" };

function ref(en: string, ko: string): LocalizedText { return { en, ko }; }
function txt(en: string, ko: string): LocalizedText { return { en, ko }; }

export const verses: Verse[] = [

  // ───────── ANXIETY 불안 ─────────
  { id: "anxiety-001", emotion: "anxiety",
    reference: ref("Philippians 4:6-7", "빌립보서 4:6-7"),
    text: txt("Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", "아무것도 염려하지 말고, 모든 일에 감사하는 마음으로 기도하고 간구하면서, 여러분이 바라는 것을 하나님께 아뢰십시오."),
    translation: TR, tags: ["anxiety","peace","prayer"] },
  { id: "anxiety-002", emotion: "anxiety",
    reference: ref("Isaiah 41:10", "이사야 41:10"),
    text: txt("So do not fear, for I am with you; do not be dismayed, for I am your God.", "내가 너와 함께 있으니 두려워하지 말아라. 내가 너의 하나님이니 떨지 말아라."),
    translation: TR, tags: ["fear","presence"] },
  { id: "anxiety-003", emotion: "anxiety",
    reference: ref("1 Peter 5:7", "베드로전서 5:7"),
    text: txt("Cast all your anxiety on him because he cares for you.", "여러분의 모든 염려를 주님께 맡기십시오. 주님께서 여러분을 돌보십니다."),
    translation: TR, tags: ["trust","care"] },
  { id: "anxiety-004", emotion: "anxiety",
    reference: ref("John 14:27", "요한복음 14:27"),
    text: txt("Peace I leave with you; my peace I give you. Do not let your hearts be troubled and do not be afraid.", "나는 평화를 너희에게 남겨 준다. 내 평화를 너희에게 준다. 너희는 마음에 근심하지도 말고, 두려워하지도 말아라."),
    translation: TR, tags: ["peace","comfort"] },
  { id: "anxiety-005", emotion: "anxiety",
    reference: ref("Psalm 94:19", "시편 94:19"),
    text: txt("When anxiety was great within me, your consolation brought me joy.", "내 마음 속 근심이 많을 때에, 주님의 위로가 내 영혼을 즐겁게 합니다."),
    translation: TR, tags: ["consolation","joy"] },

  // ───────── SADNESS 우울한 마음 ─────────
  { id: "sadness-001", emotion: "sadness",
    reference: ref("Psalm 34:18", "시편 34:18"),
    text: txt("The Lord is close to the brokenhearted and saves those who are crushed in spirit.", "주님은 마음이 상한 사람에게 가까이 계시고, 영이 짓밟힌 사람을 구원해 주신다."),
    translation: TR, tags: ["comfort","nearness"] },
  { id: "sadness-002", emotion: "sadness",
    reference: ref("Matthew 5:4", "마태복음 5:4"),
    text: txt("Blessed are those who mourn, for they will be comforted.", "슬퍼하는 사람은 복이 있다, 그들은 위로를 받을 것이다."),
    translation: TR, tags: ["grief","comfort"] },
  { id: "sadness-003", emotion: "sadness",
    reference: ref("2 Corinthians 4:16", "고린도후서 4:16"),
    text: txt("Therefore we do not lose heart. Though outwardly we are wasting away, yet inwardly we are being renewed day by day.", "그러므로 우리는 낙심하지 않습니다. 우리의 겉사람은 낡아지지만, 우리의 속사람은 날로 새로워집니다."),
    translation: TR, tags: ["renewal","perseverance"] },
  { id: "sadness-004", emotion: "sadness",
    reference: ref("Psalm 42:11", "시편 42:11"),
    text: txt("Why, my soul, are you downcast? Put your hope in God, for I will yet praise him.", "내 영혼아, 어찌하여 네가 낙심하느냐. 너는 하나님을 기다려라. 나는 여전히 그를 찬송하리라."),
    translation: TR, tags: ["hope","soul"] },
  { id: "sadness-005", emotion: "sadness",
    reference: ref("Isaiah 43:2", "이사야 43:2"),
    text: txt("When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.", "네가 물 가운데를 건널 때에, 내가 너와 함께 할 것이다. 강을 건널 때에, 강물이 너를 삼키지 못할 것이다."),
    translation: TR, tags: ["presence","trial"] },

  // ───────── CONFIDENCE 자신감 ─────────
  { id: "confidence-001", emotion: "confidence",
    reference: ref("Philippians 4:13", "빌립보서 4:13"),
    text: txt("I can do all this through him who gives me strength.", "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라."),
    translation: TR, tags: ["strength","possibility"] },
  { id: "confidence-002", emotion: "confidence",
    reference: ref("2 Timothy 1:7", "디모데후서 1:7"),
    text: txt("For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", "하나님께서는 우리에게 두려워하는 마음을 주신 것이 아니라, 능력과 사랑과 절제하는 마음을 주셨습니다."),
    translation: TR, tags: ["power","spirit"] },
  { id: "confidence-003", emotion: "confidence",
    reference: ref("Isaiah 40:31", "이사야 40:31"),
    text: txt("But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", "주님을 기다리는 사람은 새 힘을 얻을 것이며, 독수리처럼 날개치며 솟아오를 것이다."),
    translation: TR, tags: ["hope","renewal"] },
  { id: "confidence-004", emotion: "confidence",
    reference: ref("Romans 8:31", "로마서 8:31"),
    text: txt("If God is for us, who can be against us?", "하나님이 우리 편이시면, 누가 우리를 대적할 수 있겠습니까?"),
    translation: TR, tags: ["victory","faith"] },
  { id: "confidence-005", emotion: "confidence",
    reference: ref("Joshua 1:9", "여호수아 1:9"),
    text: txt("Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", "강하고 담대하여라. 두려워하거나 낙담하지 말아라. 네가 어디로 가든지, 주 너의 하나님이 너와 함께 하신다."),
    translation: TR, tags: ["courage","presence"] },

  // ───────── LOVE 자신을 사랑하기 ─────────
  { id: "love-001", emotion: "love",
    reference: ref("Psalm 139:14", "시편 139:14"),
    text: txt("I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.", "내가 주님을 찬양하는 것은, 그 빚어 주심이 신묘하고 기이하기 때문입니다. 주님의 솜씨가 놀랍습니다."),
    translation: TR, tags: ["identity","wonder"] },
  { id: "love-002", emotion: "love",
    reference: ref("1 John 4:19", "요한일서 4:19"),
    text: txt("We love because he first loved us.", "우리가 사랑하는 것은 하나님이 먼저 우리를 사랑하셨기 때문입니다."),
    translation: TR, tags: ["love","foundation"] },
  { id: "love-003", emotion: "love",
    reference: ref("Ephesians 2:10", "에베소서 2:10"),
    text: txt("For we are God's handiwork, created in Christ Jesus to do good works.", "우리는 하나님의 작품입니다. 선한 일을 하도록 그리스도 예수 안에서 창조되었습니다."),
    translation: TR, tags: ["identity","purpose"] },
  { id: "love-004", emotion: "love",
    reference: ref("Romans 8:1", "로마서 8:1"),
    text: txt("Therefore, there is now no condemnation for those who are in Christ Jesus.", "그러므로 그리스도 예수 안에 있는 사람들은 결코 정죄를 받지 않습니다."),
    translation: TR, tags: ["grace","freedom"] },
  { id: "love-005", emotion: "love",
    reference: ref("Romans 8:38-39", "로마서 8:38-39"),
    text: txt("Neither death nor life, neither angels nor demons, will be able to separate us from the love of God.", "사망이나 생명이나, 어떤 피조물도 우리를 우리 주 예수 그리스도 안에 있는 하나님의 사랑에서 끊을 수 없습니다."),
    translation: TR, tags: ["love","security"] },

  // ───────── RELEASE 내려놓기 ─────────
  { id: "release-001", emotion: "release",
    reference: ref("Matthew 11:28", "마태복음 11:28"),
    text: txt("Come to me, all you who are weary and burdened, and I will give you rest.", "수고하며 무거운 짐을 진 사람들아, 모두 내게로 오너라. 내가 너희를 쉬게 하겠다."),
    translation: TR, tags: ["rest","surrender"] },
  { id: "release-002", emotion: "release",
    reference: ref("Psalm 46:10", "시편 46:10"),
    text: txt("Be still, and know that I am God.", "너희는 잠잠히 있어라. 내가 하나님임을 알아라."),
    translation: TR, tags: ["stillness","trust"] },
  { id: "release-003", emotion: "release",
    reference: ref("Proverbs 3:5-6", "잠언 3:5-6"),
    text: txt("Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him.", "마음을 다하여 주님을 신뢰하고, 자신의 명철을 의지하지 마라. 너의 모든 길에서 그분을 인정하면, 그분이 너의 길을 평탄하게 하실 것이다."),
    translation: TR, tags: ["trust","surrender"] },
  { id: "release-004", emotion: "release",
    reference: ref("Lamentations 3:22-23", "예레미야애가 3:22-23"),
    text: txt("Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning.", "주님의 인자하심이 끝이 없고 그의 자비가 다함이 없기에, 우리가 멸망하지 않는다. 주의 자비는 아침마다 새롭다."),
    translation: TR, tags: ["mercy","renewal"] },
  { id: "release-005", emotion: "release",
    reference: ref("Isaiah 26:3", "이사야 26:3"),
    text: txt("You will keep in perfect peace those whose minds are steadfast, because they trust in you.", "주님을 의지하는 그 마음이 한결같으니, 주님은 그를 평화에 평화로 지켜 주십니다."),
    translation: TR, tags: ["peace","steadfast"] },

  // ───────── STRENGTH 힘이 되는 말씀 ─────────
  { id: "strength-001", emotion: "strength",
    reference: ref("Jeremiah 29:11", "예레미야 29:11"),
    text: txt("For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future.", "내가 너희를 두고 세운 계획은 내가 잘 안다. 그것은 재앙이 아니라 너희에게 평안을 주려는 것이며, 너희에게 미래와 희망을 주려는 것이다."),
    translation: TR, tags: ["hope","future"] },
  { id: "strength-002", emotion: "strength",
    reference: ref("Romans 8:28", "로마서 8:28"),
    text: txt("And we know that in all things God works for the good of those who love him.", "하나님을 사랑하는 사람들에게는, 모든 일이 합력하여 선을 이룬다는 것을 우리는 압니다."),
    translation: TR, tags: ["providence","trust"] },
  { id: "strength-003", emotion: "strength",
    reference: ref("Romans 15:13", "로마서 15:13"),
    text: txt("May the God of hope fill you with all joy and peace as you trust in him.", "소망의 하나님께서 믿음에서 오는 모든 기쁨과 평화를 여러분에게 충만히 채워 주시기를."),
    translation: TR, tags: ["hope","joy"] },
  { id: "strength-004", emotion: "strength",
    reference: ref("Hebrews 11:1", "히브리서 11:1"),
    text: txt("Now faith is confidence in what we hope for and assurance about what we do not see.", "믿음은 바라는 것들의 확신이요, 보이지 않는 것들의 증거입니다."),
    translation: TR, tags: ["faith","hope"] },
  { id: "strength-005", emotion: "strength",
    reference: ref("Galatians 6:9", "갈라디아서 6:9"),
    text: txt("Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", "선한 일을 하다가 낙심하지 맙시다. 지치지 않으면, 때가 이를 때에 거두게 될 것입니다."),
    translation: TR, tags: ["perseverance","harvest"] },
];

export function versesByEmotion(emotion: string): Verse[] {
  return verses.filter((v) => v.emotion === emotion);
}

export function getVerseById(id: string): Verse | undefined {
  return verses.find((v) => v.id === id);
}
