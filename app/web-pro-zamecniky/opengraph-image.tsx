import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro zámečníky na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro zámečníky",
    "Galerie realizací · Rychlý kontakt · Hotovo do 10 dní"
  );
}
