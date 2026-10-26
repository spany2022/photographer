import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { closingImage } from "@/content/media";
import { quickInquiryUrl } from "@/lib/whatsapp";
import { DateCTA } from "@/components/ui/primitives";
import { Logo, navLinks } from "@/components/ui/brand";

export function Closing() {
  return (
    <section id="closing" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-ivory" aria-labelledby="closing-title">
      <div className="absolute inset-0" data-parallax="8">
        <Image src={closingImage} alt="Silhouette of a couple dancing on a beach at golden hour" fill sizes="100vw" className="grade scale-110 object-cover" />
      </div>
      <div className="absolute inset-0 bg-ink/55" aria-hidden />
      <div className="vignette absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-32 text-center sm:px-10">
        <p data-fade className="meta text-gold">
          10 — Fin
        </p>
        <h2 id="closing-title" className="display mx-auto mt-10 max-w-6xl text-[clamp(2.8rem,7.4vw,8rem)]">
          <span data-split className="block">
            Your Once-in-a-Lifetime Day.
          </span>{" "}
          <span data-split data-delay="0.2" className="block italic text-gold-soft">
            Told for a Lifetime.
          </span>
        </h2>
        <p data-fade className="mx-auto mt-10 max-w-lg text-lg text-ivory/80">
          Let&apos;s preserve the moments you&apos;ll want to return to, again and again.
        </p>
        <div data-fade className="mx-auto mt-12 flex max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
          <DateCTA />
          <a href="#films" data-magnetic className="btn btn-ghost">
            Watch Our Films
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ base = "" }: { base?: string }) {
  const socials = [
    siteConfig.instagram && { label: "Instagram", href: siteConfig.instagram },
    siteConfig.youtube && { label: "YouTube", href: siteConfig.youtube },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="relative bg-ink text-ivory">
      <div className="hairline" />
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-20 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="text-ivory" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">{siteConfig.tagline}. Every love story deserves its own cinema.</p>
          {siteConfig.serviceAreas.length > 0 && (
            <p className="meta mt-8 text-ivory/50">Filming in {siteConfig.serviceAreas.join(" · ")}</p>
          )}
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="meta text-gold">Explore</p>
          <ul className="mt-6 space-y-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`${base}#${l.id}`} className="text-ivory/70 transition-colors hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="meta text-gold">Contact</p>
          <ul className="mt-6 space-y-3 text-ivory/70">
            <li>
              <a href={quickInquiryUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">
                WhatsApp · {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phoneHref}`} className="transition-colors hover:text-ivory">
                Call · {siteConfig.phoneDisplay}
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-ivory">
                  {siteConfig.email}
                </a>
              </li>
            )}
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 border-t border-ivory/10 px-5 py-8 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-ivory">
            Privacy Policy
          </Link>
          {siteConfig.showDemoLabels && <span>Sample films &amp; imagery: Pexels, Mixkit, Unsplash (free licences)</span>}
        </div>
      </div>
    </footer>
  );
}
