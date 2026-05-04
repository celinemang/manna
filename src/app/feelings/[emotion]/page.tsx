import { notFound } from "next/navigation";
import Link from "next/link";
import { emotions } from "@/data/emotions";
import { versesByEmotion } from "@/data/verses";
import { EmotionResult } from "./EmotionResult";

export default async function EmotionPage({
  params,
}: {
  params: Promise<{ emotion: string }>;
}) {
  const { emotion } = await params;
  const meta = emotions.find((e) => e.id === emotion);
  const pool = versesByEmotion(emotion);
  if (!meta || pool.length === 0) notFound();

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 pb-6 pt-10">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            {meta.label}
          </p>
          <h1 className="mt-1 font-serif text-2xl text-[var(--foreground)]">
            A verse {meta.prompt}
          </h1>
        </div>
        <Link
          href="/feelings"
          className="text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          Change
        </Link>
      </header>

      <EmotionResult verses={pool} />
    </div>
  );
}
