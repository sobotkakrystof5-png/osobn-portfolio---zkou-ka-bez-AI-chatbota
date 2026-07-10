"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import { fadeUp, slideLeft, slideRight, stagger, viewport } from "@/lib/animations";

function FacebookIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const schema = z.object({
  name:    z.string().min(2, "Zadejte prosím jméno"),
  email:   z.string().email("Neplatná emailová adresa"),
  phone:   z.string().optional(),
  message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
});
type FormData = z.infer<typeof schema>;

const inputClass = "w-full bg-[#111111] border border-white/[0.07] text-[#f0ece6] font-inter font-light text-base md:text-[14px] px-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(201,168,76,0.3)] transition-colors placeholder-[#3d3830]";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) { const j = (await res.json()) as { error?: string }; throw new Error(j.error ?? "Chyba"); }
      setSubmitted(true); setToast(true); reset();
      setTimeout(() => setToast(false), 4000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Odeslání se nezdařilo.");
    } finally { setSending(false); }
  };

  return (
    <section id="kontakt" className="py-28 md:py-40 bg-[#0e0e0e] relative overflow-hidden" aria-label="Kontakt">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.05), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[52px] md:text-[88px] leading-[1.0] text-[#f0ece6] mb-4">
          Pojďme <span className="text-shimmer">na to</span>.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[15px] text-[#8a8070] leading-[1.75] max-w-md mb-16">
          Nezávazná konzultace je zdarma. Nejhorší co se může stát je, že si popovídáme.
        </motion.p>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">

          {/* Formulář */}
          <motion.div variants={slideLeft} className="md:col-span-3">
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start gap-4">
                <CheckCircle size={40} className="text-[#c9a84c]" />
                <h3 className="font-cormorant font-light text-[32px] text-[#f0ece6]">Zpráva odeslána!</h3>
                <p className="font-inter font-light text-[15px] text-[#8a8070]">Ozvu se vám do 24 hodin. Děkuji za důvěru.</p>
                <button onClick={() => setSubmitted(false)} className="mt-2 font-inter font-medium text-[13px] text-[#c9a84c] underline underline-offset-4 hover:no-underline transition-all">
                  Odeslat další zprávu
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-inter font-light text-[12px] uppercase tracking-[0.1em] text-[#8a8070] mb-2">Jméno *</label>
                    <input id="name" type="text" autoComplete="name" {...register("name")} className={inputClass} placeholder="Jan Novák" />
                    {errors.name && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-inter font-light text-[12px] uppercase tracking-[0.1em] text-[#8a8070] mb-2">Email *</label>
                    <input id="email" type="email" autoComplete="email" {...register("email")} className={inputClass} placeholder="jan@firma.cz" />
                    {errors.email && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-inter font-light text-[12px] uppercase tracking-[0.1em] text-[#8a8070] mb-2">Telefon <span className="normal-case text-[#3d3830]">(volitelné)</span></label>
                    <input id="phone" type="tel" autoComplete="tel" {...register("phone")} className={inputClass} placeholder="+420 123 456 789" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-inter font-light text-[12px] uppercase tracking-[0.1em] text-[#8a8070] mb-2">Zpráva *</label>
                    <textarea id="message" rows={5} {...register("message")} className={`${inputClass} resize-none`} placeholder="Ahoj, mám zájem o..." />
                    {errors.message && <p role="alert" className="mt-1 font-inter text-[12px] text-red-400">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-4 hover:bg-[#d4b968] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                    {sending ? <><Loader2 size={15} className="animate-spin" />Odesílám…</> : "Odeslat zprávu →"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Kontaktní info */}
          <motion.div variants={slideRight} className="md:col-span-2">
            <div className="space-y-7 pl-0 md:pl-8" style={{ borderLeft: "0px" }}>
              <div className="hidden md:block w-full h-[1px] mb-2" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.3), transparent)" }} />
              <a href="mailto:sobotkakrystof5@gmail.com" className="flex items-center gap-3 group" aria-label="Email">
                <Mail size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-light text-[14px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300 break-all">sobotkakrystof5@gmail.com</span>
              </a>
              <a href="tel:+420604837333"
                className="flex items-center gap-3 group border border-white/[0.05] hover:border-[rgba(201,168,76,0.35)] hover:bg-[rgba(201,168,76,0.04)] px-4 py-3 -mx-4 transition-all duration-300"
                aria-label="Zavolat +420 604 837 333">
                <Phone size={15} className="text-[#c9a84c] shrink-0 group-hover:animate-[wiggle_0.4s_ease-in-out]" />
                <div className="flex-1">
                  <span className="font-inter font-medium text-[15px] text-[#f0ece6] block tracking-wide">+420 604 837 333</span>
                  <span className="font-inter font-light text-[11px] text-[#3d3830] group-hover:text-[#c9a84c]/60 transition-colors duration-300">WhatsApp · Klikněte pro hovor</span>
                </div>
                <span className="font-inter font-light text-[11px] tracking-[0.1em] uppercase text-[#c9a84c]/0 group-hover:text-[#c9a84c] transition-all duration-300 shrink-0">
                  Zavolat →
                </span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100086439650056" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" aria-label="Facebook">
                <FacebookIcon size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-light text-[14px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300">Facebook</span>
              </a>
              <div className="pt-4">
                <p className="font-cormorant font-light text-[30px] leading-[1.25]">
                  <span className="text-shimmer">Odpovídám do 24 hodin.</span>
                  <br />
                  <span className="text-[#8a8070]">Každý den.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -16, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: -10, x: "-50%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 z-50 bg-[#c9a84c] text-[#080808] font-inter font-medium text-[13px] px-6 py-3 shadow-xl"
            role="status" aria-live="polite">
            ✓ Děkuji! Ozvu se do 24 hodin.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
