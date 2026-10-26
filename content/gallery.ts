import { unsplash } from "./media";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Layout hint for the editorial grid. */
  shape: "tall" | "wide" | "square";
};

/** SAMPLE behind-the-scenes stills (stock). Replace with the team's own BTS photos. */
export const behindTheLens: GalleryItem[] = [
  { src: unsplash("photo-1543235074-4768b5c2233c", 1200), alt: "Shoulder-mounted video camera", caption: "Handheld, in the moment", shape: "tall" },
  { src: unsplash("photo-1657458277811-c6f0f2614e64", 1400), alt: "Filmmaker with a cinema camera filming a couple on a hillside", caption: "Pre-wedding film shoot", shape: "wide" },
  { src: unsplash("photo-1490810194309-344b3661ba39", 1200), alt: "Editor in silhouette wearing headphones in a dark room", caption: "The edit suite", shape: "square" },
  { src: unsplash("photo-1611550287705-7ff8b459c8eb", 1200), alt: "Camera raised in front of groomsmen at a wedding", caption: "Wedding-day coverage", shape: "tall" },
  { src: unsplash("photo-1574717024653-61fd2cf4d44d", 1400), alt: "Video editing timeline on a dark screen", caption: "Story-first editing", shape: "wide" },
  { src: unsplash("photo-1621701816825-b5abfadae6c3", 1200), alt: "Cinema camera on a tripod", caption: "Preparation", shape: "square" },
  { src: unsplash("photo-1440404653325-ab127d49abc1", 1200), alt: "Two vintage film reels", caption: "Where the craft began", shape: "square" },
];

/** Frames used in the moving film-strip band. */
export const filmStripFrames = [
  unsplash("photo-1610173827043-9db50e0d8ef9", 700),
  unsplash("photo-1532712938310-34cb3982ef74", 700),
  unsplash("photo-1621801306185-8c0ccf9c8eb8", 700),
  unsplash("photo-1606216794079-73f85bbd57d5", 700),
  unsplash("photo-1599462616558-2b75fd26a283", 700),
  unsplash("photo-1519741497674-611481863552", 700),
  unsplash("photo-1665960213508-48f07086d49c", 700),
  unsplash("photo-1547911139-c06c87da7115", 700),
];
