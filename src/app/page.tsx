import { VerseFeed } from "@/components/VerseFeed";
import { verses } from "@/data/verses";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 pb-6 pt-10">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Manna
        </p>
        <h1 className="mt-1 font-serif text-3xl text-[var(--foreground)]">
          A verse for today
        </h1>
      </header>
      <VerseFeed verses={verses} />
    </div>
  );
}
