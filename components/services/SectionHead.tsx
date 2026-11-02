import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Hlavička sekce na stránkách služeb (E-shopy, Automatizace a její
// podstránky): eyebrow, velký nadpis v Cormorantu a volitelně jedna věta.
export function SectionHead({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <p className={cn(t.eyebrow, "mb-4")}>— {eyebrow}</p>
      <h2 id={id} className="max-w-3xl font-cormorant font-light text-[34px] leading-[1.08] text-[#f0ece6] md:text-[52px]">
        {title}
      </h2>
      {lead ? <p className={cn(t.lead, "mt-5 max-w-2xl")}>{lead}</p> : null}
    </div>
  );
}
