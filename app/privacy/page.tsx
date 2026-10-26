import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/brand";
import { Footer } from "@/components/sections/Closing";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles the information you share when enquiring about a wedding film.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-10">
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="text-ivory">
          <Logo />
        </Link>
        <Link href="/" className="link-line meta text-ivory/80">
          <ArrowLeft className="size-3.5" aria-hidden /> Back to films
        </Link>
      </header>
      <main id="main" className="bg-ivory text-ink">
        <article className="mx-auto max-w-3xl px-5 py-24 sm:px-10 md:py-32">
          <p className="meta text-taupe-deep">Legal</p>
          <h1 className="display mt-6 text-6xl sm:text-7xl">Privacy Policy</h1>
          <div className="mt-12 space-y-8 leading-relaxed text-ink/75 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink">
            <p>
              This page explains what happens to the information you share with {siteConfig.name} through this website. Please
              review it with your own legal adviser before publishing — it describes how the site is built today.
            </p>
            <h2>The enquiry form</h2>
            <p>
              The booking form does not send your details to our servers or store them. When you press &ldquo;Check Date on
              WhatsApp&rdquo;, your browser builds a message from what you typed and opens WhatsApp, where you can review it before
              choosing to send. Once sent, the conversation is handled by WhatsApp under{" "}
              <a className="underline" href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                WhatsApp&apos;s privacy policy
              </a>
              .
            </p>
            <h2>How we use your enquiry</h2>
            <p>
              We use the details you send — names, wedding date, location and message — only to reply to your enquiry, discuss
              availability and share our packages. We don&apos;t sell or share them with third parties for marketing.
            </p>
            <h2>Cookies &amp; analytics</h2>
            <p>
              This site doesn&apos;t set advertising or analytics cookies. If analytics are added in future, this policy will be
              updated and consent requested where the law requires it.
            </p>
            <h2>Embedded media</h2>
            <p>
              Films and images may be streamed from third-party media hosts. Those hosts receive standard technical information
              (such as your IP address) needed to deliver the files.
            </p>
            <h2>Your choices</h2>
            <p>
              You can ask us to delete your enquiry conversation at any time by messaging us on WhatsApp at{" "}
              {siteConfig.phoneDisplay}
              {siteConfig.email ? ` or emailing ${siteConfig.email}` : ""}.
            </p>
          </div>
        </article>
      </main>
      <Footer base="/" />
    </>
  );
}
