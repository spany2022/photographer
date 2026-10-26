import { films, type Film } from "./films";
import { unsplash } from "./media";

export type Story = {
  id: string;
  title: string;
  /** Couple names — only with written permission. */
  couple?: string;
  setting: string;
  intro: string;
  moments: string[];
  cover: string;
  stills: { src: string; alt: string }[];
  film?: Film;
  reflection?: { quote: string; by: string };
  demo?: boolean;
};

const film = (id: string) => films.find((f) => f.id === id);

/**
 * SAMPLE STORIES — illustrative structure only, with stock imagery.
 * No couple names, quotes or locations are claimed. Replace with real
 * case studies (and permissions) from the filmmaker.
 */
export const stories: Story[] = [
  {
    id: "riverside-pheras",
    title: "Pheras by the River",
    setting: "Riverside ceremony · Monsoon season",
    intro:
      "A wedding built around water and stone — rituals by the river in the morning, a slow walk along the rocks when the rain paused.",
    moments: ["The first look on the riverbank", "Seven steps under a floral canopy", "A grandmother's blessing, unscripted"],
    cover: unsplash("photo-1630526720753-aa4e71acf67d", 1800),
    stills: [
      { src: unsplash("photo-1587271636175-90d58cdad458", 900), alt: "Couple in traditional wedding attire under a floral canopy" },
      { src: unsplash("photo-1621801306185-8c0ccf9c8eb8", 900), alt: "Two hands with intricate henna holding each other" },
      { src: unsplash("photo-1599462616558-2b75fd26a283", 900), alt: "Groom in a white sherwani kissing the bride's forehead" },
    ],
    film: film("on-the-bridge"),
    demo: true,
  },
  {
    id: "ballroom-marigolds",
    title: "A Ballroom Full of Marigolds",
    setting: "Grand ballroom · Evening ceremony",
    intro:
      "Crystal chandeliers met centuries-old ritual. We filmed the night as a single breath — from the baraat at the door to the final vidaai.",
    moments: ["Rituals under a marigold mandap", "Gold, red and a thousand details", "Mehndi-covered hands at midnight"],
    cover: unsplash("photo-1587271407850-8d438ca9fdf2", 1800),
    stills: [
      { src: unsplash("photo-1610173827043-9db50e0d8ef9", 900), alt: "Bride in a red bridal outfit with gold jewellery and henna" },
      { src: unsplash("photo-1597157639073-69284dc0fdaf", 900), alt: "Groom holding a gold and red wedding crown" },
      { src: unsplash("photo-1505932794465-147d1f1b2c97", 900), alt: "Hands decorated with intricate henna patterns" },
    ],
    film: film("haldi-in-colour"),
    demo: true,
  },
  {
    id: "barefoot-coast",
    title: "Barefoot on the Coast",
    setting: "Beach ceremony · Golden hour",
    intro:
      "Salt air, a handful of family and a ceremony timed to the sunset. A small wedding with an enormous horizon.",
    moments: ["Vows with the tide coming in", "A floral arch on the sand", "Dancing as the sun went down"],
    cover: unsplash("photo-1537633552985-df8429e8048b", 1800),
    stills: [
      { src: unsplash("photo-1519307212971-dd9561667ffb", 900), alt: "Silhouette of a couple watching the sunset on a beach" },
      { src: unsplash("photo-1529636798458-92182e662485", 900), alt: "Flower bouquets hung on a wooden arch with white fabric" },
      { src: unsplash("photo-1515232389446-a17ce9ca7434", 900), alt: "Wedding venue set up on a beach" },
    ],
    film: film("hand-in-hand"),
    demo: true,
  },
];
