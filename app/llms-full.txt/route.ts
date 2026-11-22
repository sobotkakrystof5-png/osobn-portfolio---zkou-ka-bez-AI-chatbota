import { buildLlmsFullTxt } from "@/lib/llms";

// /llms-full.txt: llms.txt + plné znění všech článků v Markdownu (lib/llms.ts).
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
