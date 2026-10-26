export type Testimonial = {
  quote: string;
  couple: string;
  location?: string;
  /** Approved wedding photograph. */
  image?: string;
  /** id of a film in content/films.ts */
  filmId?: string;
};

/**
 * REAL TESTIMONIALS ONLY — with the couple's permission.
 * Empty on purpose: none supplied yet, so the section renders clearly
 * marked placeholder cards instead of invented reviews.
 */
export const testimonials: Testimonial[] = [];
