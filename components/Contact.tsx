"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { fadeUp, slideLeft, slideRight, stagger, viewport } from "@/lib/animations";
import PhoneReveal from "@/components/PhoneReveal";

function InstagramIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Validace přes react-hook-form, ne zod: zod (~74 kB gzip) byl kvůli čtyřem
// polím v hlavním JS každé stránky s formulářem a na mobilu zdržoval
// načtení. Pravidla a hlášky odpovídají dřívějšímu zod schématu, server
// validuje dál přes zod (app/api/contact/route.ts).
type FormData = { name: string; email: string; phone?: string; message: string };

// Stejný regex jako z.string().email() v zod 4 (zod/v4/core/regexes.js).
const EMAIL_RE = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

const rules = {
  name:    { validate: (v: string) => v.length >= 2 || "Zadejte prosím jméno" },
  email:   { validate: (v: string) => EMAIL_RE.test(v) || "Neplatná emailová adresa" },
  message: { validate: (v: string) => v.length >= 10 || "Zpráva musí mít alespoň 10 znaků" },
};

const inputClass = "w-full bg-[#111111] border border-white/[0.07] text-[#f0ece6] font-inter font-normal text-base md:text-[14px] px-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(201,168,76,0.3)] transition-colors placeholder-text-muted";

export default function Contact({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const Heading = motion[headingLevel];

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) { const j = (await res.json()) as { error?: string }; throw new Error(j.error ?? "Chyba"); }
      setSubmitted(true); reset();
      toast.success("Děkujeme! Ozveme se do hodiny a navrhneme dva termíny hovoru.");
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
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start gap-4">
                <CheckCircle size={40} className="text-[#c9a84c]" />
                <h3 className="font-cormorant font-light text-[32px] text-[#f0ece6]">Zpráva odeslána!</h3>
                <p className="font-inter font-normal text-[15px] text-text-secondary">Ozveme se vám do hodiny a navrhneme dva konkrétní termíny hovoru. Děkujeme za důvěru.</p>
                <button onClick={() => setSubmitted(false)} className="mt-2 font-inter font-medium text-[13px] text-[#c9a84c] underline underline-offset-4 hover:no-underline transition-all">
                  Odeslat další zprávu
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-inter font-normal text-[12px] uppercase tracking-[0.1em] text-text-secondary mb-2">Jméno *</label>
                    <input id="name" type="text" autoComplete="name" {...register("name", rules.name)} className={inputClass} placeholder="Jan Novák" />
                    {errors.name && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-inter font-normal text-[12px] uppercase tracking-[0.1em] text-text-secondary mb-2">Email *</label>
                    <input id="email" type="email" autoComplete="email" {...register("email", rules.email)} className={inputClass} placeholder="jan@firma.cz" />
                    {errors.email && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-inter font-normal text-[12px] uppercase tracking-[0.1em] text-text-secondary mb-2">Telefon <span className="normal-case text-text-muted">(volitelné)</span></label>
                    <input id="phone" type="tel" autoComplete="tel" {...register("phone")} className={inputClass} placeholder="+420 123 456 789" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-inter font-normal text-[12px] uppercase tracking-[0.1em] text-text-secondary mb-2">Zpráva *</label>
                    <textarea id="message" rows={5} {...register("message", rules.message)} className={`${inputClass} resize-none`} placeholder="Ahoj, mám zájem o..." />
                    {errors.message && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-4 hover:bg-[#d4b968] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                    {sending ? <><Loader2 size={15} className="animate-spin" />Odesílání…</> : "Odeslat zprávu →"}
                  </button>
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
