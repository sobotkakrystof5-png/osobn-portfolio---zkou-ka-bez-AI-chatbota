"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, ArrowRight, Calendar, Clock } from "lucide-react";

const services = [
  {
    group: "🌐 Weby",
    items: [
      { id: "micro",    name: "Micro Page",           price: "4 999 Kč"         },
      { id: "vizitka",  name: "Online Vizitka",      price: "7 499 Kč"         },
      { id: "promo",    name: "Promo Page",           price: "9 999 Kč", featured: true },
      { id: "proweb",   name: "Pro Web",              price: "14 999 Kč"        },
    ],
  },
  {
    group: "🎨 Design",
    items: [
      { id: "logo",     name: "Brand Logo",           price: "699 Kč"           },
      { id: "bcard",    name: "Business Card",        price: "299 Kč"           },
      { id: "print",    name: "Print Design",         price: "699 Kč"           },
    ],
  },
  {
    group: "📊 Prezentace",
    items: [
      { id: "slides-s", name: "Slide Deck Standard", price: "1 099 Kč"         },
      { id: "slides-p", name: "Slide Deck Premium",  price: "3 499 Kč"         },
    ],
  },
  {
    group: "📱 Správa sítí",
    items: [
      { id: "soc-s",    name: "Social Starter",      price: "4 999 Kč/měs"    },
      { id: "soc-p",    name: "Social Pro",          price: "7 499 Kč/měs"    },
    ],
  },
];

const inputCls =
  "w-full bg-[#0e0e0e] border border-white/[0.07] text-[#f0ece6] font-inter font-light text-[14px] px-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors placeholder-[#3d3830]";

const stepVariants = {
  enter:  { opacity: 0, x: 40  },
  center: { opacity: 1, x: 0   },
  exit:   { opacity: 0, x: -40 },
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FirstClientModal({ open, onClose }: Props) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date,  setDate]  = useState("");
  const [time,  setTime]  = useState("");
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const selectedService = services.flatMap((g) => g.items).find((i) => i.id === selected);

  const handleContinue = () => {
    if (!selected) { setError("Vyber prosím službu, o kterou máš zájem."); return; }
    setError(null);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setError("Vyplň prosím jméno a email."); return; }
    setError(null);
    setSending(true);
    try {
      const message =
        `🚀 Nová poptávka — Vizeon\n\n` +
        `Vybraná služba: ${selectedService?.name} (${selectedService?.price})\n\n` +
        (date ? `Preferovaný termín konzultace: ${date}${time ? ` v ${time}` : ""}\n\n` : "");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:  name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          message,
        }),
      });
      if (!res.ok) {
        const j = (await res.json()) as { error?: string };
        throw new Error(j.error ?? "Chyba serveru");
      }
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Odeslání se nezdařilo.");
    } finally {
      setSending(false);
    }
  };

  const handleScrollToContact = () => {
    handleClose();
    setTimeout(() => {
      document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setSelected(null);
      setName(""); setEmail(""); setPhone("");
      setDate(""); setTime("");
      setSending(false);
      setError(null);
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-[#080808]/90 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Poptávka služby"
            initial={{ opacity: 0, scale: 0.93, y: 32 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.95,  y: 16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-white/[0.08] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-[2px] w-full"
                style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }}
              />

              {step < 2 && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2" aria-hidden="true">
                  {[0, 1].map((s) => (
                    <span
                      key={s}
                      className={`block h-[2px] w-8 rounded-full transition-all duration-500 ${
                        s <= step ? "bg-[#c9a84c]" : "bg-white/[0.1]"
                      }`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#8a8070] hover:text-[#f0ece6] hover:bg-white/[0.05] transition-all duration-200 z-10"
                aria-label="Zavřít"
              >
                <X size={16} />
              </button>

              <div className="p-7 md:p-10 pt-12">
                <AnimatePresence mode="wait">

                  {/* ── STEP 0: výběr služby ── */}
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-8">
                        <h2 className="font-cormorant font-light text-[36px] md:text-[44px] text-[#f0ece6] leading-tight mb-2">
                          Pojďme do toho společně.
                        </h2>
                        <p className="font-inter font-light text-[14px] text-[#8a8070]">
                          Vyberte si službu, o kterou máte zájem, a pošlete mi poptávku.
                        </p>
                      </div>

                      <p className="font-inter font-normal text-[11px] uppercase tracking-[0.15em] text-[#8a8070] mb-4">
                        Vyber službu
                      </p>
                      <div className="space-y-5 mb-8">
                        {services.map((group) => (
                          <div key={group.group}>
                            <p className="font-inter font-normal text-[10px] uppercase tracking-[0.12em] text-[#3d3830] mb-2">
                              {group.group}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {group.items.map((item) => {
                                const active = selected === item.id;
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => { setSelected(item.id); setError(null); }}
                                    className={`text-left p-3 border transition-all duration-200 relative ${
                                      active
                                        ? "border-[#c9a84c] bg-[rgba(201,168,76,0.06)]"
                                        : "border-white/[0.06] hover:border-white/[0.15] bg-[#0e0e0e]"
                                    }`}
                                  >
                                    {active && (
                                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#c9a84c]" aria-hidden="true" />
                                    )}
                                    <p className="font-inter font-medium text-[12px] text-[#f0ece6] mb-1">{item.name}</p>
                                    <p className="font-inter font-medium text-[13px] text-[#c9a84c]">{item.price}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {error && (
                        <p role="alert" className="font-inter text-[12px] text-red-400 mb-4">
                          {error}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleContinue}
                        className="w-full flex items-center justify-center gap-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-4 hover:bg-[#d4b968] transition-all duration-300"
                      >
                        Pokračovat <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}

                  {/* ── STEP 1: formulář ── */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8 p-4 border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.04)] flex items-center gap-4 relative overflow-hidden"
                        aria-label="Shrnutí výběru"
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
                          style={{ background: "linear-gradient(180deg, transparent, #c9a84c, transparent)" }}
                          aria-hidden="true"
                        />
                        <div className="flex-1">
                          <p className="font-inter font-normal text-[10px] uppercase tracking-[0.15em] text-[#8a8070] mb-0.5">
                            Vybrána služba
                          </p>
                          <p className="font-inter font-semibold text-[14px] text-[#f0ece6] mb-1">
                            {selectedService?.name}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="font-inter font-medium text-[14px] text-[#c9a84c]">
                              {selectedService?.price}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setStep(0); setError(null); }}
                          className="font-inter font-light text-[11px] text-[#8a8070] hover:text-[#f0ece6] underline underline-offset-2 transition-colors shrink-0"
                        >
                          Změnit
                        </button>
                      </motion.div>

                      <form onSubmit={handleSubmit} noValidate>
                        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.15em] text-[#8a8070] mb-4">
                          Kontaktní údaje &amp; termín konzultace
                        </p>
                        <div className="space-y-3 mb-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="fc-date" className="block font-inter font-light text-[11px] uppercase tracking-[0.1em] text-[#8a8070] mb-1.5 flex items-center gap-1.5">
                                <Calendar size={11} className="text-[#c9a84c]" aria-hidden="true" />
                                Preferovaný datum
                              </label>
                              <input
                                id="fc-date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={`${inputCls} [color-scheme:dark]`}
                              />
                            </div>
                            <div>
                              <label htmlFor="fc-time" className="block font-inter font-light text-[11px] uppercase tracking-[0.1em] text-[#8a8070] mb-1.5 flex items-center gap-1.5">
                                <Clock size={11} className="text-[#c9a84c]" aria-hidden="true" />
                                Preferovaný čas
                              </label>
                              <input
                                id="fc-time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className={`${inputCls} [color-scheme:dark]`}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="fc-name" className="block font-inter font-light text-[11px] uppercase tracking-[0.1em] text-[#8a8070] mb-1.5">
                                Jméno *
                              </label>
                              <input
                                id="fc-name"
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputCls}
                                placeholder="Jan Novák"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="fc-email" className="block font-inter font-light text-[11px] uppercase tracking-[0.1em] text-[#8a8070] mb-1.5">
                                Email *
                              </label>
                              <input
                                id="fc-email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputCls}
                                placeholder="jan@firma.cz"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="fc-phone" className="block font-inter font-light text-[11px] uppercase tracking-[0.1em] text-[#8a8070] mb-1.5">
                              Telefon <span className="normal-case text-[#3d3830]">(volitelné)</span>
                            </label>
                            <input
                              id="fc-phone"
                              type="tel"
                              autoComplete="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className={inputCls}
                              placeholder="+420 123 456 789"
                            />
                          </div>
                        </div>

                        {error && (
                          <p role="alert" className="font-inter text-[12px] text-red-400 mb-4">
                            {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={sending}
                          className="w-full flex items-center justify-center gap-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-4 hover:bg-[#d4b968] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {sending ? (
                            <><Loader2 size={15} className="animate-spin" />Odesílám…</>
                          ) : (
                            "Poslat poptávku →"
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* ── STEP 2: success ── */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center text-center py-8 gap-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      >
                        <CheckCircle size={48} className="text-[#c9a84c]" />
                      </motion.div>
                      <h2 className="font-cormorant font-light text-[36px] text-[#f0ece6]">
                        Poptávka odeslána!
                      </h2>

                      <div className="w-full border border-white/[0.06] bg-[#0e0e0e] p-4 text-left">
                        <p className="font-inter font-normal text-[10px] uppercase tracking-[0.15em] text-[#8a8070] mb-3">
                          Souhrn poptávky
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <span className="font-inter font-light text-[12px] text-[#8a8070]">Služba</span>
                            <span className="font-inter font-medium text-[12px] text-[#f0ece6]">{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-inter font-light text-[12px] text-[#8a8070]">Cena</span>
                            <span className="font-inter font-medium text-[12px] text-[#c9a84c]">{selectedService?.price}</span>
                          </div>
                          {date && (
                            <div className="flex justify-between">
                              <span className="font-inter font-light text-[12px] text-[#8a8070]">Termín konzultace</span>
                              <span className="font-inter font-medium text-[12px] text-[#f0ece6]">{date}{time ? ` v ${time}` : ""}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="font-inter font-light text-[12px] text-[#8a8070]">Kontakt</span>
                            <span className="font-inter font-medium text-[12px] text-[#f0ece6]">{email}</span>
                          </div>
                        </div>
                      </div>

                      <p className="font-inter font-light text-[15px] text-[#8a8070] max-w-sm leading-[1.75]">
                        Ozvu se ti do <span className="text-[#f0ece6]">24 hodin</span>. Těším se na spolupráci.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                          onClick={handleScrollToContact}
                          className="flex items-center justify-center gap-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-all duration-300"
                        >
                          Přejít na kontakt →
                        </button>
                        <button
                          onClick={handleClose}
                          className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#8a8070] border border-white/[0.1] px-6 py-3 hover:border-white/[0.25] hover:text-[#f0ece6] transition-all duration-300"
                        >
                          Zavřít
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
