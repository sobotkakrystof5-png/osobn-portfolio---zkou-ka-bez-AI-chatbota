import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Blog — tvorba webů, SEO a online prezentace | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Blog — tvorba webů, SEO a online prezentace",
    "Tvorba webů · SEO optimalizace · Online prezentace"
  );
}
