import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "VIZEON — Weby pro živnostníky, které přivádějí zákazníky";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Weby pro živnostníky, které přivádějí zákazníky",
    "Web na míru · 10 dní · Bez skrytých poplatků"
  );
}
