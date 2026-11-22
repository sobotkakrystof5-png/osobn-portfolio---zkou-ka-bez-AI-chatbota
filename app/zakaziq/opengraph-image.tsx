import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "ZakazIQ — rychlejší projekty, spokojenější klienti | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "ZakazIQ — rychlejší projekty, spokojenější klienti",
    "Klientský prostor · Aplikace pro firmy za 249 Kč měsíčně"
  );
}
