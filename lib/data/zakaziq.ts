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
