import { pricingGroups } from "@/lib/data/pricing";
import { PriceLabel } from "@/components/PriceLabel";
import { brandText } from "@/components/brand/BrandName";
import { cn } from "@/lib/utils";

/** Štítek služby nebo položky. Plná zlatá jen u „Nejoblíbenější“. */
export function ServiceBadge({ badge }: { badge: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center font-inter font-medium text-[10px] uppercase tracking-[0.12em] px-2 py-[3px]",
        badge === "Nejoblíbenější"
          ? "bg-[#c9a84c] text-[#080808]"
          : "border border-[#c9a84c]/40 text-[#c9a84c]"
      )}
    >
      {brandText(badge)}
    </span>
  );
}

/** Hlavička tabulky v dashboardu: popisek vlevo, druhý sloupec vpravo. */
export function TableHead({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.07] bg-white/[0.02] font-inter font-medium text-[11px] uppercase tracking-[0.14em] text-text-muted">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

// Ceník vybraných kategorií z lib/data/pricing.ts jako tabulka: položka
// s popisem vlevo, cena vpravo. Víc kategorií = skupiny s mezititulkem.
export function PriceTable({ categories, className }: { categories: string[]; className?: string }) {
  const groups = pricingGroups(categories);
  const grouped = groups.length > 1;

  return (
    <div className={cn("border border-white/[0.07]", className)}>
      <TableHead left="Položka" right="Cena" />
      {groups.map((group) => (
        <div key={group.category}>
          {grouped && (
            <p className="px-4 sm:px-5 pt-5 pb-1 font-inter font-medium text-[11px] uppercase tracking-[0.14em] text-[#c9a84c]">
              {brandText(group.category)}
            </p>
          )}
          <ul className="divide-y divide-white/[0.05]">
            {group.items.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "relative flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5 sm:px-5",
                  item.featured && "bg-[#c9a84c]/[0.035]"
                )}
              >
                {item.featured && <span className="absolute inset-y-0 left-0 w-[2px] bg-[#c9a84c]" aria-hidden="true" />}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-inter font-medium text-[14px] text-[#f0ece6]">{item.name}</h3>
                    {item.badge && <ServiceBadge badge={item.badge} />}
                  </div>
                  {item.subtitle && (
                    <p className="mt-1 max-w-xl font-inter font-normal text-[13px] leading-[1.65] text-text-secondary">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                {/* Na mobilu cena pod popisem, ať popis nemačká do úzkého sloupce. */}
                <div className="shrink-0 sm:text-right">
                  <p className="font-cormorant font-normal text-[22px] md:text-[24px] leading-none lining-nums text-[#f0ece6] whitespace-nowrap">
                    <PriceLabel price={item.price} />
                  </p>
                  {item.bonus && (
                    <p className="mt-2 font-inter font-normal text-[11px] text-[#c9a84c] whitespace-nowrap">{item.bonus}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
