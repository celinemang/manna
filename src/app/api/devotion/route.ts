import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { getVerseById } from "@/data/verses";
import { isLocale, type Locale } from "@/i18n/config";
import type { EmotionId } from "@/lib/types";

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
  if (!process.env.ANTHROPIC_API_KEY) {
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

  const client = new Anthropic();

  try {
    const response = await client.messages.parse({
      model: "claude-opus-4-7",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      thinking: { type: "adaptive" },
      output_config: {
        format: zodOutputFormat(DevotionSchema),
        effort: "low",
      },
      messages: [
        {
          role: "user",
          content: buildUserPrompt({
            emotion,
            reference: verse.reference[locale],
            text: verse.text[locale],
            locale,
          }),
        },
      ],
    });

    if (!response.parsed_output) {
      return NextResponse.json(
        { error: "no_parsed_output" },
        { status: 502 },
      );
    }

    return NextResponse.json(response.parsed_output);
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: "anthropic_error", status: err.status },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: "unknown" }, { status: 500 });
  }
}
