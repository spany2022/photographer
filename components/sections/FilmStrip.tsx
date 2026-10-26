"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { filmStripFrames } from "@/content/gallery";

const sprockets =
  "repeating-linear-gradient(90deg, transparent 0 14px, rgb(246 241 233 / 0.14) 14px 28px)";

/** Decorative 35mm-style band. Two rows drift in opposite directions with scroll. */
export function FilmStrip() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scroll = { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(".strip-a", { xPercent: 0 }, { xPercent: -22, ease: "none", scrollTrigger: scroll });
      gsap.fromTo(".strip-b", { xPercent: -22 }, { xPercent: 0, ease: "none", scrollTrigger: scroll });
    });
    return () => mm.revert();
  }, []);

  const row = (frames: string[], cls: string) => (
    <div className={`${cls} flex w-max gap-3 bg-charcoal px-3 py-6`} style={{ backgroundImage: `${sprockets}, ${sprockets}`, backgroundSize: "100% 8px, 100% 8px", backgroundPosition: "0 8px, 0 calc(100% - 8px)", backgroundRepeat: "no-repeat" }}>
      {[...frames, ...frames].map((src, i) => (
        <div key={i} className="relative aspect-[3/2] w-56 shrink-0 overflow-hidden sm:w-80">
          <Image src={src} alt="" fill sizes="320px" className="grade object-cover" />
        </div>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className="relative -rotate-2 scale-105 overflow-hidden bg-ink py-10 md:py-16" aria-hidden>
      {row(filmStripFrames, "strip-a")}
      <div className="h-3" />
      {row([...filmStripFrames].reverse(), "strip-b")}
    </div>
  );
}
