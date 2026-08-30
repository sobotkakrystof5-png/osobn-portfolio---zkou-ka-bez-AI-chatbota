import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Technické SEO | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Technické SEO",
    "Core Web Vitals · Strukturovaná data · Indexovatelnost"
  );
}
