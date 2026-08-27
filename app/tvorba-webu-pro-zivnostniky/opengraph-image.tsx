import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Tvorba webu pro živnostníky na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Tvorba webu pro živnostníky, který vám přivádí zákazníky",
    "Bez šablon · Hotovo do 10 dní · Transparentní ceník"
  );
}
