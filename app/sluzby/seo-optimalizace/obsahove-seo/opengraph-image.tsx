import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Obsahové SEO | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Obsahové SEO",
    "Klíčová slova · Obsahová strategie · Prolinkování"
  );
}
