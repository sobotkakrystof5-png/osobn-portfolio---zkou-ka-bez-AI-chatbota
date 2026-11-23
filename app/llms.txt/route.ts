import { buildLlmsTxt } from "@/lib/llms";

// /llms.txt pro AI modely a agenty. Obsah skládá lib/llms.ts z dat webu.
export const dynamic = "force-static";
// Obnova každých 5 minut: naplánovaný článek se ukáže nejpozději pár minut po
// svém publishAt, i když GitHub cron (blog-publish.yml) nasazení zpozdí.
export const revalidate = 300;

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
