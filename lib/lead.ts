// Poptávkový formulář: co návštěvník chce a odkud přišel. Sdílí ho prohlížeč
// (Contact, CTAButton, LeadSourceCapture) i server (app/api/contact), proto
// tu není nic serverového ani těžká knihovna.

import { safeStorageGet, safeStorageSet } from "@/lib/utils";

export const INTERESTS = [
  { id: "proverka", label: "Prověrka webu", cta: "Chci prověřit web zdarma", hint: "Co vás na webu trápí nebo co chcete zlepšit?" },
  { id: "web", label: "Nový web", cta: "Chci plán a cenu webu", hint: "Čím se živíte a máte už nějaký web?" },
  { id: "eshop", label: "E-shop", cta: "Chci cenu e-shopu", hint: "Co prodáváte a kolik máte zhruba produktů?" },
  { id: "automatizace", label: "Automatizace", cta: "Chci návrh automatizace", hint: "Co vás teď stojí nejvíc času?" },
  { id: "marketing", label: "Marketing", cta: "Chci návrh marketingu", hint: "Adresa webu a co chcete zlepšit" },
  { id: "jine", label: "Něco jiného", cta: "Odeslat poptávku", hint: "S čím potřebujete pomoct?" },
] as const;

export type InterestId = (typeof INTERESTS)[number]["id"];
export const INTEREST_IDS = INTERESTS.map((i) => i.id) as [InterestId, ...InterestId[]];
export const DEFAULT_CTA = "Odeslat poptávku";
export const DEFAULT_HINT = "Adresa vašeho webu, pokud ho máte, a co potřebujete…";

export function findInterest(id: string | null | undefined) {
  return INTERESTS.find((i) => i.id === id) ?? null;
}

// Krok 2 formuláře: jak to spěchá. Majitel podle toho ví, komu volat dřív.
export const TIMELINES = [
  { id: "hned", label: "Co nejdřív" },
  { id: "do-3-mesicu", label: "Do 3 měsíců" },
  { id: "zjistuji", label: "Zatím zjišťuji" },
] as const;

export type TimelineId = (typeof TIMELINES)[number]["id"];
export const TIMELINE_IDS = TIMELINES.map((t) => t.id) as [TimelineId, ...TimelineId[]];

export function findTimeline(id: string | null | undefined) {
  return TIMELINES.find((t) => t.id === id) ?? null;
}

/** U prověrky se v kroku 2 ptáme na adresu webu místo termínu. */
export function asksForUrl(interest: InterestId | null): boolean {
  return interest === "proverka";
}

/** Adresa webu od návštěvníka („vasefirma.cz“) jako https://…, jinak null. */
export function normalizeUrl(raw: string): string | null {
  const s = raw.trim().replace(/\s+/g, "");
  if (!s) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return /\.[a-z]{2,}$/i.test(u.hostname) ? u.href.replace(/\/$/, "") : null;
  } catch {
    return null;
  }
}

// Zájem podle stránky, na které návštěvník klikl na CTA. Jedno místo místo
// prop u každého z desítek CTA tlačítek. Stránka bez jasné služby = null.
const PATH_INTERESTS: [RegExp, InterestId][] = [
  [/^\/$/, "proverka"],
  [/^\/sluzby\/seo-optimalizace\/audit/, "proverka"],
  [/^\/sluzby\/seo-optimalizace/, "marketing"],
  [/^\/sluzby\/tvorba-e-shopu/, "eshop"],
  [/^\/(automatizace|sluzby\/ai-chatbot|sluzby\/systemy-na-miru)/, "automatizace"],
  [/^\/(sluzby\/tvorba-webovych-stranek|sluzby\/tvorba-webu-pro-firmy|cena-tvorby-webu|tvorba-webu-pro-zivnostniky|web-pro-|ukazky-webu)/, "web"],
];

export function interestFromPath(path: string): InterestId | null {
  return PATH_INTERESTS.find(([re]) => re.test(path))?.[1] ?? null;
}

// Stejný regex jako z.string().email() v zod 4 (zod/v4/core/regexes.js).
// Sdílí ho formulář i server, aby se validace nerozešly.
export const EMAIL_RE = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

// Telefon stejně jako ZakazIQ (normalizePhone v lib/ws/bookings.ts). Číslo,
// které by ZakazIQ odmítl, by skončilo jen v záložním e-mailu.
export function normalizePhone(raw: string): string | null {
  let s = raw.replace(/[\s().-]/g, "");
  if (s.startsWith("00")) s = `+${s.slice(2)}`;
  if (/^\d{9}$/.test(s)) s = `+420${s}`;
  return /^\+[1-9]\d{6,14}$/.test(s) ? s : null;
}

// ── Záměr z posledního kliknutí na CTA ──────────────────────────────────
export const LEAD_INTENT_KEY = "vizeon_lead_intent";
export const LEAD_INTENT_EVENT = "vizeon:lead-intent";
/** cta = kde na stránce bylo tlačítko (lišta, menu, id sekce), jde do GA4 jako lead_cta. */
export type LeadIntent = { interest: InterestId | null; from: string; cta?: string };

/** interest přebije zájem podle stránky; null = žádný předvýběr (obecné „Nacenit můj projekt“ v liště). */
export function rememberLeadIntent(path: string, cta?: string, interest?: InterestId | null): void {
  const intent: LeadIntent = { interest: interest !== undefined ? interest : interestFromPath(path), from: path, cta };
  safeStorageSet(sessionStorage, LEAD_INTENT_KEY, JSON.stringify(intent));
  window.dispatchEvent(new CustomEvent<LeadIntent>(LEAD_INTENT_EVENT, { detail: intent }));
}

export function readLeadIntent(): LeadIntent | null {
  try {
    const raw = safeStorageGet(sessionStorage, LEAD_INTENT_KEY);
    const v = raw ? (JSON.parse(raw) as Partial<LeadIntent>) : null;
    if (!v || typeof v.from !== "string") return null;
    return { from: v.from, interest: findInterest(v.interest)?.id ?? null, cta: typeof v.cta === "string" ? v.cta : undefined };
  } catch {
    return null;
  }
}

// ── Odkud návštěvník přišel (UTM, reklama, vstupní stránka) ─────────────
export const LEAD_SOURCE_KEY = "vizeon_lead_source";
export const SOURCE_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
export const SOURCE_KEYS = [...SOURCE_PARAMS, "landing"] as const;
export type LeadSource = Partial<Record<(typeof SOURCE_KEYS)[number], string>>;

/** Volá se jednou po načtení stránky. První návštěva v relaci se zapíše,
 *  placený vstup (UTM, gclid, fbclid) přepíše dřívější. */
export function captureLeadSource(): void {
  const params = new URLSearchParams(window.location.search);
  const source: LeadSource = { landing: window.location.pathname.slice(0, 200) };
  let paid = false;
  for (const key of SOURCE_PARAMS) {
    const value = params.get(key);
    if (value) {
      source[key] = value.slice(0, 200);
      paid = true;
    }
  }
  if (paid || !safeStorageGet(sessionStorage, LEAD_SOURCE_KEY)) {
    safeStorageSet(sessionStorage, LEAD_SOURCE_KEY, JSON.stringify(source));
  }
}

export function readLeadSource(): LeadSource | undefined {
  try {
    const raw = safeStorageGet(sessionStorage, LEAD_SOURCE_KEY);
    const v = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
    if (!v) return undefined;
    const out: LeadSource = {};
    for (const key of SOURCE_KEYS) if (typeof v[key] === "string") out[key] = v[key];
    return out;
  } catch {
    return undefined;
  }
}

/** Zdroj jedním řádkem pro poptávku: „google / cpc / jaro · Google Ads · vstup /sluzby/…“. */
export function describeLeadSource(source: LeadSource | undefined): string | null {
  if (!source) return null;
  const parts = [
    [source.utm_source, source.utm_medium, source.utm_campaign].filter(Boolean).join(" / "),
    source.utm_term && `klíčové slovo ${source.utm_term}`,
    source.gclid && "Google Ads",
    source.fbclid && "Meta",
    source.landing && `vstup ${source.landing}`,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : null;
}
