// Fakta o ZakazIQ pro /zakaziq. Zdroj pravdy je repo ProjectIQ:
// PRODUCT.md (cena, zkušební doba, rozsah), components/marketing/content.ts
// (texty landing page zakaziq.cz) a memory/memory.md R-134 (klienti webu).
// Nevymýšlet čísla, reference ani funkce navíc (PRODUCT.md → Content rules).
// Při změně ceny nebo podmínek v ProjectIQ upravit i tady.

export const ZAKAZIQ_URL = "https://www.zakaziq.cz";

export const ZAKAZIQ_PRICE = 249;

/** Co je v ceně (ProjectIQ content.ts → PRICE_INCLUDES). */
export const ZAKAZIQ_PRICE_INCLUDES = [
  "Neomezené poptávky a zákazníci",
  "Kalendář a rezervace",
  "Věrnostní karty",
  "Faktury, příjmy, odhad daní",
  "E-maily zákazníkům",
  "Napojení na web",
  "Měsíční přehled",
  "Jeden byznys a neomezeně pracovníků",
] as const;

/** Obory s připravenými službami a kolonkami (ProjectIQ content.ts → OBORY,
 *  šablony v lib/ws/templates). Neznamená, že v těch oborech už někdo platí. */
export const ZAKAZIQ_OBORY = [
  "Kadeřnictví",
  "Kosmetika",
  "Zámečnictví",
  "Studnařství",
  "Likvidace azbestu",
  "Autoservis",
  "Úklid",
  "Stavba a řemesla",
] as const;

/**
 * Doložitelná čísla o produktu, žádné výsledky zákazníků (ty nemáme).
 * Zdroje v repu ProjectIQ: 9 = content.ts MODULES, 8 = OBORY, 20 =
 * lib/ws/email/catalog.ts MESSAGE_TYPES, 1 500+ = `npx vitest run`
 * 21. 11. 2026 (1 572 prošlých testů, KONVERZE-PLAN.md § 1.1).
 * Při změně v ProjectIQ přepočítat.
 */
export const ZAKAZIQ_PROOF = [
  { value: "9", label: "funkcí v jedné aplikaci" },
  { value: "8", label: "oborů s připravenými službami" },
  { value: "20", label: "hotových e-mailů zákazníkům i vám" },
  { value: "1 500+", label: "automatických testů hlídá každou změnu" },
] as const;

/**
 * Hlavní důkaz na /zakaziq: Kryštofova vlastní zkušenost s ZakazIQ ve VIZEON
 * (zadání 22. 11. 2026: „efektivita se mi zvýšila o 63 % díky přehledu,
 * efektivitě, stabilitě a hlubší perspektivě a pohledu na mé podnikání").
 * Není to výsledek zákazníků ZakazIQ, stránka ho tak ani nepodává.
 */
export const ZAKAZIQ_OWN_RESULT = {
  value: "+63",
  label: "vyšší efektivita v našem podnikání",
  context: "Díky ZakazIQ ve vlastním provozu",
  quote:
    "„Díky ZakazIQ se mi efektivita zvýšila o 63 %. Mám přehled, stabilitu a hlubší pohled na celé své podnikání.“",
} as const;

export const ZAKAZIQ_FAQ: { question: string; answer: string }[] = [
  {
    question: "Je klientský prostor totéž co aplikace pro moji firmu?",
    answer:
      "Obojí běží na ZakazIQ, ale jde o dvě věci. Klientský prostor dostanete jako náš klient a sledujete v něm svůj projekt. Aplikace pro firmu slouží vašim vlastním zákazníkům: poptávky, kalendář, věrnostní karty a peníze.",
  },
  {
    question: "Musím umět s počítačem?",
    answer:
      "Ne. Když zvládnete e-mail v telefonu, zvládnete i ZakazIQ. Po vybrání oboru má aplikace hned připravené služby a kolonky.",
  },
  {
    question: "Co když nemám web?",
    answer:
      "Nevadí. Dostanete vlastní stránku pro objednání a QR kód. Odkaz dáte na Instagram, do Google profilu nebo na pult. Web vám můžeme postavit i my.",
  },
  {
    question: "Kde jsou moje data a kdo je vidí?",
    answer:
      "Vidíte je jen vy a lidé, které do účtu pozvete. Data každé firmy jsou oddělená od ostatních. Databáze běží v Evropské unii, ve Frankfurtu v Německu.",
  },
  {
    question: "Funguje to na telefonu?",
    answer: "Ano. Aplikace je dělaná tak, aby šla ovládat jednou rukou mezi dvěma zákazníky.",
  },
  {
    question: "Můžu předplatné kdykoli zrušit?",
    answer:
      "Ano, sami v nastavení účtu. Data se nemažou, zůstanou vám k nahlédnutí, jen je nepůjde měnit.",
  },
];
