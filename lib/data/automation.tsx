import { getAutomationPage } from "@/lib/data/automation-pages";

// Doplňkový obsah hubu /automatizace (balíčky, průběh, FAQ) a katalog služeb
// pro JSON-LD hubu. Název a jednověté summary každé služby se berou
// z lib/data/automation-pages.ts (zdroj pravdy podstránek /automatizace/<slug>),
// ať se hub, JSON-LD a podstránka nerozejdou. Texty jsou
// psané z pohledu majitele webu ("co se děje po odeslání formuláře"), ne z
// pohledu firmy řešící procesy obecně, ať si VIZEON nekanibalizuje pozice se
// sesterskou značkou ALTENO, která na tahle témata cílí přímo.

/** `id` je zároveň slug podstránky (`/automatizace/<id>`) a suffix UTM
 *  kampaně (lib/alteno.ts). Na kotvy hubu už neodkazuje, hub kotvy nemá. */
export type AutomationServiceId =
  | "ai-agenti"
  | "automatizace-procesu"
  | "chatboti-rag"
  | "voice-agenti";

export type AutomationService = {
  id: AutomationServiceId;
  title: string;
  summary: string;
};

/** Převezme z podstránky název a summary. Chybějící podstránka shodí build
 *  už při načtení modulu, ne až tichou mezerou v JSON-LD hubu. */
function fromPage(id: AutomationServiceId): AutomationService {
  const page = getAutomationPage(id);
  if (!page) throw new Error(`Chybí podstránka automatizace: ${id}`);
  return { id, title: page.title, summary: page.summary };
}

/** Katalog nabídek pro JSON-LD hubu (`hasOfferCatalog`). */
export const AUTOMATION_SERVICES: AutomationService[] = (
  ["ai-agenti", "automatizace-procesu", "chatboti-rag", "voice-agenti"] as const
).map(fromPage);

/** Balíčky, kde web a automatizace vznikají zároveň. */
export const AUTOMATION_BUNDLES: { title: string; text: string; price: string }[] = [
  {
    title: "Web + chatbot",
    text: "Nový web a chatbot, který odpovídá z jeho obsahu. Plánuji je spolu, takže chatbot nepůsobí jako přilepený.",
    // TODO(CENA-BALICKU): Kryštof zatím neurčil cenu balíčků. Dokud nebude,
    // zůstává tu obecná formulace, ne vymyšlené číslo.
    price: "Cena podle rozsahu",
  },
  {
    title: "Web + automatizace poptávek",
    text: "Formulář, potvrzení zákazníkovi, zápis do tabulky a upozornění pro vás. Od prvního dne bez ručního přepisování.",
    price: "Cena podle rozsahu",
  },
  {
    title: "Web + rezervace a připomínky",
    text: "Online rezervace termínů a automatické připomínky, méně telefonování a méně zapomenutých schůzek.",
    price: "Cena podle rozsahu",
  },
];

/** Průběh spolupráce na automatizaci. Podrobný proces webu má /spoluprace. */
export const AUTOMATION_STEPS: { step: string; title: string; text: string }[] = [
  {
    step: "01",
    title: "Konzultace zdarma",
    text: "Projdeme váš provoz a najdeme místa, kde se práce opakuje. Řeknu vám, co se vyplatí automatizovat jako první.",
  },
  {
    step: "02",
    title: "Návrh řešení",
    text: "Dostanete popis toho, co se bude dít na pozadí, kudy potečou data a kolik to bude stát. Cenu znáte předem.",
  },
  {
    step: "03",
    title: "Nasazení a testování",
    text: "Automatizaci postavím a projedeme ji na reálných případech, než se pustí naostro.",
  },
  {
    step: "04",
    title: "Podpora 14 dní zdarma",
    text: "Prvních 14 dní po spuštění doladím, co se v běžném provozu ukáže. Potom si můžete vzít průběžnou podporu jako měsíční paušál.",
  },
];

/** Viditelné FAQ i zdroj pro JSON-LD FAQPage — jeden text na obou místech. */
export const AUTOMATION_FAQ: { question: string; answer: string }[] = [
  {
    question: "Nevím, co bych automatizoval. Vadí to?",
    answer:
      "Vůbec ne. Na konzultaci zdarma projdeme, co vás v provozu zdržuje, a řeknu vám, co se vyplatí řešit jako první.",
  },
  {
    question: "Potřebuji od vás i web?",
    answer:
      "Ne. Automatizaci dělám i firmám, které mají web jinde. Když web teprve řešíte, dává smysl postavit obojí najednou, protože formuláře, chatbot i napojení plánuji rovnou.",
  },
  {
    question: "Kolik automatizace stojí?",
    answer:
      "Automatizace začíná na 4 999 Kč. Cenu AI agentů a chatbotů určuje rozsah, proto ji dostanete v nabídce po konzultaci. Pevnou cenu znáte vždy předem.",
  },
  {
    question: "Co když se automatizace po čase rozbije?",
    answer:
      "Prvních 14 dní po spuštění máte podporu zdarma. Potom si můžete vzít průběžnou podporu jako měsíční paušál, nebo řešit každý zásah zvlášť.",
  },
  {
    question: "Proč to nezvládnu jen v ChatGPT?",
    answer:
      "ChatGPT odpoví, když se zeptáte. Sám se nespustí a nepropojí vaše systémy. Automatizace běží na pozadí bez vašeho zásahu a zvládne i rostoucí objem práce.",
  },
  {
    question: "Co se děje s mými daty?",
    answer:
      "Preferuji řešení, kde data zbytečně neopouštějí vaše systémy, v souladu s GDPR. U každého projektu předem víte, kudy data protečou a kde skončí.",
  },
];
