import { buildOgImage, ogImageSize } from "@/lib/ogImage";
import { getAllSlugs, getAnyPostBySlug } from "@/lib/blog";

export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAnyPostBySlug(slug);
  return buildOgImage(post?.title ?? "Blog", post?.category ?? "VIZEON");
}
