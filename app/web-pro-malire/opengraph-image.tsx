import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro malíře pokojů na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro malíře pokojů",
    "Fotky před/po · Rychlá poptávka · Hotovo do 5 dní"
  );
}
