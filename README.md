# Aurelia Films — Cinematic Wedding Filmmaker Website

A single-page, cinematic portfolio for a luxury wedding filmmaker, built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + GSAP/ScrollTrigger + Lenis**. The main conversion path is a one-click WhatsApp date inquiry.

> **Demo status.** "Aurelia Films" is a placeholder brand. All films, stills and stories are free-licence stock (Pexels, Mixkit, Unsplash) standing in for the filmmaker's own work, and they carry a small **Sample** tag. Awards and testimonials are **empty on purpose**: the site shows clearly marked placeholder slots and never invents credentials or reviews.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # TypeScript check
```

## 1. Configure the business — `config/site.ts`

| Field | What it does |
| --- | --- |
| `name`, `shortName`, `tagline` | Brand name in the logo, titles, footer and structured data |
| `url` | Production domain, used for canonical URLs, the sitemap and social cards |
| `whatsappNumber` | **Digits only, with country code.** Set to `919861084673` (+91 98610 84673) |
| `phoneDisplay`, `phoneHref` | The "Call" link; it defaults to the WhatsApp number |
| `email`, `instagram`, `youtube` | Leave as `""` to hide; links appear automatically once filled in |
| `serviceAreas` | Real cities or regions only; shown in the footer and structured data |
| `filmmaker.name`, `filmmaker.yearsExperience` | Shown in the philosophy section only when set |
| `showDemoLabels` | Set to `false` once every piece of content is real; this removes all "Sample" tags |

## 2. Replace the content — `content/`

| File | Section(s) |
| --- | --- |
| `media.ts` | Hero video and poster, closing image, URL helpers |
| `films.ts` | Film collection (03), signature film (04) and director's note |
| `stories.ts` | Stories behind the films (06) |
| `awards.ts` | Awards and recognition (05). **Verified entries only**; include a link to the official result |
| `testimonials.ts` | Kind words (08). **Real couples, with permission** |
| `gallery.ts` | Behind the lens (07) and the film-strip band |

Each `Film` supports `cover`, a small muted `preview` clip for hover, `src` (HD, loaded only when the player opens), an optional `src4k` (adds an HD/4K toggle), `couple`, `location`, `duration` and `fullFilmUrl`. Publish couple names and locations only with their approval.

### Replacing media

- **Hosting:** The demo hotlinks stock files. For the real site, host films on a video platform with adaptive streaming (Mux, Cloudflare Stream, Bunny Stream or Vimeo Pro) and point `src`/`src4k` at the MP4 or HLS URLs, or embed the full film through `fullFilmUrl`. If you use a new image host, add its domain to `images.remotePatterns` in `next.config.ts`.
- **Hero clip:** Use a 10–20 s, muted, 1080p–1440p loop under about 8 MB, plus a poster JPG. It loads after first paint and is skipped for reduced-motion and data-saver visitors.
- **Hover previews:** Use about 360p, 5–8 s and under 1.5 MB. They load on the first hover only.
- **Images:** `next/image` serves AVIF/WebP at responsive sizes automatically.
- **Stock licences:** Pexels, Mixkit and Unsplash allow free commercial use, but remove all stock before launch so the portfolio shows only the filmmaker's real work.

## WhatsApp booking flow

`lib/whatsapp.ts` builds every link in the official `https://wa.me/<number>?text=<encoded>` format.

1. The form checks name, wedding date (today or later) and location, then moves focus to the first problem.
2. It builds the prefilled message (optional fields are left out when empty) and URL-encodes it.
3. It opens WhatsApp (the app on phones, WhatsApp Web on desktop) so the visitor can review the message and send it.
4. The page shows an honest status: *the inquiry has started, and the date is confirmed only when the filmmaker replies*. Nothing is stored and nothing is booked automatically.

The hero, navigation, collection, film player, sticky mobile bar and closing CTAs open a shorter prefilled date inquiry.

## Structure

```
app/            layout (fonts, SEO, JSON-LD), page, privacy, sitemap, robots, 404
components/
  providers/    SmoothScroll (Lenis), Motion (declarative GSAP reveals), VideoPlayer (modal)
  sections/     Nav, Hero, Philosophy, FilmCollection, FilmStrip, SignatureFilm,
                Awards, Stories, BehindTheLens, Testimonials, Booking, Closing/Footer
  ui/           primitives (CTA, tags, icons), brand, Cursor, MobileCTA
config/site.ts  business details
content/        all copy and media
lib/            whatsapp + scroll helpers
```

**Animation attributes** (handled in `components/providers/Motion.tsx`): `data-split` (word reveal), `data-fade`, `data-stagger`, `data-mask` (image-mask reveal), `data-parallax="12"` and `data-delay="0.2"`. Visitors who prefer reduced motion get the final state immediately, with no smooth scroll, custom cursor or autoplaying hero.

## Before launch

- [ ] Set `url`, brand name, contact details and socials in `config/site.ts`
- [ ] Replace every stock film, still and story with the filmmaker's own work, then set `showDemoLabels: false`
- [ ] Add verified awards (with official links) and real testimonials, or keep the placeholders until you have them
- [ ] Review the Privacy Policy copy (`app/privacy/page.tsx`) with a legal adviser
- [ ] If you add analytics, add a consent banner where required and update the privacy page
