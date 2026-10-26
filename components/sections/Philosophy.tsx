import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { unsplash } from "@/content/media";
import { SampleTag, SectionLabel } from "@/components/ui/primitives";

const pillars = [
  { title: "Documentary at heart", text: "We observe more than we direct, so the film holds what really happened — not a performance of it." },
  { title: "Light, never forced", text: "Natural skin tones, honest colour and frames composed around the light you already have." },
  { title: "Story-led edits", text: "Every film is cut around your vows, your voices and your rhythm, never a template." },
];

export function Philosophy() {
  const { filmmaker } = siteConfig;

  return (
    <section id="philosophy" className="relative overflow-hidden bg-ivory text-ink" aria-labelledby="philosophy-title">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 py-28 sm:px-10 md:py-40 lg:grid-cols-12 lg:gap-10">
        {/* Imagery */}
        <div className="relative lg:col-span-5">
          <div data-mask className="relative aspect-[4/5] overflow-hidden bg-charcoal">
            <Image
              src={unsplash("photo-1519689950823-0a2251441815", 1400)}
              alt="Filmmaker with a cinema camera filming a garden wedding ceremony"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="grade object-cover"
            />
          </div>
          <div className="absolute -bottom-12 -right-2 w-[46%] sm:-right-10 lg:-right-16" data-parallax="14">
            <div data-mask data-delay="0.3" className="relative aspect-[3/4] overflow-hidden border-[6px] border-ivory bg-charcoal shadow-2xl shadow-ink/20">
              <Image
                src={unsplash("photo-1621801306185-8c0ccf9c8eb8", 700)}
                alt="Two hands with intricate henna holding each other"
                fill
                sizes="(min-width: 1024px) 18vw, 45vw"
                className="grade object-cover"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 text-taupe-deep">
            <p className="meta">Behind the camera</p>
            <SampleTag />
          </div>
        </div>

        {/* Statement */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <SectionLabel index="02" tone="dark">
            The Filmmaker&apos;s Philosophy
          </SectionLabel>

          <h2 id="philosophy-title" className="display mt-10 text-[clamp(2.8rem,6.2vw,6.2rem)]">
            <span data-split className="block">
              More Than a Wedding Film.
            </span>{" "}
            <span data-split data-delay="0.15" className="block italic text-taupe-deep">
              A Feeling That Stays.
            </span>
          </h2>

          <p data-fade className="mt-12 max-w-xl font-serif text-2xl leading-snug text-ink/85 sm:text-[1.7rem]">
            Every wedding has its own rhythm, its own quiet glances, and its own unforgettable moments. We capture the real
            emotions, meaningful details, and fleeting seconds that turn your wedding day into a film you can feel for a
            lifetime.
          </p>

          <p data-fade className="mt-8 max-w-xl leading-relaxed text-ink/70">
            {filmmaker.name ? `${filmmaker.name} leads` : "Our founding filmmaker leads"} a small, devoted team that films a
            limited number of weddings each season — so every couple gets the time, attention and care their story deserves.
            We arrive early, stay quiet, and keep the camera close to the moments that matter.
          </p>

          {filmmaker.yearsExperience && (
            <p data-fade className="mt-10 flex items-baseline gap-4">
              <span className="display text-7xl text-gold">{filmmaker.yearsExperience}+</span>
              <span className="meta text-taupe-deep">Years filming weddings</span>
            </p>
          )}

          <ul data-stagger className="mt-14 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.title}>
                <span className="meta text-gold">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-2xl leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{p.text}</p>
              </li>
            ))}
          </ul>

          <a data-fade href="#behind-the-lens" className="link-line meta mt-14 text-ink">
            Our complete story <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
