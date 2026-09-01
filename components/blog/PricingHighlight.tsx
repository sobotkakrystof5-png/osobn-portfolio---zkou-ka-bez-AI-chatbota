import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRICING_CATEGORIES } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

// Vizuální náhled ceníku pro vložení do článků o cenách/rozpočtu. Čte přímo
// z lib/data/pricing.ts, takže čísla nikdy nejdou z ladu se skutečným ceníkem.

const WEB_TIER_IDS = ["micro", "vizitka", "promo", "proweb", "webcare"];

export function PricingHighlight() {
  const tiers =
    PRICING_CATEGORIES.find((c) => c.category === "Weby")?.items.filter((item) =>
      WEB_TIER_IDS.includes(item.id)
    ) ?? [];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "glass-panel glass-panel-hover flex min-h-[132px] flex-col justify-between p-4",
              tier.featured && "border-[rgba(201,168,76,0.35)]"
            )}
          >
            <div>
              {tier.badge && (
                <span className="font-inter font-medium text-[9px] uppercase tracking-[0.12em] text-[#c9a84c]">
                  {tier.badge}
                </span>
              )}
              <p className="mt-1.5 font-inter font-medium text-[13px] leading-tight text-[#f0ece6]">
                {tier.name}
              </p>
            </div>
            <p className="mt-3 font-cormorant font-light text-[22px] text-[#c9a84c]">
              {tier.price}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/cena-tvorby-webu"
        className="group mt-4 inline-flex items-center gap-1.5 font-inter font-medium text-[12px] uppercase tracking-[0.08em] text-[#8a8070] transition-colors duration-300 hover:text-[#c9a84c]"
      >
        Zobrazit celý ceník <ArrowUpRight size={13} aria-hidden="true" />
      </Link>
    </div>
  );
}
