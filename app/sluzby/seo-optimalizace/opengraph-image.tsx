import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "SEO optimalizace webu | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "SEO optimalizace webu",
    "Audit · Lokální SEO · Obsahové a technické SEO"
  );
}
