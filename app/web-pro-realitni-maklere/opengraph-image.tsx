import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro realitní makléře na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro realitní makléře",
    "Osobní značka · Přehled nabídek · Hotovo do 10 dní"
  );
}
