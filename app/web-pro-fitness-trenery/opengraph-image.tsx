import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro fitness trenéry na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro fitness trenéry",
    "Rezervační kalendář · Ceník balíčků · Hotovo do 10 dní"
  );
}
