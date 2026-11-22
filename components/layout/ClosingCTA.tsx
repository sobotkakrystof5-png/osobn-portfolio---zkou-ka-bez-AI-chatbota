import type { ReactNode } from "react";
import { CTAButton } from "@/components/CTAButton";
import type { InterestId } from "@/lib/lead";

// Uzavírací CTA band před patičkou. Původně components/pillar/PillarChrome.tsx
// jako PillarCTA — komponenta existovala, ale nikdo ji nepoužíval a pět stránek
// mělo její markup opsaný inline.

export function ClosingCTA({
  heading,
  subheading,
  buttonLabel = "Chci plán a cenu →",
  interest,
  location,
}: {
  heading: ReactNode;
  subheading: ReactNode;
  buttonLabel?: string;
  /** Předvybraný zájem ve formuláři (jinak podle stránky). */
  interest?: InterestId | null;
  /** Místo výzvy pro GA4 (lead_cta). */
  location?: string;
}) {
  return (
    <div className="mt-16 pt-10 border-t border-white/[0.05] text-center">
      <p className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-2">
        {heading}
      </p>
      <p className="font-inter font-normal text-[13px] text-text-secondary mb-8">
        {subheading}
      </p>
      <CTAButton interest={interest} location={location} className="inline-flex font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300">
        {buttonLabel}
      </CTAButton>
    </div>
  );
}
