"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { carouselTestimonials } from "@/lib/data/testimonials";
import { projects } from "@/lib/data/portfolio";
import { fadeUp, viewport } from "@/lib/animations";

// Náhled webu u reference je screenshot z portfolia se stejnou URL.
const imageByUrl = new Map(projects.map((project) => [project.url, project.image]));

const total = carouselTestimonials.length;
const pad = (n: number) => String(n).padStart(2, "0");

const arrowClass =
  "absolute top-1/2 z-10 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center rounded-full border shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-colors duration-300";

// Reference jako nekonečný carousel, který si klient posouvá sám: šipkami po
// stranách karet, tažením (myš i prst) nebo klikem na úsek ukazatele pod
// kartami. Samo nejede. Pravá šipka do první interakce jemně „ťuká“ doprava,
// aby bylo vidět, že se dá posouvat, s prefers-reduced-motion stojí. Embla
// smyčku řeší posunem slidů, nekopíruje je, takže každá reference je v HTML
// jen jednou.
export default function ReferencesSection() {
  const reduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onPointerDown = () => setTouched(true);
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect).on("pointerDown", onPointerDown);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect).off("pointerDown", onPointerDown);
    };
  }, [emblaApi]);

  const go = useCallback(
    (to: "prev" | "next" | number) => {
      if (!emblaApi) return;
      setTouched(true);
      if (to === "prev") emblaApi.scrollPrev();
      else if (to === "next") emblaApi.scrollNext();
      else emblaApi.scrollTo(to);
    },
    [emblaApi],
  );

  const nudge = !touched && reduceMotion !== true;

  return (
    <section className="py-20 md:py-28 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12 md:mb-14">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4"
            >
              — Upřímně
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] max-w-2xl"
            >
              Co o nás <span className="text-shimmer">říkají klienti.</span>
            </motion.h2>
          </div>
          <p aria-live="polite" className="hidden md:flex items-baseline gap-2 font-cormorant font-light text-[#f0ece6]">
            <span className="sr-only">Reference </span>
            <span className="text-[48px] leading-none tabular-nums">{pad(selected + 1)}</span>
            <span className="text-[20px] text-[#c9a84c]/60 tabular-nums">
              <span aria-hidden="true">/ </span>
              <span className="sr-only">z </span>
              {pad(total)}
            </span>
          </p>
        </div>

        <div className="relative">
          <div
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Reference klientů"
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") go("prev");
              if (event.key === "ArrowRight") go("next");
            }}
          >
            <div className="flex -ml-6 [touch-action:pan-y_pinch-zoom]">
              {carouselTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} z ${total}`}
                  className="min-w-0 shrink-0 grow-0 basis-[88%] sm:basis-[60%] md:basis-1/2 lg:basis-1/3 pl-6"
                >
                  <TestimonialCard
                    {...testimonial}
                    quote={testimonial.excerpt ?? testimonial.quote}
                    image={imageByUrl.get(testimonial.url)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => go("prev")}
            aria-label="Předchozí reference"
            className={`${arrowClass} left-0 -translate-x-1/2 border-[#c9a84c]/40 bg-[#080808]/80 backdrop-blur-sm text-[#c9a84c] hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#080808]`}
          >
            <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go("next")}
            aria-label="Další reference"
            className={`${arrowClass} right-0 translate-x-1/2 border-[#c9a84c] bg-[#c9a84c] text-[#080808] hover:bg-[#d4b968] hover:border-[#d4b968]`}
          >
            <motion.span
              className="flex"
              animate={nudge ? { x: [0, 5, 0, 5, 0] } : { x: 0 }}
              transition={nudge ? { duration: 1.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" } : { duration: 0.2 }}
            >
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </motion.span>
          </button>
        </div>

        <div className="mt-10 flex items-center gap-5">
          <span className="md:hidden font-cormorant font-light text-[20px] text-[#f0ece6] tabular-nums" aria-hidden="true">
            {pad(selected + 1)}
            <span className="text-[#c9a84c]/60"> / {pad(total)}</span>
          </span>
          <div className="flex flex-1 gap-1.5">
            {carouselTestimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => go(index)}
                aria-label={`Reference ${index + 1} z ${total}`}
                aria-current={index === selected ? "true" : undefined}
                className="group flex-1 py-3"
              >
                <span
                  className={`block h-px transition-colors duration-500 ${
                    index === selected ? "bg-[#c9a84c]" : "bg-[#c9a84c]/20 group-hover:bg-[#c9a84c]/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
