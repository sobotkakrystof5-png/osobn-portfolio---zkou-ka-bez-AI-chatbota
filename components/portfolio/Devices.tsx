import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Mockupy MacBooku Pro 14" (M4) a iPhonu 16 Pro čistě v CSS, ať jsou ostré
// v jakékoli velikosti. Rozměry rámečků jsou v `cqw`, tedy v procentech šířky
// zařízení, takže poměry sedí od malé karty po celou šířku stránky.

const container: CSSProperties = { containerType: "inline-size" };

type ScreenProps = { src: string; alt: string; sizes: string; priority?: boolean };

/** Poměr stran obrazovky MacBooku Pro 14" (3024 × 1964). */
export const MACBOOK_SCREEN_RATIO = 982 / 1512;

export function MacBook({
  className,
  children,
  ...screen
}: Partial<ScreenProps> & { className?: string; children?: ReactNode }) {
  return (
    <div className={cn("relative", className)} style={container}>
      {/* Víko: černý rámeček s hliníkovou hranou */}
      <div className="relative mx-auto w-[87%] rounded-t-[2.6cqw] rounded-b-[0.5cqw] bg-[#060606] p-[1.05cqw] pb-[1.5cqw] shadow-[0_0_0_0.18cqw_#47484c,inset_0_0_0_0.12cqw_#1d1d20]">
        <div className="relative aspect-[1512/982] overflow-hidden rounded-t-[1.1cqw] bg-[#0b0b0b]">
          {/* Lišta kolem výřezu, web začíná pod ní jako v aplikaci na celou obrazovku */}
          <div className="absolute inset-x-0 top-0 z-10 h-[3.4%] bg-[#060606]">
            <div className="absolute left-1/2 top-0 h-full w-[11%] -translate-x-1/2 rounded-b-[0.7cqw] bg-black" />
          </div>
          <div className="absolute inset-x-0 bottom-0 top-[3.4%] overflow-hidden">
            {children ??
              (screen.src && (
                <Image
                  src={screen.src}
                  alt={screen.alt ?? ""}
                  fill
                  sizes={screen.sizes}
                  priority={screen.priority}
                  className="object-cover object-top"
                />
              ))}
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_38%)]"
            aria-hidden="true"
          />
        </div>
      </div>
      {/* Spodní díl s výřezem na otevírání */}
      <div
        className="relative h-[2.5cqw] rounded-b-[3cqw_1.6cqw] bg-[linear-gradient(180deg,#e4e5e8_0%,#b4b6bb_18%,#8c8e93_55%,#4e4f53_100%)] shadow-[0_2.2cqw_3.5cqw_-1cqw_rgba(0,0,0,0.85)]"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-[0.35cqw] bg-[#2a2b2e]" />
        <div className="absolute left-1/2 top-0 h-[42%] w-[15%] -translate-x-1/2 rounded-b-[1cqw] bg-[linear-gradient(180deg,#55575b,#a3a5aa)]" />
      </div>
    </div>
  );
}

export function IPhone({ className, src, alt, sizes, priority }: ScreenProps & { className?: string }) {
  return (
    <div className={cn("relative", className)} style={container}>
      {/* Boční tlačítka */}
      <span className="absolute -left-[0.9cqw] top-[17%] h-[6%] w-[1.2cqw] rounded-l-[0.6cqw] bg-[#4a4b4f]" aria-hidden="true" />
      <span className="absolute -left-[0.9cqw] top-[26%] h-[9%] w-[1.2cqw] rounded-l-[0.6cqw] bg-[#4a4b4f]" aria-hidden="true" />
      <span className="absolute -left-[0.9cqw] top-[37%] h-[9%] w-[1.2cqw] rounded-l-[0.6cqw] bg-[#4a4b4f]" aria-hidden="true" />
      <span className="absolute -right-[0.9cqw] top-[28%] h-[13%] w-[1.2cqw] rounded-r-[0.6cqw] bg-[#4a4b4f]" aria-hidden="true" />
      {/* Titanový rám a černý rámeček displeje */}
      <div className="relative rounded-[17cqw] bg-[linear-gradient(145deg,#8a8b90_0%,#3b3c40_30%,#2a2b2e_70%,#6c6d72_100%)] p-[1.1cqw] shadow-[0_3cqw_6cqw_-1cqw_rgba(0,0,0,0.8)]">
        <div className="rounded-[16cqw] bg-black p-[3.3cqw]">
          <div className="relative aspect-[402/874] overflow-hidden rounded-[12.6cqw] bg-[#0b0b0b]">
            <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
            <div className="absolute left-1/2 top-[2.4cqw] z-10 h-[8.4cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_35%)]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
