import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-ink px-5 text-center text-ivory">
      <div>
        <p className="meta text-gold">404 — Scene missing</p>
        <h1 className="display mt-6 text-6xl sm:text-8xl">This reel ended early.</h1>
        <Link href="/" className="btn btn-gold mt-10">
          Back to the films
        </Link>
      </div>
    </main>
  );
}
