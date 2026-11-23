import { buildLlmsFullTxt } from "@/lib/llms";

// /llms-full.txt: llms.txt + plné znění všech článků v Markdownu (lib/llms.ts).
export const dynamic = "force-static";
// Obnova každých 5 minut: naplánovaný článek se ukáže nejpozději pár minut po
// svém publishAt, i když GitHub cron (blog-publish.yml) nasazení zpozdí.
export const revalidate = 300;

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
