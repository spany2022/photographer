import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Smoothly scrolls to a section id, through Lenis when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  history.replaceState(null, "", `#${id}`);
}

export function lockScroll(locked: boolean) {
  const lenis = window.__lenis;
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
