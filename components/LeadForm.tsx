"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, Check, CheckCircle, Loader2, MessageCircle, Monitor, Pencil, Plus, Search, ShoppingCart, TrendingUp, Workflow,
  type LucideIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import PhoneReveal from "@/components/PhoneReveal";
import Turnstile, { type TurnstileHandle } from "@/components/Turnstile";
import { safeStorageGet, safeStorageSet } from "@/lib/utils";
import {
  asksForUrl, DEFAULT_CTA, DEFAULT_HINT, EMAIL_RE, findInterest, findTimeline, INTERESTS, LEAD_INTENT_EVENT,
  normalizePhone, normalizeUrl, readLeadIntent, readLeadSource, TIMELINES,
  type InterestId, type LeadIntent, type TimelineId,
} from "@/lib/lead";

// Poptávka ve třech krocích: jedno klepnutí (co), jedno klepnutí (kdy, u
// prověrky adresa webu), až pak kontakt. Malý první závazek a viditelný postup
// dotáhnou víc lidí do konce než jedna stěna polí. Server validuje stejnými
// pravidly z lib/lead.ts (app/api/contact/route.ts) a pošle poptávku do ZakazIQ.
//
// Validace přes react-hook-form, ne zod: zod by se kvůli pár polím přidal do JS
// každé stránky s formulářem.

type FormData = { name: string; email: string; phone: string; message: string; website: string };
type Issue = { field: string; message: string };
type Step = 0 | 1 | 2;
type Draft = Partial<Omit<FormData, "website">> & { interest?: InterestId | null; timeline?: TimelineId | null; url?: string };

const ICONS: Record<InterestId, LucideIcon> = {
  proverka: Search, web: Monitor, eshop: ShoppingCart, automatizace: Workflow, marketing: TrendingUp, jine: MessageCircle,
};

const rules = {
  name:  { validate: (v: string) => v.trim().length >= 2 || "Zadejte prosím jméno" },
  email: { validate: (v: string) => EMAIL_RE.test(v.trim()) || "Neplatná emailová adresa" },
  phone: { validate: (v: string) => normalizePhone(v) !== null || "Zadejte prosím telefon, např. 777 123 456" },
};

const NEXT_STEPS = [
  "Do hodiny se vám ozveme.",
  "Navrhneme dva termíny krátkého hovoru.",
  "Na hovoru probereme plán a cenu. Nezávazně.",
];

// Rozpracovaná poptávka přežije přechod na jinou stránku. sessionStorage:
// zmizí se zavřením karty a po odeslání se maže.
const DRAFT_KEY = "vizeon_lead_draft";

const labelClass = "block font-inter font-normal text-[12px] uppercase tracking-[0.1em] text-text-secondary mb-2";
const inputClass = "w-full bg-[#111111] border border-white/[0.07] text-[#f0ece6] font-inter font-normal text-base md:text-[14px] px-4 py-3 pr-10 outline-none focus:border-[rgba(201,168,76,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(201,168,76,0.3)] transition-colors placeholder-text-muted";
const tileClass = "group flex items-center gap-2.5 sm:gap-3 border bg-[#111111] px-3 sm:px-4 text-left font-inter font-normal text-[14px] sm:text-[15px] transition-[border-color,background-color,color,transform] duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(201,168,76,0.5)]";
const tileState = (on: boolean) =>
  on
    ? "border-[rgba(201,168,76,0.6)] bg-[rgba(201,168,76,0.08)] text-[#f0ece6]"
    : "border-white/[0.08] text-text-secondary hover:border-white/[0.2] hover:text-[#f0ece6]";
const chipClass = "inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/[0.1] px-3 font-inter text-[13px] text-text-secondary hover:border-white/[0.2] hover:text-[#f0ece6] transition-colors";

function newKey(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** gtag je z app/layout.tsx; generate_lead je konverze pro GA4 a Google Ads. */
function track(event: string, params: Record<string, string>) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params);
}

/** „777123456“ → „777 123 456“, „+420777…“ → „+420 777 123 456“. Jiné tvary nechá být. */
function formatPhone(raw: string): string {
  const plus = raw.trimStart().startsWith("+");
  const digits = raw.replace(/\D/g, "");
  const group = (d: string) => d.replace(/(\d{3})(?=\d)/g, "$1 ");
  if (plus && digits.startsWith("420") && digits.length <= 12) return `+420 ${group(digits.slice(3))}`.trimEnd();
  if (!plus && digits.length <= 9) return group(digits);
  return raw;
}

function readDraft(): Draft | null {
  try {
    return JSON.parse(safeStorageGet(window.sessionStorage, DRAFT_KEY) ?? "null") as Draft | null;
  } catch {
    return null;
  }
}

function firstStep(interest: InterestId | null, timeline: TimelineId | null, url: string): Step {
  if (!interest) return 0;
  return (asksForUrl(interest) ? normalizeUrl(url) : timeline) ? 2 : 1;
}

export default function LeadForm() {
  const [step, setStep] = useState<Step>(0);
  const [interest, setInterest] = useState<InterestId | null>(null);
  const [timeline, setTimeline] = useState<TimelineId | null>(null);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [showNote, setShowNote] = useState(false);
  const [fromPage, setFromPage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sentName, setSentName] = useState<string | null>(null);
  const restored = useRef(false);
  const started = useRef(false);
  const navigated = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // Opakované odeslání stejných údajů po chybě nese stejný klíč.
  const lastAttempt = useRef<{ body: string; key: string } | null>(null);
  // Kdy se formulář objevil: server pozná robota, který odešle hned po načtení.
  const mountedAt = useRef(0);
  const turnstile = useRef<TurnstileHandle>(null);
  const reduce = useReducedMotion();
  const { register, handleSubmit, formState: { errors, touchedFields }, reset, setError, getValues, watch } =
    useForm<FormData>({ mode: "onTouched", defaultValues: { name: "", email: "", phone: "", message: "", website: "" } });
  const values = watch();
  const selected = findInterest(interest);
  const wantsUrl = asksForUrl(interest);

  // Obnova: ?zajem= z reklamy > rozpracovaná poptávka > poslední kliknutí na CTA.
  useEffect(() => {
    mountedAt.current = performance.now();
    const draft = readDraft();
    const fromQuery = findInterest(new URLSearchParams(window.location.search).get("zajem"))?.id ?? null;
    const intent = readLeadIntent();
    const nextInterest = fromQuery ?? draft?.interest ?? intent?.interest ?? null;
    const nextTimeline = draft?.timeline ?? null;
    const nextUrl = draft?.url ?? "";
    if (draft) {
      reset({ name: draft.name ?? "", email: draft.email ?? "", phone: draft.phone ?? "", message: draft.message ?? "", website: "" });
      if (draft.message) setShowNote(true);
    }
    setInterest(nextInterest);
    setTimeline(nextTimeline);
    setUrl(nextUrl);
    setStep(firstStep(nextInterest, nextTimeline, nextUrl));
    if (intent) setFromPage(intent.from);
    restored.current = true;

    // Na homepage CTA jen sjede k formuláři, proto i událost.
    const onIntent = (e: Event) => {
      const detail = (e as CustomEvent<LeadIntent>).detail;
      setFromPage(detail.from);
      if (detail.interest) {
        setInterest(detail.interest);
        setStep((s) => (s === 0 ? 1 : s));
      }
    };
    window.addEventListener(LEAD_INTENT_EVENT, onIntent);
    return () => window.removeEventListener(LEAD_INTENT_EVENT, onIntent);
  }, [reset]);

  useEffect(() => {
    if (!restored.current || sentName) return;
    const { website: _honeypot, ...contact } = values;
    safeStorageSet(window.sessionStorage, DRAFT_KEY, JSON.stringify({ ...contact, interest, timeline, url } satisfies Draft));
  }, [values, interest, timeline, url, sentName]);

  // Volá StepFocus, až se nový krok opravdu vykreslí (AnimatePresence čeká
  // na odchod starého). Fokus na nadpis kvůli čtečkám, u kontaktu na první
  // prázdné pole; když formulář ujel nad okraj, vrátí se do záběru.
  const focusStep = () => {
    if (!navigated.current) return;
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) window.scrollBy({ top: top - 104, behavior: reduce ? "auto" : "smooth" });
    const name = document.getElementById("name");
    if (step === 2 && name && !getValues("name")) name.focus({ preventScroll: true });
    else headingRef.current?.focus({ preventScroll: true });
  };

  const go = (next: Step) => {
    navigated.current = true;
    if (!started.current) {
      started.current = true;
      track("form_start", { lead_interest: interest ?? "neuvedeno" });
    }
    if (next > step) track("form_step", { step: next === 1 ? (wantsUrl ? "web" : "termin") : "kontakt" });
    setStep(next);
  };

  const pickInterest = (id: InterestId) => {
    setInterest(id);
    navigated.current = true;
    if (!started.current) {
      started.current = true;
      track("form_start", { lead_interest: id });
    }
    track("form_step", { step: asksForUrl(id) ? "web" : "termin" });
    setStep(1);
  };

  const pickTimeline = (id: TimelineId) => {
    setTimeline(id);
    go(2);
  };

  const submitUrl = () => {
    if (!normalizeUrl(url)) {
      setUrlError("Zadejte prosím adresu webu, např. vasefirma.cz");
      return;
    }
    setUrlError(null);
    go(2);
  };

  const onSubmit = async (data: FormData) => {
    setSending(true);
    const page = fromPage ?? window.location.pathname;
    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        message: data.message.trim() || undefined,
        interest: interest ?? undefined,
        timeline: wantsUrl ? undefined : timeline ?? undefined,
        url: wantsUrl ? normalizeUrl(url) ?? undefined : undefined,
        page,
        source: readLeadSource(),
        website: data.website || undefined,
      };
      const body = JSON.stringify(payload);
      const key = lastAttempt.current?.body === body ? lastAttempt.current.key : newKey();
      lastAttempt.current = { body, key };

      // Ochrana proti robotům: čas vyplnění a token Turnstile (ten je na každý
      // pokus nový, proto mimo `body`, podle kterého se drží klíč).
      const captcha = await turnstile.current?.token();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": key },
        body: JSON.stringify({
          ...payload,
          elapsed: Math.round(performance.now() - mountedAt.current),
          turnstileToken: captcha ?? undefined,
        }),
      });
      turnstile.current?.reset();
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string; issues?: Issue[] };
        for (const issue of j.issues ?? []) {
          if (issue.field === "name" || issue.field === "email" || issue.field === "phone") {
            setError(issue.field, { message: issue.message });
          }
        }
        throw new Error(j.error ?? "Odeslání se nezdařilo.");
      }
      lastAttempt.current = null;
      track("generate_lead", { lead_interest: interest ?? "neuvedeno", lead_page: page, lead_cta: readLeadIntent()?.cta ?? "zadne" });
      try { window.sessionStorage.removeItem(DRAFT_KEY); } catch { /* soukromé okno */ }
      setSentName(data.name.trim().split(/\s+/)[0] ?? "");
      // Natvrdo prázdné: reset() bez hodnot by vrátil obnovený koncept.
      reset({ name: "", email: "", phone: "", message: "", website: "" });
      toast.success("Poptávka odeslána. Ozveme se do hodiny.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Odeslání se nezdařilo.");
    } finally {
      setSending(false);
    }
  };

  if (sentName !== null) {
    return (
      <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-start gap-5" role="status">
        <CheckCircle size={40} className="text-[#c9a84c]" aria-hidden="true" />
        <h3 className="font-cormorant font-light text-[34px] leading-tight text-[#f0ece6]">
          Díky{sentName ? `, ${sentName}` : ""}. Máme to.
        </h3>
        <ol className="space-y-3">
          {NEXT_STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3 font-inter font-normal text-[15px] text-text-secondary">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.4)] text-[12px] tabular-nums text-[#c9a84c]">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-inter text-[14px] text-text-muted">
          Spěchá to? <PhoneReveal iconSize={14} textSize={14} />
        </div>
        <button type="button" onClick={() => { setSentName(null); setStep(0); setInterest(null); setTimeline(null); setUrl(""); setShowNote(false); }}
          className="font-inter font-medium text-[13px] text-[#c9a84c] underline underline-offset-4 hover:no-underline">
          Odeslat další poptávku
        </button>
      </motion.div>
    );
  }

  const shift = reduce ? 0 : 16;
  const heading = step === 0 ? "S čím vám pomůžeme?" : step === 1 ? (wantsUrl ? "Jaký web prověříme?" : "Kdy to potřebujete?") : "Kam vám zavoláme?";
  const valid = (f: "name" | "email" | "phone") => touchedFields[f] && !errors[f] && values[f];

  return (
    <div ref={rootRef} className="scroll-mt-28">
      {/* Postup: tři dílky, vyplněné zlatě. */}
      <div className="mb-6 flex min-h-11 items-center gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((step - 1) as Step)} aria-label="Zpět na předchozí krok"
            className="-ml-2 inline-flex h-11 w-11 shrink-0 items-center justify-center text-text-secondary hover:text-[#f0ece6] transition-colors">
            <ArrowLeft size={18} />
          </button>
        ) : null}
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-[2px] flex-1 transition-colors duration-300 ${i <= step ? "bg-[#c9a84c]" : "bg-white/[0.1]"}`} />
          ))}
        </div>
        <span className="shrink-0 font-inter text-[12px] tabular-nums text-text-muted">Krok {step + 1} ze 3</span>
      </div>

      {step > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {selected && (
            <button type="button" onClick={() => setStep(0)} className={chipClass} aria-label={`Změnit: ${selected.label}`}>
              {selected.label} <Pencil size={12} aria-hidden="true" />
            </button>
          )}
          {step === 2 && (wantsUrl ? normalizeUrl(url) : findTimeline(timeline)) && (
            <button type="button" onClick={() => setStep(1)} className={chipClass} aria-label="Změnit předchozí odpověď">
              {wantsUrl ? normalizeUrl(url)?.replace(/^https?:\/\//, "") : findTimeline(timeline)?.label} <Pencil size={12} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <form noValidate onSubmit={step === 2 ? handleSubmit(onSubmit) : (e) => { e.preventDefault(); if (step === 1 && wantsUrl) submitUrl(); }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${step}-${wantsUrl}`} initial={{ opacity: 0, x: shift }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -shift }}
            transition={{ duration: 0.2, ease: "easeOut" }}>
            <StepFocus onMount={focusStep} />
            <h3 ref={headingRef} tabIndex={-1} className="mb-5 font-cormorant font-light text-[30px] md:text-[34px] leading-tight text-[#f0ece6] outline-none">
              {heading}
            </h3>

            {step === 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {INTERESTS.map((item) => {
                  const Icon = ICONS[item.id];
                  return (
                    <button key={item.id} type="button" onClick={() => pickInterest(item.id)} aria-pressed={interest === item.id}
                      className={`${tileClass} min-h-[72px] ${tileState(interest === item.id)}`}>
                      <Icon size={18} className="shrink-0 text-[#c9a84c]" aria-hidden="true" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 1 && !wantsUrl && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {TIMELINES.map((t) => (
                  <button key={t.id} type="button" onClick={() => pickTimeline(t.id)} aria-pressed={timeline === t.id}
                    className={`${tileClass} min-h-[56px] justify-center ${tileState(timeline === t.id)}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {step === 1 && wantsUrl && (
              <div>
                <label htmlFor="lead-url" className={labelClass}>Adresa webu</label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input id="lead-url" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false}
                    value={url} onChange={(e) => { setUrl(e.target.value); if (urlError) setUrlError(null); }}
                    aria-invalid={!!urlError} aria-describedby={urlError ? "lead-url-error" : undefined}
                    className={`${inputClass} sm:flex-1`} placeholder="vasefirma.cz" />
                  <button type="submit"
                    className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-colors">
                    Pokračovat →
                  </button>
                </div>
                {urlError && <p id="lead-url-error" role="alert" className="mt-1 font-inter text-[12px] text-red-400">{urlError}</p>}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className={labelClass}>Jméno</label>
                  <div className="relative">
                    <input id="name" type="text" autoComplete="name" aria-invalid={!!errors.name} {...register("name", rules.name)} className={inputClass} placeholder="Jan Novák" />
                    {valid("name") && <Check size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a84c]" aria-hidden="true" />}
                  </div>
                  {errors.name && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Telefon</label>
                    <div className="relative">
                      <input id="phone" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone}
                        {...register("phone", { ...rules.phone, onChange: (e) => { e.target.value = formatPhone(e.target.value); } })}
                        className={inputClass} placeholder="777 123 456" />
                      {valid("phone") && <Check size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a84c]" aria-hidden="true" />}
                    </div>
                    {errors.phone && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>E-mail</label>
                    <div className="relative">
                      <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email", rules.email)} className={inputClass} placeholder="jan@firma.cz" />
                      {valid("email") && <Check size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a84c]" aria-hidden="true" />}
                    </div>
                    {errors.email && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.email.message}</p>}
                  </div>
                </div>
                {showNote ? (
                  <div>
                    <label htmlFor="message" className={labelClass}>Poznámka</label>
                    <textarea id="message" rows={2} maxLength={1500} {...register("message")} className={`${inputClass} resize-none`} placeholder={selected?.hint ?? DEFAULT_HINT} />
                  </div>
                ) : (
                  <button type="button" onClick={() => setShowNote(true)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-inter text-[13px] text-text-secondary hover:text-[#f0ece6] transition-colors">
                    <Plus size={14} aria-hidden="true" /> Přidat poznámku
                  </button>
                )}
                {/* Past na roboty: člověk pole nevidí ani na něj netabne. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="website">Web (nevyplňujte)</label>
                  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                </div>
                <div>
                  <Turnstile ref={turnstile} />
                  <button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-4 hover:bg-[#d4b968] active:scale-[0.99] transition-[background-color,transform] duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {sending ? <><Loader2 size={15} className="animate-spin" />Odesílání…</> : `${selected?.cta ?? DEFAULT_CTA} →`}
                  </button>
                  <div className="mt-4 flex items-center gap-3">
                    <Image src="/avatar.jpg" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover object-top" />
                    <p className="font-inter font-normal text-[13px] leading-snug text-text-secondary">
                      <span className="text-[#f0ece6]">Ozve se vám Kryštof osobně.</span>
                      <br />
                      <span className="text-[12px] text-text-muted">
                        Do hodiny · nezávazně ·{" "}
                        <Link href="/gdpr" className="underline underline-offset-2 hover:text-text-secondary transition-colors">údaje jen k vyřízení poptávky</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
}

/** Zavolá onMount jednou, když se krok vykreslí. */
function StepFocus({ onMount }: { onMount: () => void }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onMount, []);
  return null;
}
