import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Časté dotazy — odpovědi na vaše otázky | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Časté dotazy — odpovědi na vaše otázky",
    "Délka realizace · Průběh spolupráce · Cena a správa webu"
  );
}
