// Jediný zdroj navigace pro Navbar i Footer. Dřív měla každá komponenta
// vlastní hardcoded pole (a rozcházela se — Footer neměl ZakazIQ).
//
// NAV_STRUCTURE je lišta: 10 položek nejvyšší úrovně, dvě z nich skupiny
// s rozbalovacím panelem (Automatizace, Blog). FAQ je od S6 pod Blogem, aby
// se lišta s novou položkou Automatizace vešla do šířky 768–1279 px.
// Footer potřebuje plochý seznam, proto NAV_LINKS je odvozený, ne vlastní pole.
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
  /** Úvodní blok nahoře v panelu (spolupráce ALTENO × VIZEON). */
  intro?: boolean;
  /** Footer místo odkazu na skupinu vypíše všechny její položky. */
  expandInFooter?: boolean;
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
  { label: "O mně", href: "/o-mne" },
  { label: "Služby", href: "/sluzby" },
  {
    label: "Automatizace",
    href: "/automatizace",
    intro: true,
    items: [
      { label: "Přehled automatizací", href: "/automatizace", separatorAfter: true },
      ...AUTOMATION_NAV_ITEMS,
    ],
  },
  { label: "Obory", href: "/tvorba-webu-pro-zivnostniky" },
  { label: "Spolupráce", href: "/spoluprace" },
  { label: "Projekty", href: "/ukazky-webu" },
  { label: "Ceník", href: "/cena-tvorby-webu" },
  { label: "ZakazIQ", href: "/zakaziq" },
  {
    label: "Blog",
    href: "/blog",
    expandInFooter: true,
    items: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Kontakt", href: "/kontakt" },
];

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = NAV_STRUCTURE.flatMap((entry) =>
  isNavGroup(entry) && entry.expandInFooter
    ? entry.items.map(({ label, href }) => ({ label, href }))
    : [{ label: entry.label, href: entry.href }]
);
