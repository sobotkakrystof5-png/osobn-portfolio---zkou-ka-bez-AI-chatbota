import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "ZakazIQ — každá poptávka na svém místě | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "ZakazIQ — každá poptávka na svém místě",
    "Poptávky · Kalendář · Zákazníci · Faktury · 249 Kč měsíčně"
  );
}
