import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro řezbáře na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro řezbáře",
    "Galerie prací · Poptávka na zakázku · Hotovo do 10 dní"
  );
}
