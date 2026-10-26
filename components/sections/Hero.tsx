"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroMedia } from "@/content/media";
import { scrollToId } from "@/lib/scroll";
import { DateCTA, SampleTag } from "@/components/ui/primitives";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Decorative muted loop: loads after first paint, skipped for reduced motion / data saver.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    video.src = heroMedia.video;
    video.play().catch(() => {
      /* Autoplay blocked — the poster stays, which is fine. */
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".hero-media", { scale: 1.22, opacity: 0 }, { scale: 1.06, opacity: 1, duration: 3, ease: "expo.out" });
        gsap.fromTo(".hero-rise", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.6, ease: "expo.out", stagger: 0.12, delay: 1.1 });
        gsap.fromTo(".hero-bar", { scaleY: 1 }, { scaleY: 0, duration: 1.8, ease: "expo.inOut", delay: 0.1 });

        const scroll = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-media-wrap", { yPercent: 18, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-content", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { ...scroll, end: "75% top" } });
      }, rootRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink" aria-label="Introduction">
      <div className="hero-media-wrap absolute inset-0">
        <div className="hero-media absolute inset-0">
          <Image
            src={heroMedia.poster}
            alt="A bride in a red lehenga raising her hands, adorned with gold jewellery"
            fill
            priority
            sizes="100vw"
            className="grade object-cover object-[60%_center]"
          />
          <video
            ref={videoRef}
            className={`grade absolute inset-0 size-full object-cover object-[60%_center] transition-opacity duration-[2000ms] ${playing ? "opacity-100" : "opacity-0"}`}
            muted
            loop
            playsInline
            preload="none"
            poster={heroMedia.poster}
            aria-hidden
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
          />
        </div>
      </div>
      <div className="vignette absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" aria-hidden />

      {/* Letterbox bars that open like a shutter on arrival */}
      <div className="hero-bar absolute inset-x-0 top-0 h-1/2 origin-top bg-ink" aria-hidden />
      <div className="hero-bar absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-ink" aria-hidden />

      <div className="hero-content relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-24 sm:px-10 sm:pb-20">
        <div className="hero-rise meta mb-8 flex items-center gap-4 text-ivory/70">
          <span className="text-gold">Reel 01</span>
          <span className="hidden h-px w-10 bg-ivory/30 sm:block" aria-hidden />
          <span className="hidden sm:inline">Every love story deserves its own cinema</span>
        </div>

        <h1 className="display max-w-5xl text-[clamp(3.4rem,10.5vw,10.5rem)] text-ivory">
          <span data-split="load" data-delay="0.5" className="block">
            Your Story.
          </span>{" "}
          <span data-split="load" data-delay="0.75" className="block italic text-gold-soft">
            Beautifully Told.
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="hero-rise max-w-md text-base leading-relaxed text-ivory/80 sm:text-lg">
            Cinematic wedding films crafted to preserve the feeling of your most extraordinary day.
          </p>
          <div className="hero-rise flex flex-col gap-3 sm:flex-row">
            <DateCTA />
            <a
              href="#films"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("films");
              }}
              data-magnetic
              className="btn btn-ghost"
            >
              Explore Wedding Films
            </a>
          </div>
        </div>
      </div>

      <div className="hero-rise absolute bottom-8 right-5 z-10 hidden flex-col items-center gap-3 sm:right-10 xl:flex" aria-hidden>
        <span className="meta text-[0.6rem] text-ivory/60 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-cine)_infinite] bg-gold" />
        </span>
      </div>
      <div className="absolute left-5 top-24 z-10 sm:left-10 sm:top-28">
        <SampleTag className="text-ivory" />
      </div>
    </section>
  );
}
