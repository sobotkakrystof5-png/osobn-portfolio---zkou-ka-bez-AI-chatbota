import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro sanační firmy na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro sanační firmy",
    "Srozumitelné vysvětlení postupu · Hotovo do 10 dní"
  );
}
