import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Kontakt — nezávazná konzultace zdarma | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Kontakt — nezávazná konzultace zdarma",
    "Poptávka webu · Odpověď do 24 hodin · Bez závazků"
  );
}
