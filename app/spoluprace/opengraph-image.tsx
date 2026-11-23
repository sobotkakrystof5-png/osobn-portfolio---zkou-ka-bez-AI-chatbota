import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Jak probíhá spolupráce: 4 kroky ke spuštění webu | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Jak probíhá spolupráce: 4 kroky ke spuštění webu",
    "Konzultace · Návrh · Tvorba · Spuštění"
  );
}
