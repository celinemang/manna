import Link from "next/link";
import { emotions } from "@/data/emotions";

export default function FeelingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-5 pb-6 pt-10">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Feelings
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">
          How is your heart today?
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Choose one feeling and receive Scripture for this moment.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-3">
        {emotions.map((e) => (
          <li key={e.id}>
            <Link
              href={`/feelings/${e.id}`}
              className="block rounded-2xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-6 text-center transition hover:border-[var(--accent)] hover:bg-[var(--background)]"
            >
              <span className="font-serif text-xl text-[var(--foreground)]">
                {e.label}
              </span>
              <span className="mt-1 block text-xs text-[var(--muted)]">
                {e.prompt}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
