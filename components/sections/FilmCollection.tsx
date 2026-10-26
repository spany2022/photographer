"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { filmCategories, films, type Film, type FilmCategory } from "@/content/films";
import { useVideoPlayer } from "@/components/providers/VideoPlayer";
import { DateCTA, PlayGlyph, SampleTag, SectionLabel } from "@/components/ui/primitives";

type Filter = "All" | FilmCategory;

/** Editorial rhythm for the grid after the lead film: [column span, aspect]. */
const rhythm: [string, string][] = [
  ["md:col-span-7", "aspect-[16/10]"],
  ["md:col-span-5", "aspect-[4/5]"],
  ["md:col-span-5", "aspect-[4/5]"],
  ["md:col-span-7", "aspect-[16/10]"],
  ["md:col-span-4", "aspect-[3/4]"],
  ["md:col-span-4", "aspect-[3/4]"],
  ["md:col-span-4", "aspect-[3/4]"],
];

export function FilmCollection() {
  const [filter, setFilter] = useState<Filter>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  const visible = useMemo(() => (filter === "All" ? films : films.filter((f) => f.category === filter)), [filter]);
  const counts = useMemo(
    () => Object.fromEntries(filmCategories.map((c) => [c, films.filter((f) => f.category === c).length])),
    [],
  );
  const [lead, ...rest] = visible;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".film-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: firstRun.current ? { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" } : undefined,
        },
      );
    });
    if (!firstRun.current) ScrollTrigger.refresh();
    firstRun.current = false;
    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="films" className="relative bg-ink text-ivory" aria-labelledby="films-title">
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-28 sm:px-10 md:pt-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="03">The Wedding Film Collection</SectionLabel>
            <h2 id="films-title" className="display mt-10 text-[clamp(2.8rem,7vw,7.5rem)]">
              <span data-split className="block">
                Films That Feel
              </span>{" "}
              <span data-split data-delay="0.12" className="block italic text-gold-soft">
                Like Memory.
              </span>
            </h2>
          </div>
          <p data-fade className="max-w-sm text-ivory/65 lg:col-span-4 lg:justify-self-end">
            Complete wedding films and cinematic highlights from celebrations of every size — each one cut around the people in it.
          </p>
        </div>

        {/* Filters */}
        <div data-fade className="relative mt-16 border-y border-ivory/10">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 py-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter films by category">
            {(["All", ...filmCategories] as Filter[]).map((c) => {
              const active = filter === c;
              const count = c === "All" ? films.length : counts[c];
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={active}
                  className={`meta shrink-0 rounded-full border px-4 py-2.5 transition-colors duration-500 ${
                    active ? "border-gold bg-gold text-ink" : "border-ivory/15 text-ivory/70 hover:border-ivory/50 hover:text-ivory"
                  }`}
                >
                  {c}
                  <sup className="ml-1.5 tabular-nums opacity-60">{count}</sup>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "film" : "films"}
          {filter !== "All" ? ` in ${filter}` : ""}.
        </p>

        <div ref={gridRef} key={filter} className="mt-12">
          {lead ? (
            <>
              <FilmCard film={lead} className="film-card" aspect="aspect-[4/5] sm:aspect-video lg:aspect-[21/9]" size="lead" />
              {rest.length > 0 && (
                <div className="mt-6 grid gap-x-6 gap-y-14 md:mt-10 md:grid-cols-12">
                  {rest.map((film, i) => {
                    const [span, aspect] = rhythm[i % rhythm.length];
                    return <FilmCard key={film.id} film={film} className={`film-card ${span}`} aspect={aspect} />;
                  })}
                </div>
              )}
            </>
          ) : (
            <p className="py-20 text-center text-ivory/60">No films in this category yet — check back soon.</p>
          )}
        </div>

        <div data-fade className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-ivory/10 pt-12 md:flex-row md:items-center">
          <p className="max-w-xl font-serif text-3xl font-light leading-tight sm:text-4xl">
            Imagining your own day on screen? <span className="italic text-gold-soft">Let&apos;s check your date.</span>
          </p>
          <DateCTA />
        </div>
      </div>
    </section>
  );
}

function FilmCard({ film, className = "", aspect, size = "grid" }: { film: Film; className?: string; aspect: string; size?: "lead" | "grid" }) {
  const { open } = useVideoPlayer();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);

  const startPreview = () => {
    const v = videoRef.current;
    if (!v || !film.preview || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    if (!v.src) v.src = film.preview; // loaded on first hover only
    v.play().then(() => setPreviewing(true)).catch(() => {});
  };
  const stopPreview = () => {
    videoRef.current?.pause();
    setPreviewing(false);
  };

  const lead = size === "lead";

  return (
    <article className={className}>
      <button
        type="button"
        onClick={() => open(film)}
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        data-cursor="Play"
        className="group relative block w-full overflow-hidden bg-charcoal text-left"
        aria-label={`Play ${film.title} — ${film.category}`}
      >
        <div className={`relative ${aspect} w-full`}>
          <Image
            src={film.cover}
            alt=""
            fill
            sizes={lead ? "100vw" : "(min-width: 768px) 58vw, 100vw"}
            className="grade object-cover transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.06]"
          />
          {film.preview && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              tabIndex={-1}
              className={`grade absolute inset-0 size-full object-cover transition-opacity duration-700 ${previewing ? "opacity-100" : "opacity-0"}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70" />
          <PlayGlyph
            className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[var(--ease-cine)] group-hover:scale-110 group-hover:border-gold ${
              lead ? "top-[38%] size-24 sm:top-1/2 sm:size-28" : "top-1/2 size-16 sm:size-20"
            }`}
          />
          <div className="absolute right-4 top-4 text-ivory">
            <SampleTag show={film.demo} />
          </div>

          {lead && (
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="meta text-gold">Featured · {film.category}</p>
                <h3 className="display mt-3 text-5xl sm:text-7xl">{film.title}</h3>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ivory/75">{film.description}</p>
            </div>
          )}
        </div>
      </button>

      {!lead && (
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="meta text-gold/90">{film.category}</p>
            <h3 className="mt-2 font-serif text-3xl font-light leading-tight">{film.title}</h3>
            {(film.couple || film.location) && (
              <p className="mt-1 text-sm text-taupe">{[film.couple, film.location].filter(Boolean).join(" · ")}</p>
            )}
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/60">{film.description}</p>
          </div>
          {film.duration && <span className="meta shrink-0 text-ivory/50">{film.duration}</span>}
        </div>
      )}
    </article>
  );
}
