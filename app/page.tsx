import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { FilmCollection } from "@/components/sections/FilmCollection";
import { FilmStrip } from "@/components/sections/FilmStrip";
import { SignatureFilm } from "@/components/sections/SignatureFilm";
import { Awards } from "@/components/sections/Awards";
import { Stories } from "@/components/sections/Stories";
import { BehindTheLens } from "@/components/sections/BehindTheLens";
import { Testimonials } from "@/components/sections/Testimonials";
import { Booking } from "@/components/sections/Booking";
import { Closing, Footer } from "@/components/sections/Closing";
import { MobileCTA } from "@/components/ui/MobileCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Philosophy />
        <FilmCollection />
        <FilmStrip />
        <SignatureFilm />
        <Awards />
        <Stories />
        <BehindTheLens />
        <Testimonials />
        <Booking />
        <Closing />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
