import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Automatizace a AI pro majitele webu | VIZEON × ALTENO";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Automatizace a AI pro majitele webu",
    "AI agenti · Automatizace · Chatboti a RAG · Voice agenti"
  );
}
