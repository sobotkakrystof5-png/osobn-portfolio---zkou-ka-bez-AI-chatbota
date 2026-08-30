import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro instalatéry na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro instalatéry",
    "Nonstop kontakt · Přehled služeb · Hotovo do 10 dní"
  );
}
