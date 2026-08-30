import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Lokální SEO — Google i Seznam | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Lokální SEO",
    "Google Business Profile · Firmy.cz · Seznam Mapy"
  );
}
