export type Award = {
  title: string;
  organization: string;
  year: number;
  /** Recognised film or category. */
  work?: string;
  /** Path in /public or a remote URL to the official badge/logo. */
  logo?: string;
  /** Link to the official result page. */
  url?: string;
};

/**
 * VERIFIED AWARDS ONLY.
 * Empty on purpose: no awards have been supplied yet, so the section shows
 * clearly marked placeholder slots. Add real entries like:
 *
 * {
 *   title: "Best Wedding Film",
 *   organization: "Organisation Name",
 *   year: 2025,
 *   work: "Film title",
 *   logo: "/awards/org-logo.svg",
 *   url: "https://official-results-page",
 * }
 */
export const awards: Award[] = [];

/** Press features and memberships — same rule: real entries only. */
export const recognitions: { name: string; url?: string }[] = [];
