import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro fotografy na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro fotografy",
    "Rychlé portfolio · Přehled specializací · Hotovo do 10 dní"
  );
}
