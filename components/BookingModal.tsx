'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Globe,
  Palette,
  Share2,
  Package,
  MessageCircle,
  PresentationIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { SERVICES, WORKING_HOURS } from '@/lib/booking-config';
import type { BookingData, ServiceKey } from '@/types/booking';
import type { BookingPrefill } from '@/context/BookingContext';
import type { LucideIcon } from 'lucide-react';

/* ─── Service price map (shodné s Pricing.tsx / FirstClientModal.tsx) ── */
const PRICES: Record<string, string> = {
  "Online Vizitka":      "7 499 Kč",
  "Promo Page":          "9 999 Kč",
  "Pro Web":             "14 999 Kč",
  "Web Care":            "999 Kč/měs",
  "Brand Logo":          "699 Kč",
  "Business Card":       "299 Kč",
  "Social Visual":       "299 Kč/ks",
  "Print Design":        "699 Kč",
  "Slide Deck Standard": "1 099 Kč",
  "Slide Deck Premium":  "3 499 Kč",
  "Content Blueprint":   "499 Kč",
  "Social Starter":      "4 999 Kč/měs",
  "Social Pro":          "7 499 Kč/měs",
  "Small Bundle":        "2 499 Kč",
  "Small Bundle + Web":  "14 999 Kč",
  "Middle Bundle":       "29 999 Kč",
  "Mega Bundle":         "49 999 Kč",
};

/* ─── Price display ─────────────────────────────────────── */
function PriceDisplay({ subName }: { subName: string }) {
  const price = PRICES[subName];
  if (!price) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 p-5 border border-[#c9a84c]/20"
      style={{ background: "rgba(201,168,76,0.04)" }}
    >
      <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-[#6b5e50] mb-2">
        Cena
      </p>
      <span
        className="font-cormorant font-semibold leading-none"
        style={{
          fontSize: "clamp(2.2rem, 7vw, 2.8rem)",
          background: "linear-gradient(135deg, #b8943e 0%, #f7e48a 50%, #c9a84c 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {price}
      </span>
    </motion.div>
  );
}

/* ─── Icon map ──────────────────────────────────────────── */
const iconMap: Record<string, LucideIcon> = {
  Globe,
  Palette,
  Presentation: PresentationIcon,
  Share2,
  Package,
  MessageCircle,
};

/* ─── Types ─────────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4 | 'compact' | 'success';

const STEP_LABELS = ['Služba', 'Kontakt', 'Termín', 'Souhrn'];

const CZ_MONTHS = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec',
];

const CZ_DAYS_LONG = ['pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle'];

/* ─── Helpers ───────────────────────────────────────────── */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Returns Monday-first offset (0=Mon, 6=Sun)
function getFirstDayOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay(); // 0=Sun
  return day === 0 ? 6 : day - 1;
}

function generateSlots(date: Date): string[] {
  const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const hours = WORKING_HOURS[dayOfWeek];
  if (!hours) return [];

  const slots: string[] = [];
  const startMins = hours.start * 60;
  const endMins = hours.end * 60;

  for (let mins = startMins; mins < endMins; mins += 30) {
    const h1 = Math.floor(mins / 60);
    const m1 = mins % 60;
    const h2 = Math.floor((mins + 30) / 60);
    const m2 = (mins + 30) % 60;
    slots.push(
      `${String(h1).padStart(2, '0')}:${String(m1).padStart(2, '0')} - ${String(h2).padStart(2, '0')}:${String(m2).padStart(2, '0')}`
    );
  }
  return slots;
}

function formatDateCz(dateStr: string) {
  const [y, m, d] = dateStr.split('-');
  return `${parseInt(d)}. ${parseInt(m)}. ${y}`;
}

function formatForCalendar(date: string, slot: string) {
  const dateClean = date.replace(/-/g, '');
  const startTime = slot.split(/\s*[-–]\s*/)[0].trim();
  const [h, min] = startTime.split(':').map(Number);
  const endH = h + 1;
  const startStr = `${String(h).padStart(2, '0')}${String(min).padStart(2, '0')}00`;
  const endStr = `${String(endH).padStart(2, '0')}${String(min).padStart(2, '0')}00`;
  return { dateClean, startStr, endStr };
}

function downloadICS(data: BookingData) {
  if (!data.date || !data.slot) return;
  const { dateClean, startStr, endStr } = formatForCalendar(data.date, data.slot);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${dateClean}T${startStr}`,
    `DTEND:${dateClean}T${endStr}`,
    'SUMMARY:Konzultace VIZEON',
    `DESCRIPTION:Telefonická konzultace — ${data.subService || data.serviceName}. Kryštof Sobotka bude volat na ${data.phone}.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'konzultace-vizeon.ics';
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Step indicator ────────────────────────────────────── */
function StepIndicator({ current, skipService = false }: { current: Step; skipService?: boolean }) {
  // S prefillem (z PromoPopupu) ukážeme jen Kontakt → Termín → Souhrn (číslováno 1–3)
  const labels = skipService ? STEP_LABELS.slice(1) : STEP_LABELS;
  const rawActive = current === 'success' ? 4 : (current as number);
  const active = skipService ? rawActive - 1 : rawActive;

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {labels.map((label, i) => {
        const stepNum = i + 1;
        const isDone = active > stepNum;
        const isActive = active === stepNum;

        return (
          <div key={i} className="flex items-center">
            {/* Dot */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  isDone
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]'
                    : isActive
                    ? 'border-[#c9a84c] text-[#c9a84c]'
                    : 'border-white/20 text-white/40'
                }`}
              >
                {isDone ? <Check size={13} /> : stepNum}
              </div>
              <span
                className={`font-inter text-[10px] tracking-[0.05em] transition-colors duration-300 ${
                  isActive ? 'text-[#c9a84c]' : isDone ? 'text-white/50' : 'text-white/25'
                }`}
              >
                {label}
              </span>
            </div>
            {/* Connector line */}
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`w-10 md:w-16 h-[1px] mx-2 mb-5 transition-colors duration-300 ${
                  active > stepNum ? 'bg-[#c9a84c]/40' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Nav buttons ───────────────────────────────────────── */
function NavButtons({
  onBack,
  onNext,
  nextLabel = 'Pokračovat',
  nextDisabled,
  loading,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled: boolean;
  loading?: boolean;
}) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
      {onBack ? (
        <button
          onClick={onBack}
          className="border border-white/10 text-white/60 hover:border-white/30 hover:text-white px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          ← Zpět
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled || loading}
        className={`border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 px-5 py-2.5 rounded-xl text-sm transition-colors font-medium flex items-center gap-2 ${
          nextDisabled || loading ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
        }`}
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {loading ? 'Odesílám...' : nextLabel}
      </button>
    </div>
  );
}

/* ─── Calendar ──────────────────────────────────────────── */
function Calendar({
  currentMonth,
  onPrev,
  onNext,
  selectedDate,
  onSelectDate,
}: {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysCount = getDaysInMonth(year, month);
  const offset = getFirstDayOffset(year, month);

  // Fill grid: nulls for offset, then 1..daysCount
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysCount }, (_, i) => i + 1),
  ];
  // Pad to full rows of 7
  while (cells.length % 7 !== 0) cells.push(null);

  const dayHeaders = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrev}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-colors"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="font-inter font-medium text-sm text-white">
          {CZ_MONTHS[month]} {year}
        </span>
        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {dayHeaders.map((d) => (
          <div
            key={d}
            className="text-center font-inter text-[11px] text-white/30 py-1.5 tracking-[0.05em]"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;

          const thisDate = new Date(year, month, day);
          thisDate.setHours(0, 0, 0, 0);
          const isPast = thisDate <= today;
          const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day;

          return (
            <button
              key={idx}
              disabled={isPast}
              onClick={() => !isPast && onSelectDate(new Date(year, month, day))}
              className={`h-8 rounded-lg text-sm font-inter font-light transition-all duration-200 ${
                isPast
                  ? 'opacity-30 cursor-not-allowed text-white/50'
                  : isSelected
                  ? 'bg-[#c9a84c]/20 border border-[#c9a84c] text-[#c9a84c] font-medium'
                  : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────── */
export default function BookingModal({
  isOpen,
  onClose,
  prefill,
}: {
  isOpen: boolean;
  onClose: () => void;
  prefill?: BookingPrefill | null;
}) {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<BookingData>({
    service: null,
    serviceName: '',
    subService: null,
    name: '',
    phone: '',
    email: '',
    note: '',
    date: null,
    slot: null,
  });
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // Synchronní guard proti double-submitu. Ref (ne state) proto, že setLoading
  // je asynchronní — dva rychlé clicky by jinak oba viděly loading === false
  // a oba odeslaly POST → duplicitní rezervace v DB.
  const submittingRef = useRef(false);

  // S prefillem (z PromoPopupu) přeskočíme výběr služby a startujeme rovnou na kontaktu
  const hasPrefill = !!prefill;

  // Reset SYNCHRONNĚ při otevření, jinak by se chvilkově vyrenderoval krok 1
  // (useState má initial = 1) a AnimatePresence by ho animoval ven → klient by
  // viděl "blesk" výběru služby. setState během renderu s ref-guardem zajistí,
  // že se rovnou rendruje správný krok bez efektového zpoždění.
  const prevIsOpenRef = useRef(false);
  if (isOpen !== prevIsOpenRef.current) {
    prevIsOpenRef.current = isOpen;
    if (isOpen) {
      // S prefillem (z PromoPopupu) → compact formulář rovnou
      // Bez prefill (běžná CTA tlačítka) → krok 1: výběr služby
      setStep(prefill ? 'compact' : 1);
      setData({
        service: prefill?.service ?? null,
        serviceName: prefill?.serviceName ?? '',
        subService: prefill?.subService ?? null,
        name: '',
        phone: '',
        email: '',
        note: '',
        date: null,
        slot: null,
      });
      setLoading(false);
      submittingRef.current = false;
      const d = new Date();
      d.setDate(1);
      setCurrentMonth(d);
      setSelectedDate(null);
    }
  }

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async () => {
    // Synchronní guard — viz submittingRef. Nepoužívat AbortController:
    // abort() zruší jen čekání klienta, ale request už mohl dorazit na server
    // a uložit rezervaci → druhý pokus by vytvořil duplicitu v DB.
    if (submittingRef.current) return;
    submittingRef.current = true;

    setLoading(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: data.service ?? undefined,
          serviceName: data.serviceName,
          subService: data.subService ?? undefined,
          name: data.name,
          phone: data.phone,
          email: data.email,
          note: data.note,
          date: data.date ?? '',
          time_slot: data.slot ?? '',
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({})) as { error?: string; issues?: { path: (string | number)[]; message: string }[] };
        const detail = j.issues?.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
        throw new Error(detail ? `${j.error} (${detail})` : (j.error ?? `HTTP ${res.status}`));
      }
      setStep('success');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Něco se pokazilo. Zkuste to znovu.');
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  const isNameValid = data.name.trim().length >= 2;
  const isPhoneValid = data.phone.replace(/\s/g, '').length >= 9;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

  const slots = selectedDate ? generateSlots(selectedDate) : [];

  /* ── Render step 1 ── */
  const renderStep1 = () => (
    <div>
      <h2 className="font-cormorant font-light text-2xl md:text-3xl text-[#f0ece6] mb-2">
        Co pro vás mohu udělat?
      </h2>
      <p className="font-inter font-light text-sm text-white/50 mb-6">
        Vyberte oblast, o které si chcete popovídat.
      </p>

      {/* Service grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {(Object.entries(SERVICES) as [ServiceKey, (typeof SERVICES)[ServiceKey]][]).map(
          ([key, svc]) => {
            const Icon = iconMap[svc.icon];
            const isSelected = data.service === key;

            return (
              <button
                key={key}
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    service: key,
                    serviceName: svc.name,
                    subService: null,
                  }))
                }
                className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-[#c9a84c] bg-white/5'
                    : 'border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {Icon && (
                  <Icon
                    size={18}
                    className={`mb-2 ${isSelected ? 'text-[#c9a84c]' : 'text-white/40'}`}
                  />
                )}
                <span
                  className={`block font-inter text-sm font-medium ${
                    isSelected ? 'text-[#c9a84c]' : 'text-white/70'
                  }`}
                >
                  {svc.name}
                </span>
              </button>
            );
          }
        )}
      </div>

      {/* Sub-services */}
      <AnimatePresence>
        {data.service && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="mt-4">
              <p className="font-inter text-xs text-white/40 mb-3 uppercase tracking-[0.1em]">
                Typ projektu
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES[data.service].subs.map((sub) => {
                  const isSubSelected = data.subService === sub.name;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setData((prev) => ({ ...prev, subService: sub.name }))}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                        isSubSelected
                          ? 'border-[#c9a84c] bg-white/5'
                          : 'border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <span
                        className={`block font-inter text-sm font-semibold mb-0.5 ${
                          isSubSelected ? 'text-[#c9a84c]' : 'text-white/80'
                        }`}
                      >
                        {sub.name}
                      </span>
                      <span className="block font-inter text-xs text-white/40">{sub.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cena — zobrazí se ihned po výběru sub-služby */}
      <AnimatePresence mode="wait">
        {data.subService && (
          <PriceDisplay key={data.subService} subName={data.subService} />
        )}
      </AnimatePresence>

      <NavButtons
        onNext={() => setStep(2)}
        nextDisabled={!data.subService}
      />
    </div>
  );

  /* ── Render step 2 ── */
  const renderStep2 = () => (
    <div>
      <h2 className="font-cormorant font-light text-2xl md:text-3xl text-[#f0ece6] mb-2">
        Vaše kontaktní údaje
      </h2>
      <p className="font-inter font-light text-sm text-white/50 mb-6">
        Jak vás mám kontaktovat a co vám leží na srdci?
      </p>

      <div className="space-y-4">
        <div>
          <label className="block font-inter text-xs uppercase tracking-[0.1em] text-white/40 mb-2">
            Jméno a příjmení *
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="Jan Novák"
            value={data.name}
            onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#c9a84c] focus:outline-none transition-colors font-inter text-sm"
          />
        </div>
        <div>
          <label className="block font-inter text-xs uppercase tracking-[0.1em] text-white/40 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+420 xxx xxx xxx"
            value={data.phone}
            onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#c9a84c] focus:outline-none transition-colors font-inter text-sm"
          />
        </div>
        <div>
          <label className="block font-inter text-xs uppercase tracking-[0.1em] text-white/40 mb-2">
            E-mail *
          </label>
          <input
            type="email"
            placeholder="vas@email.cz"
            value={data.email}
            onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#c9a84c] focus:outline-none transition-colors font-inter text-sm"
          />
        </div>
        <div>
          <label className="block font-inter text-xs uppercase tracking-[0.1em] text-white/40 mb-2">
            Poznámka{' '}
            <span className="normal-case text-white/25">(volitelné)</span>
          </label>
          <textarea
            placeholder="Stručně popište vaši vizi, co potřebujete, nebo co vás trápí — čím více víte, tím lépe se připravím..."
            value={data.note}
            onChange={(e) => setData((prev) => ({ ...prev, note: e.target.value }))}
            rows={4}
            style={{ minHeight: '100px' }}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#c9a84c] focus:outline-none transition-colors resize-none font-inter text-sm"
          />
        </div>
      </div>

      <NavButtons
        onBack={hasPrefill ? undefined : () => setStep(1)}
        onNext={() => setStep(3)}
        nextDisabled={!isNameValid || !isPhoneValid || !isEmailValid}
      />
    </div>
  );

  /* ── Render step 3 ── */
  const renderStep3 = () => {
    const dateLabel = selectedDate
      ? (() => {
          const dayIdx = selectedDate.getDay(); // 0=Sun
          const dayName = CZ_DAYS_LONG[dayIdx === 0 ? 6 : dayIdx - 1];
          return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${selectedDate.getDate()}. ${selectedDate.getMonth() + 1}. ${selectedDate.getFullYear()}`;
        })()
      : null;

    return (
      <div>
        <h2 className="font-cormorant font-light text-2xl md:text-3xl text-[#f0ece6] mb-2">
          Vyberte termín konzultace
        </h2>
        <p className="font-inter font-light text-sm text-white/50 mb-6">
          Konzultace probíhá telefonicky — vyberte den a čas který vám vyhovuje.
        </p>

        <Calendar
          currentMonth={currentMonth}
          onPrev={() => {
            const d = new Date(currentMonth);
            d.setMonth(d.getMonth() - 1);
            setCurrentMonth(d);
          }}
          onNext={() => {
            const d = new Date(currentMonth);
            d.setMonth(d.getMonth() + 1);
            setCurrentMonth(d);
          }}
          selectedDate={selectedDate}
          onSelectDate={(d) => {
            setSelectedDate(d);
            // Format as YYYY-MM-DD
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            setData((prev) => ({ ...prev, date: `${y}-${m}-${day}`, slot: null }));
          }}
        />

        {/* Time slots */}
        <AnimatePresence>
          {selectedDate && slots.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="mt-5">
                <p className="font-inter text-xs text-white/40 mb-3 uppercase tracking-[0.05em]">
                  Dostupné časy — {dateLabel}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setData((prev) => ({ ...prev, slot }))}
                      className={`border rounded-lg px-3 py-2 text-sm text-center cursor-pointer transition-all duration-200 font-inter ${
                        data.slot === slot
                          ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]'
                          : 'border-white/10 text-white/60 hover:border-[#c9a84c]/50 hover:text-white/80'
                      }`}
                    >
                      {slot.split(/\s*[-–]\s*/)[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <NavButtons
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
          nextDisabled={!data.date || !data.slot}
        />
      </div>
    );
  };

  /* ── Render step 4 ── */
  const renderStep4 = () => {
    const rows = [
      { label: 'Služba', value: data.serviceName },
      { label: 'Typ projektu', value: data.subService },
      { label: 'Jméno', value: data.name },
      { label: 'Telefon', value: data.phone },
      { label: 'E-mail', value: data.email },
      { label: 'Poznámka', value: data.note || '—' },
      { label: 'Datum', value: data.date ? formatDateCz(data.date) : '—' },
      { label: 'Čas', value: data.slot },
    ];

    return (
      <div>
        <h2 className="font-cormorant font-light text-2xl md:text-3xl text-[#f0ece6] mb-2">
          Zkontrolujte a odešlete
        </h2>
        <p className="font-inter font-light text-sm text-white/50 mb-6">
          Vše v pořádku? Potvrďte zájem a já se vám ozvu.
        </p>

        <div className="rounded-xl border border-white/[0.07] overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`flex justify-between items-start py-3 px-4 border-b border-white/5 last:border-0 ${
                i % 2 === 0 ? 'bg-white/[0.01]' : ''
              }`}
            >
              <span className="font-inter text-sm text-white/50 shrink-0 mr-4">{row.label}</span>
              <span className="font-inter text-sm text-white text-right break-all">{row.value}</span>
            </div>
          ))}
        </div>

        <NavButtons
          onBack={() => setStep(3)}
          onNext={handleSubmit}
          nextLabel="Potvrdit a odeslat"
          nextDisabled={false}
          loading={loading}
        />
      </div>
    );
  };

  /* ── Render compact (po nabídce z PromoPopupu — vše v jednom formuláři) ── */
  const renderCompact = () => {
    const dateLabel = selectedDate
      ? (() => {
          const dayIdx = selectedDate.getDay();
          const dayName = CZ_DAYS_LONG[dayIdx === 0 ? 6 : dayIdx - 1];
          return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${selectedDate.getDate()}. ${selectedDate.getMonth() + 1}.`;
        })()
      : null;

    const canSubmit = isNameValid && isPhoneValid && isEmailValid && !!data.date && !!data.slot;

    return (
      <div>
        {(data.subService || data.serviceName) && (
          <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] mb-2">
            {data.subService || data.serviceName}
          </p>
        )}
        <h2 className="font-cormorant font-light text-2xl md:text-3xl text-[#f0ece6] mb-2">
          Rezervujte si nezávaznou konzultaci
        </h2>
        <p className="font-inter font-light text-sm text-white/50 mb-6">
          Vyplňte kontakt a vyberte termín — ozvu se vám telefonicky.
        </p>

        {/* Kontaktní údaje */}
        <div className="space-y-3 mb-6">
          <div>
            <label className="block font-inter text-[11px] uppercase tracking-[0.1em] text-white/40 mb-1.5">
              Jméno a příjmení *
            </label>
            <input
              type="text"
              autoComplete="name"
              placeholder="Jan Novák"
              value={data.name}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#c9a84c] focus:outline-none transition-colors font-inter text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-inter text-[11px] uppercase tracking-[0.1em] text-white/40 mb-1.5">
                Telefon *
              </label>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="+420 xxx xxx xxx"
                value={data.phone}
                onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#c9a84c] focus:outline-none transition-colors font-inter text-sm"
              />
            </div>
            <div>
              <label className="block font-inter text-[11px] uppercase tracking-[0.1em] text-white/40 mb-1.5">
                E-mail *
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="vas@email.cz"
                value={data.email}
                onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:border-[#c9a84c] focus:outline-none transition-colors font-inter text-sm"
              />
            </div>
          </div>
        </div>

        {/* Termín + čas */}
        <div className="border-t border-white/10 pt-6 mb-2">
          <label className="block font-inter text-[11px] uppercase tracking-[0.1em] text-white/40 mb-3">
            Vyberte termín *
          </label>
          <Calendar
            currentMonth={currentMonth}
            onPrev={() => {
              const d = new Date(currentMonth);
              d.setMonth(d.getMonth() - 1);
              setCurrentMonth(d);
            }}
            onNext={() => {
              const d = new Date(currentMonth);
              d.setMonth(d.getMonth() + 1);
              setCurrentMonth(d);
            }}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              const y = d.getFullYear();
              const m = String(d.getMonth() + 1).padStart(2, '0');
              const day = String(d.getDate()).padStart(2, '0');
              setData((prev) => ({ ...prev, date: `${y}-${m}-${day}`, slot: null }));
            }}
          />

          <AnimatePresence>
            {selectedDate && slots.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="mt-4">
                  <p className="font-inter text-[11px] text-white/40 mb-2 uppercase tracking-[0.05em]">
                    Dostupné časy — {dateLabel}
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setData((prev) => ({ ...prev, slot }))}
                        className={`border rounded-lg px-2 py-1.5 text-sm text-center cursor-pointer transition-all duration-200 font-inter ${
                          data.slot === slot
                            ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]'
                            : 'border-white/10 text-white/60 hover:border-[#c9a84c]/50 hover:text-white/80'
                        }`}
                      >
                        {slot.split(/\s*[-–]\s*/)[0].trim()}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <div className="flex justify-end items-center mt-6 pt-5 border-t border-white/10">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className={`border border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c] hover:bg-[#c9a84c]/20 px-6 py-3 rounded-xl text-sm transition-colors font-medium flex items-center gap-2 ${
              !canSubmit || loading ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? 'Odesílám...' : 'Odeslat žádost →'}
          </button>
        </div>

        <p className="font-inter text-[10px] text-white/30 text-center mt-3">
          Po odeslání dostanete potvrzení e-mailem s možností přidat termín do kalendáře.
        </p>
      </div>
    );
  };

  /* ── Render success ── */
  const renderSuccess = () => {
    const timeStart = data.slot ? data.slot.split(/\s*[-–]\s*/)[0].trim() : '';
    const dateFormatted = data.date ? formatDateCz(data.date) : '';
    const calData = data.date && data.slot ? formatForCalendar(data.date, data.slot) : null;

    // ISO datetime pro Outlook (YYYY-MM-DDTHH:MM:SS)
    const toIso = (s: string) => `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(9, 11)}:${s.slice(11, 13)}:${s.slice(13, 15)}`;

    const title = 'Konzultace VIZEON';
    const details = `Telefonická konzultace — ${data.subService || data.serviceName}. Kryštof Sobotka bude volat na ${data.phone}.`;

    const gcUrl = calData
      ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${calData.dateClean}T${calData.startStr}/${calData.dateClean}T${calData.endStr}&details=${encodeURIComponent(details)}`
      : '#';

    const outlookLiveUrl = calData
      ? `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(details)}&startdt=${toIso(`${calData.dateClean}T${calData.startStr}`)}&enddt=${toIso(`${calData.dateClean}T${calData.endStr}`)}`
      : '#';

    const outlookOfficeUrl = calData
      ? `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(details)}&startdt=${toIso(`${calData.dateClean}T${calData.startStr}`)}&enddt=${toIso(`${calData.dateClean}T${calData.endStr}`)}`
      : '#';

    return (
      <div className="text-center py-4">
        <CheckCircle size={52} className="text-[#c9a84c] mx-auto mb-4" />
        <h2 className="font-cormorant font-light text-2xl text-[#f0ece6] mb-3">
          {data.name ? `Děkuji, ${data.name.split(' ')[0]}.` : 'Budu s vámi počítat.'}
        </h2>
        <p className="font-inter font-light text-sm text-white/60 leading-relaxed max-w-md mx-auto">
          V{' '}
          <span className="text-white font-medium">
            {dateFormatted} v {timeStart}
          </span>{' '}
          vás kontaktuji na čísle{' '}
          <span className="text-white font-medium">{data.phone}</span>. Potvrzení dorazí na{' '}
          <span className="text-white font-medium">{data.email}</span>.
        </p>

        {/* Calendar section */}
        <div className="bg-white/5 rounded-xl p-4 mt-6 text-left">
          <p className="font-inter text-sm font-medium text-white/80 mb-1">
            Přidejte si termín do kalendáře
          </p>
          <p className="font-inter text-xs text-white/50 mb-3">Aby vám nic neuniklo.</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={gcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 text-white/70 hover:border-[#c9a84c]/50 hover:text-white px-4 py-2 rounded-lg text-xs font-inter transition-colors"
            >
              📅 Google Calendar
            </a>
            <button
              onClick={() => downloadICS(data)}
              className="border border-white/10 text-white/70 hover:border-[#c9a84c]/50 hover:text-white px-4 py-2 rounded-lg text-xs font-inter transition-colors"
            >
              🍎 Apple Calendar
            </button>
            <a
              href={outlookLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 text-white/70 hover:border-[#c9a84c]/50 hover:text-white px-4 py-2 rounded-lg text-xs font-inter transition-colors"
            >
              📧 Outlook.com
            </a>
            <a
              href={outlookOfficeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 text-white/70 hover:border-[#c9a84c]/50 hover:text-white px-4 py-2 rounded-lg text-xs font-inter transition-colors"
            >
              💼 Outlook 365
            </a>
            <button
              onClick={() => downloadICS(data)}
              className="border border-white/10 text-white/70 hover:border-[#c9a84c]/50 hover:text-white px-4 py-2 rounded-lg text-xs font-inter transition-colors"
            >
              📥 .ics soubor
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 border border-white/10 text-white/60 hover:border-white/30 hover:text-white px-6 py-2.5 rounded-xl text-sm font-inter transition-colors"
        >
          Zavřít
        </button>
      </div>
    );
  };

  /* ── Render content by step ── */
  const renderContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 'compact':
        return renderCompact();
      case 'success':
        return renderSuccess();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-colors"
              aria-label="Zavřít"
            >
              <X size={15} />
            </button>

            <div className="p-6 md:p-8">
              {/* Step indicator — hidden on success a v compact módu (jeden formulář) */}
              {step !== 'success' && step !== 'compact' && (
                <StepIndicator current={step} skipService={hasPrefill} />
              )}

              {/* Step content with animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
