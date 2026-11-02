import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Tvorba e-shopu na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Tvorba e-shopu na míru",
    "Platby · Doprava · Sklad · od 29 990 Kč"
  );
}
