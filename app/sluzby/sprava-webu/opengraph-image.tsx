import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Měsíční správa webu | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Správa webu od 480 Kč / měsíc",
    "Hodina práce · Aktualizace · Bezpečnost · Zásah při výpadku"
  );
}
