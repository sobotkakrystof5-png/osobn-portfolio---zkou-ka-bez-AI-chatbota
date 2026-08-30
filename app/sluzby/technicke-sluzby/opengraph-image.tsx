import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Technické služby | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Technické služby",
    "Doména · Přesměrování · Přelinkování · Údržba webu"
  );
}
