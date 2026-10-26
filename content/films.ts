import { mixkitPoster, mixkitVideo, pexelsPoster, pexelsVideo } from "./media";

export const filmCategories = [
  "Destination Weddings",
  "Traditional Indian Weddings",
  "Intimate Weddings",
  "Luxury Celebrations",
  "Pre-Wedding Films",
  "Wedding Highlights",
] as const;

export type FilmCategory = (typeof filmCategories)[number];

export type Film = {
  id: string;
  title: string;
  /** Only publish with the couple's approval. */
  couple?: string;
  location?: string;
  category: FilmCategory;
  description: string;
  cover: string;
  /** Small, muted clip for hover previews (optional). */
  preview?: string;
  /** Full film, streamed on demand when the player opens. */
  src: string;
  /** Optional higher-resolution source offered as a "4K" toggle. */
  src4k?: string;
  duration?: string;
  /** Link to the complete film (YouTube / Vimeo), optional. */
  fullFilmUrl?: string;
  /** Demonstration content — shows a "Sample" tag while siteConfig.showDemoLabels is on. */
  demo?: boolean;
};

/**
 * SAMPLE FILMS — stock footage standing in for the portfolio.
 * Titles and descriptions are illustrative; replace every entry with real
 * films, and add couple names / locations only with permission.
 */
export const films: Film[] = [
  {
    id: "walking-into-forever",
    title: "Walking Into Forever",
    category: "Wedding Highlights",
    description: "Ivory and rose silk, fingers laced, a slow walk through the grass after the pheras.",
    cover: pexelsPoster("40474721"),
    src: pexelsVideo("40474721", "17295834_1920_1080_60fps.mp4"),
    demo: true,
  },
  {
    id: "garden-of-promises",
    title: "Garden of Promises",
    category: "Destination Weddings",
    description: "Late-afternoon light, palms overhead and two people walking toward the rest of their lives.",
    cover: mixkitPoster("40584"),
    preview: mixkitVideo("40584", 360),
    src: mixkitVideo("40584", 1080),
    src4k: mixkitVideo("40584", 2160),
    demo: true,
  },
  {
    id: "golden-hour-vows",
    title: "Golden Hour Vows",
    category: "Intimate Weddings",
    description: "A handful of guests, a garden pergola and vows spoken softly enough for only one person.",
    cover: mixkitPoster("40627"),
    preview: mixkitVideo("40627", 360),
    src: mixkitVideo("40627", 1080),
    src4k: mixkitVideo("40627", 2160),
    demo: true,
  },
  {
    id: "on-the-bridge",
    title: "On the Bridge at Dusk",
    category: "Pre-Wedding Films",
    description: "A shy first look across a bridge, filmed in the blue hour before the celebrations began.",
    cover: pexelsPoster("40474711"),
    src: pexelsVideo("40474711", "17295913_1920_1080_60fps.mp4"),
    demo: true,
  },
  {
    id: "haldi-in-colour",
    title: "Haldi, in Full Colour",
    category: "Traditional Indian Weddings",
    description: "Turmeric, laughter and marigolds — a morning of family, mischief and blessings.",
    cover: pexelsPoster("12597431", "cinematic-haldi-indian-indian-tradition-12597431.jpeg"),
    src: pexelsVideo("12597431", "12597431-hd_1920_1080_25fps.mp4"),
    demo: true,
  },
  {
    id: "a-thousand-roses",
    title: "A Thousand Roses",
    category: "Luxury Celebrations",
    description: "Floral canopies, candlelight and a reception designed down to the last petal.",
    cover: pexelsPoster("35300398", "decoration-flower-flower-decoration-flowers-35300398.jpeg"),
    src: pexelsVideo("35300398", "14956176_1920_1080_50fps.mp4"),
    demo: true,
  },
  {
    id: "hand-in-hand",
    title: "Hand in Hand",
    category: "Destination Weddings",
    description: "Just married, just the two of them — an unhurried walk after a sunlit ceremony.",
    cover: mixkitPoster("40596"),
    preview: mixkitVideo("40596", 360),
    src: mixkitVideo("40596", 1080),
    src4k: mixkitVideo("40596", 2160),
    demo: true,
  },
  {
    id: "henna-hours",
    title: "Henna Hours",
    category: "Luxury Celebrations",
    description: "Intricate mehndi, close-up and patient — the artistry that frames every wedding day.",
    cover: pexelsPoster("29766214"),
    src: pexelsVideo("29766214", "12791771_2560_1440_25fps.mp4"),
    demo: true,
  },
  {
    id: "rings-and-roses",
    title: "Rings & Roses",
    category: "Wedding Highlights",
    description: "The ring, the bouquet and the steady hands of someone about to say yes.",
    cover: mixkitPoster("5223"),
    preview: mixkitVideo("5223", 360),
    src: mixkitVideo("5223", 1080),
    demo: true,
  },
];

/** Section 04 — the featured "signature" film. */
export const signatureFilm: Film = {
  id: "anklet-and-vow",
  title: "The Anklet & the Vow",
  category: "Traditional Indian Weddings",
  description:
    "Quiet hands, gold and mehndi in the hours before the ceremony — the small rituals that carry generations, filmed in native 4K.",
  cover: pexelsPoster("11035010"),
  src: pexelsVideo("11035010", "11035010-uhd_2560_1440_24fps.mp4"),
  duration: "Feature preview",
  demo: true,
};

export const directorsNote =
  "We barely directed that morning. We waited for the light, kept our distance, and let the family’s hands tell the story.";
