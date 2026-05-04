"use client";

import { useState } from "react";
import { VerseCard } from "@/components/VerseCard";
import type { Verse } from "@/lib/types";

function pickIndex(length: number, exclude: number) {
  if (length <= 1) return 0;
  let i = Math.floor(Math.random() * length);
  if (i === exclude) i = (i + 1) % length;
  return i;
}

export function EmotionResult({ verses }: { verses: Verse[] }) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * verses.length),
  );
  const verse = verses[index];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-1">
        <VerseCard verse={verse} />
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIndex(pickIndex(verses.length, index))}
          className="rounded-full bg-[var(--card)] border border-[var(--card-border)] px-5 py-2 text-sm hover:bg-[var(--background)]"
        >
          Another verse
        </button>
        <button
          onClick={async () => {
            const text = `"${verse.text}"\n— ${verse.reference}`;
            if (navigator.share) {
              try {
                await navigator.share({ title: "Manna", text });
              } catch {}
            } else {
              await navigator.clipboard.writeText(text);
            }
          }}
          className="rounded-full bg-[var(--foreground)] px-5 py-2 text-sm text-[var(--background)] hover:opacity-90"
        >
          Share
        </button>
      </div>
    </div>
  );
}
