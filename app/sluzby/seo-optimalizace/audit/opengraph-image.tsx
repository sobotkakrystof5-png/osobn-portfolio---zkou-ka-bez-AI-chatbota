import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "SEO audit webu | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "SEO audit webu",
    "Technická kontrola · Klíčová slova · Konkurence"
  );
}
