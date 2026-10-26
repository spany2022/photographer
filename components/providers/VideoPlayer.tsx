"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink, Loader2, X } from "lucide-react";
import type { Film } from "@/content/films";
import { lockScroll } from "@/lib/scroll";
import { quickInquiryUrl } from "@/lib/whatsapp";

type PlayerContext = { open: (film: Film) => void };
const Ctx = createContext<PlayerContext | null>(null);

export function useVideoPlayer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useVideoPlayer must be used inside <VideoPlayerProvider>");
  return ctx;
}

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [film, setFilm] = useState<Film | null>(null);
  const open = useCallback((f: Film) => setFilm(f), []);
  const close = useCallback(() => setFilm(null), []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {film && <VideoModal film={film} onClose={close} />}
    </Ctx.Provider>
  );
}

/** Full-screen, keyboard-accessible player. Full-resolution files load only when opened. */
function VideoModal({ film, onClose }: { film: Film; onClose: () => void }) {
  const [quality, setQuality] = useState<"hd" | "4k">("hd");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [shown, setShown] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const resumeAt = useRef(0);

  const src = quality === "4k" && film.src4k ? film.src4k : film.src;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeRef.current?.focus();
    const raf = requestAnimationFrame(() => setShown(true));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], video, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const switchQuality = (q: "hd" | "4k") => {
    if (q === quality) return;
    resumeAt.current = videoRef.current?.currentTime ?? 0;
    setStatus("loading");
    setQuality(q);
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${film.title} — wedding film`}
      className={`fixed inset-0 z-[80] flex flex-col bg-ink/[0.97] backdrop-blur-sm transition-opacity duration-700 ease-[var(--ease-cine)] ${shown ? "opacity-100" : "opacity-0"}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-start justify-between gap-6 px-5 pt-5 sm:px-10 sm:pt-8">
        <div>
          <p className="meta text-gold">{film.category}</p>
          <h2 className="mt-2 font-serif text-3xl font-light text-ivory sm:text-4xl">{film.title}</h2>
          {(film.couple || film.location) && (
            <p className="mt-1 text-sm text-taupe">{[film.couple, film.location].filter(Boolean).join(" · ")}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {film.src4k && (
            <div className="hidden rounded-full border border-ivory/15 p-1 sm:flex" role="group" aria-label="Playback quality">
              {(["hd", "4k"] as const).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => switchQuality(q)}
                  aria-pressed={quality === q}
                  className={`meta rounded-full px-3 py-2 transition-colors ${quality === q ? "bg-gold text-ink" : "text-ivory/70 hover:text-ivory"}`}
                >
                  {q === "hd" ? "HD" : "4K"}
                </button>
              ))}
            </div>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close film"
            className="grid size-12 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            <X className="size-5" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <div
        className={`relative mx-auto my-auto w-full max-w-[min(100%,calc((100svh_-_12rem)*16/9))] px-0 transition-all duration-1000 ease-[var(--ease-cine)] sm:px-10 ${shown ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"}`}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
          <video
            ref={videoRef}
            key={src}
            className="size-full object-contain"
            src={src}
            poster={film.cover}
            controls
            autoPlay
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              if (resumeAt.current) e.currentTarget.currentTime = resumeAt.current;
            }}
            onCanPlay={() => setStatus("ready")}
            onError={() => setStatus("error")}
          >
            Your browser can&apos;t play this film.
          </video>

          {status === "loading" && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-live="polite">
              <span className="flex items-center gap-3 rounded-full bg-ink/70 px-5 py-3 text-sm text-ivory/80">
                <Loader2 className="size-4 animate-spin" aria-hidden /> Loading film…
              </span>
            </div>
          )}
          {status === "error" && (
            <div className="absolute inset-0 grid place-items-center bg-charcoal p-6 text-center" role="alert">
              <div>
                <p className="font-serif text-2xl text-ivory">This film couldn&apos;t be loaded.</p>
                <p className="mt-2 text-sm text-taupe">Check your connection and try again, or ask us for a private link.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button type="button" className="btn btn-ghost" onClick={() => { setStatus("loading"); videoRef.current?.load(); }}>
                    Try again
                  </button>
                  <a className="btn btn-gold" href={quickInquiryUrl} target="_blank" rel="noopener noreferrer">
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pb-6 sm:px-10 sm:pb-8">
        <p className="max-w-xl text-sm leading-relaxed text-taupe">{film.description}</p>
        <div className="flex items-center gap-5">
          {film.fullFilmUrl && (
            <a href={film.fullFilmUrl} target="_blank" rel="noopener noreferrer" className="link-line meta text-ivory">
              Watch full film <ExternalLink className="size-3.5" aria-hidden />
            </a>
          )}
          <a href={quickInquiryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Check your date
          </a>
        </div>
      </div>
    </div>
  );
}
