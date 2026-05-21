"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  { initials: "TH", name: "Tereza Horáková", role: "Kavárna Svěží Praha", quote: "Kryštof nám udělal web přesně podle představ. Rezervace stouply o třetinu za první měsíc. Komunikace byla naprosto perfektní — vždy rychlá odpověď." },
  { initials: "JP", name: "Jana Procházková", role: "Hair Studio Brno", quote: "Web vypadá luxusně a klientky se na něj odkazují stále častěji. Nemohla jsem věřit, že jeden člověk to zvládne takhle dobře." },
  { initials: "MD", name: "Martin Dvořák", role: "Svatební fotograf Praha", quote: "Od spuštění mi přišlo 6 nových poptávek za první měsíc. To jsem absolutně nečekal. Web vypadá přesně tak, jak jsem si vždy přál." },
  { initials: "PN", name: "MUDr. Petr Novák", role: "Zubní lékař Olomouc", quote: "Oceňuji rychlou komunikaci a neskutečnou trpělivost. Online objednávky fungují bez problémů od prvního dne spuštění." },
  { initials: "LM", name: "Lucie Marková", role: "Business mentor", quote: "Klienti mi říkají, že právě díky webu se rozhodli mě kontaktovat. Web prostě buduje důvěru ještě před prvním slovem." },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-5" aria-label="5 hvězdiček">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className="text-[#c9a84c] fill-[#c9a84c]" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section id="reference" className="py-28 md:py-40 bg-[#0e0e0e] overflow-hidden" aria-label="Reference">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Co říkají klienti
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
            className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] max-w-xl">
            Klienti, kteří to <span className="text-shimmer">zažili</span>.
          </motion.h2>
          {/* Navigace */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
            className="flex items-center gap-3">
            <button onClick={prev} aria-label="Předchozí" className="w-11 h-11 border border-white/[0.08] flex items-center justify-center text-[#8a8070] hover:border-[rgba(201,168,76,0.4)] hover:text-[#c9a84c] transition-all duration-300">
              <ChevronLeft size={18} />
            </button>
            <span className="font-inter font-light text-[12px] text-[#3d3830] tabular-nums min-w-[40px] text-center">
              {current + 1} / {count}
            </span>
            <button onClick={next} aria-label="Další" className="w-11 h-11 border border-white/[0.08] flex items-center justify-center text-[#8a8070] hover:border-[rgba(201,168,76,0.4)] hover:text-[#c9a84c] transition-all duration-300">
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="group h-full bg-[#111111] border border-white/[0.05] p-7 hover:border-[rgba(201,168,76,0.2)] transition-all duration-300 relative overflow-hidden">
                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.07), transparent 70%)" }} />
                  <Stars />
                  <blockquote className="font-inter font-light text-[14px] text-[#8a8070] leading-[1.8] mb-6 line-clamp-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[#c9a84c] font-inter font-medium text-[12px]"
                      style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-inter font-medium text-[13px] text-[#f0ece6]">{t.name}</p>
                      <p className="font-inter font-light text-[11px] text-[#3d3830]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, i) => (
            <button key={i} onClick={() => api?.scrollTo(i)} aria-label={`Přejít na ${i + 1}`}
              className={`h-[2px] transition-all duration-300 ${i === current ? "w-8 bg-[#c9a84c]" : "w-4 bg-white/10 hover:bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
