import { AUTOMATION_FAQ } from "@/lib/data/automation";
import type { FaqItem } from "@/lib/data/faq";

export type HomeFaqGroup = { id: "weby" | "eshopy" | "automatizace"; label: string; href: string; items: FaqItem[] };

// Časté dotazy na homepage po oborech nabídky. Ceny a termíny jsou opsané
// z lib/data/pricing.ts, WebPackages, WebGuarantees a EshopPricing; když se
// změní tam, změň je i tady. Automatizace bere dotazy 1:1 z /automatizace,
// ať se odpovědi nerozcházejí.
export const HOME_FAQ: HomeFaqGroup[] = [
  {
    id: "weby",
    label: "Weby",
    href: "/sluzby/tvorba-webovych-stranek",
    items: [
      {
        question: "Kolik stojí web?",
        answer:
          "Micro Page od 4 999 Kč, Promo Page od 9 999 Kč a Pro Web od 14 999 Kč. Cenu znáte předem a bez vašeho souhlasu se nezmění.",
      },
      {
        question: "Jak dlouho trvá, než bude web hotový?",
        answer:
          "Micro Page do 2 pracovních dní, Promo Page do 10 pracovních dní a Pro Web do 3 týdnů. Přesný termín víte ještě před začátkem.",
      },
      {
        question: "Co když se mi návrh nebude líbit?",
        answer: "Ladíme ho, dokud nebude podle vás. Web spustíme, až když ho schválíte.",
      },
      {
        question: "Bude web vidět na Googlu?",
        answer:
          "Promo Page i Pro Web mají SEO základ v ceně. Pro vyšší pozice navazujeme SEO optimalizací.",
      },
      {
        question: "Komu patří doména a hosting?",
        answer: "Vám. Doména, hosting i všechny přístupy jsou vaše, web je celý váš.",
      },
      {
        question: "Můžu si web po předání upravovat sám?",
        answer:
          "Ano, přístupy i návod dostanete při předání. Když nemáte čas, úpravy převezmeme v rámci Správy webu od 480 Kč měsíčně.",
      },
    ],
  },
  {
    id: "eshopy",
    label: "E-shopy",
    href: "/sluzby/tvorba-e-shopu",
    items: [
      {
        question: "Kolik stojí e-shop?",
        answer:
          "Od 29 990 Kč. Konečná cena záleží na počtu produktů, logistice, skladu a náročnosti funkcí. Přesnou částku víte předem.",
      },
      {
        question: "Na čem e-shop postavíte?",
        answer:
          "Většinu e-shopů stavíme na Shopify, kvůli rychlému startu a snadné správě. Když šablona nestačí, napíšeme e-shop ve vlastním kódu.",
      },
      {
        question: "Napojíte platby a dopravce?",
        answer:
          "Ano. Platební bránu (karta, převod, dobírka), dopravce, výdejní místa i automatické faktury nastavíme a otestujeme za vás.",
      },
      {
        question: "Kdo nahraje produkty?",
        answer: "Můžete vy, nebo je nahrajeme my. Domluvíme se na konzultaci a promítne se to do ceny.",
      },
      {
        question: "Zvládnu e-shop spravovat sám?",
        answer: "Ano. Při spuštění vás zaškolíme, takže produkty, ceny i objednávky upravíte sami.",
      },
      {
        question: "Pomůžete mi e-shop rozjet?",
        answer:
          "Ano. Po spuštění navážeme reklamou na Googlu a Meta, SEO nebo správou sociálních sítí, ať objednávky přicházejí.",
      },
    ],
  },
  {
    id: "automatizace",
    label: "Automatizace",
    href: "/automatizace",
    items: AUTOMATION_FAQ,
  },
];
