const CLARITY_ID = "zhpfno9i4y";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  clarity?: ClarityFn;
};

// GA4 události (gtag vkládá app/layout.tsx, lazyOnload) a zároveň vlastní událost
// v Clarity, ať jdou nahrávky filtrovat podle form_start / generate_lead. Než se
// skripty načtou, událost se tiše zahodí.
export function track(event: string, params: Record<string, string>): void {
  const w = window as AnalyticsWindow;
  w.gtag?.("event", event, params);
  w.clarity?.("event", event);
}

// Microsoft Clarity (nahrávky relací, heatmapy). Spouští ho CookieBanner jen po
// souhlasu a jen na produkční doméně, ať localhost a preview nekazí data. Tělo je
// oficiální snippet z Clarity; načte se až po window load kvůli LCP/TBT.
// consentv2: souhlas s analytikou bez reklamního úložiště (Clarity ho v EHP vyžaduje).
export function loadClarity(): void {
  const w = window as AnalyticsWindow;
  if (w.clarity || location.hostname !== "vizeon.cz") return;

  w.clarity = function (...args: unknown[]) {
    (w.clarity!.q = w.clarity!.q || []).push(args);
  };
  w.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });

  const inject = () => {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
    document.head.appendChild(s);
  };
  if (document.readyState === "complete") inject();
  else window.addEventListener("load", inject, { once: true });
}
