import { siteConfig } from "@/config/site";

export const navLinks = [
  { id: "films", label: "Films" },
  { id: "philosophy", label: "Philosophy" },
  { id: "awards", label: "Recognition" },
  { id: "stories", label: "Stories" },
  { id: "booking", label: "Enquire" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-baseline gap-2 leading-none ${className}`}>
      <span className="font-serif text-2xl font-normal tracking-tight">{siteConfig.shortName}</span>
      <span className="meta text-[0.55rem] text-gold">Films</span>
    </span>
  );
}
