"use client";

import { useEffect, useState } from "react";
import { quickInquiryUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./primitives";

/** Sticky WhatsApp CTA on small screens: appears after the hero, steps aside near the booking form and closing scene. */
export function MobileCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const inView = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
      setSuppressed(inView.size > 0);
    });
    ["booking", "closing"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !suppressed;

  return (
    // Floats above the screen edge (and the iPhone home bar) so browser toolbars never cover it.
    <div
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-md transition-[translate,opacity] duration-700 ease-[var(--ease-cine)] md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0"
      }`}
      inert={!show}
    >
      <a
        href={quickInquiryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-gold w-full whitespace-nowrap shadow-2xl shadow-black/50"
        aria-label="Check your wedding date — opens WhatsApp"
      >
        <WhatsAppIcon className="size-4 shrink-0" />
        <span className="xs:hidden">Check Your Date</span>
        <span className="hidden xs:inline">Check Your Wedding Date</span>
      </a>
    </div>
  );
}
