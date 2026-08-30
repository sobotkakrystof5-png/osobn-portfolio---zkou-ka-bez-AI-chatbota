import Link from "next/link";
import { Globe, Bot, CalendarClock, Palette, Wrench, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ServiceCategory = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: ReactNode;
  badge?: string;
  packages: string[];
  /** Podstránka s podrobným popisem a nabídkou služby. */
  href: string;
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
  {
    icon: Bot,
    title: "AI Chatbot",
    subtitle: "Zákaznická podpora · Rezervace · FAQ na webu",
    description: (
      <>
        Chatbot napojený na váš web, který odpovídá zákazníkům 24/7, sbírá poptávky a
        odbavuje běžné dotazy. Ideální pro{" "}
        <Link href="/web-pro-kadernictvi" className="relative z-30 text-[#c9a84c] hover:underline">
          kadeřnictví
        </Link>{" "}
        nebo{" "}
        <Link href="/web-pro-remeslniky" className="relative z-30 text-[#c9a84c] hover:underline">
          řemeslníky
        </Link>
        , kteří nemají čas odpovídat na každou zprávu ručně.
      </>
    ),
    badge: "Novinka",
    packages: ["FAQ chatbot na míru", "Chatbot napojený na rezervace", "Sběr a kvalifikace poptávek"],
    href: "/sluzby/ai-chatbot",
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
