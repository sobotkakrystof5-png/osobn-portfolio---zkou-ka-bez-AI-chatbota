import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "O mně — jeden člověk místo agentury | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "O mně — jeden člověk místo agentury",
    "Kryštof Sobotka · Webdesignér na volné noze · Nejsem agentura"
  );
}
