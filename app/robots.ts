import { MetadataRoute } from "next";

// Kdo smí web procházet. Cíl je být vidět ve vyhledávačích i v odpovědích AI,
// proto jsou povolení vyhledávací roboti, roboti pro živé odpovědi (agent
// otevře stránku, když se na ni uživatel ptá) i roboti pro trénink modelů
// (značka se pak objeví i v odpovědích bez vyhledávání).
// Robot s vlastní skupinou ignoruje skupinu "*", proto mají všichni stejné
// zákazy. Seznam ověřen 11/2026 podle dokumentace jednotlivých firem.
const BOTS: Record<string, string[]> = {
  // Google: vyhledávání, AI Overviews, AI Mode. Google-Extended = Gemini a trénink.
  Google: ["Googlebot", "Google-Extended", "GoogleOther", "Google-CloudVertexBot"],
  // Microsoft: Bing a Copilot. Z indexu Bingu čerpá i ChatGPT a DuckDuckGo.
  Microsoft: ["Bingbot"],
  // Seznam: vlastní český vyhledávač.
  Seznam: ["SeznamBot"],
  // OpenAI: vyhledávání v ChatGPT, otevírání stránek za uživatele, trénink.
  OpenAI: ["OAI-SearchBot", "ChatGPT-User", "GPTBot"],
  // Anthropic: vyhledávání v Claude, otevírání stránek za uživatele, trénink.
  Anthropic: ["Claude-SearchBot", "Claude-User", "ClaudeBot"],
  // Perplexity: vlastní index a otevírání stránek za uživatele.
  Perplexity: ["PerplexityBot", "Perplexity-User"],
  // Apple: Siri, Spotlight, Safari. Applebot-Extended = Apple Intelligence.
  Apple: ["Applebot", "Applebot-Extended"],
  // Meta: Meta AI a náhledy odkazů.
  Meta: ["meta-externalagent", "meta-externalfetcher", "facebookexternalhit"],
  // Amazon: Alexa a Rufus.
  Amazon: ["Amazonbot"],
  // Mistral: Le Chat otevírá stránky za uživatele.
  Mistral: ["MistralAI-User"],
  // DuckDuckGo: odpovědi Duck.ai / DuckAssist.
  DuckDuckGo: ["DuckAssistBot"],
  // Common Crawl: veřejný archiv webu, ze kterého trénuje většina modelů.
  CommonCrawl: ["CCBot"],
};

const disallow = ["/api/", "/admin", "/admin-setup", "/md/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: Object.values(BOTS).flat(), allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: "https://vizeon.cz/sitemap.xml",
    host: "https://vizeon.cz",
  };
}
