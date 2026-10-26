"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { stories, type Story } from "@/content/stories";
import { useVideoPlayer } from "@/components/providers/VideoPlayer";
import { SampleTag, SectionLabel } from "@/components/ui/primitives";

export function Stories() {
  return (
    <section id="stories" className="relative bg-ivory text-ink" aria-labelledby="stories-title">
      <div className="mx-auto max-w-[1600px] px-5 pt-28 sm:px-10 md:pt-40">
        <SectionLabel index="06" tone="dark">
          Stories Behind the Films
        </SectionLabel>
        <h2 id="stories-title" className="display mt-10 max-w-6xl text-[clamp(2.6rem,6.5vw,7rem)]">
          <span data-split className="block">
            Every Wedding Has a Story
          </span>{" "}
          <span data-split data-delay="0.12" className="block italic text-taupe-deep">
            Worth Remembering.
          </span>
        </h2>
      </div>

      <div className="mx-auto max-w-[1600px] space-y-32 px-5 py-24 sm:px-10 md:space-y-48 md:py-32">
        {stories.map((s, i) => (
          <StoryFeature key={s.id} story={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StoryFeature({ story, index }: { story: Story; index: number }) {
  const { open } = useVideoPlayer();
  const flip = index % 2 === 1;

  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:gap-12" aria-labelledby={`story-${story.id}`}>
      {/* Cover */}
      <div className={`relative lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
        <div data-mask className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[5/4]">
          <Image src={story.cover} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="grade object-cover" />
        </div>
        <span
          className={`display pointer-events-none absolute -top-10 text-[clamp(6rem,14vw,13rem)] italic leading-none text-gold/25 ${flip ? "-right-2 lg:-right-6" : "-left-2 lg:-left-6"}`}
          aria-hidden
        >
          0{index + 1}
        </span>
      </div>

      {/* Text */}
      <div className={`flex flex-col justify-center lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:pr-6" : "lg:pl-6"}`}>
        <div data-fade className="flex items-center gap-3 text-taupe-deep">
          <p className="meta">{story.setting}</p>
          <SampleTag show={story.demo} />
        </div>
        <h3 id={`story-${story.id}`} data-split className="display mt-6 text-5xl sm:text-6xl">
          {story.title}
        </h3>
        {story.couple && <p className="meta mt-4 text-gold">{story.couple}</p>}
        <p data-fade className="mt-6 max-w-md leading-relaxed text-ink/70">
          {story.intro}
        </p>

        <ul data-stagger className="mt-8 space-y-3 border-l border-gold/50 pl-5">
          {story.moments.map((m) => (
            <li key={m} className="font-serif text-xl italic text-ink/80">
              {m}
            </li>
          ))}
        </ul>

        {story.reflection && (
          <blockquote data-fade className="mt-10">
            <p className="font-serif text-2xl leading-snug">&ldquo;{story.reflection.quote}&rdquo;</p>
            <footer className="meta mt-3 text-taupe-deep">— {story.reflection.by}</footer>
          </blockquote>
        )}

        {story.film && (
          <button
            type="button"
            data-fade
            data-magnetic
            onClick={() => story.film && open(story.film)}
            className="btn btn-dark mt-10 self-start"
          >
            <Play className="size-3.5 fill-current" aria-hidden /> Watch their film
          </button>
        )}

        {/* Still frames */}
        <div data-stagger className="mt-12 grid grid-cols-3 gap-3">
          {story.stills.map((still, i) => (
            <div key={still.src} className={`relative aspect-[3/4] overflow-hidden bg-charcoal ${i === 1 ? "translate-y-6" : ""}`}>
              <Image src={still.src} alt={still.alt} fill sizes="(min-width: 1024px) 12vw, 30vw" className="grade object-cover transition-transform duration-1000 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
