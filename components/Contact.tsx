"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { fadeUp, slideLeft, slideRight, stagger, viewport } from "@/lib/animations";
import PhoneReveal from "@/components/PhoneReveal";
import {
  DEFAULT_CTA,
  DEFAULT_HINT,
  EMAIL_RE,
  findInterest,
  INTERESTS,
  LEAD_INTENT_EVENT,
  normalizePhone,
  readLeadIntent,
  readLeadSource,
  type InterestId,
  type LeadIntent,
} from "@/lib/lead";

function InstagramIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Validace přes react-hook-form, ne zod: zod (~74 kB gzip) byl kvůli pár
// polím v hlavním JS každé stránky s formulářem a na mobilu zdržoval
// načtení. Server validuje stejnými pravidly z lib/lead.ts přes zod
// (app/api/contact/route.ts) a poptávku pošle do ZakazIQ.
type FormData = { name: string; email: string; phone: string; message: string; website: string };
type Issue = { field: string; message: string };

const rules = {
  name:  { validate: (v: string) => v.trim().length >= 2 || "Zadejte prosím jméno" },
  email: { validate: (v: string) => EMAIL_RE.test(v.trim()) || "Neplatná emailová adresa" },
  phone: { validate: (v: string) => normalizePhone(v) !== null || "Zadejte prosím telefon, např. 777 123 456" },
};

const labelClass = "block font-inter font-normal text-[12px] uppercase tracking-[0.1em] text-text-secondary mb-2";
const inputClass = "w-full bg-[#111111] border border-white/[0.07] text-[#f0ece6] font-inter font-normal text-base md:text-[14px] px-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(201,168,76,0.3)] transition-colors placeholder-text-muted";

const NEXT_STEPS = [
  "Do hodiny se vám ozveme.",
  "Navrhneme dva termíny krátkého hovoru.",
  "Na hovoru probereme plán a cenu. Nezávazně.",
];

function newKey(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Konverze pro GA4 a z ní pro Google Ads. gtag je z app/layout.tsx. */
function trackLead(interest: InterestId | null, page: string) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", "generate_lead", { lead_interest: interest ?? "neuvedeno", lead_page: page });
}

export default function Contact({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [interest, setInterest] = useState<InterestId | null>(null);
  const [fromPage, setFromPage] = useState<string | null>(null);
  // Opakované odeslání stejných údajů po chybě nese stejný klíč, ZakazIQ
  // pak poptávku nezaloží dvakrát. Změněné údaje dostanou klíč nový.
  const lastAttempt = useRef<{ body: string; key: string } | null>(null);
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<FormData>();
  const Heading = motion[headingLevel];
  const selected = findInterest(interest);

  // Zájem předvybere ?zajem= v adrese (odkazy z reklam), jinak poslední
  // kliknutí na CTA (lib/lead.ts). Na homepage CTA jen sjede k formuláři,
  // proto se poslouchá i událost.
  useEffect(() => {
    const fromQuery = findInterest(new URLSearchParams(window.location.search).get("zajem"))?.id;
    const intent = readLeadIntent();
    if (fromQuery ?? intent?.interest) setInterest(fromQuery ?? intent?.interest ?? null);
    if (intent) setFromPage(intent.from);

    const onIntent = (e: Event) => {
      const detail = (e as CustomEvent<LeadIntent>).detail;
      if (detail.interest) setInterest(detail.interest);
      setFromPage(detail.from);
    };
    window.addEventListener(LEAD_INTENT_EVENT, onIntent);
    return () => window.removeEventListener(LEAD_INTENT_EVENT, onIntent);
  }, []);

  const onSubmit = async (data: FormData) => {
    setSending(true);
    const page = fromPage ?? window.location.pathname;
    try {
      const body = JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        message: data.message.trim() || undefined,
        interest: interest ?? undefined,
        page,
        source: readLeadSource(),
        website: data.website || undefined,
      });
      const key = lastAttempt.current?.body === body ? lastAttempt.current.key : newKey();
      lastAttempt.current = { body, key };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": key },
        body,
      });
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
      trackLead(interest, page);
      setSubmitted(true); reset();
      toast.success("Poptávka odeslána. Ozveme se do hodiny.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Odeslání se nezdařilo.");
    } finally { setSending(false); }
  };

  return (
    <section id="kontakt" className="py-28 md:py-40 bg-[#0e0e0e] relative overflow-hidden scroll-mb-24" aria-label="Kontakt">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.05), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <Heading variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[52px] md:text-[88px] leading-[1.0] text-[#f0ece6] mb-16">
          Pojďme <span className="text-shimmer">na to</span>.
        </Heading>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">

          {/* Formulář */}
          <motion.div variants={slideLeft} className="md:col-span-3">
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start gap-5" role="status">
                <CheckCircle size={40} className="text-[#c9a84c]" />
                <h3 className="font-cormorant font-light text-[32px] text-[#f0ece6]">Poptávka odeslána. Děkujeme!</h3>
                <ol className="space-y-3">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 font-inter font-normal text-[15px] text-text-secondary">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.4)] font-inter text-[12px] tabular-nums text-[#c9a84c]">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <button onClick={() => setSubmitted(false)} className="mt-2 font-inter font-medium text-[13px] text-[#c9a84c] underline underline-offset-4 hover:no-underline transition-all">
                  Odeslat další zprávu
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-5">
                  <fieldset>
                    <legend className={labelClass}>S čím vám pomůžeme?</legend>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((item) => (
                        <label key={item.id} className="cursor-pointer">
                          <input type="radio" name="interest" value={item.id} checked={interest === item.id}
                            onChange={() => setInterest(item.id)} className="peer sr-only" />
                          <span className="inline-flex min-h-[44px] items-center rounded-full border border-white/[0.1] px-4 font-inter font-normal text-[14px] text-text-secondary transition-colors duration-200 hover:border-white/[0.2] hover:text-[#f0ece6] peer-checked:border-[rgba(201,168,76,0.6)] peer-checked:bg-[rgba(201,168,76,0.08)] peer-checked:text-[#f0ece6] peer-focus-visible:ring-1 peer-focus-visible:ring-[rgba(201,168,76,0.5)]">
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="name" className={labelClass}>Jméno *</label>
                    <input id="name" type="text" autoComplete="name" aria-invalid={!!errors.name} {...register("name", rules.name)} className={inputClass} placeholder="Jan Novák" />
                    {errors.name && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.name.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
                    <div>
                      <label htmlFor="email" className={labelClass}>E-mail *</label>
                      <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email", rules.email)} className={inputClass} placeholder="jan@firma.cz" />
                      {errors.email && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Telefon *</label>
                      <input id="phone" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone} {...register("phone", rules.phone)} className={inputClass} placeholder="777 123 456" />
                      {errors.phone && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>Pár slov <span className="normal-case text-text-muted">(nepovinné)</span></label>
                    <textarea id="message" rows={2} maxLength={1500} {...register("message")} className={`${inputClass} resize-none`} placeholder={selected?.hint ?? DEFAULT_HINT} />
                  </div>
                  {/* Past na roboty: člověk pole nevidí ani na něj netabne. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="website">Web (nevyplňujte)</label>
                    <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                  </div>
                  <div>
                    <button type="submit" disabled={sending}
                      className="w-full flex items-center justify-center gap-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-4 hover:bg-[#d4b968] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {sending ? <><Loader2 size={15} className="animate-spin" />Odesílání…</> : `${selected?.cta ?? DEFAULT_CTA} →`}
                    </button>
                    <p className="mt-3 text-center font-inter font-normal text-[12px] text-text-muted">
                      Odpovíme do hodiny · nezávazně ·{" "}
                      <Link href="/gdpr" className="underline underline-offset-2 hover:text-text-secondary transition-colors">údaje jen k vyřízení poptávky</Link>
                    </p>
                  </div>
                </div>
              </form>
            )}
          </motion.div>

          {/* Kontaktní info */}
          <motion.div variants={slideRight} className="md:col-span-2">
            <div className="space-y-7 pl-0 md:pl-8" style={{ borderLeft: "0px" }}>
              <div className="hidden md:block w-full h-[1px] mb-2" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.3), transparent)" }} />
              <a href="mailto:info@vizeon.cz" className="flex items-center gap-3 group" aria-label="Email">
                <Mail size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-normal text-[14px] text-text-secondary group-hover:text-[#f0ece6] transition-colors duration-300 break-all">info@vizeon.cz</span>
              </a>
              <PhoneReveal iconSize={15} textSize={14} />
              <a href="https://www.instagram.com/vizeon_official/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" aria-label="Instagram">
                <InstagramIcon size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-normal text-[14px] text-text-secondary group-hover:text-[#f0ece6] transition-colors duration-300">Instagram</span>
              </a>
              <div className="pt-4">
                <p className="font-cormorant font-light text-[30px] leading-[1.25]">
                  <span className="text-shimmer">Odpovídáme do hodiny.</span>
                  <br />
                  <span className="text-text-secondary">Hovor navrhneme ve dvou termínech.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
