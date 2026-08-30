import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Ukázky webů a reference od klientů | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Ukázky webů a reference od klientů",
    "Skutečné projekty · Upřímná hodnocení · Bez agentury"
  );
}
