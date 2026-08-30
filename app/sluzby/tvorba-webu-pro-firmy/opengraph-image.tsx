import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Tvorba webu pro firmy na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Tvorba webu pro firmy",
    "Prezentace týmu · Reference · Struktura pro B2B"
  );
}
