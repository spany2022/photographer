"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Declarative scroll reveals. Mark up elements with:
 *   data-split            word-by-word heading reveal (data-split="load" plays immediately)
 *   data-fade             fade + rise on enter
 *   data-stagger          children fade in one after another
 *   data-mask             image-mask reveal (bottom → top) with inner zoom-out
 *   data-parallax="12"    drifts ±12% while the parent crosses the viewport
 *   data-delay="0.2"      optional delay for any of the above
 * Reduced-motion visitors get the final state with no animation (see globals.css).
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const delayOf = (el: HTMLElement) => Number(el.dataset.delay ?? 0);
      // Play once, never reverse. (once: true makes triggers kill themselves during a refresh,
      // which breaks ScrollTrigger when the page is reloaded part-way down.)
      const enter = (el: Element, start = "top 86%") => ({ trigger: el, start, toggleActions: "play none none none" });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, { type: "words", mask: "words", aria: "auto" });
        gsap.set(el, { opacity: 1 });
        gsap.from(split.words, {
          yPercent: 115,
          rotate: 2,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.05,
          delay: delayOf(el),
          scrollTrigger: el.dataset.split === "load" ? undefined : enter(el),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 1.4, ease: "expo.out", delay: delayOf(el), scrollTrigger: enter(el) },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.3, ease: "expo.out", stagger: 0.12, delay: delayOf(el), scrollTrigger: enter(el) },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        // Plain tweens rather than a timeline: timeline-based triggers created in the same
        // tick as many others can trip ScrollTrigger's refresh loop.
        const inner = el.querySelector("img, video");
        gsap.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "expo.inOut", delay: delayOf(el), scrollTrigger: enter(el, "top 90%") });
        if (inner) {
          gsap.fromTo(inner, { scale: 1.3 }, { scale: 1, duration: 2.2, ease: "expo.out", delay: delayOf(el), scrollTrigger: enter(el, "top 90%") });
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
