import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { awards, recognitions, type Award } from "@/content/awards";
import { SectionLabel } from "@/components/ui/primitives";

function Laurel({ className = "" }: { className?: string }) {
  const leaves = Array.from({ length: 7 });
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1">
      {[-1, 1].map((side) => (
        <g key={side} transform={side === 1 ? "translate(120 0) scale(-1 1)" : undefined}>
          <path d="M44 104 C 22 88, 14 60, 26 26" />
          {leaves.map((_, i) => {
            const t = i / (leaves.length - 1);
            const y = 98 - t * 68;
            const x = 40 - Math.sin(t * Math.PI * 0.9) * 18 - t * 4;
            return <ellipse key={i} cx={x - 6} cy={y} rx="7" ry="3" transform={`rotate(${-40 - t * 35} ${x - 6} ${y})`} />;
          })}
        </g>
      ))}
    </svg>
  );
}

function AwardCard({ award }: { award: Award }) {
  const body = (
    <>
      <div className="relative grid aspect-square w-full place-items-center text-gold">
        <Laurel className="absolute inset-0 size-full opacity-70" />
        {award.logo ? (
          <Image src={award.logo} alt={`${award.organization} logo`} width={96} height={96} className="relative max-h-20 w-auto object-contain" />
        ) : (
          <span className="display relative text-4xl text-ivory">{award.year}</span>
        )}
      </div>
      <p className="meta mt-6 text-gold">
        {award.organization} · {award.year}
      </p>
      <h3 className="mt-3 font-serif text-2xl leading-tight text-ivory">{award.title}</h3>
      {award.work && <p className="mt-2 text-sm text-taupe">{award.work}</p>}
      {award.url && (
        <span className="link-line meta mt-5 text-ivory/80">
          Official result <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
      )}
    </>
  );
  return award.url ? (
    <a href={award.url} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-80">
      {body}
    </a>
  ) : (
    <div>{body}</div>
  );
}

/** Reusable placeholder slot shown until genuine awards are supplied. Never rendered alongside real awards. */
function AwardPlaceholder({ index }: { index: number }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative grid aspect-square w-full max-w-56 place-items-center rounded-full border border-dashed border-gold/35 text-gold/50">
        <Laurel className="absolute inset-[8%] size-[84%]" />
        <span className="meta relative text-[0.6rem] text-gold/80">Slot 0{index + 1}</span>
      </div>
      <p className="meta mt-6 text-taupe/70">Placeholder</p>
      <p className="mt-2 font-serif text-xl text-ivory/50">Verified award title</p>
      <p className="mt-1 text-xs text-taupe/60">Organisation · Year · Film</p>
    </div>
  );
}

export function Awards() {
  const hasAwards = awards.length > 0;

  return (
    <section id="awards" className="relative bg-charcoal text-ivory" aria-labelledby="awards-title">
      <div className="mx-auto max-w-[1600px] px-5 py-28 sm:px-10 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="05">Awards &amp; Recognition</SectionLabel>
          </div>
          <h2 id="awards-title" className="display mt-10 text-[clamp(2.6rem,6vw,6.2rem)]">
            <span data-split className="block">
              Recognized for the
            </span>{" "}
            <span data-split data-delay="0.12" className="block italic text-gold-soft">
              Stories We Tell.
            </span>
          </h2>
          <div className="hairline mx-auto mt-12 max-w-md" />
        </div>

        {hasAwards ? (
          <div data-stagger className="mt-20 grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-4">
            {awards.map((a) => (
              <AwardCard key={`${a.organization}-${a.title}-${a.year}`} award={a} />
            ))}
          </div>
        ) : (
          <>
            <div data-stagger className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <AwardPlaceholder key={i} index={i} />
              ))}
            </div>
            <p data-fade className="mx-auto mt-16 max-w-xl text-center text-sm leading-relaxed text-taupe">
              Only genuine, verifiable recognition is shown here. Festival selections, awards, press features and memberships
              will appear once they are supplied with links to the official results.
            </p>
          </>
        )}

        {recognitions.length > 0 && (
          <ul data-fade className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-ivory/10 pt-12">
            {recognitions.map((r) => (
              <li key={r.name} className="meta text-ivory/60">
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-line hover:text-gold">
                    {r.name}
                  </a>
                ) : (
                  r.name
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
