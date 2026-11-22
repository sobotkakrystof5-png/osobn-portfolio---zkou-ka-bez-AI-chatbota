// Ukázky rozhraní ZakazIQ na /zakaziq kreslíme v design systému produktu
// (Dílky), ne v paletě VIZEON: stránka má ukazovat skutečnou aplikaci.
// Hodnoty jsou tmavý režim Dílků 1:1 z ProjectIQ (app/tokens-dilky.css
// a app/ws-tokens.css, [data-theme="dark"]). Tmavý režim proto, že světlý
// výřez působil na tmavém webu jako cizí těleso.
//
// Dvě značky stavu se nesmí míchat (DESIGN.md → The State Carries Meaning):
// nová poptávka = čárkovaný jantarový okraj, potvrzený termín = navy plocha
// s plným levým okrajem. Jantarová jen pro novou poptávku a odměnu.
//
// Celé třídy jako literály, ať je Tailwind najde při buildu.

export const zq = {
  /** Rám okna aplikace (ground). */
  frame: "rounded-[24px] border border-[#1b3868] bg-[#0c1a36] text-[#eef2fb]",
  /** Pracovní plocha uvnitř (surface). */
  surface: "bg-[#132850]",
  /** Jemnější plocha (navy-800 / 45 %). */
  soft: "bg-[#1b3868]/45",
  line: "border-[#1b3868]",
  ink: "text-[#eef2fb]",
  quiet: "text-[#b8ceef]",
  /** Odkazy a zvýraznění (navy-300 v tmavém režimu). */
  link: "text-[#8aaee3]",
  /** Nová poptávka. */
  pending: "border-[1.5px] border-dashed border-[#e19a2c] bg-[#3a2a0f] text-[#ffd696]",
  /** Potvrzený termín. */
  confirmed: "border-l-[3px] border-[#8aaee3] bg-[#1b3868] text-[#eef2fb]",
  /** Blokace v kalendáři (oběd, volno). */
  block: "bg-[#1b3868]/45 text-[#b8ceef]",
  /** Hlavní akce (navy-700). */
  primary: "rounded-full bg-[#23478b] font-semibold text-white",
  /** Druhá akce. */
  outline: "rounded-full border border-[#2b57a8] font-medium text-[#eef2fb]",
  /** Časy, data, částky (role JetBrains Mono v Dílkách). */
  data: "font-mono tabular-nums",
  /** Připravená odměna. */
  reward: "text-[#ffd28a]",
} as const;

/** Karta v části „ZakazIQ pro firmy" na /zakaziq: zaoblená navy místo hranatého
 *  glass-panelu VIZEON, aby byla část produktu vizuálně oddělená. */
export const zqCard = "rounded-[24px] border border-[#1b3868]/80 bg-[#0c1a36]/55";

/** Bílé tlačítko Dílků (button-inverse) pro výzvy v části produktu. */
export const zqCta =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 font-inter text-[15px] font-semibold text-[#0c1a36] transition-colors duration-200 hover:bg-[#dce7f7] active:scale-[0.98]";

/** Štítek „Ukázka": fiktivní data musí být na stránce takhle označená (PRODUCT.md). */
export const sampleLabel = "font-inter text-[12px] text-[#b8ceef]";
