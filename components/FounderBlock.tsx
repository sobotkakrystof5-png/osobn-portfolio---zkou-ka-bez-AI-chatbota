"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { slideLeft, slideRight, viewport } from "@/lib/animations";
import { Vizeon } from "@/components/brand/BrandName";

// Kdo za značkou stojí. Nahradil motto „Nejsem tým…", které s tónem „my"
// nesedělo. Většina recenzí přitom jmenuje Kryštofa, tak ať návštěvník ví,
// kdo to je. Citát je v první osobě, mluví zakladatel.
export default function FounderBlock() {
  return (
    <section className="py-24 md:py-32 bg-[#080808]" aria-label="Kdo za VIZEON stojí">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewport} className="md:col-span-5">
          <div className="relative aspect-[3/4] w-full max-w-[340px] mx-auto md:mx-0 overflow-hidden border border-[#c9a84c]/20">
            <Image
              src="/profil.jpg"
              alt="Kryštof Sobotka, zakladatel VIZEON a tvůrce webů na míru pro živnostníky a malé firmy"
              fill
              sizes="(min-width: 768px) 340px, 80vw"
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={viewport} className="md:col-span-7">
          <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-6">— Kdo za tím stojí</p>
          <figure>
            <blockquote>
              <p className="font-cormorant font-light text-[28px] md:text-[36px] leading-[1.25] text-[#f0ece6]">
                „Za svou prací stojím vlastním jménem, a proto mi na jejím výsledku záleží stejně jako vám.“
              </p>
            </blockquote>
            <figcaption className="mt-8">
              <span className="block font-inter font-medium text-[15px] text-[#f0ece6]">Kryštof</span>
              <span className="block font-inter font-normal text-[14px] text-text-secondary">zakladatel <Vizeon /></span>
            </figcaption>
          </figure>
          <Link href="/o-mne"
            className="mt-8 inline-flex items-center gap-2 font-inter font-medium text-[12px] tracking-[0.1em] uppercase text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-300">
            Více o nás <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
