import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro kadeřnictví na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web pro kadeřnictví, kde se klientky objednají samy",
    "Online rezervace · Ceník · Hotovo do 10 dní"
  );
}
