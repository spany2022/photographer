"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { lockScroll, scrollToId } from "@/lib/scroll";
import { quickInquiryUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { Logo, navLinks } from "@/components/ui/brand";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The bar stays pinned and fully visible; it only gains a backdrop once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu release scroll lock before scrolling.
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <a
        href="#main"
        className="meta fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-700 ease-[var(--ease-cine)] ${
          scrolled && !open ? "bg-ink/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-5 sm:h-20 sm:px-10" aria-label="Main">
          <a href="#top" onClick={go("top")} className="text-ivory" aria-label={`${siteConfig.name} — home`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="link-line meta text-ivory/80 hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={quickInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="btn btn-ghost hidden min-h-11 px-5 sm:inline-flex"
              aria-label="Check your date — opens WhatsApp"
            >
              <WhatsAppIcon className="size-3.5" /> Check Date
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-ivory/25 text-ivory lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" strokeWidth={1.25} /> : <Menu className="size-5" strokeWidth={1.25} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[45] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 transition-[clip-path] duration-1000 ease-[var(--ease-cine)] lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="space-y-2">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="flex items-baseline gap-4 py-2 font-serif text-5xl font-light text-ivory xs:text-6xl"
              >
                <span className="meta text-gold">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="space-y-6">
          <div className="hairline" />
          <a href={quickInquiryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full">
            <WhatsAppIcon /> Check Your Wedding Date
          </a>
        </div>
      </div>
    </>
  );
}
