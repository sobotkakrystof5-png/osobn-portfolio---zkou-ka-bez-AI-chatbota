import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Cena tvorby webu na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Cena tvorby webu na míru",
    "Transparentní ceník · Od 4 999 Kč · Bez skrytých poplatků"
  );
}
