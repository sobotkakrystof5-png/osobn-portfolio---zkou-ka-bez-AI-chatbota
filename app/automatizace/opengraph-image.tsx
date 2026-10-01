import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Automatizace a AI pro majitele webu | ALTENO × VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

// Podtitulek stejný jako u podstránek /automatizace/<slug>: spolupráce dvou
// značek je vidět hned v náhledu odkazu.
export default function Image() {
  return buildOgImage("Automatizace a AI pro majitele webu", "ALTENO × VIZEON");
}
