import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro autoservisy na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro autoservisy",
    "Přehled služeb · Rychlá objednávka · Hotovo do 10 dní"
  );
}
