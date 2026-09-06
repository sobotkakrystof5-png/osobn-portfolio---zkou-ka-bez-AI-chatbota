export type Project = {
  slug: string;
  title: string;
  category: string;
  stack: string[];
  description: string;
  highlights: string[];
  url: string;
  image: string;
  alt: string;
  badgeType: "client" | "demo" | "own";
  internalLink?: { text: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "schovinox",
    title: "Schovinox",
    category: "Zámečnictví & Kovovýroba",
    stack: ["Next.js", "React", "Tailwind CSS"],
    description: "Firemní web pro zakázkovou kovovýrobu pod vedením pana Schovánka: zámečnictví, svařování a broušení, to vše s 40letou rodinnou zkušeností. Cílem bylo lépe prezentovat firmu a prodávat vlastní produkty na grilování.",
    highlights: [
      "Přehledná prezentace služeb — zámečnictví, svařování, broušení",
      "Samostatná sekce s vlastními produkty pro grilování",
      "Důraz na 40letou rodinnou tradici a řemeslnou kvalitu",
      "Responzivní design pro mobil, tablet i desktop",
    ],
    url: "https://www.schovinox.cz",
    image: "/portfolio/schovinox.jpg",
    alt: "Firemní web pro kovovýrobu Schovinox — zámečnictví a svařování",
    badgeType: "client" as const,
    internalLink: { text: "Chcete podobný web pro řemeslníky?", href: "/web-pro-remeslniky" },
  },
  {
    slug: "u-cerhu",
    title: "U Cerhů",
    category: "Svatby & Ubytování",
    stack: ["HTML5", "CSS3", "JavaScript"],
    description: "Landing page pro statek v Kněžmostě. Cílem bylo získat více zakázek na svatby a ubytování v Českém ráji.",
    highlights: [
      "Prezentace prostor pro svatby i krátkodobé ubytování",
      "Fotogalerie areálu statku",
      "Kontaktní formulář pro rychlé poptávky",
      "Rychlé načítání i na mobilu",
    ],
    url: "https://www.u-cerhu.cz",
    image: "/portfolio/ucerhu.jpg",
    alt: "Web na míru pro statek U Cerhů — svatby a ubytování v Českém ráji",
    badgeType: "client" as const,
  },
  {
    slug: "masaze-kestner",
    title: "Masáže Tomáš Kestner",
    category: "Wellness & Osobní brand",
    stack: ["HTML5", "CSS3", "JavaScript"],
    description: "Prezentační web pro maséra s 20 lety praxe, 7 z toho u profesionálního fotbalu FK Mladá Boleslav. Cílem bylo vybudovat důvěru a přivést nové klienty na objednávku.",
    highlights: [
      "Prezentace zkušeností a specializace na sportovní masáže",
      "Přehledný výpis nabízených služeb a ceníku",
      "Kontaktní formulář pro objednání termínu",
      "Důraz na důvěryhodnost a osobní přístup",
    ],
    url: "https://www.masazekestner.cz",
    image: "/portfolio/kestner.jpg",
    alt: "Prezentační web pro maséra Tomáše Kestnera — masáže Mladá Boleslav",
    badgeType: "client" as const,
    internalLink: { text: "Podobný web pro maséry a wellness studia", href: "/web-pro-masery-a-wellness" },
  },
  {
    slug: "auf-gehts",
    title: "Auf Gehts",
    category: "Vzdělávání & Osobní brand",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    description: "Osobní brand web pro lektora němčiny. Zaměřeno na důvěru a první kontakt.",
    highlights: [
      "Osobní prezentace lektora a jeho přístupu k výuce",
      "Přehled nabízených kurzů a lekcí",
      "Kontaktní formulář pro první konzultaci",
      "Moderní animace a plynulé přechody",
    ],
    url: "https://auf-gehts-cz-56ly.vercel.app",
    image: "/portfolio/aufgehts.jpg",
    alt: "Osobní web na míru pro lektora němčiny Auf Gehts — příklad webu pro živnostníka",
    badgeType: "demo" as const,
  },
  {
    slug: "estatiq",
    title: "EstatIQ",
    category: "PropTech & Správa nemovitostí",
    stack: ["HTML5", "CSS3", "JavaScript"],
    description: "Vlastní SaaS produkt pro správu nemovitostí: platební automatizace, evidence dokumentů a daňový export. Aktuálně v prelaunch fázi s early access waitlistem.",
    highlights: [
      "Prezentace klíčových funkcí — platby, dokumenty, daňový export",
      "Early access waitlist pro první zájemce",
      "Jasná komunikace prelaunch fáze produktu",
      "Architektura připravená na budoucí rozšiřování",
    ],
    url: "https://www.estatiq.cz",
    image: "/portfolio/estatiq.jpg",
    alt: "EstatIQ — vlastní produkt pro správu nemovitostí ve fázi prelaunch",
    badgeType: "own" as const,
  },
];

export const badgeStyles: Record<string, { label: string; className: string }> = {
  client: { label: "Skutečný klient", className: "text-[#a3812f] border-[#c9a84c]/40" },
  demo: { label: "Ukázkový projekt", className: "text-[#6b6455] border-black/15" },
  own: { label: "Vlastní produkt (prelaunch)", className: "text-[#a3812f] border-[#e8c76a]/60" },
};
