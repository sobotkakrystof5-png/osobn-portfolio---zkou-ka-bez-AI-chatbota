import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro studnaře na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web na míru pro studnaře",
    "Reference a důvěra · Oblast působnosti · Hotovo do 5 dní"
  );
}
