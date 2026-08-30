import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro zahradníky na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro zahradníky",
    "Galerie před/po · Rychlá poptávka · Hotovo do 10 dní"
  );
}
