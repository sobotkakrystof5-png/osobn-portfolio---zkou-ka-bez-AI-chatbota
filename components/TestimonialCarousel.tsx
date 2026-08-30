"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { carouselTestimonials } from "@/lib/data/testimonials";
import { fadeUp, viewport } from "@/lib/animations";

const DURATION_MS = 36000;
const NUDGE_MS = 4000;

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const boundaryRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const boundary = boundaryRef.current;
    if (!track || !boundary) return;

    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createAnimation = () => {
      const setWidth = boundary.getBoundingClientRect().left - track.getBoundingClientRect().left;
      const prevTime = animRef.current?.currentTime ?? 0;
      animRef.current?.cancel();

      const anim = track.animate(
        [{ transform: `translateX(-${setWidth}px)` }, { transform: "translateX(0px)" }],
        { duration: DURATION_MS, iterations: Infinity, easing: "linear" }
      );
      anim.currentTime = prevTime;
      if (reduceMotionRef.current) anim.pause();
      animRef.current = anim;
    };

    createAnimation();
    window.addEventListener("resize", createAnimation);
    return () => {
      window.removeEventListener("resize", createAnimation);
      animRef.current?.cancel();
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const anim = animRef.current;
    if (!anim) return;
    const current = typeof anim.currentTime === "number" ? anim.currentTime : 0;
    anim.currentTime = current + dir * NUDGE_MS;
  };

  const items = [...carouselTestimonials, ...carouselTestimonials];

  return (
    <section aria-label="Reference klientů" className="py-20 md:py-28 bg-[#0e0e0e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-12 max-w-2xl"
        >
          Co o nás <span className="text-shimmer">řekli</span>.
        </motion.h2>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#0e0e0e] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#0e0e0e] to-transparent z-10" />

          <div
            className="overflow-hidden"
            onMouseEnter={() => animRef.current?.pause()}
            onMouseLeave={() => {
              if (!reduceMotionRef.current) animRef.current?.play();
            }}
          >
            <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
              {items.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  ref={i === carouselTestimonials.length ? boundaryRef : undefined}
                  className="w-[300px] sm:w-[360px] md:w-[400px] flex-shrink-0"
                >
                  <TestimonialCard {...t} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => nudge(-1)}
            aria-label="Předchozí reference"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a84c]/30 text-[#c9a84c] hover:text-[#d4b968] hover:border-[#c9a84c]/60 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => nudge(1)}
            aria-label="Další reference"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a84c]/30 text-[#c9a84c] hover:text-[#d4b968] hover:border-[#c9a84c]/60 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
