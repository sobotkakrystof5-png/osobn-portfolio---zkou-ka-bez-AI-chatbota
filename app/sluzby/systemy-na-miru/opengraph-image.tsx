import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Systémy na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Systémy na míru",
    "Rezervační systémy · Kalkulačky · Nástroje na míru"
  );
}
