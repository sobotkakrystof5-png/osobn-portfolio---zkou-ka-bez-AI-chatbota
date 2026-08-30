import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Tvorba webových stránek na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Tvorba webových stránek na míru",
    "Online vizitka · Promo stránka · Plnohodnotný web"
  );
}
