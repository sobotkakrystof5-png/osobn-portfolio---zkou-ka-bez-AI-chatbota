"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, cardEntrance, viewport } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";
import { projects, badgeStyles } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#f7f4ee]" aria-label="Portfolio">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#a3812f] mb-4">
          — Moje práce
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[52px] leading-[1.1] text-[#1c1a16] mb-4 max-w-2xl">
          Výsledky mluví za vše.
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[16px] md:text-[18px] text-[#5c574c] leading-[1.7] max-w-xl mb-14">
          Weby a grafika navržené tak, aby dobře vypadaly a fungovaly. Klikněte na projekt a podívejte se, co jsme pro klienta vytvořili — než přejdete na samotný web.
        </motion.p>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p) => (
            <motion.div key={p.slug} variants={cardEntrance}>
              <Link
                href={`/ukazky-webu/${p.slug}`}
                className="group block bg-white border border-black/[0.06] rounded-2xl overflow-hidden shadow-[0_2px_16px_-8px_rgba(20,18,14,0.08)] hover:shadow-[0_18px_44px_-16px_rgba(20,18,14,0.18)] hover:-translate-y-1 transition-all duration-400"
                aria-label={`Zobrazit detail projektu ${p.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className={cn(
                    "absolute top-3 right-3 font-inter font-normal text-[10px] uppercase tracking-[0.1em] border px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full",
                    badgeStyles[p.badgeType].className
                  )}>
                    {badgeStyles[p.badgeType].label}
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <p className="font-inter font-normal text-[11px] uppercase tracking-[0.1em] text-[#a3812f] mb-1.5">
                    {p.category}
                  </p>
                  <h3 className="font-cormorant font-light text-[24px] md:text-[26px] text-[#1c1a16] mb-2 leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-inter font-light text-[13px] text-[#6b6455] leading-[1.6] mb-4 line-clamp-2">
                    {p.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-inter font-medium text-[12px] tracking-[0.06em] uppercase text-[#8a8070] group-hover:text-[#a3812f] group-hover:translate-x-1 transition-all duration-300">
                    Zobrazit projekt <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </Link>
              {p.internalLink && (
                <Link
                  href={p.internalLink.href}
                  className="inline-block mt-3 px-1 font-inter font-light text-[12px] text-[#8a7f6c] hover:text-[#a3812f] transition-colors duration-300 underline decoration-black/10 hover:decoration-[#c9a84c]"
                >
                  {p.internalLink.text} →
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="font-inter font-light text-[12px] text-[#a39c8c] text-center mt-12"
        >
          Portfolio zahrnuje weby skutečných klientů i ukázkové projekty pro demonstraci designového stylu.
        </motion.p>
      </div>
    </section>
  );
}
