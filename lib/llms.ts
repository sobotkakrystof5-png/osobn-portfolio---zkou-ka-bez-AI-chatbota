import { getSortedPosts } from "@/lib/blog";
import { postToMarkdown } from "@/lib/blog-markdown";
import { INDUSTRIES } from "@/lib/data/industries";
import { automationPages } from "@/lib/data/automation-pages";
import { projects } from "@/lib/data/portfolio";
import { PRICING_CATEGORIES } from "@/lib/data/pricing";
import { ZAKAZIQ_PRICE } from "@/lib/data/zakaziq";

// Obsah /llms.txt (llmstxt.org): mapa webu pro AI modely a agenty. Skládá se
// z dat webu (ceník, obory, automatizace, blog, reference), takže nový článek
// nebo obor se sem dostane sám. Prostý text, ne logo značky. Články odkazují
// na svou Markdown verzi (/blog/<slug>.md), /llms-full.txt k tomu přidá plné znění.

const BASE = "https://vizeon.cz";

const CATEGORY_URL: Record<string, string> = {
  Weby: "/sluzby/tvorba-webovych-stranek",
  "E-shopy": "/sluzby/tvorba-e-shopu",
  Design: "/sluzby/graficke-designy",
  "AI Chatbot": "/sluzby/ai-chatbot",
  "Systémy na míru": "/sluzby/systemy-na-miru",
  "Technické služby": "/sluzby/technicke-sluzby",
  "SEO optimalizace": "/sluzby/seo-optimalizace",
  "Automatizace a AI (ALTENO)": "/automatizace",
};

function item(name: string, p: string) {
  if (/^(od |\d)/.test(p)) return `${name} ${p}`;
  if (/^(individuální|na dotaz)$/i.test(p)) return `${name} cena ${p.toLowerCase()}`;
  return `${name} (${p.toLowerCase()})`;
}

function link(title: string, path: string, note?: string) {
  return `- [${title}](${BASE}${path})${note ? `: ${note}` : ""}`;
}

export function buildLlmsTxt(): string {
  const pricing = PRICING_CATEGORIES.map((c) =>
    link(
      c.category,
      CATEGORY_URL[c.category] ?? "/sluzby",
      c.items.map((i) => item(i.name, i.price)).join(", "),
    ),
  );

  const body = [
    "# VIZEON",
    "",
    "> VIZEON dělá weby a e-shopy na míru pro firmy a živnostníky v Česku: moderní design, SEO, automatizace procesů a AI chatboti (pod sesterskou značkou ALTENO). Ceny jsou veřejné a komunikace probíhá přímo, bez prostředníků.",
    "",
    "IČO 29977231. Kontakt: info@vizeon.cz. Jazyk webu: čeština. Působíme online po celé ČR.",
    "",
    "## Ceník",
    link("Cena tvorby webu", "/cena-tvorby-webu", "srovnání balíčků a co ovlivňuje cenu"),
    link("Všechny služby", "/sluzby"),
    ...pricing,
    "",
    "## Služby",
    link("Tvorba webových stránek", "/sluzby/tvorba-webovych-stranek"),
    link("Tvorba webu pro firmy", "/sluzby/tvorba-webu-pro-firmy"),
    link("Tvorba webu pro živnostníky", "/tvorba-webu-pro-zivnostniky"),
    link("Tvorba e-shopu", "/sluzby/tvorba-e-shopu"),
    link("SEO optimalizace", "/sluzby/seo-optimalizace"),
    link("SEO audit", "/sluzby/seo-optimalizace/audit"),
    link("Lokální SEO", "/sluzby/seo-optimalizace/lokalni-seo"),
    link("Obsahové SEO", "/sluzby/seo-optimalizace/obsahove-seo"),
    link("Technické SEO", "/sluzby/seo-optimalizace/technicke-seo"),
    link("Správa webu", "/sluzby/sprava-webu"),
    link("Jak probíhá spolupráce", "/spoluprace"),
    "",
    "## Automatizace a AI (ALTENO)",
    link("Automatizace a AI", "/automatizace"),
    ...automationPages.map((p) => link(p.title, `/automatizace/${p.slug}`, p.lead)),
    "",
    "## ZakazIQ",
    link(
      "ZakazIQ",
      "/zakaziq",
      `vlastní systém VIZEON, klientský prostor k projektu a aplikace pro malé firmy na poptávky, kalendář, zákazníky, zakázky a faktury za ${ZAKAZIQ_PRICE} Kč měsíčně`,
    ),
    link("Rezervační systém", "/zakaziq/rezervacni-system"),
    "",
    "## Weby podle oboru",
    ...INDUSTRIES.map((i) => link(i.name, `/${i.slug}`)),
    "",
    "## Blog",
    ...getSortedPosts().map((p) => link(p.title, `/blog/${p.slug}.md`, p.excerpt)),
    "",
    "## Reference",
    link("Ukázky webů", "/ukazky-webu", "realizované weby pro klienty i vlastní produkty"),
    ...projects.map((p) => link(p.title, `/ukazky-webu/${p.slug}`, p.category)),
    "",
    "## Optional",
    link("Často kladené otázky", "/faq"),
    link("O mně", "/o-mne"),
    link("Kontakt", "/kontakt"),
    link("RSS blogu", "/blog/rss.xml"),
    link("Plné znění článků pro AI", "/llms-full.txt"),
    "",
  ].join("\n");

  return body;
}

export function buildLlmsFullTxt(): string {
  const articles = getSortedPosts().map(postToMarkdown).join("\n\n---\n\n");
  return `${buildLlmsTxt()}\n---\n\n# Články v plném znění\n\n${articles}\n`;
}
