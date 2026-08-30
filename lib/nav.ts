// Jediný zdroj navigace pro Navbar i Footer. Dřív měla každá komponenta
// vlastní hardcoded pole (a rozcházela se — Footer neměl ZakazIQ).

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "O mně", href: "/o-mne" },
  { label: "Služby", href: "/sluzby" },
  { label: "Spolupráce", href: "/spoluprace" },
  { label: "Projekty", href: "/ukazky-webu" },
  { label: "Ceník", href: "/cena-tvorby-webu" },
  { label: "ZakazIQ", href: "/zakaziq" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];
