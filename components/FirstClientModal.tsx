"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle } from "lucide-react";

const services = [
  {
    group: "🌐 Weby",
    items: [
      { id: "vizitka",  name: "Online Vizitka",  original: "7 499 Kč",   half: "3 749 Kč"       },
      { id: "promo",    name: "Promo Page",       original: "9 999 Kč",   half: "4 999 Kč", featured: true },
      { id: "proweb",   name: "Pro Web",          original: "14 999 Kč",  half: "7 499 Kč"       },
    ],
  },
  {
    group: "🎨 Design",
    items: [
      { id: "logo",     name: "Brand Logo",       original: "699 Kč",     half: "349 Kč"         },
      { id: "bcard",    name: "Business Card",    original: "299 Kč",     half: "149 Kč"         },
      { id: "print",    name: "Print Design",     original: "699 Kč",     half: "349 Kč"         },
    ],
  },
  {
    group: "📊 Prezentace",
    items: [
      { id: "slides-s", name: "Slide Deck Standard", original: "1 099 Kč", half: "549 Kč"       },
      { id: "slides-p", name: "Slide Deck Premium",  original: "3 499 Kč", half: "1 749 Kč"     },
    ],
  },
  {
    group: "📱 Správa sítí",
    items: [
      { id: "soc-s",    name: "Social Starter",   original: "4 999 Kč/měs", half: "2 499 Kč/měs" },
      { id: "soc-p",    name: "Social Pro",        original: "7 499 Kč/měs", half: "3 749 Kč/měs" },
    ],
  },
];

const inputCls =
  "w-full bg-[#0e0e0e] border border-white/[0.07] text-[#f0ece6] font-inter font-light text-[14px] px-4 py-3 outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors placeholder-[#3d3830]";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FirstClientModal({ open, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const selectedService = services.flatMap(g => g.items).find(i => i.id === selected);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) { setError("Vyber prosím službu."); return; }
    if (!name.trim() || !email.trim()) { setError("Vyplň prosím jméno a email."); return; }
    setError(null);
    setSending(true);
    try {
      const message =
        `🎉 NABÍDKA PRO PRVNÍHO KLIENTA — 50 % sleva výměnou za referenci\n\n` +
        `Vybraná služba: ${selectedService?.name} (${selectedService?.half} místo ${selectedService?.original})\n\n` +
        `Klient souhlasí s poskytnutím reference po dokončení projektu.`;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() || undefined, message }),
      });
      if (!res.ok) {
        const j = (await res.json()) as { error?: string };
        throw new Error(j.error ?? "Chyba serveru");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Odeslání se nezdařilo.");
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after exit animation finishes
    setTimeout(() => { setSelected(null); setName(""); setEmail(""); setPhone(""); setSent(false); setError(null); }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
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

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Nabídka 50 % sleva pro prvního klienta"
            initial={{ opacity: 0, scale: 0.93, y: 32 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.95,   y: 16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-white/[0.08] pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Top golden line */}
              <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#8a8070] hover:text-[#f0ece6] hover:bg-white/[0.05] transition-all duration-200 z-10"
                aria-label="Zavřít"
              >
                <X size={16} />
              </button>

              <div className="p-7 md:p-10">
                {sent ? (
                  /* ── Success state ── */
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-8 gap-5"
                  >
                    <CheckCircle size={44} className="text-[#c9a84c]" />
                    <h2 className="font-cormorant font-light text-[36px] text-[#f0ece6]">Žádost odeslána!</h2>
                    <p className="font-inter font-light text-[15px] text-[#8a8070] max-w-sm leading-[1.75]">
                      Ozvu se ti do hodiny. Těším se na spolupráci — a na tvou referenci&nbsp;😊
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-all duration-300"
                    >
                      Zavřít
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* ── Header ── */}
                    <div className="mb-8">
                      <span className="font-inter font-medium text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] border border-[rgba(201,168,76,0.3)] px-3 py-1">
                        Exkluzivní nabídka · Jen pro první klienty
                      </span>
                      <div className="mt-5 flex items-baseline gap-4">
                        <span
                          className="font-cormorant font-light leading-none text-[#c9a84c]"
                          style={{ fontSize: "clamp(56px, 10vw, 80px)" }}
                        >
                          –50 %
                        </span>
                        <div>
                          <p className="font-cormorant font-light text-[22px] text-[#f0ece6] leading-tight">výměnou za referenci</p>
                          <p className="font-inter font-light text-[13px] text-[#8a8070] mt-1">
                            Sleva platí na veškeré tvorby. Správa webu (hosting) za běžnou cenu.
                          </p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      {/* ── Service picker ── */}
                      <p className="font-inter font-normal text-[11px] uppercase tracking-[0.15em] text-[#8a8070] mb-4">
                        1. Vyber službu
                      </p>
                      <div className="space-y-5 mb-8">
                        {services.map(group => (
                          <div key={group.group}>
                            <p className="font-inter font-normal text-[10px] uppercase tracking-[0.12em] text-[#3d3830] mb-2">
                              {group.group}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {group.items.map(item => {
                                const active = selected === item.id;
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelected(item.id)}
                                    className={`text-left p-3 border transition-all duration-200 relative ${
                                      active
                                        ? "border-[#c9a84c] bg-[rgba(201,168,76,0.06)]"
                                        : "border-white/[0.06] hover:border-white/[0.15] bg-[#0e0e0e]"
                                    } ${"featured" in item && item.featured ? "sm:col-span-1" : ""}`}
                                  >
                                    {active && (
                                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#c9a84c]" aria-hidden="true" />
                                    )}
                                    <p className="font-inter font-medium text-[12px] text-[#f0ece6] mb-1">{item.name}</p>
                                    <p className="font-inter font-light text-[11px] text-[#3d3830] line-through">{item.original}</p>
                                    <p className="font-inter font-medium text-[13px] text-[#c9a84c]">{item.half}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* ── Form fields ── */}
                      <p className="font-inter font-normal text-[11px] uppercase tracking-[0.15em] text-[#8a8070] mb-4">
                        2. Tvoje kontaktní údaje
                      </p>
                      <div className="space-y-3 mb-6">
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
                              onChange={e => setName(e.target.value)}
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
                              onChange={e => setEmail(e.target.value)}
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
                            onChange={e => setPhone(e.target.value)}
                            className={inputCls}
                            placeholder="+420 123 456 789"
                          />
                        </div>
                      </div>

                      {/* Error */}
                      {error && (
                        <p role="alert" className="font-inter text-[12px] text-red-400 mb-4">
                          {error}
                        </p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full flex items-center justify-center gap-2 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-4 hover:bg-[#d4b968] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sending ? (
                          <><Loader2 size={15} className="animate-spin" />Odesílám…</>
                        ) : (
                          "Mám zájem →"
                        )}
                      </button>

                      {/* Fine print */}
                      <p className="font-inter font-light text-[11px] text-[#3d3830] text-center mt-4 leading-[1.6]">
                        Sleva platí výměnou za upřímnou referenci po dokončení projektu.
                        Správa webu (Web Care) za standardní cenu.
                        Dle{" "}
                        <a href="/podminky" target="_blank" className="hover:text-[#8a8070] transition-colors underline underline-offset-2">
                          obchodních podmínek
                        </a>
                        .
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
