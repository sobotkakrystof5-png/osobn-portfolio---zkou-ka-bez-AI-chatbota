import Link from "next/link";
import {
  Globe,
  ShoppingBag,
  AppWindow,
  CalendarClock,
  Palette,
  Wrench,
  Search,
  Workflow,
  Share2,
  MousePointerClick,
  Megaphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { automationIndex } from "@/lib/data/automation-index";
import { Alteno } from "@/components/brand/BrandName";

// Služby pro přehled „Služby a ceník“ (/sluzby) a dashboard nabídky na
// homepage. Ceny se sem neopisují: `pricing` odkazuje na kategorie
// v lib/data/pricing.ts, odkud panel i dlaždice berou položky a cenu „od“.

export type ServiceCategory = {
  /** Kotva v přehledu: /sluzby#weby otevře rovnou panel webů. */
  id: string;
  icon: LucideIcon;
  /** Krátký název do postranní nabídky přehledu. */
  label: string;
  title: string;
  subtitle: string;
  /** Jedna věta na dlaždici v dashboardu na homepage. */
  short: string;
  description: ReactNode;
  badge?: string;
  /** Kategorie z lib/data/pricing.ts, jejichž položky panel vypíše jako ceník. */
  pricing?: string[];
  /** Co služba obnáší, pokud zatím nemá položky v ceníku (e-shop, aplikace, marketing). */
  includes?: string[];
  /** Podstránka s podrobným popisem služby. */
  href?: string;
  /** Podstránky služby jako proklikávací čipy v panelu. */
  links?: { label: string; href: string }[];
};

const inlineLink = "text-[#c9a84c] hover:underline";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "weby",
    icon: Globe,
    label: "Weby",
    title: "Tvorba webů na míru",
    subtitle: "Micro Page · Promo Page · Pro Web",
    short: "Od jednoduché stránky po plnohodnotný web s animacemi.",
    description: (
      <>
        Weby na míru, které přivádějí zákazníky a zvyšují tržby, ne jen návštěvnost. Ať jde o web
        pro{" "}
        <Link href="/web-pro-remeslniky" className={inlineLink}>
          řemeslníky
        </Link>
        ,{" "}
        <Link href="/web-pro-kadernictvi" className={inlineLink}>
          kadeřnictví
        </Link>{" "}
        nebo{" "}
        <Link href="/web-pro-ucetni" className={inlineLink}>
          účetní kancelář
        </Link>
        , ladíme ho ručně a na míru vašemu byznysu.
      </>
    ),
    badge: "Nejoblíbenější",
    pricing: ["Weby"],
    href: "/sluzby/tvorba-webovych-stranek",
  },
  // E-shop je jeden balíček v ceníku (kategorie „E-shopy“ v pricing.ts).
  {
    id: "e-shopy",
    icon: ShoppingBag,
    label: "E-shopy",
    title: "E-shopy na míru",
    subtitle: "Shopify nebo vlastní kód · Platby · Doprava · Sklad",
    short: "Platby, doprava a sklad v jednom e-shopu.",
    description:
      "E-shop, ve kterém se dobře nakupuje i na mobilu. Postavíme ho na Shopify nebo ve vlastním kódu a napojíme platby, dopravce i sklad. Cena se odvíjí od počtu produktů, logistiky, skladu a náročnosti.",
    pricing: ["E-shopy"],
    href: "/sluzby/tvorba-e-shopu",
  },
  // Automatizace (značka ALTENO) hned za weby a e-shopy: web přivede
  // zákazníky, automatizace obslouží, co přijde. Patří sem i AI chatbot na
  // web, ceník ho vede jako samostatnou skupinu. Čipy = 4 podstránky
  // /automatizace/[slug] ze stejného indexu jako menu, ať se nerozejdou.
  {
    id: "automatizace",
    icon: Workflow,
    label: "Automatizace a AI",
    title: "Automatizace a AI",
    subtitle: "AI agenti · Procesy · Chatboti · Voice agenti",
    short: "AI agenti, chatboti a procesy, které běží samy.",
    description: (
      <>
        Odpovědi zákazníkům, doklady a připomínky nemusíte řešit ručně. Tuhle část přebírá
        automatizace, kterou stavíme pod sesterskou značkou <Alteno />.
      </>
    ),
    badge: "ALTENO",
    pricing: ["AI Chatbot", "Automatizace a AI (ALTENO)"],
    links: automationIndex.map((page) => ({
      label: page.title,
      href: `/automatizace/${page.slug}`,
    })),
    href: "/automatizace",
  },
  {
    id: "seo",
    icon: Search,
    label: "SEO",
    title: "SEO optimalizace",
    subtitle: "Audit · Lokální SEO · Obsahové SEO · Technické SEO",
    short: "Aby vás zákazníci našli na Googlu i Seznamu.",
    description:
      "SEO optimalizace webu pro Google i Seznam. Audit, lokální SEO přes Google Business Profile a Firmy.cz, obsahová strategie a technická optimalizace, ať vás zákazníci skutečně najdou.",
    pricing: ["SEO optimalizace"],
    href: "/sluzby/seo-optimalizace",
  },
  // Marketing jako SMMA: sociální sítě a placené kampaně. Položky v ceníku
  // zatím nemají, cena se odvíjí od rozsahu a reklamního rozpočtu.
  {
    id: "socialni-site",
    icon: Share2,
    label: "Sociální sítě",
    title: "Správa sociálních sítí",
    subtitle: "Instagram · Facebook · TikTok · Plán obsahu",
    short: "Obsah a plán příspěvků, aby o vás bylo slyšet.",
    description:
      "Sociální sítě vám povedeme od plánu obsahu po publikaci. Připravíme příspěvky a stories, naplánujeme je a každý měsíc vyhodnotíme, co funguje, ať profil přivádí poptávky, ne jen lajky.",
    includes: ["Strategie a plán obsahu", "Příspěvky a stories", "Plánování a publikace", "Měsíční vyhodnocení"],
  },
  {
    id: "google-reklamy",
    icon: MousePointerClick,
    label: "Google reklamy",
    title: "Správa Google reklam",
    subtitle: "Vyhledávání · Remarketing · Měření konverzí",
    short: "Reklama pro lidi, kteří vaši službu právě hledají.",
    description:
      "Kampaně v Google Ads nastavíme a spravujeme tak, aby se vaše firma ukázala lidem, kteří vaši službu právě hledají. Hlídáme rozpočet, ladíme klíčová slova a měříme poptávky, ne jen prokliky.",
    includes: ["Nastavení účtu a kampaní", "Výběr klíčových slov", "Měření konverzí", "Průběžná optimalizace"],
  },
  {
    id: "meta-reklamy",
    icon: Megaphone,
    label: "Meta reklamy",
    title: "Správa Meta reklam",
    subtitle: "Facebook · Instagram · Remarketing",
    short: "Kampaně na Facebooku a Instagramu, které přivádějí zákazníky.",
    description:
      "Reklamy na Facebooku a Instagramu cílíme na lidi, kteří mají o vaši službu skutečně zájem. Připravíme kreativu, nastavíme publika i remarketing a průběžně sledujeme, kolik vás stojí jedna poptávka.",
    includes: ["Nastavení Business Manageru a pixelu", "Kreativa a texty reklam", "Cílení a remarketing", "Průběžná optimalizace"],
  },
  {
    id: "aplikace",
    icon: AppWindow,
    label: "Aplikace a SaaS",
    title: "Webové aplikace a SaaS",
    subtitle: "Klientské portály · Interní systémy · SaaS pro firmy",
    short: "Klientské portály, interní systémy a vlastní SaaS.",
    description: (
      <>
        Aplikace na míru, které firmám nahradí tabulky a e‑maily: klientský portál, interní
        systém, dashboard nebo vlastní SaaS produkt. Jak to vypadá v praxi, ukazuje náš vlastní
        systém{" "}
        <Link href="/zakaziq" className={inlineLink}>
          ZakazIQ
        </Link>
        .
      </>
    ),
    badge: "Novinka",
    includes: ["Klientský portál", "Interní systém", "Dashboard a reporty", "SaaS produkt na míru"],
  },
  {
    id: "systemy",
    icon: CalendarClock,
    label: "Systémy na míru",
    title: "Systémy na míru",
    subtitle: "Rezervační systémy · Kalkulačky · Nástroje na míru",
    short: "Rezervace, kalkulačky a nástroje přesně pro váš obor.",
    description: (
      <>
        Rezervační systémy, kalkulačky a nástroje na míru. Ideální pro{" "}
        <Link href="/web-pro-kadernictvi" className={inlineLink}>
          kadeřnice
        </Link>
        ,{" "}
        <Link href="/web-pro-masery-a-wellness" className={inlineLink}>
          masérky
        </Link>{" "}
        nebo{" "}
        <Link href="/web-pro-remeslniky" className={inlineLink}>
          řemeslníky
        </Link>
        , kteří chtějí online rezervace bez zbytečného telefonování.
      </>
    ),
    pricing: ["Systémy na míru"],
    href: "/sluzby/systemy-na-miru",
  },
  {
    id: "grafika",
    icon: Palette,
    label: "Grafika",
    title: "Grafické designy",
    subtitle: "Logo · Vizitky · Bannery · Tiskoviny",
    short: "Logo, vizitky a tiskoviny, které budí důvěru.",
    description:
      "Grafika na míru: logo, vizitky, šablony a PDF materiály. Od loga pro začínajícího řemeslníka po jednotný vizuál účetní kanceláře, který zvyšuje důvěru zákazníků.",
    badge: "Nejžádanější",
    pricing: ["Design"],
    href: "/sluzby/graficke-designy",
  },
  {
    id: "technicke",
    icon: Wrench,
    label: "Technické služby",
    title: "Technické služby",
    subtitle: "Doména · Přesměrování · Údržba webu",
    short: "Domény, DNS a údržba webu bez starostí.",
    description:
      "Přesměrování a přelinkování domény, správa DNS, bezpečnostní aktualizace a průběžná údržba webu. Technické zázemí pohlídáme my, vy se můžete věnovat byznysu.",
    pricing: ["Technické služby"],
    href: "/sluzby/technicke-sluzby",
  },
];
