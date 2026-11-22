import { buildLlmsTxt } from "@/lib/llms";

// /llms.txt pro AI modely a agenty. Obsah skládá lib/llms.ts z dat webu.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
