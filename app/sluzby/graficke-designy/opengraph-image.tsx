import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Grafické designy | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Grafické designy",
    "Logo · Vizitky · Bannery · Tiskoviny"
  );
}
