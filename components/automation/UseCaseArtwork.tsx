import ArtworkFrame, {
  GOLD_LIGHT,
  NODE_FILL,
  GOLD,
} from "@/components/automation/ArtworkFrame";
import { DEMO_ICONS } from "@/components/automation/demo-icons";
import type { DemoIcon } from "@/lib/data/automation-demos";

// Port z alteno (components/services/UseCaseArtwork.tsx), barvy přes
// konstanty z ArtworkFrame (zlatá místo tyrkysové).
//
// Grafický pás v hlavičce karty příkladu využití na /automatizace/[slug]
// („Kde se to nejvíc vyplatí"). Vznikl 2026-09-23 na zadání majitele:
// podstránky služeb mají nést stejný rukopis jako karty služeb s grafikou
// na hubu, ne holé textové bloky.
//
// PROČ JEDNA ŠABLONA, NE SCÉNA NA KAŽDÝ PŘÍKLAD: příkladů je čtrnáct
// a mění se s obsahem. Bespoke kresba na každý by se při prvním přepisu
// textu rozešla s tím, o čem karta mluví. Mění se jen glyf uprostřed
// (`useCase.glyph` v lib/data/automation-pages.ts), tok zůstává stejný: podklad →
// zpracování → vyřízeno. Obraz tím netvrdí nic, co text neříká.
//
// DVĚ VRSTVY, NE JEDNO SVG: karta s lichým posledním příkladem se
// roztáhne přes celou šířku mřížky a `slice` jednoho SVG by motiv
// ořízl na tenký proužek. Podklad se proto roztahuje (`slice`), motiv
// drží poměr a sedí uprostřed (`meet`).

export default function UseCaseArtwork({
  id,
  glyph,
}: {
  /** Jedinečné na stránce — z něj se skládají `id` gradientů. */
  id: string;
  glyph?: DemoIcon;
}) {
  // Příklad bez glyfu dostane jiskru (zpracování), ne prázdný uzel.
  const Glyph = DEMO_ICONS[glyph ?? "spark"];

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <ArtworkFrame id={id} corners={false} />
      </div>

      <svg
        viewBox="0 0 240 80"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={`${id}-motif`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="240"
            y2="80"
          >
            <stop offset="0%" stopColor={GOLD} />
            <stop offset="100%" stopColor={GOLD_LIGHT} />
          </linearGradient>
        </defs>

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* podklad */}
          <rect
            x="26"
            y="24"
            width="36"
            height="32"
            rx="8"
            fill={NODE_FILL}
            stroke={GOLD}
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <path
            d="M34 36h20M34 44h12"
            stroke={GOLD}
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />

          <path
            d="M62 40h34M144 40h36"
            stroke={GOLD}
            strokeOpacity="0.4"
            strokeWidth="1.25"
            strokeDasharray="2 5"
          />
          <circle cx="79" cy="40" r="2.2" fill={GOLD_LIGHT} fillOpacity="0.8" />
          <circle cx="162" cy="40" r="2.2" fill={GOLD_LIGHT} fillOpacity="0.8" />

          {/* zpracování — glyf příkladu */}
          <rect
            x="96"
            y="16"
            width="48"
            height="48"
            rx="14"
            fill={NODE_FILL}
            stroke={`url(#${id}-motif)`}
            strokeWidth="2"
          />
        </g>
        <Glyph
          x="108"
          y="28"
          width="24"
          height="24"
          className="text-accent"
        />

        {/* vyřízeno */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle
            cx="196"
            cy="40"
            r="15"
            fill={NODE_FILL}
            stroke={GOLD}
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <path d="M189.5 40.5l4.5 4.5 8.5-9.5" stroke={GOLD_LIGHT} strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
