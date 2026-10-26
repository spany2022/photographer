"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { directorsNote, signatureFilm as film } from "@/content/films";
import { PlayGlyph, SampleTag, SectionLabel } from "@/components/ui/primitives";

export function SignatureFilm() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The frame opens from a letterboxed window to full width as it scrolls in.
      gsap.fromTo(
        frameRef.current,
        { clipPath: "inset(12% 10% 12% 10% round 4px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: frameRef.current, start: "top 90%", end: "center 55%", scrub: true },
        },
      );
      gsap.fromTo(
        ".sig-poster",
        { scale: 1.25 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: frameRef.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} id="signature" className="relative bg-ink pb-28 pt-16 text-ivory md:pb-40" aria-labelledby="signature-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index="04">Signature Film</SectionLabel>
        <h2 id="signature-title" className="display mt-10 max-w-6xl text-[clamp(2.6rem,6.5vw,7rem)]">
          <span data-split className="block">
            Some Days Become Memories.
          </span>{" "}
          <span data-split data-delay="0.15" className="block italic text-gold-soft">
            Some Become Cinema.
          </span>
        </h2>
      </div>

      <div className="mt-16 md:mt-24">
        <div ref={frameRef} className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal sm:aspect-video lg:aspect-[2.39/1]">
          {playing && !failed ? (
            <video
              className="absolute inset-0 size-full bg-ink object-contain"
              src={film.src}
              poster={film.cover}
              controls
              autoPlay
              playsInline
              onError={() => setFailed(true)}
              aria-label={`${film.title} — signature wedding film`}
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              data-cursor="Play"
              className="group absolute inset-0 block size-full text-left"
              aria-label={`Play the signature film: ${film.title}`}
            >
              <Image src={film.cover} alt="" fill sizes="100vw" className="sig-poster grade object-cover object-[50%_30%]" />
              <div className="vignette absolute inset-0" />
              <PlayGlyph className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-[var(--ease-cine)] group-hover:scale-110 sm:size-32" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-10">
                <div>
                  <p className="meta text-gold">{film.category}</p>
                  <p className="display mt-3 text-4xl sm:text-6xl">{film.title}</p>
                </div>
                <div className="flex items-center gap-4 text-ivory/70">
                  <SampleTag show={film.demo} />
                  {film.duration && <span className="meta">{film.duration}</span>}
                </div>
              </div>
            </button>
          )}
          {failed && (
            <div className="absolute inset-0 grid place-items-center bg-charcoal p-6 text-center" role="alert">
              <div>
                <p className="font-serif text-2xl">The film couldn&apos;t be loaded right now.</p>
                <button type="button" className="btn btn-ghost mt-6" onClick={() => setFailed(false)}>
                  Try again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1600px] gap-10 px-5 sm:px-10 md:grid-cols-12">
        <p data-fade className="text-ivory/65 md:col-span-4">
          {film.description}
        </p>
        <blockquote data-fade className="md:col-span-6 md:col-start-7">
          <p className="font-serif text-3xl font-light italic leading-snug text-ivory/90 sm:text-4xl">&ldquo;{directorsNote}&rdquo;</p>
          <footer className="meta mt-6 flex items-center gap-3 text-gold">
            Director&apos;s note <SampleTag show={film.demo} className="text-ivory/70" />
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
