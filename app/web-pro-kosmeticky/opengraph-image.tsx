import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro kosmetičky na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro kosmetičky",
    "Online rezervace · Galerie proměn · Hotovo do 10 dní"
  );
}
