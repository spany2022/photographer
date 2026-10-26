import { siteConfig } from "@/config/site";

/** Official Click-to-Chat format: https://wa.me/<number>?text=<urlencoded> */
export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const quickInquiryMessage = [
  "Hello! I'm interested in your wedding filmmaking services.",
  "",
  "Could you please let me know if my wedding date is available and share your packages?",
  "",
  "Wedding Date: ",
  "Wedding Location: ",
  "",
  "Thank you!",
].join("\n");

export const quickInquiryUrl = whatsappUrl(quickInquiryMessage);

export type BookingDetails = {
  name: string;
  partner?: string;
  date: string; // yyyy-mm-dd from <input type="date">
  location: string;
  weddingType?: string;
  message?: string;
};

/** "2027-02-14" → "Sunday, 14 February 2027" (parsed as a local date, no TZ shift). */
export function formatWeddingDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function bookingMessage(details: BookingDetails) {
  const line = (label: string, value?: string) =>
    value && value.trim() ? [`${label}: ${value.trim()}`] : [];

  return [
    "Hello! I'm interested in booking your wedding filmmaking services.",
    "",
    ...line("Name", details.name),
    ...line("Partner", details.partner),
    ...line("Wedding Date", formatWeddingDate(details.date)),
    ...line("Wedding Location", details.location),
    ...line("Wedding Type", details.weddingType),
    ...(details.message?.trim() ? ["", `Message: ${details.message.trim()}`] : []),
    "",
    "Could you please let me know if my wedding date is available and share your packages?",
    "Thank you!",
  ].join("\n");
}
