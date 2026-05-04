import type { Verse } from "@/lib/types";

// Seed verses use the World English Bible (WEB) — public domain.
export const verses: Verse[] = [
  // Anxious
  {
    id: "anxious-001",
    emotion: "anxious",
    reference: "Philippians 4:6–7",
    text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.",
    translation: "WEB",
    tags: ["anxiety", "peace", "prayer"],
  },
  {
    id: "anxious-002",
    emotion: "anxious",
    reference: "Matthew 6:34",
    text: "Therefore don't be anxious for tomorrow, for tomorrow will be anxious for itself. Each day's own evil is sufficient.",
    translation: "WEB",
    tags: ["anxiety", "today"],
  },
  {
    id: "anxious-003",
    emotion: "anxious",
    reference: "1 Peter 5:7",
    text: "Casting all your worries on him, because he cares for you.",
    translation: "WEB",
    tags: ["anxiety", "care"],
  },

  // Lonely
  {
    id: "lonely-001",
    emotion: "lonely",
    reference: "Deuteronomy 31:6",
    text: "Be strong and courageous. Don't be afraid or scared of them; for Yahweh your God himself is who goes with you. He will not fail you nor forsake you.",
    translation: "WEB",
    tags: ["loneliness", "presence"],
  },
  {
    id: "lonely-002",
    emotion: "lonely",
    reference: "Psalm 34:18",
    text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.",
    translation: "WEB",
    tags: ["loneliness", "comfort"],
  },
  {
    id: "lonely-003",
    emotion: "lonely",
    reference: "Matthew 28:20",
    text: "Behold, I am with you always, even to the end of the age.",
    translation: "WEB",
    tags: ["loneliness", "presence"],
  },

  // Tired
  {
    id: "tired-001",
    emotion: "tired",
    reference: "Matthew 11:28–29",
    text: "Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and lowly in heart; and you will find rest for your souls.",
    translation: "WEB",
    tags: ["rest", "weariness"],
  },
  {
    id: "tired-002",
    emotion: "tired",
    reference: "Isaiah 40:31",
    text: "But those who wait for Yahweh will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint.",
    translation: "WEB",
    tags: ["strength", "weariness"],
  },
  {
    id: "tired-003",
    emotion: "tired",
    reference: "Psalm 23:1–3",
    text: "Yahweh is my shepherd; I shall lack nothing. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
    translation: "WEB",
    tags: ["rest", "shepherd"],
  },

  // Guilty
  {
    id: "guilty-001",
    emotion: "guilty",
    reference: "1 John 1:9",
    text: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.",
    translation: "WEB",
    tags: ["forgiveness", "guilt"],
  },
  {
    id: "guilty-002",
    emotion: "guilty",
    reference: "Romans 8:1",
    text: "There is therefore now no condemnation to those who are in Christ Jesus, who don't walk according to the flesh, but according to the Spirit.",
    translation: "WEB",
    tags: ["grace", "guilt"],
  },
  {
    id: "guilty-003",
    emotion: "guilty",
    reference: "Psalm 103:12",
    text: "As far as the east is from the west, so far has he removed our transgressions from us.",
    translation: "WEB",
    tags: ["forgiveness", "mercy"],
  },

  // Grateful
  {
    id: "grateful-001",
    emotion: "grateful",
    reference: "1 Thessalonians 5:16–18",
    text: "Always rejoice. Pray without ceasing. In everything give thanks, for this is the will of God in Christ Jesus toward you.",
    translation: "WEB",
    tags: ["gratitude", "joy"],
  },
  {
    id: "grateful-002",
    emotion: "grateful",
    reference: "Psalm 118:24",
    text: "This is the day that Yahweh has made. We will rejoice and be glad in it!",
    translation: "WEB",
    tags: ["gratitude", "today"],
  },
  {
    id: "grateful-003",
    emotion: "grateful",
    reference: "James 1:17",
    text: "Every good gift and every perfect gift is from above, coming down from the Father of lights, with whom can be no variation, nor turning shadow.",
    translation: "WEB",
    tags: ["gratitude", "gift"],
  },

  // Hopeful
  {
    id: "hopeful-001",
    emotion: "hopeful",
    reference: "Jeremiah 29:11",
    text: "For I know the thoughts that I think toward you, says Yahweh, thoughts of peace, and not of evil, to give you hope and a future.",
    translation: "WEB",
    tags: ["hope", "future"],
  },
  {
    id: "hopeful-002",
    emotion: "hopeful",
    reference: "Romans 15:13",
    text: "Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope, in the power of the Holy Spirit.",
    translation: "WEB",
    tags: ["hope", "joy"],
  },
  {
    id: "hopeful-003",
    emotion: "hopeful",
    reference: "Lamentations 3:22–23",
    text: "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail. They are new every morning. Great is your faithfulness.",
    translation: "WEB",
    tags: ["hope", "morning"],
  },
];

export function versesByEmotion(emotion: string): Verse[] {
  return verses.filter((v) => v.emotion === emotion);
}

export function pickVerseForEmotion(emotion: string): Verse | undefined {
  const pool = versesByEmotion(emotion);
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}
