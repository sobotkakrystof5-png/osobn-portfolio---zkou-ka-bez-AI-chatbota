import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "ZakazIQ — klientský portál pro vaše projekty | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "ZakazIQ — klientský portál pro vaše projekty",
    "Přímá komunikace · Zpětná vazba · Přehled o projektu"
  );
}
