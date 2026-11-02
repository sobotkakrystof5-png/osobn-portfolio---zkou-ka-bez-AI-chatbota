// Jediný zdroj navigace pro Navbar i Footer.
//
// NAV_STRUCTURE je lišta. Od 11/2026 v ní jsou služby rozdělené podle oboru
// v pořadí Weby, E-shopy (každý jedna podstránka) a Automatizace
// (rozbalovací nabídka se 4 podstránkami). Přehled služeb s ceníkem (/sluzby) a ostatní
// služby (SEO, systémy na míru, grafika…) jsou v patičce a na /sluzby.
// Jak to probíhá, Obory, Blog a FAQ jsou jen v patičce (FOOTER_LINKS).
import { automationIndex } from "@/lib/data/automation-index";

export type NavLinkItem = {
  label: string;
  href: string;
  comingSoon?: boolean;
  /** Oddělovač PO položce, odlišuje odkaz na přehled od podstránek pod ním. */
  separatorAfter?: boolean;
};

export type NavGroup = {
  label: string;
  /** Kam vede text skupiny v liště (chevron vedle něj jen rozbaluje). */
  href: string;
  items: NavLinkItem[];
};

export type NavEntry = NavLinkItem | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

/** 4 podstránky Automatizace v pořadí z lib/data/automation-pages.ts. */
export const AUTOMATION_NAV_ITEMS: NavLinkItem[] = automationIndex.map((page) => ({
  label: page.title,
  href: `/automatizace/${page.slug}`,
  comingSoon: page.comingSoon,
}));

export const NAV_STRUCTURE: NavEntry[] = [
  { label: "Weby", href: "/sluzby/tvorba-webovych-stranek" },
  { label: "E-shopy", href: "/sluzby/tvorba-e-shopu" },
  {
    label: "Automatizace",
    href: "/automatizace",
    items: [
      { label: "Přehled automatizací", href: "/automatizace", separatorAfter: true },
      ...AUTOMATION_NAV_ITEMS,
    ],
  },
  { label: "ZakazIQ", href: "/zakaziq" },
  { label: "Projekty", href: "/ukazky-webu" },
  { label: "O nás", href: "/o-mne" },
  { label: "Kontakt", href: "/kontakt" },
];

export type NavLink = { label: string; href: string };

/** Patička: položky lišty bez Automatizace (ta má vlastní sloupec) a k nim
 *  stránky, které se do lišty nevešly. */
export const FOOTER_LINKS: NavLink[] = [
  { label: "Služby a ceník", href: "/sluzby" },
  ...NAV_STRUCTURE.filter((entry) => !isNavGroup(entry)).map(({ label, href }) => ({ label, href })),
  { label: "Cena webu", href: "/cena-tvorby-webu" },
  { label: "Správa webu", href: "/sluzby/sprava-webu" },
  { label: "Jak to probíhá", href: "/spoluprace" },
  { label: "Obory", href: "/tvorba-webu-pro-zivnostniky" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

/** Sloupec Automatizace v patičce: hub a jeho podstránky. */
export const FOOTER_AUTOMATION_LINKS: NavLinkItem[] = [
  { label: "Přehled automatizací", href: "/automatizace" },
  ...AUTOMATION_NAV_ITEMS,
];
