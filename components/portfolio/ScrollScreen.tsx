"use client";

import { useState } from "react";
import Image from "next/image";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MACBOOK_SCREEN_RATIO } from "@/components/portfolio/Devices";

// Obrazovka MacBooku, která po najetí myší (na dotyku po klepnutí) plynule
// projede celou stránku webu. Posun dělá dvojice `top: 0 → 100 %` a
// `translateY(0 → -100 %)` se stejnou křivkou, takže obrázek dojede přesně
// spodním okrajem ke spodku obrazovky bez měření výšek v JS.
export function ScrollScreen({
  fold,
  full,
  alt,
  sizes,
}: {
  fold: string;
  full: { src: string; width: number; height: number };
  alt: string;
  sizes: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Kolik obrazovek je pod první, podle toho délka jízdy (cca 1,5 s na obrazovku).
  const screensBelow = full.height / full.width / MACBOOK_SCREEN_RATIO - 1;
  const duration = playing ? Math.min(Math.max(screensBelow * 1.5, 2.5), 16) : 1.1;
  const easing = playing ? "cubic-bezier(0.45, 0, 0.55, 1)" : "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <button
      type="button"
      aria-pressed={playing}
      aria-label={playing ? "Zastavit projíždění webu" : "Projet celý web"}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPlaying(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPlaying(false)}
      onClick={() => setPlaying((v) => !v)}
      className="group/screen absolute inset-0 block h-full w-full cursor-ns-resize overflow-hidden text-left"
    >
      <Image src={fold} alt={alt} fill sizes={sizes} priority className="object-cover object-top" />
      {screensBelow > 0.05 && (
        <Image
          src={full.src}
          alt=""
          width={full.width}
          height={full.height}
          unoptimized
          onLoad={() => setLoaded(true)}
          className={cn("absolute inset-x-0 h-auto w-full transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
          style={{
            top: playing ? "100%" : "0%",
            transform: playing ? "translateY(-100%)" : "translateY(0)",
            transitionProperty: "top, transform, opacity",
            transitionDuration: `${duration}s, ${duration}s, 0.5s`,
            transitionTimingFunction: `${easing}, ${easing}, ease`,
          }}
        />
      )}
      <span
        className={cn(
          "pointer-events-none absolute bottom-[4%] left-[4%] flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3.5 py-2 font-inter font-medium text-[11px] uppercase tracking-[0.12em] text-[#f0ece6] backdrop-blur-md transition-opacity duration-300",
          playing || screensBelow <= 0.05 ? "opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      >
        <MousePointer2 size={13} className="text-[#c9a84c]" />
        Projet celý web
      </span>
    </button>
  );
}
