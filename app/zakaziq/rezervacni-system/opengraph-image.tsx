import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Rezervační systém ZakazIQ | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Rezervační systém",
    "Konzultace na jedno kliknutí · Bez volání"
  );
}
