// Hlavičky 4 podstránek /automatizace/[slug] (slug, název, stav) bez obsahu.
//
// PROČ ZVLÁŠŤ: navigace (lib/nav.ts) je v Navbaru a Footeru, tedy v klientském
// JS každé stránky webu. Plné lib/data/automation-pages.ts má ~25 kB textů
// (pain, how, FAQ…), které by se tím stahovaly všude, i když menu z nich
// potřebuje jen název. Zdrojem pravdy zůstává automation-pages.ts: na jeho
// konci je kontrola, která shodí build, jakmile se pořadí, slug, název nebo
// `comingSoon` tady a tam rozejdou.
export type AutomationIndexEntry = {
  slug: string;
  title: string;
  comingSoon?: boolean;
};

export const automationIndex: AutomationIndexEntry[] = [
  { slug: "ai-agenti", title: "AI agenti na míru" },
  { slug: "automatizace-procesu", title: "Automatizace procesů" },
  { slug: "chatboti-rag", title: "Chatboti a RAG" },
  { slug: "voice-agenti", title: "Voice agenti", comingSoon: true },
];
