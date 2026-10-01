import { buildOgImage, ogImageSize } from "@/lib/ogImage";
import { automationPages, getAutomationPage } from "@/lib/data/automation-pages";

export const alt = "Automatizace by ALTENO | VIZEON";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return automationPages.map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getAutomationPage(slug);
  return buildOgImage(page?.title ?? "Automatizace", "ALTENO × VIZEON");
}
