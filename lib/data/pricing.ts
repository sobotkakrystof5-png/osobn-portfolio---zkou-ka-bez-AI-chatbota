import { Globe, Palette, Bot, CalendarClock, Wrench, Search, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PricingItem = {
  id: string;
  name: string;
  subtitle?: string;
  price: string;
  bonus?: string;
  featured?: boolean;
  badge?: string;
  variants?: string[];
  /** FirstClientModal (rychlá poptávka) má záměrně užší výběr než plný ceník. */
  includeInQuickInquiry?: boolean;
};

export type PricingCategory = {
  category: string;
  emoji: string;
  icon: LucideIcon;
  items: PricingItem[];
};

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    category: "Weby",
    emoji: "🌐",
    icon: Globe,
    items: [
      {
        id: "micro",
        name: "Micro Page",
        subtitle:
          "Jedna stránka na jeden účel: coming soon, link-in-bio nebo redirect. Vyberete si jednu ze tří variant, ne balíček všech tří.",
        price: "od 4 999 Kč",
        badge: "Nejlevnější",
        variants: ["Coming soon", "Link-in-bio", "Redirect"],
        includeInQuickInquiry: true,
      },
      {
        id: "vizitka",
        name: "Online Vizitka",
        subtitle:
          "Jméno, logo, kontakt a krátké představení firmy. Bez prodejního tlaku a CTA tlačítek. Jen informuje, že existujete a jste snadno dohledatelní a kontaktovatelní.",
        price: "od 7 499 Kč",
        includeInQuickInquiry: true,
      },
      {
        id: "promo",
        name: "Promo Page",
        subtitle: "Landing page: jedna stránka, maximální dojem",
        price: "od 9 999 Kč",
        featured: true,
        badge: "Nejoblíbenější",
        includeInQuickInquiry: true,
      },
      {
        id: "proweb",
        name: "Pro Web",
        subtitle: "Více stránek, pokročilé animace a systémy na míru",
        price: "od 14 999 Kč",
        includeInQuickInquiry: true,
      },
      {
        id: "webcare",
        name: "Web Care",
        subtitle: "Správa webu: aktualizace, bezpečnost, obsah",
        price: "999 Kč/měs",
      },
    ],
  },
  {
    category: "Design",
    emoji: "🎨",
    icon: Palette,
    items: [
      {
        id: "logo",
        name: "Brand Logo",
        subtitle: "Originální logo: SVG, PNG, PDF v každé velikosti",
        price: "699 Kč",
        includeInQuickInquiry: true,
      },
      {
        id: "bcard",
        name: "Business Card",
        subtitle: "Vizitka na míru, digitální i tisková verze",
        price: "299 Kč",
        badge: "Nejlevnější",
        includeInQuickInquiry: true,
      },
      {
        id: "social-visual",
        name: "Social Visual",
        subtitle: "Grafický post nebo story pro sociální sítě",
        price: "299 Kč/ks",
        bonus: "balíček 5ks: 1 299 Kč",
      },
      {
        id: "print",
        name: "Print Design",
        subtitle: "Leták, plakát nebo banner, připraveno k tisku",
        price: "699 Kč",
        includeInQuickInquiry: true,
      },
    ],
  },
  {
    category: "AI Chatbot",
    emoji: "🤖",
    icon: Bot,
    items: [
      {
        id: "chatbot-faq",
        name: "AI Chatbot Starter",
        subtitle: "Odpovídá na časté dotazy přímo na webu, 24/7. Cena dle rozsahu projektu.",
        price: "Individuální",
        includeInQuickInquiry: true,
      },
      {
        id: "chatbot-pro",
        name: "AI Chatbot Pro",
        subtitle: "Napojení na rezervace, poptávky nebo vaše data. Cena dle rozsahu projektu.",
        price: "Individuální",
        includeInQuickInquiry: true,
      },
    ],
  },
  {
    category: "Systémy na míru",
    emoji: "📅",
    icon: CalendarClock,
    items: [
      {
        id: "rezervace",
        name: "Rezervační systém",
        subtitle: "Online rezervace termínů pro klienty, bez telefonování. Cena dle rozsahu projektu.",
        price: "Individuální",
        includeInQuickInquiry: true,
      },
    ],
  },
  {
    category: "Technické služby",
    emoji: "🛠️",
    icon: Wrench,
    items: [
      {
        id: "redirect",
        name: "Přesměrování domény",
        subtitle: "Nastavení DNS a přesměrování na novou adresu",
        price: "1 499 Kč",
        includeInQuickInquiry: true,
      },
      {
        id: "relink",
        name: "Přelinkování domény",
        subtitle: "Migrace webu na jinou doménu bez ztráty provozu",
        price: "1 499 Kč",
        includeInQuickInquiry: true,
      },
      {
        id: "tech-zasah",
        name: "Technický zásah",
        subtitle: "Jednorázová oprava, aktualizace nebo úprava webu",
        price: "Na dotaz",
        includeInQuickInquiry: true,
      },
    ],
  },
  {
    category: "SEO optimalizace",
    emoji: "🔍",
    icon: Search,
    items: [
      {
        id: "seo-audit",
        name: "SEO audit webu",
        subtitle: "Technická kontrola, klíčová slova, konkurence a konkrétní doporučení. Cena dle rozsahu webu.",
        price: "Individuální",
        includeInQuickInquiry: true,
      },
      {
        id: "seo-lokalni",
        name: "Lokální SEO",
        subtitle: "Google Business Profile a Firmy.cz nastavené tak, ať vás najdou lidi z vašeho okolí.",
        price: "Individuální",
        includeInQuickInquiry: true,
      },
      {
        id: "seo-obsahove",
        name: "Obsahové SEO",
        subtitle: "Klíčová slova a obsahová strategie pro dlouhodobý růst v přirozeném vyhledávání.",
        price: "Individuální",
      },
      {
        id: "seo-technicke",
        name: "Technické SEO",
        subtitle: "Rychlost, strukturovaná data a indexovatelnost webu.",
        price: "Individuální",
      },
    ],
  },
  {
    // Realizace běží pod sesterskou značkou ALTENO, poptávka i fakturace jdou
    // přes stejný subjekt — kategorie proto patří do stejného ceníku.
    category: "Automatizace a AI (ALTENO)",
    emoji: "⚙️",
    icon: Workflow,
    items: [
      {
        id: "automatizace",
        name: "Automatizace",
        subtitle: "Pevná cena předem, 14 dní podpory po spuštění zdarma.",
        price: "od 4 999 Kč",
        includeInQuickInquiry: true,
      },
      {
        id: "ai-agenti",
        name: "AI agenti na míru",
        subtitle: "Agent, který zvládne celou agendu, ne jen jeden krok. Cena dle rozsahu projektu.",
        price: "Individuální",
        includeInQuickInquiry: true,
      },
      {
        id: "chatboti-rag",
        name: "Chatboti a RAG",
        // TODO(CENA-RAG): ověřit s Kryštofem, jestli má RAG vlastní vstupní
        // cenu, nebo zůstává individuální podle počtu podkladů.
        subtitle: "Vyhledávání ve vašich podkladech. Jednoduchý chatbot na web je v kategorii AI Chatbot výše.",
        price: "Individuální",
        includeInQuickInquiry: true,
      },
      {
        id: "voice-agenti",
        name: "Voice agenti",
        subtitle: "Hlasový agent, který zvedne telefon. Zatím ho stavím, u klientů ho nenasazuji.",
        // Místo ceny nese pole stav služby — PriceLabel řetězec bez prefixu
        // "od " vypíše beze změny. Badge se záměrně nepřidává, jinak by na
        // kartě stálo slovo "Připravuji" dvakrát.
        price: "Připravuji",
      },
    ],
  },
];

export function formatKc(amount: number) {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Kč`;
}

/** Jeden zdroj pravdy pro cenu podle názvu služby — nahrazuje ručně sync. kopie. */
export const PRICE_BY_NAME: Record<string, string> = Object.fromEntries(
  PRICING_CATEGORIES.flatMap((c) => c.items.map((item) => [item.name, item.price] as const)),
);
