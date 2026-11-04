import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "O nás — od prvního kódu k vlastní firmě | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "O nás — od prvního kódu k vlastní firmě",
    "Kryštof · Zakladatel VIZEON a ALTENO · Míříme do Německa"
  );
}
