import Link from "next/link";
import { Bot, Workflow, MessageSquareText, PhoneCall } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { getAutomationPage } from "@/lib/data/automation-pages";

// Doplňkový obsah hubu /automatizace (balíčky, průběh, FAQ) a katalog služeb
// pro JSON-LD hubu. Název, jednověté summary a stav každé služby se berou
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
  number: string;
  icon: LucideIcon;
  title: string;
  /** Jedna věta, viditelná i ve sbaleném stavu. */
  summary: string;
  /** Voice agenti zatím nejsou k objednání. */
  status?: "preparing";
  description: string;
  scenarios: { title: string; text: string }[];
  /** Poznámka pod scénáři, ať příklady nevypadají jako hotový katalog. */
  scenariosNote?: string;
  /** Co je uvnitř a s čím to pracuje. Jen text, žádná loga třetích stran. */
  chips: string[];
  priceNote?: string;
  callout?: { text: ReactNode };
  /** Existující oborové stránky VIZEONU. */
  relatedIndustries?: { label: string; href: string }[];
  /** Cesta na detail služby na alteno.cz. */
  altenoPath: string;
  /** Primární akce v rozbaleném stavu. */
  cta: { label: string } | { label: string; href: string };
};

/** Převezme z podstránky název, summary a stav. Chybějící podstránka shodí
 *  build už při načtení modulu, ne až tichou mezerou na hubu. */
function fromPage(
  id: AutomationServiceId
): Pick<AutomationService, "title" | "summary" | "status"> {
  const page = getAutomationPage(id);
  if (!page) throw new Error(`Chybí podstránka automatizace: ${id}`);
  return {
    title: page.title,
    summary: page.summary,
    ...(page.comingSoon ? { status: "preparing" as const } : {}),
  };
}

export const AUTOMATION_SERVICES: AutomationService[] = [
  {
    id: "ai-agenti",
    number: "01",
    icon: Bot,
    ...fromPage("ai-agenti"),
    description:
      "Běžná automatizace udělá jednu věc podle pevného pravidla. AI agent zvládne celou cestu. Přečte zprávu, pochopí, co zákazník chce, podívá se do vašich dat a rozhodne podle pravidel, která mu nastavíte. Vy se věnujete jen tomu, co skutečně potřebuje člověka.",
    scenarios: [
      {
        title: "Poptávka z webu",
        text: "Agent přečte poptávku, zjistí chybějící údaje, ověří, co nabízíte, a připraví odpověď.",
      },
      {
        title: "Třídění příchozí pošty",
        text: "Rozliší objednávky, dotazy a reklamace a každé předá tam, kam patří.",
      },
      {
        title: "Podklady z vašich dat",
        text: "Z interních dat připraví shrnutí, přehled nebo koncept nabídky.",
      },
    ],
    scenariosNote:
      "Příklady ukazují směr. Konkrétní zadání navrhuji vždy podle vašeho provozu.",
    chips: [
      "Rozhodování podle vašich pravidel",
      "Práce s vašimi daty",
      "Napojení na nástroje, které už používáte",
    ],
    relatedIndustries: [
      { label: "Realitní makléři", href: "/web-pro-realitni-maklere" },
      { label: "Účetní", href: "/web-pro-ucetni" },
      { label: "Řemeslníci", href: "/web-pro-remeslniky" },
    ],
    altenoPath: "/sluzby/ai-agenti",
    cta: { label: "Konzultace zdarma" },
  },
  {
    id: "automatizace-procesu",
    number: "02",
    icon: Workflow,
    ...fromPage("automatizace-procesu"),
    description:
      "Opakující se práci, kterou dnes děláte ručně, převezme systém na pozadí. Stavím ji v nástrojích jako n8n a Make, případně vlastním kódem, a napojuji ji na to, co už používáte.",
    scenarios: [
      {
        title: "Po odeslání formuláře",
        text: "Zákazník dostane potvrzení, poptávka se zapíše do tabulky nebo systému a vy dostanete upozornění.",
      },
      {
        title: "Doklady a e-maily",
        text: "Údaje z e-mailu nebo dokladu doputují do systému bez přepisování.",
      },
      {
        title: "Připomínky a rozesílky",
        text: "Připomínky termínů, navazující zprávy nebo pravidelné přehledy odcházejí samy.",
      },
    ],
    chips: ["n8n", "Make", "Vlastní kód"],
    priceNote:
      "Od 4 999 Kč. Pevnou cenu znáte předem. Prvních 14 dní po spuštění máte podporu zdarma.",
    callout: {
      text: (
        <>
          Potřebujete rezervace? Rezervační systém na míru najdete mezi mými{" "}
          <Link href="/sluzby/systemy-na-miru" className="text-[#c9a84c] hover:underline">
            systémy na míru
          </Link>
          . Automatizace k němu doplní připomínky a upozornění.
        </>
      ),
    },
    relatedIndustries: [
      { label: "Kadeřnictví", href: "/web-pro-kadernictvi" },
      { label: "Masérky a wellness", href: "/web-pro-masery-a-wellness" },
      { label: "Řemeslníci", href: "/web-pro-remeslniky" },
    ],
    altenoPath: "/sluzby/automatizace",
    cta: { label: "Konzultace zdarma" },
  },
  {
    id: "chatboti-rag",
    number: "03",
    icon: MessageSquareText,
    ...fromPage("chatboti-rag"),
    description:
      "Chatbot neodpovídá z hlavy. Hledá odpověď ve vašich podkladech, tedy v ceníku, návodech, smlouvách nebo produktových listech, a odpovídá jen z nich. Technice, která to umožňuje, se říká RAG. Zvládne jednoduchého chatbota i vyhledávání ve velkém množství dokumentů.",
    scenarios: [
      {
        title: "Časté dotazy na webu",
        text: "Otevírací doba, ceník, postup objednávky. Zákazník má odpověď hned, i večer nebo o víkendu.",
      },
      {
        title: "Dotazy nad dokumenty",
        text: "Chatbot, který se orientuje v katalogu, návodech nebo interních podkladech.",
      },
      {
        title: "Sběr poptávek",
        text: "Než se ozvete vy, chatbot zjistí, co zákazník potřebuje, a předá vám kontakt s kontextem.",
      },
    ],
    chips: ["Odpovědi z vašich dat", "Web i interní dokumenty"],
    callout: {
      text: (
        <>
          Jednoduchého chatbota přímo na vašem webu najdete jako samostatnou službu:{" "}
          <Link href="/sluzby/ai-chatbot" className="text-[#c9a84c] hover:underline">
            AI Chatbot Starter a Pro
          </Link>
          . RAG dává smysl ve chvíli, kdy má chatbot prohledávat větší množství podkladů.
        </>
      ),
    },
    relatedIndustries: [
      { label: "Kadeřnictví", href: "/web-pro-kadernictvi" },
      { label: "Účetní", href: "/web-pro-ucetni" },
      { label: "Autoservisy", href: "/web-pro-autoservisy" },
    ],
    altenoPath: "/sluzby/chatboti-rag",
    cta: { label: "Konzultace zdarma" },
  },
  {
    id: "voice-agenti",
    number: "04",
    icon: PhoneCall,
    ...fromPage("voice-agenti"),
    description:
      "Opakující se telefonáty může převzít hlasový agent. Právě ho stavím a zatím ho nenasazuji u klientů. Pokud vás téma zajímá, napište mi a ozvu se, až bude připravený.",
    scenarios: [],
    chips: ["Ve vývoji"],
    altenoPath: "/sluzby/voice-agenti",
    cta: { label: "Dát vědět o zájmu", href: "/kontakt" },
  },
];

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
