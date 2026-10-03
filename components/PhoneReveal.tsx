"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

/**
 * Číslo se načte až po kliknutí (viz `app/api/phone/route.ts`), takže není
 * v HTML, které čtou vyhledávače. Do té doby je v DOMu jen tlačítko.
 */
export default function PhoneReveal({ iconSize = 13 }: { iconSize?: number }) {
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const reveal = async () => {
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/phone", { method: "POST" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { phone: string };
      setPhone(data.phone);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const textClass =
    "font-inter font-light text-[13px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300";

  if (phone) {
    return (
      <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 group" aria-label="Zavolat">
        <Phone size={iconSize} className="text-[#c9a84c] shrink-0" />
        <span className={textClass}>{phone}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={reveal} disabled={loading} className="flex items-center gap-3 group text-left disabled:opacity-60">
      <Phone size={iconSize} className="text-[#c9a84c] shrink-0" />
      <span className={textClass}>
        {loading ? "Načítám…" : failed ? "Nepodařilo se, zkusit znovu" : "Zobrazit telefon"}
      </span>
    </button>
  );
}
