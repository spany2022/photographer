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
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-700 ease-[var(--ease-cine)] md:hidden ${
        show ? "translate-y-0" : "translate-y-[120%]"
      }`}
      inert={!show}
    >
      <a href={quickInquiryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full shadow-2xl shadow-black/50">
        <WhatsAppIcon /> Check Your Wedding Date
      </a>
    </div>
  );
}
