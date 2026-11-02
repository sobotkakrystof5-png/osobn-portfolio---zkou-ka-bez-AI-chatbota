"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { brandText } from "@/components/brand/BrandName";
import { MILESTONES, type Milestone } from "@/components/about/milestones";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Cesta jako jedna čára. Na desktopu se vlní mezi dvěma kolejemi
// (36 % a 64 % šířky), text milníku stojí vně ohybu, datum uvnitř,
// takže čára nikdy nekříží písmo. Na mobilu se vlní jen v levém okraji
// a text je vpravo. Body čáry se měří z DOMu (uzly v řádcích), takže
// křivka sedí na jakoukoli délku textu i šířku okna.
// Při scrollu se čára kreslí: její konec drží výšku 60 % obrazovky,
// milníky nad ním svítí, pod ním jsou ztlumené. Úsek od „teď“ k cíli
// je tečkovaný, to je plán. Pod prefers-reduced-motion je nakreslená celá.

const N = MILESTONES.length;
const NOW = MILESTONES.findIndex((m) => m.now);
// Výška obrazovky, ve které drží konec kreslené čáry.
const LINE_AT = 0.6;

type Pt = { x: number; y: number };
type Geo = { w: number; h: number; pts: Pt[] };

// Úsek a→b: kubika se svislými tečnami v obou bodech. Ve vodorovném
// směru je to smoothstep, ve svislém monotónní, takže jde kreslit
// ořezem podle výšky.
function pathD(pts: Pt[]) {
  return pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const a = pts[i - 1];
      const k = (p.y - a.y) / 2;
      return `C ${a.x} ${a.y + k} ${p.x} ${p.y - k} ${p.x} ${p.y}`;
    })
    .join(" ");
}

// Bod křivky ve výšce y (půlení na úseku, kde y leží).
function pointAtY(pts: Pt[], y: number): Pt {
  const last = pts[pts.length - 1];
  if (y >= last.y) return last;
  let i = 1;
  while (pts[i].y < y) i++;
  const a = pts[i - 1];
  const b = pts[i];
  let lo = 0;
  let hi = 1;
  for (let n = 0; n < 20; n++) {
    const tt = (lo + hi) / 2;
    const yt = a.y + (b.y - a.y) * (1.5 * tt * (1 - tt) + tt * tt * tt);
    if (yt < y) lo = tt;
    else hi = tt;
  }
  const s = lo * lo * (3 - 2 * lo);
  return { x: a.x + (b.x - a.x) * s, y };
}

function Node({ m, lit }: { m: Milestone; lit: boolean }) {
  if (m.goal) {
    return (
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed transition-colors duration-500",
          lit ? "border-[#c9a84c] bg-[#c9a84c] text-[#080808]" : "border-[#c9a84c]/60 bg-[#0b0906] text-[#c9a84c]",
        )}
      >
        <ArrowUpRight size={20} strokeWidth={2} />
      </span>
    );
  }
  return (
    <span className="relative flex h-4 w-4 items-center justify-center">
      {m.now && <span className="absolute inset-[-6px] rounded-full bg-[#c9a84c]/40 motion-safe:animate-ping" />}
      <span
        className={cn(
          "relative h-4 w-4 rounded-full border-2 transition-colors duration-500",
          lit ? "border-[#c9a84c] bg-[#c9a84c]" : "border-[#f0ece6]/35 bg-[#0b0906]",
        )}
      />
    </span>
  );
}

function Stop({ m, i, lit, nodeRef }: { m: Milestone; i: number; lit: boolean; nodeRef: (el: HTMLSpanElement | null) => void }) {
  const left = i % 2 === 0;

  return (
    <li
      className={cn(
        "relative pl-16 transition-opacity duration-500 lg:pl-0",
        i < N - 1 && "pb-16 lg:pb-28",
        lit ? "opacity-100" : "opacity-40",
      )}
    >
      {/* Uzel na čáře. Z jeho středu se počítá křivka. */}
      <span
        ref={nodeRef}
        aria-hidden="true"
        className={cn(
          "absolute -translate-x-1/2",
          m.goal ? "top-[-9px] lg:top-0" : "top-[5px] lg:top-[19px]",
          left ? "left-[18px]" : "left-[34px]",
          m.goal ? "lg:left-1/2" : left ? "lg:left-[36%]" : "lg:left-[64%]",
        )}
      >
        <Node m={m} lit={lit} />
      </span>

      <div className={cn(m.goal ? "lg:mx-auto lg:max-w-[36rem] lg:pt-[72px] lg:text-center" : "lg:w-[30%]", !m.goal && !left && "lg:ml-[70%]")}>
        {/* Datum: na mobilu nad nadpisem, na desktopu v ohybu čáry vedle uzlu. */}
        <p
          className={cn(
            "flex flex-wrap items-center gap-x-4 gap-y-1 font-cormorant text-[22px] font-light leading-[1.2] text-[#c9a84c]",
            !m.goal && "lg:absolute lg:top-[27px] lg:max-w-[24%] lg:-translate-y-1/2 lg:text-[30px] lg:leading-[1.1]",
            !m.goal && (left ? "lg:left-[calc(36%+40px)]" : "lg:right-[calc(36%+40px)] lg:flex-row-reverse lg:text-right"),
            m.goal && "lg:justify-center lg:text-[30px]",
          )}
        >
          <span>{m.when}</span>
          {m.now && (
            <span className="inline-flex items-center gap-2 font-inter text-[14px] font-medium text-[#f0ece6]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#c9a84c]" />
              Právě teď
            </span>
          )}
        </p>

        <h3
          className={cn(
            "mt-2 font-cormorant font-light text-[#f0ece6] lg:mt-0",
            m.goal ? "text-[44px] md:text-[64px] lg:mt-3 lg:text-[76px]" : "text-[32px] lg:text-[40px]",
            // Až za velikostí: tailwind-merge jinak řádkování zahodí.
            "leading-[1.05]",
          )}
        >
          {brandText(m.title, "cormorant")}
        </h3>
        <p className={cn("mt-4 max-w-[34rem] font-inter text-[16px] leading-[1.6] text-[#f0ece6]/80 md:text-[17px]", m.goal && "lg:mx-auto")}>
          {m.text}
        </p>
        {m.stat && (
          <p className="mt-5 flex items-baseline gap-3">
            <span className="font-cormorant text-[52px] font-light leading-none text-[#c9a84c] lg:text-[60px]">{m.stat.value}</span>
            <span className="font-inter text-[15px] text-text-secondary">{m.stat.label}</span>
          </p>
        )}
        {m.link && (
          <Link
            href={m.link.href}
            className="group mt-5 inline-flex items-center gap-2 font-inter text-[15px] font-medium text-[#c9a84c] transition-colors duration-300 hover:text-[#d4b968]"
          >
            {m.link.label}
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </li>
  );
}

export default function JourneyPath() {
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const clipRef = useRef<SVGRectElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const geoRef = useRef<Geo | null>(null);
  // Bez JS a před změřením svítí všechno, ztlumení přijde až s čárou.
  const [lit, setLit] = useState(N);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const box = list.getBoundingClientRect();
      const nodes = nodeRefs.current.map((el) => {
        const r = el!.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      const next = { w: box.width, h: box.height, pts: nodes };
      geoRef.current = next;
      setGeo(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: listRef, offset: [`start ${LINE_AT}`, `end ${LINE_AT}`] });

  // Kreslí se mimo React: ořez a hlava čáry dostanou atributy přímo,
  // stav se mění jen při průchodu uzlem.
  const draw = useCallback(
    (p: number) => {
      const g = geoRef.current;
      if (!g) return;
      const y = reduced ? g.h : Math.min(Math.max(p, 0), 1) * g.h;
      clipRef.current?.setAttribute("height", String(y + 4));
      const end = g.pts[g.pts.length - 1].y;
      const head = headRef.current;
      if (head) {
        const pt = pointAtY(g.pts, y);
        head.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        head.style.opacity = y > g.pts[0].y && y < end ? "1" : "0";
      }
      const count = g.pts.filter((pt) => pt.y <= y + 2).length;
      setLit((prev) => (prev === count ? prev : count));
    },
    [reduced],
  );

  useMotionValueEvent(scrollYProgress, "change", draw);
  useEffect(() => {
    if (geo) draw(scrollYProgress.get());
  }, [geo, draw, scrollYProgress]);

  // Plná čára vede k milníku „teď“, dál už je plán.
  const split = NOW >= 0 ? NOW + 1 : N;
  const done = geo ? pathD(geo.pts.slice(0, split)) : "";
  const plan = geo && split < N ? pathD(geo.pts.slice(split - 1)) : "";

  return (
    <section id="cesta" aria-labelledby="cesta-nadpis" className="overflow-clip bg-[#0b0906] py-28 md:py-40">
      <div className={t.container.wide}>
        <h2 id="cesta-nadpis" className="font-cormorant text-[34px] font-light leading-[1.02] text-[#f0ece6] md:text-[52px]">
          Od prvního kódu
          <br className="md:hidden" /> po vlastní firmu
        </h2>

        <ol ref={listRef} className="relative mt-14 md:mt-20 lg:mt-24">
          {geo && (
            <svg
              aria-hidden="true"
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              className="pointer-events-none absolute left-0 top-0 overflow-visible"
              fill="none"
              strokeLinecap="round"
            >
              <defs>
                <clipPath id="cesta-kresba">
                  <rect ref={clipRef} x={-40} y={-4} width={geo.w + 80} height={0} />
                </clipPath>
              </defs>
              {/* Celá trasa slabě, aby bylo vidět, kudy čára půjde. */}
              <path d={done} stroke="#f0ece6" strokeOpacity={0.12} strokeWidth={3} />
              {plan && <path d={plan} stroke="#c9a84c" strokeOpacity={0.35} strokeWidth={3} strokeDasharray="0.1 11" />}
              <g clipPath="url(#cesta-kresba)">
                <path d={done} stroke="#c9a84c" strokeWidth={3} />
                {plan && <path d={plan} stroke="#c9a84c" strokeWidth={3} strokeDasharray="0.1 11" />}
              </g>
              <g ref={headRef} style={{ opacity: 0 }}>
                <circle r={11} fill="#0b0906" stroke="#c9a84c" strokeOpacity={0.5} strokeWidth={2} />
                <circle r={5} fill="#c9a84c" />
              </g>
            </svg>
          )}

          {MILESTONES.map((m, i) => (
            <Stop
              key={m.id}
              m={m}
              i={i}
              lit={i < lit}
              nodeRef={(el) => {
                nodeRefs.current[i] = el;
              }}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
