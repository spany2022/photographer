"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { behindTheLens as items } from "@/content/gallery";
import { lockScroll } from "@/lib/scroll";
import { SampleTag, SectionLabel } from "@/components/ui/primitives";

const process = [
  { step: "Conversation", text: "We start by listening — your families, your traditions and what you want to feel when you press play." },
  { step: "Planning", text: "Timelines, light, locations and the moments that matter most, mapped together before the day." },
  { step: "The day", text: "A calm, discreet presence. We observe, anticipate and let the day unfold naturally." },
  { step: "Edit & colour", text: "Your story is shaped in the edit suite and graded by hand for natural, timeless colour." },
];

const shapeClass = {
  tall: "aspect-[3/4] md:row-span-2 md:aspect-auto",
  wide: "col-span-2 aspect-[16/10] md:aspect-auto",
  square: "aspect-square md:aspect-auto",
};

export function BehindTheLens() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="behind-the-lens" className="relative bg-ink text-ivory" aria-labelledby="bts-title">
      <div className="mx-auto max-w-[1600px] px-5 py-28 sm:px-10 md:py-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="07">Behind the Lens</SectionLabel>
            <h2 id="bts-title" className="display mt-10 text-[clamp(2.4rem,5.6vw,6rem)]">
              <span data-split className="block">
                Quietly Observing.
              </span>{" "}
              <span data-split data-delay="0.1" className="block">
                Carefully Crafting.
              </span>{" "}
              <span data-split data-delay="0.2" className="block italic text-gold-soft">
                Forever Preserving.
              </span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-4">
            <SampleTag className="text-ivory" />
          </div>
        </div>

        {/* Editorial gallery */}
        <div data-stagger className="mt-20 grid grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4 lg:auto-rows-[260px]">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              data-cursor="View"
              className={`group relative overflow-hidden bg-charcoal text-left ${shapeClass[item.shape]}`}
              aria-label={`Open image: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 30vw, 50vw"
                className="grade object-cover transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.07]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="meta absolute bottom-4 left-4 translate-y-2 text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </span>
            </button>
          ))}
        </div>

        {/* Process */}
        <ol data-stagger className="mt-24 grid gap-10 border-t border-ivory/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.step}>
              <span className="meta text-gold">Step 0{i + 1}</span>
              <h3 className="mt-3 font-serif text-3xl font-light">{p.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/60">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {active !== null && <Lightbox index={active} onChange={setActive} onClose={() => setActive(null)} />}
    </section>
  );
}

function Lightbox({ index, onChange, onClose }: { index: number; onChange: (i: number) => void; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const go = useCallback((dir: 1 | -1) => onChange((index + dir + items.length) % items.length), [index, onChange]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeRef.current?.focus();
    return () => {
      lockScroll(false);
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Behind the scenes gallery"
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-5 py-5 sm:px-10">
        <p className="meta text-ivory/60 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="grid size-12 place-items-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold"
        >
          <X className="size-5" strokeWidth={1.25} />
        </button>
      </div>
      <div className="relative mx-5 flex-1 sm:mx-24" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <Image key={item.src} src={item.src} alt={item.alt} fill sizes="90vw" className="animate-[fadein_0.6s_ease] object-contain" />
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-6 sm:px-10">
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="grid size-12 place-items-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold">
          <ChevronLeft className="size-5" strokeWidth={1.25} />
        </button>
        <p className="font-serif text-xl italic text-ivory/80" aria-live="polite">
          {item.caption}
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className="grid size-12 place-items-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold">
          <ChevronRight className="size-5" strokeWidth={1.25} />
        </button>
      </div>
    </div>
  );
}
