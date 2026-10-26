import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import { heroMedia } from "@/content/media";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Motion } from "@/components/providers/Motion";
import { VideoPlayerProvider } from "@/components/providers/VideoPlayer";
import { Cursor } from "@/components/ui/Cursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${siteConfig.name} — Cinematic Wedding Films`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "wedding filmmaker",
    "cinematic wedding films",
    "wedding videographer",
    "destination wedding films",
    "Indian wedding films",
    "pre-wedding films",
    "wedding highlights",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    images: [{ url: heroMedia.poster, width: 1920, height: 1012, alt: "Cinematic wedding film still" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: [heroMedia.poster],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101010",
  colorScheme: "dark",
  // Lets fixed bottom UI read env(safe-area-inset-bottom) on notched phones.
  viewportFit: "cover",
};

/** Only facts present in siteConfig — nothing invented. */
function structuredData() {
  const sameAs = [siteConfig.instagram, siteConfig.youtube].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneHref,
    ...(siteConfig.email && { email: siteConfig.email }),
    ...(sameAs.length ? { sameAs } : {}),
    ...(siteConfig.serviceAreas.length ? { areaServed: siteConfig.serviceAreas } : {}),
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal states before paint; reduced-motion visitors see everything immediately. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reduce-motion');",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
      </head>
      <body>
        <VideoPlayerProvider>{children}</VideoPlayerProvider>
        <SmoothScroll />
        <Motion />
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
