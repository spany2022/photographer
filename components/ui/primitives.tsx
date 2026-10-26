import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { quickInquiryUrl } from "@/lib/whatsapp";

export function SectionLabel({ index, children, tone = "light" }: { index: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`meta flex items-center gap-4 ${tone === "light" ? "text-gold" : "text-taupe-deep"}`}>
      <span className="tabular-nums">{index}</span>
      <span className={`h-px w-10 ${tone === "light" ? "bg-gold/60" : "bg-taupe-deep/50"}`} aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** Small tag marking demonstration content. Hidden once showDemoLabels is false. */
export function SampleTag({ show = true, className = "" }: { show?: boolean; className?: string }) {
  if (!siteConfig.showDemoLabels || !show) return null;
  return (
    <span
      className={`meta inline-flex items-center rounded-full border border-current/30 px-2.5 py-1 text-[0.55rem] tracking-[0.22em] opacity-70 ${className}`}
      title="Demonstration content — replace with the filmmaker's own work"
    >
      Sample
    </span>
  );
}

export function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

/** Primary "check your date" CTA — opens WhatsApp with a prefilled inquiry. */
export function DateCTA({ label = "Check Your Wedding Date", variant = "gold", className = "" }: { label?: string; variant?: "gold" | "dark" | "ghost"; className?: string }) {
  return (
    <a
      href={quickInquiryUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className={`btn btn-${variant} ${className}`}
      aria-label={`${label} — opens WhatsApp`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

export function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <span className={`grid place-items-center rounded-full border border-ivory/60 bg-ink/20 backdrop-blur-md ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="ml-0.5 size-[34%] fill-ivory">
        <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
      </svg>
    </span>
  );
}
