import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "Služby — weby, AI chatboti, systémy a grafika | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "Služby — weby, AI chatboti, systémy a grafika",
    "Tvorba webů · AI Chatbot · Grafický design · Technické služby"
  );
}
