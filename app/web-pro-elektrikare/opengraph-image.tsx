import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro elektrikáře na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro elektrikáře",
    "Nonstop kontakt · Přehled revizí · Hotovo do 10 dní"
  );
}
