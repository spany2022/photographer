/**
 * ─────────────────────────────────────────────────────────────
 *  BUSINESS CONFIGURATION — edit this file first.
 *  Everything the site says about the business comes from here.
 *  Leave a field empty ("" / [] / null) to hide it everywhere.
 * ─────────────────────────────────────────────────────────────
 */
export const siteConfig = {
  /** Brand name. "Aurelia Films" is a DEMO name — replace it. */
  name: "Aurelia Films",
  shortName: "Aurelia",
  tagline: "Cinematic Wedding Films",
  /** Production URL, used for canonical links, sitemap and social cards. */
  url: "https://www.example.com",
  description:
    "Cinematic wedding films crafted to preserve the feeling of your most extraordinary day. Destination, traditional Indian, intimate and luxury wedding filmmaking.",

  /**
   * WhatsApp Click-to-Chat number: country code + number, digits only.
   * 9861084673 with India's +91 country code.
   */
  whatsappNumber: "919861084673",

  /** Direct call. Defaults to the WhatsApp number; change if different. */
  phoneDisplay: "+91 98610 84673",
  phoneHref: "+919861084673",

  /** Not supplied yet — hidden until filled in. */
  email: "" as string,
  instagram: "" as string,
  youtube: "" as string,
  /** e.g. ["Bhubaneswar", "Udaipur", "Goa"] — only real service areas. */
  serviceAreas: [] as string[],

  /** Filmmaker details. null / "" values are hidden, never guessed. */
  filmmaker: {
    name: "" as string,
    yearsExperience: null as number | null,
  },

  /**
   * Shows a small "Sample" tag on demonstration content (stock films,
   * sample stories). Set to false once all content is real.
   */
  showDemoLabels: true,
} as const;

export type SiteConfig = typeof siteConfig;
