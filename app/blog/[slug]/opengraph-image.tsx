import { buildOgImage, ogImageSize } from "@/lib/ogImage";
import { getPostBySlug, getSortedPosts } from "@/lib/data/blog";

export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getSortedPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return buildOgImage(post?.title ?? "Blog", post?.category ?? "VIZEON");
}
