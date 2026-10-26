"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { filmCategories } from "@/content/films";
import { unsplash } from "@/content/media";
import { bookingMessage, whatsappUrl, type BookingDetails } from "@/lib/whatsapp";
import { SectionLabel, WhatsAppIcon } from "@/components/ui/primitives";

type Errors = Partial<Record<"name" | "date" | "location", string>>;

const empty: BookingDetails = { name: "", partner: "", date: "", location: "", weddingType: "", message: "" };

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function validate(v: BookingDetails, today: string): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!v.date) e.date = "Please choose your wedding date.";
  else if (today && v.date < today) e.date = "That date has passed — please choose an upcoming date.";
  if (!v.location.trim()) e.location = "Where will you celebrate? A city is perfect.";
  return e;
}

export function Booking() {
  const uid = useId();
  const [values, setValues] = useState<BookingDetails>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => setToday(todayISO()), []);

  const set = (key: keyof BookingDetails) => (e: { target: { value: string } }) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (errors[key as keyof Errors]) setErrors(validate(next, today));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values, today);
    setErrors(found);
    const firstInvalid = (["name", "date", "location"] as const).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }
    const url = whatsappUrl(bookingMessage(values));
    // Opens WhatsApp (app on mobile, WhatsApp Web on desktop). The visitor reviews and sends it themselves.
    // ("noopener" in the features string would make window.open return null, hiding a blocked popup.)
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSentUrl(url);
  };

  const field = (key: "name" | "date" | "location") => ({
    id: `${uid}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
  });

  const ErrorText = ({ k }: { k: keyof Errors }) =>
    errors[k] ? (
      <p id={`${uid}-${k}-error`} className="mt-2 text-sm text-[#a4483a]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="booking" className="relative bg-ink text-ivory" aria-labelledby="booking-title">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image src={unsplash("photo-1587271636175-90d58cdad458", 2000)} alt="" fill sizes="100vw" className="grade object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-16 px-5 py-28 sm:px-10 md:py-40 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="09">The Booking Experience</SectionLabel>
          <h2 id="booking-title" className="display mt-10 text-[clamp(2.6rem,5.4vw,5.8rem)]">
            <span data-split className="block">
              Let&apos;s Make Your Wedding Film
            </span>{" "}
            <span data-split data-delay="0.15" className="block italic text-gold-soft">
              Unforgettable.
            </span>
          </h2>
          <p data-fade className="mt-10 max-w-md text-lg leading-relaxed text-ivory/75">
            Tell us a little about your celebration. We&apos;ll connect on WhatsApp to discuss your date, vision, and the story you
            want to preserve.
          </p>

          <div data-fade className="mt-14 space-y-5">
            <p className="meta text-ivory/50">Prefer to talk directly?</p>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="group flex items-center gap-4 text-lg">
                  <span className="grid size-11 place-items-center rounded-full border border-ivory/20 transition-colors group-hover:border-gold group-hover:text-gold">
                    <Phone className="size-4" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span>
                    <span className="sr-only">Call </span>
                    {siteConfig.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl("Hello! I'd love to talk about filming our wedding.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-lg"
                >
                  <span className="grid size-11 place-items-center rounded-full border border-ivory/20 transition-colors group-hover:border-gold group-hover:text-gold">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  Message on WhatsApp
                </a>
              </li>
              {siteConfig.email && (
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="group flex items-center gap-4 text-lg">
                    <span className="grid size-11 place-items-center rounded-full border border-ivory/20 transition-colors group-hover:border-gold group-hover:text-gold">
                      <Mail className="size-4" strokeWidth={1.5} aria-hidden />
                    </span>
                    {siteConfig.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-fade className="bg-ivory p-6 text-ink shadow-2xl shadow-black/40 xs:p-8 sm:p-12">
            {sentUrl ? (
              <div role="status" className="py-6">
                <p className="meta text-gold">Almost there</p>
                <h3 className="display mt-4 text-5xl">Your message is ready in WhatsApp.</h3>
                <p className="mt-6 leading-relaxed text-ink/70">
                  Review the details and tap <strong>send</strong> in WhatsApp to start your inquiry. This doesn&apos;t reserve
                  your date yet — we&apos;ll confirm availability personally when we reply.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                    <WhatsAppIcon /> Open WhatsApp again
                  </a>
                  <button type="button" className="btn border border-ink/20 hover:border-ink" onClick={() => setSentUrl(null)}>
                    Edit details
                  </button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-note`}>
                <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-name`} className="meta text-ink/60">
                      Your Name <span className="text-gold">*</span>
                    </label>
                    <input {...field("name")} className="field" value={values.name} onChange={set("name")} autoComplete="name" placeholder="Full name" required />
                    <ErrorText k="name" />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-partner`} className="meta text-ink/60">
                      Partner&apos;s Name <span className="normal-case tracking-normal text-ink/40">(optional)</span>
                    </label>
                    <input id={`${uid}-partner`} className="field" value={values.partner} onChange={set("partner")} placeholder="Their name" />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-date`} className="meta text-ink/60">
                      Wedding Date <span className="text-gold">*</span>
                    </label>
                    <input {...field("date")} type="date" min={today || undefined} className="field" value={values.date} onChange={set("date")} required />
                    <ErrorText k="date" />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-location`} className="meta text-ink/60">
                      Wedding Location <span className="text-gold">*</span>
                    </label>
                    <input {...field("location")} className="field" value={values.location} onChange={set("location")} placeholder="City or venue" required />
                    <ErrorText k="location" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-type`} className="meta text-ink/60">
                      Wedding Type <span className="normal-case tracking-normal text-ink/40">(optional)</span>
                    </label>
                    <select id={`${uid}-type`} className="field cursor-pointer" value={values.weddingType} onChange={set("weddingType")}>
                      <option value="">Select a style</option>
                      {filmCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-message`} className="meta text-ink/60">
                      A Short Message <span className="normal-case tracking-normal text-ink/40">(optional)</span>
                    </label>
                    <textarea
                      id={`${uid}-message`}
                      rows={3}
                      className="field resize-none"
                      value={values.message}
                      onChange={set("message")}
                      placeholder="Tell us about your celebration, guest count or the feeling you want your film to have."
                    />
                  </div>
                </div>

                <button type="submit" data-magnetic className="btn btn-dark mt-12 w-full sm:w-auto">
                  <WhatsAppIcon /> Check Date on WhatsApp
                </button>
                <p id={`${uid}-note`} className="mt-5 text-xs leading-relaxed text-ink/55">
                  Opens WhatsApp with your details prefilled so you can review before sending. Sending starts an inquiry — your date
                  is confirmed only once we reply.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
