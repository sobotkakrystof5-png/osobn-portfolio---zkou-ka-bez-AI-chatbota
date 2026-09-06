"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { fadeUp, slideLeft, slideRight, stagger, viewport } from "@/lib/animations";

function FacebookIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2c-5.514 0-9.998 4.484-9.998 9.998 0 1.762.462 3.484 1.34 5.002L2 22l5.117-1.342a9.958 9.958 0 0 0 4.887 1.245h.004c5.514 0 9.998-4.484 9.998-9.998C21.996 6.484 17.518 2 12.004 2zm0 18.184h-.003a8.19 8.19 0 0 1-4.174-1.144l-.3-.178-3.037.797.81-2.961-.195-.304a8.166 8.166 0 0 1-1.256-4.396c0-4.518 3.677-8.194 8.196-8.194 2.189 0 4.247.853 5.795 2.402a8.14 8.14 0 0 1 2.399 5.796c-.001 4.518-3.678 8.182-8.235 8.182z" />
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

export default function Contact({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });
  const Heading = motion[headingLevel];

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) { const j = (await res.json()) as { error?: string }; throw new Error(j.error ?? "Chyba"); }
      setSubmitted(true); reset();
      toast.success("Děkuji! Ozvu se do 24 hodin.");
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
              <a href="mailto:info@vizeon.cz" className="flex items-center gap-3 group" aria-label="Email">
                <Mail size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-light text-[14px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300 break-all">info@vizeon.cz</span>
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
              <a href="https://wa.me/420604837333" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" aria-label="WhatsApp">
                <WhatsAppIcon size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-light text-[14px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300">WhatsApp</span>
              </a>
              <a href="https://www.instagram.com/vizeon_official/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" aria-label="Instagram">
                <InstagramIcon size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-light text-[14px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300">Instagram</span>
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
    </section>
  );
}
