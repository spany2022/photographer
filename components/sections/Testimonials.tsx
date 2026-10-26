"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { films } from "@/content/films";
import { useVideoPlayer } from "@/components/providers/VideoPlayer";
import { SectionLabel } from "@/components/ui/primitives";

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const hasReal = testimonials.length > 0;
  const cardCount = hasReal ? testimonials.length : 3;

  const onScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft < 8);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 8);
  };

  const scrollBy = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector<HTMLElement>("[data-card]");
    if (!t || !card) return;
    t.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  return (
    <section id="kind-words" className="relative overflow-hidden bg-ivory text-ink" aria-labelledby="kind-words-title">
      <div className="mx-auto max-w-[1600px] px-5 py-28 sm:px-10 md:py-40">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <SectionLabel index="08" tone="dark">
              Kind Words
            </SectionLabel>
            <h2 id="kind-words-title" className="display mt-10 text-[clamp(2.6rem,6.2vw,6.5rem)]">
              <span data-split className="block">
                The Day Ends.
              </span>{" "}
              <span data-split data-delay="0.12" className="block italic text-taupe-deep">
                The Feeling Doesn&apos;t.
              </span>
            </h2>
          </div>
          {cardCount > 1 && (
            <div className="flex gap-3">
              <button type="button" onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Previous testimonial" className="grid size-14 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink disabled:opacity-30">
                <ArrowLeft className="size-5" strokeWidth={1.25} />
              </button>
              <button type="button" onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Next testimonial" className="grid size-14 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink disabled:opacity-30">
                <ArrowRight className="size-5" strokeWidth={1.25} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-28 [scrollbar-width:none] sm:px-10 md:-mt-20 md:pb-40 xl:px-[max(2.5rem,calc((100vw_-_1600px)/2_+_2.5rem))]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
      >
        {hasReal
          ? testimonials.map((t, i) => <TestimonialCard key={i} t={t} index={i} total={testimonials.length} />)
          : Array.from({ length: 3 }).map((_, i) => <PlaceholderCard key={i} index={i} />)}
      </div>
    </section>
  );
}

function TestimonialCard({ t, index, total }: { t: Testimonial; index: number; total: number }) {
  const { open } = useVideoPlayer();
  const film = t.filmId ? films.find((f) => f.id === t.filmId) : undefined;
  return (
    <figure
      data-card
      className="grid w-[86vw] shrink-0 snap-start gap-8 bg-white/60 p-8 sm:w-[640px] sm:p-12 md:grid-cols-[1fr_180px]"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
    >
      <div className="flex flex-col">
        <span className="display text-8xl leading-[0.5] text-gold" aria-hidden>
          &ldquo;
        </span>
        <blockquote className="mt-6 font-serif text-2xl leading-snug sm:text-3xl">{t.quote}</blockquote>
        <figcaption className="mt-auto pt-8">
          <p className="meta">{t.couple}</p>
          {t.location && <p className="mt-1 text-sm text-ink/60">{t.location}</p>}
          {film && (
            <button type="button" onClick={() => open(film)} className="link-line meta mt-5 text-taupe-deep">
              Watch their film
            </button>
          )}
        </figcaption>
      </div>
      {t.image && (
        <div className="relative hidden aspect-[3/4] overflow-hidden md:block">
          <Image src={t.image} alt={`${t.couple} on their wedding day`} fill sizes="180px" className="grade object-cover" />
        </div>
      )}
    </figure>
  );
}

/** Clearly marked placeholder — never presented as a real review. */
function PlaceholderCard({ index }: { index: number }) {
  return (
    <figure data-card className="flex w-[86vw] shrink-0 snap-start flex-col border border-dashed border-ink/20 p-8 sm:w-[560px] sm:p-12">
      <div className="flex items-start justify-between">
        <span className="display text-8xl leading-[0.5] text-gold/60" aria-hidden>
          &ldquo;
        </span>
        <span className="meta rounded-full border border-ink/20 px-3 py-1.5 text-[0.55rem] text-ink/60">Testimonial placeholder</span>
      </div>
      <blockquote className="mt-6 font-serif text-2xl italic leading-snug text-ink/45 sm:text-3xl">
        A couple&apos;s own words about their film will appear here — shared with their permission.
      </blockquote>
      <figcaption className="mt-10 text-sm text-ink/50">
        <span className="meta text-ink/60">Couple name · Wedding location</span>
        <span className="mt-2 block">Add real reviews in content/testimonials.ts (slot {index + 1}).</span>
      </figcaption>
    </figure>
  );
}
