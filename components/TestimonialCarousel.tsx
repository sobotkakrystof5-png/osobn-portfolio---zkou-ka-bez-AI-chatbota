"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { carouselTestimonials } from "@/lib/data/testimonials";
import { fadeUp, viewport } from "@/lib/animations";

const ITEMS_PER_BLOCK = carouselTestimonials.length;
// 3 kopie za sebou (předchozí / aktuální / další blok) — díky tomu je vždy
// kam "utéct" tažením na obě strany, než potichu přeskočíme zpět doprostřed.
const LOOPED_ITEMS = Array.from({ length: ITEMS_PER_BLOCK * 3 }, (_, i) => ({
  ...carouselTestimonials[i % ITEMS_PER_BLOCK],
  block: Math.floor(i / ITEMS_PER_BLOCK),
  key: `${Math.floor(i / ITEMS_PER_BLOCK)}-${i % ITEMS_PER_BLOCK}`,
}));

export default function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const block0Ref = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const blockWidthRef = useRef(0);
  const dragRef = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false, lastClientX: 0, rafId: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (dragRef.current.rafId) cancelAnimationFrame(dragRef.current.rafId);
    };
  }, []);

  useEffect(() => {
    const centerOnMiddleBlock = () => {
      const track = trackRef.current;
      const b0 = block0Ref.current;
      const b1 = block1Ref.current;
      if (!track || !b0 || !b1) return;
      const width = b1.getBoundingClientRect().left - b0.getBoundingClientRect().left;
      if (width <= 0) return;
      blockWidthRef.current = width;
      track.scrollLeft = width;
    };

    centerOnMiddleBlock();
    window.addEventListener("resize", centerOnMiddleBlock);
    window.addEventListener("load", centerOnMiddleBlock);
    return () => {
      window.removeEventListener("resize", centerOnMiddleBlock);
      window.removeEventListener("load", centerOnMiddleBlock);
    };
  }, []);

  // Nekonečná smyčka: jakmile se scroll (tažením, prstem, kolečkem i šipkami)
  // přiblíží k okraji zdvojeného obsahu, tiše ho přesuneme o jeden blok zpět —
  // obsah je identický, takže skok není vidět a posouvání nikdy "nedojede".
  const onScroll = () => {
    const track = trackRef.current;
    const blockWidth = blockWidthRef.current;
    if (!track || !blockWidth) return;
    if (track.scrollLeft < blockWidth * 0.5) {
      track.scrollLeft += blockWidth;
      if (dragRef.current.isDown) dragRef.current.startScroll += blockWidth;
    } else if (track.scrollLeft > blockWidth * 1.5) {
      track.scrollLeft -= blockWidth;
      if (dragRef.current.isDown) dragRef.current.startScroll -= blockWidth;
    }
  };

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.85;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Aplikuje scrollLeft nejvýš jednou za snímek — psát ho při každém
  // "pointermove" (u rychlé myši klidně desítky událostí za snímek) vynucuje
  // synchronní layout pokaždé znovu a projevuje se to jako sekání.
  const applyDragScroll = () => {
    const track = trackRef.current;
    const state = dragRef.current;
    state.rafId = 0;
    if (!track || !state.isDown) return;
    const dx = state.lastClientX - state.startX;
    if (Math.abs(dx) > 3) state.moved = true;
    track.scrollLeft = state.startScroll - dx;
  };

  // Myší lze karty přetahovat jako na dotykovém displeji — touch/trackpad
  // scrolluje nativně, takže sem zasahujeme jen u typu "mouse".
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture(e.pointerId);
    // Vypnuto přímo na elementu, ne přes React re-render — jinak by prvních
    // pár "pointermove" mohlo dorazit dřív, než se stihne promítnout třída.
    track.style.scrollSnapType = "none";
    dragRef.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: false,
      lastClientX: e.clientX,
      rafId: 0,
    };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    if (!state.isDown) return;
    state.lastClientX = e.clientX;
    if (!state.rafId) state.rafId = requestAnimationFrame(applyDragScroll);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (track && dragRef.current.isDown) {
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture already released
      }
      track.style.scrollSnapType = "";
    }
    if (dragRef.current.rafId) {
      cancelAnimationFrame(dragRef.current.rafId);
      dragRef.current.rafId = 0;
    }
    dragRef.current.isDown = false;
    setIsDragging(false);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    // Zabrání prokliku odkazu v kartě, pokud šlo o tažení, ne klik.
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

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

        <div className="relative -mx-6 md:mx-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 md:w-16 bg-gradient-to-r from-[#0e0e0e] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 md:w-16 bg-gradient-to-l from-[#0e0e0e] to-transparent z-10" />

          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            className={`flex gap-6 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-6 md:px-0 pb-2 items-start select-none [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab ${
              isDragging ? "cursor-grabbing" : ""
            }`}
          >
            {LOOPED_ITEMS.map((t, i) => (
              <div
                key={t.key}
                ref={i === 0 ? block0Ref : i === ITEMS_PER_BLOCK ? block1Ref : undefined}
                data-card
                aria-hidden={t.block !== 1}
                className="w-[80vw] xs:w-[74vw] sm:w-[360px] md:w-[400px] flex-shrink-0 snap-center"
              >
                <TestimonialCard quote={t.quote} name={t.name} url={t.url} urlLabel={t.urlLabel} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Předchozí reference"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a84c]/30 text-[#c9a84c] hover:text-[#d4b968] hover:border-[#c9a84c]/60 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
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
