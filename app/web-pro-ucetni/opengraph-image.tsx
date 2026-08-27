import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro účetní na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web pro účetní, který na první pohled působí důvěryhodně",
    "Jasný přehled služeb · Hotovo do 10 dní"
  );
}
