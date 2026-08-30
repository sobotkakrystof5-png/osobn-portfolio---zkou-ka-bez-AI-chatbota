export type Project = {
  number: string;
  title: string;
  category: string;
  tech: string;
  description: string;
  url: string;
  image: string;
  alt: string;
  badgeType: "client" | "demo" | "own";
  internalLink?: { text: string; href: string };
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Schovinox",
    category: "Zámečnictví & Kovovýroba",
    tech: "Next.js · React",
    description: "Firemní web pro zakázkovou kovovýrobu pod vedením pana Schovánka: zámečnictví, svařování a broušení, to vše s 40letou rodinnou zkušeností. Cílem bylo lépe prezentovat firmu a prodávat vlastní produkty na grilování.",
    url: "https://www.schovinox.cz",
    image: "/portfolio/schovinox.jpg",
    alt: "Firemní web pro kovovýrobu Schovinox — zámečnictví a svařování",
    badgeType: "client" as const,
    internalLink: { text: "Chcete podobný web pro řemeslníky?", href: "/web-pro-remeslniky" },
  },
  {
    number: "02",
    title: "U Cerhů",
    category: "Svatby & Ubytování",
    tech: "HTML/CSS/JS Vanilla",
    description: "Landing page pro statek v Kněžmostě. Cílem bylo získat více zakázek na svatby a ubytování v Českém ráji.",
    url: "https://www.u-cerhu.cz",
    image: "/portfolio/ucerhu.jpg",
    alt: "Web na míru pro statek U Cerhů — svatby a ubytování v Českém ráji",
    badgeType: "client" as const,
  },
  {
    number: "03",
    title: "Masáže Tomáš Kestner",
    category: "Wellness & Osobní brand",
    tech: "HTML/CSS/JS Vanilla",
    description: "Prezentační web pro maséra s 20 lety praxe, 7 z toho u profesionálního fotbalu FK Mladá Boleslav. Cílem bylo vybudovat důvěru a přivést nové klienty na objednávku.",
    url: "https://www.masazekestner.cz",
    image: "/portfolio/kestner.jpg",
    alt: "Prezentační web pro maséra Tomáše Kestnera — masáže Mladá Boleslav",
    badgeType: "client" as const,
    internalLink: { text: "Podobný web pro maséry a wellness studia", href: "/web-pro-masery-a-wellness" },
  },
  {
    number: "04",
    title: "Auf Gehts",
    category: "Vzdělávání & Osobní brand",
    tech: "Next.js · TypeScript · Framer Motion",
    description: "Osobní brand web pro lektora němčiny. Zaměřeno na důvěru a první kontakt.",
    url: "https://auf-gehts-cz-56ly.vercel.app",
    image: "/portfolio/aufgehts.jpg",
    alt: "Osobní web na míru pro lektora němčiny Auf Gehts — příklad webu pro živnostníka",
    badgeType: "demo" as const,
  },
  {
    number: "05",
    title: "EstatIQ",
    category: "PropTech & Správa nemovitostí",
    tech: "HTML/CSS/JS Vanilla",
    description: "Vlastní SaaS produkt pro správu nemovitostí: platební automatizace, evidence dokumentů a daňový export. Aktuálně v prelaunch fázi s early access waitlistem.",
    url: "https://www.estatiq.cz",
    image: "/portfolio/estatiq.jpg",
    alt: "EstatIQ — vlastní produkt pro správu nemovitostí ve fázi prelaunch",
    badgeType: "own" as const,
  },
];

export const badgeStyles: Record<string, { label: string; className: string }> = {
  client: { label: "Skutečný klient", className: "text-[#c9a84c] border-[#c9a84c]/30" },
  demo: { label: "Ukázkový projekt", className: "text-[#8a8070] border-white/[0.1]" },
  own: { label: "Vlastní produkt (prelaunch)", className: "text-[#e8c76a] border-[#e8c76a]/25" },
};
