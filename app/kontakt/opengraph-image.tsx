import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Kontakt — plán a cena vašeho webu | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Kontakt — plán a cena vašeho webu",
    "Poptávka webu · Odpověď do hodiny · Bez závazků"
  );
}
