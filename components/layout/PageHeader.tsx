import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/ui";

// Hlavička vnitřní stránky: eyebrow + H1 + volitelný lead.
// Eyebrow si sám přidává prefix "— ", stejně jako to dělaly stránky ručně.

export function PageHeader({
  eyebrow,
  h1,
  lead,
  align = "left",
  className,
}: {
  eyebrow: string;
  h1: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      <p className={cn(t.eyebrow, "mb-4")}>— {eyebrow}</p>
      <h1 className={cn(t.h1, "mb-6 max-w-2xl", centered && "mx-auto")}>{h1}</h1>
      {lead && (
        <p className={cn(t.lead, "max-w-2xl mb-16", centered && "mx-auto")}>
          {lead}
        </p>
      )}
    </div>
  );
}
