import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Web pro masérky a wellness studia na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Web pro masérky, který sám o sobě působí klidně",
    "Rezervační kalendář · Klidný design · Hotovo do 10 dní"
  );
}
