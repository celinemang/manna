import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import { getVerseById } from "@manna/shared/data/verses";
import { isLocale, type Locale } from "@manna/shared/i18n/config";
import type { EmotionId } from "@manna/shared/lib/types";

export const runtime = "nodejs";

const RequestSchema = z.object({
  verseId: z.string(),
  emotion: z.enum([
    "anxious",
    "lonely",
    "tired",
    "guilty",
    "grateful",
    "hopeful",
  ]),
  locale: z.enum(["en", "ko"]),
});

const DevotionSchema = z.object({
  reflection: z.string(),
  prayer: z.string(),
  actionStep: z.string(),
});

const SYSTEM_PROMPT = `You are a warm Christian devotional assistant for an app called Manna.

Generate a short devotional reflection, prayer, and action step grounded in the
provided Bible verse and the user's selected emotion.

Strict rules:
- Do NOT invent or quote any Bible verse other than the one provided.
- Do NOT make doctrinal claims that go beyond what the verse plainly says.
- Use a warm, gentle, pastoral tone. Never shame the user.
- Do NOT diagnose mental health conditions or replace counseling, medical
  care, or pastoral care.
- Reflection: 3–5 sentences.
- Prayer: 3–5 sentences, addressed to God in the first person plural ("we") or
  singular ("I"), as feels natural.
- Action step: ONE practical, gentle sentence the user can do today.
- Write in the requested output language exactly.

Return JSON matching the schema. No preamble, no markdown.`;

function buildUserPrompt(args: {
  emotion: EmotionId;
  reference: string;
  text: string;
  locale: Locale;
}) {
  const language = args.locale === "ko" ? "Korean (한국어)" : "English";
  return `Output language: ${language}

User emotion: ${args.emotion}

Bible verse reference: ${args.reference}
Bible verse text: "${args.text}"

Generate the reflection, prayer, and action step in ${language}.`;
}

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Server is not configured for AI devotions yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { verseId, emotion, locale } = parsed.data;
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }

  const verse = getVerseById(verseId);
  if (!verse || verse.emotion !== emotion) {
    return NextResponse.json({ error: "verse_not_found" }, { status: 404 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: buildUserPrompt({
        emotion,
        reference: verse.reference[locale],
        text: verse.text[locale],
        locale,
      }),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reflection: { type: Type.STRING },
            prayer: { type: Type.STRING },
            actionStep: { type: Type.STRING },
          },
          required: ["reflection", "prayer", "actionStep"],
          propertyOrdering: ["reflection", "prayer", "actionStep"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      return NextResponse.json({ error: "no_output" }, { status: 502 });
    }

    const json = JSON.parse(text);
    const validated = DevotionSchema.safeParse(json);
    if (!validated.success) {
      return NextResponse.json({ error: "invalid_output" }, { status: 502 });
    }

    return NextResponse.json(validated.data);
  } catch (err) {
    console.error("[/api/devotion] Gemini error:", err);
    return NextResponse.json({ error: "gemini_error" }, { status: 502 });
  }
}
