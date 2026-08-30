import { buildOgImage, ogImageSize } from "@/lib/ogImage";

export const alt = "AI Chatbot na míru | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage(
    "AI Chatbot na míru",
    "Odpovídá zákazníkům 24/7 přímo na webu"
  );
}
