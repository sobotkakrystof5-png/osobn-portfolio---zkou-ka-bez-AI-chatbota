import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro řemeslníky na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web pro řemeslníky, který ukáže vaši práci",
    "Galerie realizací · Rychlá poptávka · Hotovo do 10 dní"
  );
}
