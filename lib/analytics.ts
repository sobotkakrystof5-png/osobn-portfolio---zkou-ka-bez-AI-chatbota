const CLARITY_ID = "zhpfno9i4y";
const GA_ID = "G-J5FMJYTGCK";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ClarityFn;
};

// GA4 události (gtag načte loadGa() níže, jen se souhlasem) a zároveň vlastní událost
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

// Google Analytics 4. Stejně jako Clarity jen po souhlasu v cookie liště
// (CookieBanner), jak slibuje /gdpr bod 9. Dřív se načítalo vždy, i po
// „Odmítnout“, a jeho skript dělal většinu blokování hlavního vlákna po
// načtení stránky (TBT). Načte se po window load a v klidu (requestIdleCallback),
// ať nesoupeří s hydratací. Init je stejný jako v @next/third-parties.
let gaRequested = false;
export function loadGa(): void {
  if (gaRequested) return;
  gaRequested = true;
  const w = window as AnalyticsWindow;

  const inject = () => {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // gtag.js čte objekt `arguments`, ne pole, proto ne rest parametry.
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", GA_ID);
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  };
  const whenIdle = () => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(inject, { timeout: 4000 });
    else window.setTimeout(inject, 1500);
  };
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}
