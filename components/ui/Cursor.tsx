"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Restrained desktop cursor: a soft ring that trails the native pointer
 * (the native cursor stays visible) and expands into a label over
 * elements with data-cursor="Play" etc. Also powers data-magnetic buttons.
 * Disabled on touch devices and for reduced motion.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    setEnabled(mq.matches);
  }, []);

  useEffect(() => {
    if (!enabled || !ringRef.current) return;
    const ring = ringRef.current;
    const xTo = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    let magnet: HTMLElement | null = null;
    let last = { x: -1, y: -1 };

    const update = (x: number, y: number, target: Element | null) => {
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? "");
      ring.dataset.state = labelled ? "label" : target?.closest("a, button, [role=button], input, select, textarea, label") ? "hover" : "";

      const m = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet && magnet !== m) {
        gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      }
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        gsap.to(m, {
          x: (x - (r.left + r.width / 2)) * 0.25,
          y: (y - (r.top + r.height / 2)) * 0.35,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(ring, { opacity: 1, duration: 0.3, overwrite: "auto" });
      update(e.clientX, e.clientY, e.target as Element);
    };
    // Content moves under a still pointer while scrolling — re-check what it is over.
    const onScroll = () => {
      if (last.x >= 0) update(last.x, last.y, document.elementFromPoint(last.x, last.y));
    };
    const onLeave = () => gsap.to(ring, { opacity: 0, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden
      data-state=""
      className="group pointer-events-none fixed left-0 top-0 z-[90] opacity-0 mix-blend-difference [&[data-state=label]]:mix-blend-normal"
    >
      <div
        className="grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory/70 transition-all duration-500 ease-[var(--ease-cine)]
        group-data-[state=hover]:size-14 group-data-[state=hover]:border-gold
        group-data-[state=label]:size-24 group-data-[state=label]:border-transparent group-data-[state=label]:bg-ivory/90 group-data-[state=label]:backdrop-blur"
      >
        <span className="meta text-[0.6rem] text-ink opacity-0 transition-opacity duration-300 group-data-[state=label]:opacity-100">
          {label}
        </span>
      </div>
    </div>
  );
}
