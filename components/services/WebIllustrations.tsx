import type { ReactNode } from "react";

// Ikony variant webu: okno prohlížeče ve zlaté lince, uvnitř drátěný model
// toho, co varianta je. Na první pohled je jasné, že jde o web, a zároveň
// jak se varianty liší (rozcestník odkazů, landing page, víc stránek).
// Kreslené na mřížce 116 × 88, barva z `currentColor`.

export type WebIllustrationKind = "micro" | "promo" | "pro";

const BG = "#0d0b07";

function BrowserFrame({ children, stacked = false }: { children: ReactNode; stacked?: boolean }) {
  return (
    <>
      {/* U vícestránkového webu vykukuje za oknem další stránka. */}
      {stacked && (
        <rect x="13.5" y="1.5" width="101" height="73" rx="4" fill={BG} stroke="currentColor" strokeOpacity="0.35" />
      )}
      <rect x="7.5" y="7.5" width="101" height="73" rx="4" fill={BG} stroke="currentColor" strokeOpacity="0.75" />
      <line x1="7.5" y1="19.5" x2="108.5" y2="19.5" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="15" cy="13.5" r="1.6" fill="currentColor" fillOpacity="0.55" />
      <circle cx="21" cy="13.5" r="1.6" fill="currentColor" fillOpacity="0.35" />
      <circle cx="27" cy="13.5" r="1.6" fill="currentColor" fillOpacity="0.2" />
      <rect x="36" y="10.75" width="50" height="5.5" rx="2.75" stroke="currentColor" strokeOpacity="0.3" />
      {children}
    </>
  );
}

// Micro Page: rozcestník odkazů (link-in-bio), profil a tři tlačítka.
function Micro() {
  return (
    <BrowserFrame>
      <circle cx="58" cy="31" r="5" stroke="currentColor" strokeOpacity="0.8" />
      <rect x="40" y="41" width="36" height="6" rx="3" fill="currentColor" fillOpacity="0.85" />
      <rect x="40" y="50.5" width="36" height="6" rx="3" stroke="currentColor" strokeOpacity="0.55" />
      <rect x="40" y="60" width="36" height="6" rx="3" stroke="currentColor" strokeOpacity="0.55" />
      <rect x="49" y="71" width="18" height="2" rx="1" fill="currentColor" fillOpacity="0.25" />
    </BrowserFrame>
  );
}

// Promo Page: landing page, nadpis, text, výrazné tlačítko a fotka.
function Promo() {
  return (
    <BrowserFrame>
      <rect x="15" y="25" width="10" height="3" rx="1" fill="currentColor" fillOpacity="0.6" />
      <rect x="74" y="25.5" width="7" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="84" y="25.5" width="7" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="94" y="25.5" width="7" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="15" y="36" width="40" height="4" rx="1" fill="currentColor" fillOpacity="0.9" />
      <rect x="15" y="43.5" width="30" height="4" rx="1" fill="currentColor" fillOpacity="0.55" />
      <rect x="15" y="52" width="36" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="15" y="56" width="28" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="15" y="63" width="18" height="7" rx="1.5" fill="currentColor" />
      <rect x="64" y="34" width="37" height="37" rx="2" stroke="currentColor" strokeOpacity="0.6" />
      <circle cx="75" cy="44" r="3" stroke="currentColor" strokeOpacity="0.6" />
      <path d="M67 67 L77 56 L83 62 L90 53 L98 67" stroke="currentColor" strokeOpacity="0.6" strokeLinejoin="round" />
    </BrowserFrame>
  );
}

// Pro Web: navigace, hero pás a mřížka podstránek, za oknem další stránka.
function Pro() {
  return (
    <BrowserFrame stacked>
      <rect x="15" y="25" width="12" height="3" rx="1" fill="currentColor" fillOpacity="0.6" />
      <rect x="62" y="25.5" width="7" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="72" y="25.5" width="7" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="82" y="25.5" width="7" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="92" y="25.5" width="7" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="15" y="33" width="86" height="16" rx="1.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.45" />
      <rect x="21" y="38.5" width="36" height="4" rx="1" fill="currentColor" fillOpacity="0.85" />
      <rect x="15" y="54" width="27" height="20" rx="1.5" stroke="currentColor" strokeOpacity="0.55" />
      <rect x="44.5" y="54" width="27" height="20" rx="1.5" stroke="currentColor" strokeOpacity="0.55" />
      <rect x="74" y="54" width="27" height="20" rx="1.5" stroke="currentColor" strokeOpacity="0.55" />
      <rect x="19" y="68" width="12" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="48.5" y="68" width="12" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="78" y="68" width="12" height="2" rx="1" fill="currentColor" fillOpacity="0.35" />
    </BrowserFrame>
  );
}

const CONTENT: Record<WebIllustrationKind, () => ReactNode> = { micro: Micro, promo: Promo, pro: Pro };

export function WebIllustration({ kind, className }: { kind: WebIllustrationKind; className?: string }) {
  const Content = CONTENT[kind];
  return (
    <svg viewBox="0 0 116 88" fill="none" strokeWidth="1.25" aria-hidden="true" className={className}>
      <Content />
    </svg>
  );
}
