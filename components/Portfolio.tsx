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
    <section id="portfolio" className="py-24 md:py-32 bg-[#0a0a0a]" aria-label="Portfolio">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Moje práce
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[52px] leading-[1.1] text-[#f0ece6] mb-4 max-w-2xl">
          Výsledky mluví za vše.
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[16px] md:text-[18px] text-[#c8c0b4] leading-[1.7] max-w-xl mb-14">
          Weby a grafika navržené tak, aby dobře vypadaly a fungovaly. Klikněte na projekt a podívejte se, co jsme pro klienta vytvořili — než přejdete na samotný web.
        </motion.p>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p) => (
            <motion.div key={p.slug} variants={cardEntrance}>
              <Link
                href={`/ukazky-webu/${p.slug}`}
                className="group block bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_2px_20px_-10px_rgba(0,0,0,0.6)] hover:border-[rgba(201,168,76,0.4)] hover:shadow-[0_20px_50px_-16px_rgba(201,168,76,0.22)] hover:-translate-y-1 transition-all duration-400"
                aria-label={`Zobrazit detail projektu ${p.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/[0.06]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
                  <span className={cn(
                    "absolute top-3 right-3 font-inter font-normal text-[10px] uppercase tracking-[0.1em] border px-2.5 py-1 bg-[#080808]/85 backdrop-blur-sm rounded-full",
                    badgeStyles[p.badgeType].className
                  )}>
                    {badgeStyles[p.badgeType].label}
                  </span>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/60 transition-colors duration-400" aria-hidden="true" />
                </div>

                <div className="p-5 md:p-6">
                  <p className="font-inter font-normal text-[11px] uppercase tracking-[0.1em] text-[#c9a84c] mb-1.5">
                    {p.category}
                  </p>
                  <h3 className="font-cormorant font-light text-[24px] md:text-[26px] text-[#f0ece6] mb-2 leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-inter font-light text-[13px] text-[#a89c8a] leading-[1.6] mb-4 line-clamp-2">
                    {p.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-inter font-medium text-[12px] tracking-[0.06em] uppercase text-[#8a8070] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300">
                    Zobrazit projekt <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </Link>
              {p.internalLink && (
                <Link
                  href={p.internalLink.href}
                  className="inline-block mt-3 px-1 font-inter font-light text-[12px] text-[#8a8070] hover:text-[#c9a84c] transition-colors duration-300 underline decoration-white/15 hover:decoration-[#c9a84c]"
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
          className="font-inter font-light text-[12px] text-[#5c574c] text-center mt-12"
        >
          Portfolio zahrnuje weby skutečných klientů i ukázkové projekty pro demonstraci designového stylu.
        </motion.p>
      </div>
    </section>
  );
}
