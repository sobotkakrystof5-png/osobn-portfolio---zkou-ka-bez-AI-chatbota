// Rozpoznání robotů a nabídek ve formuláři poptávky (app/api/contact).
//
// Dvě úrovně:
//   drop   = jistě robot (člověk to neudělá). Poptávka se zahodí a robot
//            dostane falešný úspěch, ať nezkouší jiné hodnoty.
//   review = podezřelé. Do adminu ZakazIQ to nejde, přijde to jen e-mailem
//            s předmětem „Možná spam“, takže skutečná poptávka nepropadne.
//
// Žádné osobní údaje se nelogují, jen důvod.

export type SpamInput = {
  name: string;
  email: string;
  message?: string;
  /** Milisekundy od načtení formuláře do odeslání, posílá LeadForm. */
  elapsed?: number;
};

export type SpamCheck = { drop: string | null; review: string[] };

// Člověk formulář nestihne vyplnit a odeslat za necelou sekundu od načtení.
const DROP_FASTER_THAN_MS = 800;
const REVIEW_FASTER_THAN_MS = 3_000;

const LINK_RE = /https?:\/\/|www\./gi;
const HTML_LINK_RE = /\[url[=\]]|<a\s+href|\[link=/i;
// Azbuka, arabské písmo, čínština, japonština, korejština.
const FOREIGN_SCRIPT_RE = /[Ѐ-ӿ؀-ۿ぀-ヿ㐀-鿿가-힯]/;
const CZECH_LETTERS_RE = /[ěščřžýáíéůúťďňó]/i;
const ENGLISH_WORD_RE = /\b(the|and|your|you|we|our|for|with|this|that|are|is|hello|dear|offer|business|website|services?)\b/gi;
// „JamesUnart“, „RobertSoype“: jedno slovo s velkým písmenem uprostřed, typické jméno robota.
const BOT_NAME_RE = /^[A-Z][a-z]{2,}[A-Z][a-z]{2,}$/;

// Fráze z nevyžádaných nabídek. Malými písmeny, hledá se jako podřetězec.
const SPAM_PHRASES = [
  "seo service", "seo expert", "seo agency", "backlink", "guest post", "link building", "linkbuilding", "dofollow",
  "first page of google", "page 1 of google", "rank your website", "increase your traffic", "web traffic",
  "lead generation", "white label", "whitelabel", "outsourc", "app development", "web development company",
  "digital marketing agency", "i came across your", "i noticed your website", "i visited your website",
  "dear sir", "dear madam", "business owner", "unsubscribe", "opt out", "opt-out",
  "crypto", "bitcoin", "forex", "casino", "viagra", "cialis", "t.me/",
];

export function checkSpam(input: SpamInput): SpamCheck {
  const name = input.name.trim();
  const message = input.message?.trim() ?? "";
  const lower = message.toLowerCase();

  if (countLinks(name) > 0) return { drop: "odkaz ve jméně", review: [] };
  if (HTML_LINK_RE.test(message) || HTML_LINK_RE.test(name)) return { drop: "HTML odkaz ve zprávě", review: [] };
  if (input.elapsed !== undefined && input.elapsed < DROP_FASTER_THAN_MS) {
    return { drop: `odesláno za ${input.elapsed} ms od načtení`, review: [] };
  }

  const review: string[] = [];
  if (input.elapsed === undefined) review.push("chybí čas vyplnění (neodesláno z formuláře na webu)");
  else if (input.elapsed < REVIEW_FASTER_THAN_MS) review.push(`odesláno už za ${(input.elapsed / 1000).toFixed(1)} s`);

  const links = countLinks(message);
  if (links >= 2) review.push(`${links} odkazy ve zprávě`);

  if (FOREIGN_SCRIPT_RE.test(name) || FOREIGN_SCRIPT_RE.test(message)) review.push("cizí písmo (azbuka, čínština…)");

  const phrase = SPAM_PHRASES.find((p) => lower.includes(p));
  if (phrase) review.push(`fráze z nabídek „${phrase}“`);

  const englishWords = message.match(ENGLISH_WORD_RE)?.length ?? 0;
  if (englishWords >= 5 && !CZECH_LETTERS_RE.test(message)) review.push("zpráva v angličtině");

  if (BOT_NAME_RE.test(name)) review.push("jméno vypadá jako vygenerované");

  return { drop: null, review };
}

function countLinks(text: string): number {
  return text.match(LINK_RE)?.length ?? 0;
}
