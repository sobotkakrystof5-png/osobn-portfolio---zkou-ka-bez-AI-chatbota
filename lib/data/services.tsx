import Link from "next/link";
import { Globe, ShoppingBag, AppWindow, CalendarClock, Palette, Wrench, Search, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { automationIndex } from "@/lib/data/automation-index";

export type ServiceCategory = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: ReactNode;
  badge?: string;
  packages: string[];
  /** Podstránka s podrobným popisem a nabídkou služby. */
  href: string;
  /** Text výzvy dole na kartě, výchozí „Zjistit více →“. */
  cta?: string;
  /** Místo `packages` vykreslí proklikávací čipy (podstránky služby). */
  links?: { label: string; href: string }[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    icon: Globe,
    title: "Tvorba webů na míru",
    subtitle: "Vizitka · Promo stránka · Plnohodnotný web",
    description:
      "Weby na míru, které přivádějí zákazníky a zvyšují tržby. Ne jen návštěvníky. Ať děláte web pro řemeslníky, kadeřnictví nebo účetní kancelář, každý pixel ladím ručně a na míru vašemu byznysu.",
    badge: "Nejoblíbenější",
    packages: [
      "Micro Page (coming soon / link-in-bio / redirect) — od 4 999 Kč",
      "Online Vizitka — od 7 499 Kč",
      "Promo Page (landing page) — od 9 999 Kč",
      "Pro Web (více stránek + animace) — od 14 999 Kč",
      "Web Care — 999 Kč/měs",
    ],
    href: "/sluzby/tvorba-webovych-stranek",
  },
  // E-shop zatím nemá vlastní podstránku ani ceník, karta proto vede rovnou
  // na kontakt. Až podstránka vznikne, stačí změnit `href` a smazat `cta`.
  {
    icon: ShoppingBag,
    title: "E-shopy na míru",
    subtitle: "Menší e-shop · Platby · Doprava · Objednávky",
    description:
      "E-shop, ve kterém se dobře nakupuje i na mobilu. Produkty, platby, doprava a potvrzení objednávek nastavím tak, aby vám prodej běžel bez ručního přepisování.",
    packages: ["E-shop na míru", "Platební brána", "Doprava a výdejní místa", "Automatické potvrzení objednávek"],
    href: "/kontakt",
    cta: "Poptat e-shop →",
  },
  // Automatizace (značka ALTENO) hned za weby a e-shopy: web přivede
  // zákazníky, automatizace obslouží, co přijde. Čipy = 4 podstránky
  // /automatizace/[slug] ze stejného indexu jako menu, ať se nerozejdou.
  {
    icon: Workflow,
    title: "Automatizace a AI",
    subtitle: "AI agenti · Procesy · Chatboti · Voice agenti",
    description:
      "Odpovědi zákazníkům, doklady a připomínky nemusíte řešit ručně. Tuhle část přebírá automatizace, kterou stavím pod sesterskou značkou ALTENO.",
    badge: "ALTENO",
    packages: [],
    links: automationIndex.map((page) => ({
      label: page.title,
      href: `/automatizace/${page.slug}`,
    })),
    href: "/automatizace",
    cta: "Celá nabídka automatizace →",
  },
  // Webové aplikace zatím nemají vlastní podstránku, karta vede na kontakt
  // (stejně jako e-shopy). Chatbota už pokrývá karta Automatizace a AI
  // (podstránka /automatizace/chatboti-rag); /sluzby/ai-chatbot dál existuje.
  {
    icon: AppWindow,
    title: "Webové aplikace a SaaS",
    subtitle: "Klientské portály · Interní systémy · SaaS pro firmy",
    description: (
      <>
        Aplikace na míru, které firmám nahradí tabulky a e‑maily: klientský portál, interní
        systém, dashboard nebo vlastní SaaS produkt. Jak to vypadá v praxi, ukazuje můj klientský
        portál{" "}
        <Link href="/zakaziq" className="relative z-30 text-[#c9a84c] hover:underline">
          ZakazIQ
        </Link>
        .
      </>
    ),
    badge: "Novinka",
    packages: ["Klientský portál", "Interní systém", "Dashboard a reporty", "SaaS produkt na míru"],
    href: "/kontakt",
    cta: "Poptat aplikaci →",
  },
  {
    icon: CalendarClock,
    title: "Systémy na míru",
    subtitle: "Rezervační systémy · Kalkulačky · Nástroje na míru",
    description: (
      <>
        Rezervační systémy, kalkulačky, nástroje na míru. Ideální pro{" "}
        <Link href="/web-pro-kadernictvi" className="relative z-30 text-[#c9a84c] hover:underline">
          kadeřnice
        </Link>
        ,{" "}
        <Link href="/web-pro-masery-a-wellness" className="relative z-30 text-[#c9a84c] hover:underline">
          masérky
        </Link>{" "}
        nebo{" "}
        <Link href="/web-pro-remeslniky" className="relative z-30 text-[#c9a84c] hover:underline">
          řemeslníky
        </Link>
        , kteří potřebují online rezervace bez zbytečného telefonování.
      </>
    ),
    packages: ["Rezervační systém", "Kalkulačka na míru", "Interaktivní formuláře", "Vlastní dashboard"],
    href: "/sluzby/systemy-na-miru",
  },
  {
    icon: Palette,
    title: "Grafické designy",
    subtitle: "Logo · Vizitky · Bannery · Tiskoviny",
    description:
      "Tvorba grafiky na míru: logo, vizitky, šablony, PDF materiály. Od loga pro začínajícího řemeslníka až po jednotný vizuál pro účetní kancelář, který zvyšuje důvěru zákazníků.",
    badge: "Nejžádanější",
    packages: ["Brand Logo — od 699 Kč", "Business Card — od 299 Kč", "Social Visual — od 299 Kč", "Print Design — od 699 Kč"],
    href: "/sluzby/graficke-designy",
  },
  {
    icon: Wrench,
    title: "Technické služby",
    subtitle: "Doména · Přesměrování · Údržba webu",
    description:
      "Přesměrování a přelinkování domény, správa DNS, bezpečnostní aktualizace a průběžná údržba webu. Postarám se o technické zázemí, ať se vy můžete věnovat byznysu.",
    packages: ["Přesměrování domény", "Přelinkování domény", "Web Care — 999 Kč/měs", "Jednorázové technické zásahy"],
    href: "/sluzby/technicke-sluzby",
  },
  {
    icon: Search,
    title: "SEO optimalizace",
    subtitle: "Audit · Lokální SEO · Obsahové SEO · Technické SEO",
    description:
      "SEO optimalizace webu pro Google i Seznam. Audit, lokální SEO přes Google Business Profile a Firmy.cz, obsahová strategie a technická optimalizace, ať vás zákazníci skutečně najdou.",
    packages: ["SEO audit webu", "Lokální SEO (Google i Seznam)", "Obsahové SEO", "Technické SEO"],
    href: "/sluzby/seo-optimalizace",
  },
];
