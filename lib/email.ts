// Resend sender helpers.
// Defenzivní vrstva proti ByteString chybě: HTTP hlavičky (from, subject)
// musí být ASCII. Tento helper sanitizuje vstup a umožňuje override
// odesílací adresy přes ENV (např. po verifikaci vlastní domény na Resend).

const FALLBACK = {
  bookingNotification: "VIZEON Booking <onboarding@resend.dev>",
  bookingConfirmation: "Krystof Sobotka - VIZEON <onboarding@resend.dev>",
  contact:             "VIZEON Kontakt <onboarding@resend.dev>",
} as const;

export function asciiSafe(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[^\x20-\x7E]/g, "");
}

export function bookingNotificationFrom(): string {
  return asciiSafe(process.env.RESEND_BOOKING_FROM ?? FALLBACK.bookingNotification);
}

export function bookingConfirmationFrom(): string {
  return asciiSafe(process.env.RESEND_BOOKING_CONFIRM_FROM ?? FALLBACK.bookingConfirmation);
}

export function contactFrom(): string {
  return asciiSafe(process.env.RESEND_CONTACT_FROM ?? FALLBACK.contact);
}
