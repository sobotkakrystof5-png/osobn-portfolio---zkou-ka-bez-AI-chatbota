"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { heroIn } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { Alteno, Vizeon } from "@/components/brand/BrandName";
import { CTAButton } from "@/components/CTAButton";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Úvod stránky O nás: kdo za tím stojí a kam míří. Fotka je 3D karta ze
// tří vrstev (zlaté pole vzadu, fotka, štítky vpředu), naklání se za
// myší a při odjezdu ze scrollu se pootočí. Na to navazuje čára
// milníků v sekci Cesta (JourneyPath).

const FACTS = [
  { value: "14", label: "let mi bylo u prvního kódu" },
  { value: "15+", label: "projektů od května 2026" },
  { value: "2", label: "vlastní značky" },
];

function PhotoCard({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const tiltX = useSpring(0, { stiffness: 150, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 150, damping: 18 });

  // Když úvod odjíždí nahoru, karta se pootočí.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollTurn = useTransform(scrollYProgress, [0.5, 1], [0, reduced ? 0 : -32]);
  const rotateY = useTransform([tiltY, scrollTurn], ([a, b]: number[]) => a + b);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  }
  function onPointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="mx-auto w-full max-w-[420px]" style={{ perspective: "1400px" }}>
      <motion.div style={{ rotateX: tiltX, rotateY, transformStyle: "preserve-3d" }} className="group relative">
        {/* Zlaté pole vzadu, odsazené od fotky */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#c9a84c] [--off:20px] md:[--off:28px]"
          style={{ transform: "translate3d(var(--off), var(--off), -70px)" }}
        />
        <div className="relative aspect-[4/5] overflow-hidden bg-[#16130e]" style={{ transform: "translateZ(0)" }}>
          <Image
            src="/avatar.jpg"
            alt="Kryštof, zakladatel VIZEON a ALTENO — ilustrovaný avatar"
            fill
            priority
            sizes="(min-width: 1024px) 420px, 90vw"
            className="object-cover object-[50%_28%] grayscale transition-[filter] duration-700 group-hover:grayscale-0"
          />
        </div>
        {/* Štítky vpředu: vystupují z karty víc než fotka */}
        <div className="absolute -left-3 bottom-6 bg-[#0b0906] px-5 py-4 md:-left-10 md:bottom-10" style={{ transform: "translateZ(80px)" }}>
          <p className="font-cormorant text-[26px] font-light leading-none text-[#f0ece6] md:text-[30px]">Kryštof</p>
          <p className="mt-2 font-inter text-[14px] text-text-secondary">
            zakladatel <Vizeon /> a <Alteno />
          </p>
        </div>
        <p className="absolute -right-3 top-6 bg-[#f0ece6] px-4 py-2.5 font-inter text-[14px] font-medium text-[#080808] md:-right-8 md:top-10" style={{ transform: "translateZ(55px)" }}>
          Studuji v Německu
        </p>
      </motion.div>
    </div>
  );
}

export default function AboutHero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section aria-labelledby="o-nas-nadpis" className="relative bg-[#080808] pb-24 pt-32 md:pb-32 md:pt-44">
      <div className={cn(t.container.wide, "grid items-center gap-16 lg:grid-cols-12 lg:gap-16")}>
        {/* Vstup v CSS (.hero-in), ne přes framer-motion: H1 a úvodní text jsou
            LCP prvky a s JS animací se na mobilu ukázaly až po hydrataci.
            Zpoždění odpovídají dřívějšímu staggeru 100 + 80 ms. */}
        <div className="lg:col-span-7">
          <h1
            id="o-nas-nadpis"
            style={heroIn(100, 45)}
            className="hero-in font-cormorant text-[46px] font-light leading-[0.98] tracking-[-0.015em] text-[#f0ece6] sm:text-[60px] md:text-[80px] lg:text-[86px]"
          >
            Teprve začínáme.
            <br />
            Míříme vysoko.
          </h1>
          <p style={heroIn(180, 45)} className="hero-in mt-8 max-w-xl font-inter text-[17px] leading-[1.7] text-[#f0ece6]/90 md:text-[19px]">
            Jsem Kryštof. Programovat jsem začal ve 14 letech, dnes studuji v Německu a stojím za značkami <Vizeon /> a <Alteno />.
            Každý projekt řeším osobně, od prvního nápadu po poslední detail.
          </p>

          <dl style={heroIn(260, 45)} className="hero-in mt-12 grid max-w-xl grid-cols-3 gap-6">
            {FACTS.map((f) => (
              <div key={f.value} className="flex flex-col">
                <dt className="order-2 mt-3 font-inter text-[14px] leading-[1.45] text-text-secondary md:text-[15px]">{f.label}</dt>
                <dd className="order-1 font-cormorant text-[44px] font-light leading-none text-[#c9a84c] md:text-[60px]">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div style={heroIn(340, 45)} className="hero-in mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <CTAButton className="inline-flex bg-[#c9a84c] px-8 py-4 font-inter text-[14px] font-medium text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
              Nezávazná konzultace zdarma →
            </CTAButton>
            <a
              href="#cesta"
              className="group inline-flex items-center gap-2 font-inter text-[15px] font-medium text-[#f0ece6] transition-colors duration-300 hover:text-[#c9a84c]"
            >
              Projít si cestu
              <ArrowDown size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div style={heroIn(0, 45)} className="hero-in lg:col-span-5">
          <PhotoCard reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
