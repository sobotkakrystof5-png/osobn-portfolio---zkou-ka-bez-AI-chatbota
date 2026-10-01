"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { automationIndex } from "@/lib/data/automation-index";

// Do S5 měl hub /automatizace accordion s kotvami „#<slug>“ (např. #ai-agenti). Staré
// odkazy zvenku a záložky přesměruje na podstránku služby. `replace`, ať zpět
// v historii nevede znovu na hub s kotvou (a odtud zase na podstránku).
// Neznámá kotva nechá návštěvníka na hubu.
export function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (automationIndex.some((page) => page.slug === hash)) {
      router.replace(`/automatizace/${hash}`);
    }
  }, [router]);

  return null;
}
