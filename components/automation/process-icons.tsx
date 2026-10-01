// Port z alteno (components/motion/process-icons.tsx), glyfy beze změny.

import type { SVGProps } from "react";

// Jednoduché, vlastní kreslené generické glyfy (ne z ikonové knihovny,
// ne odvozené z konkrétní značky). Původně jen pro MiniProcessDiagram na
// kartách oblastí automatizace (Fáze R5), od 2026-08-05 i pro karty výhod
// v WhyAutomation.tsx, proto je sada širší než "vstup → zpracování →
// výstup". Sdílený stylový základ (stroke, zaoblené konce) drží všechny
// glyfy vizuálně konzistentní; nové ikony se přidávají sem, ne lokálně do
// komponent. Brand loga sem NEPATŘÍ, ta jsou v `demo-tools.ts` (path
// řetězce převzaté ze simple-icons a Font Awesome brands).
const BASE_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M4 5h16v10H9l-4 4v-4H4z" />
    </svg>
  );
}

/** Prosté X, ne CrossIcon (ten je kroužek "před" na dlaždicích bolestí). */
export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" />
    </svg>
  );
}

export function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 12.5l2 2 4-4.5" />
    </svg>
  );
}

/** Protějšek CheckIcon pro stav „před" (dlaždice bolestí na /sluzby/[slug]). */
export function CrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </svg>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M5 12h13M13 7l5 5-5 5" />
    </svg>
  );
}

export function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </svg>
  );
}

export function FunnelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M4 5h16l-6 7v6l-4 2v-8z" />
    </svg>
  );
}

export function GearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2M12 19v2M4.2 6.2l1.4 1.4M18.4 16.4l1.4 1.4M3 12h2M19 12h2M4.2 17.8l1.4-1.4M18.4 7.6l1.4-1.4" />
    </svg>
  );
}

export function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M13 3L5.5 13.5H11L10 21l7.5-10.5H12z" />
    </svg>
  );
}

export function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M10.2 13.8l3.6-3.6" />
      <path d="M12.6 7.8l1.8-1.8a3.6 3.6 0 1 1 5.1 5.1l-1.8 1.8" />
      <path d="M11.4 16.2l-1.8 1.8a3.6 3.6 0 1 1-5.1-5.1l1.8-1.8" />
    </svg>
  );
}

export function RepeatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M4.5 11a7.5 7.5 0 0 1 12.7-4.6L20 9" />
      <path d="M20 4.5V9h-4.5" />
      <path d="M19.5 13a7.5 7.5 0 0 1-12.7 4.6L4 15" />
      <path d="M4 19.5V15h4.5" />
    </svg>
  );
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M12 3l7 3v5.4c0 4.2-2.9 8.1-7 9.4-4.1-1.3-7-5.2-7-9.4V6z" />
      <path d="M9.4 11.8l1.9 1.9 3.4-3.7" />
    </svg>
  );
}

// Trojice níž přibyla 2026-08-15 pro karty v sekci ZakazIQ (hodnocení,
// rezervace termínu, přehled zakázek). Kreslené ve stejném stroke stylu
// jako zbytek sady, ne převzaté z lucide-react, které je v projektu jen
// jako závislost shadcn/ui — míchání dvou ikonových jazyků na jedné
// stránce se pozná i bez měření.
export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M12 3.8l2.6 5.2 5.8.9-4.2 4.1 1 5.7-5.2-2.7-5.2 2.7 1-5.7-4.2-4.1 5.8-.9z" />
    </svg>
  );
}

export function CalendarCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <path d="M9.3 15.2l1.9 1.9 3.5-3.8" />
    </svg>
  );
}

// Čtyři pole ve 2×2 mřížce, tedy stejná myšlenka jako ikona v logu
// ZakazIQ o kus výš, ale kreslená obrysem místo plných čtverců. Plná
// varianta by vedle nadpisu působila jako druhé logo.
export function GridIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <rect x="3.75" y="3.75" width="7" height="7" rx="1.6" />
      <rect x="13.25" y="3.75" width="7" height="7" rx="1.6" />
      <rect x="3.75" y="13.25" width="7" height="7" rx="1.6" />
      <rect x="13.25" y="13.25" width="7" height="7" rx="1.6" />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.1 1.9" />
    </svg>
  );
}

// Přidáno Session 2 (alteno-rebuild-prompt.md, 2026-09-12) pro dropdown
// trigery v Navbaru ("Služby", "Automatizace", "O mně"). Stejná
// konvence jako zbytek souboru — nový glyf patří sem, ne lokálně
// definovaný v Navbar.tsx.
export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M5.5 8.5L12 15l6.5-6.5" />
    </svg>
  );
}

// Pětice níž přibyla 2026-09-14 pro dlaždice sekce "Co tu najdete"
// (SiteOverview.tsx). Zbylé čtyři dlaždice čerpají z už existujících
// glyfů (RepeatIcon, LinkIcon, GridIcon, ChatIcon) — nové se kreslí jen
// tam, kde by převzatý glyf znamenal něco jiného.
//
// Uzel s třemi satelity: AI agent napojený na okolní systémy. Vědomě
// blízko myšlence desky spojů v ToolBoard.tsx, ale kreslené obrysem
// a v 24px rastru zbytku sady.
export function AgentNodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="2.8" />
      <circle cx="5" cy="5.5" r="2" />
      <circle cx="19" cy="5.5" r="2" />
      <circle cx="12" cy="20" r="2" />
      <path d="M6.5 7l3.4 3.1M17.5 7l-3.4 3.1M12 14.8V18" />
    </svg>
  );
}

// Stoupající schodiště = proces po krocích (stránka Spolupráce).
export function StepsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M3.5 19.5h4.4V15h4.4v-4.5h4.4V6h3.8" />
    </svg>
  );
}

export function NewsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M3.5 6.5h13.5v12.2a1.8 1.8 0 0 1-1.8 1.8H5.3a1.8 1.8 0 0 1-1.8-1.8z" />
      <path d="M17 9.5h3.5v9a1.8 1.8 0 0 1-3.5 0" />
      <path d="M6.5 10h7M6.5 13.2h7M6.5 16.4h4.5" />
    </svg>
  );
}

export function CalculatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8.5 7.2h7" />
      <path d="M9 11.8h.01M12 11.8h.01M15 11.8h.01M9 16.2h.01M12 16.2h.01M15 16.2h.01" />
    </svg>
  );
}

export function PersonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5.2 20c0-3.5 3-5.6 6.8-5.6s6.8 2.1 6.8 5.6" />
    </svg>
  );
}

// Cenovka s dírkou pro provlečení — přibyla 2026-09-14 pro kartu "Pevná
// cena předem" na stránce Spolupráce. Zámek ani trezor by tam neseděly:
// slibem není bezpečnost, ale to, že číslo je dané dopředu.
export function TagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M11.3 3.5H20v8.7l-8.4 8.4a1.9 1.9 0 0 1-2.7 0l-6-6a1.9 1.9 0 0 1 0-2.7z" />
      <circle cx="16.3" cy="7.2" r="1.4" />
    </svg>
  );
}

// Čtyři glyfy přibyly 2026-09-15 pro ServiceConsole na /sluzby/[slug].
// Sada je do té doby neměla, protože dřív nebylo co jimi popisovat:
// konzole ukazuje konkrétní kroky agenta (co přišlo, co si dohledal, co
// odeslal, co odmítl vymýšlet), ne obecné "vstup → zpracování → výstup".
// Stejný BASE_PROPS jako zbytek sady, žádná odvozenina od cizí značky.

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 5.5L20 7" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m15.8 15.8 4 4" />
    </svg>
  );
}

export function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M20.5 3.5 11 13" />
      <path d="M20.5 3.5 14 20.5l-3.2-7.3-7.3-3.2z" />
    </svg>
  );
}

// Praporek = "tohle agent neudělal a přiznal to". Používá se na kroku,
// kde narazí na hranici svých pravidel — to je obchodně nejdůležitější
// moment celé scény, ne dekorace.
export function FlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M5.5 21V3.5" />
      <path d="M5.5 4.2h11.8l-2.2 4.2 2.2 4.2H5.5z" />
    </svg>
  );
}

// Sluchátko pro scénu Voice agentů (2026-09-16). Kreslené stejným
// BASE_PROPS jako zbytek sady, žádná odvozenina od cizí značky ani od
// ikony konkrétní telefonní platformy — scéna mluví o hovoru obecně, ne
// o napojení na jmenovanou ústřednu.
export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M6.9 3.5H4.7a1.7 1.7 0 0 0-1.7 1.9c.8 8 7.6 14.8 15.6 15.6a1.7 1.7 0 0 0 1.9-1.7v-2.2l-4.3-1.5-1.7 2.2a14.5 14.5 0 0 1-5.6-5.6l2.2-1.7z" />
    </svg>
  );
}

// ---------------------------------------------------------------------
// Sada pro blok „Moje hodnoty" na /o-mne (2026-09-18).
//
// VLASTNÍ STROKE, A JE TO ZÁMĚR. Zbytek souboru kreslí v `BASE_PROPS`
// (1.75), protože se zobrazuje v 16–20 px. Tyhle čtyři glyfy stojí
// v 28 px a stejná tloušťka by v té velikosti působila hrubě — optická
// váha se s rostoucí plochou musí snižovat, jinak ikona vypadá jako
// piktogram na dopravní značce, ne jako rytina. 1.4 je ta hodnota, kde
// v 28 px sedí vedle 16px glyfů časové osy na téže stránce.
//
// Míchání dvou ikonových jazyků to není: stejný 24px rastr, stejné
// zaoblené konce, stejná ruka. Liší se jen váha podle velikosti.
//
// KAŽDÝ GLYF NESE TVRZENÍ KARTY, ne náladu:
//  • skleněná tabule s odleskem = transparentnost,
//  • posuvníky v různé poloze = nastaví se podle vás,
//  • pravítko s ryskami = doslova „na míru",
//  • zaměřený terč = sedí přesně, ne „skoro".
//
// U poslední karty se VĚDOMĚ nepoužila StarIcon, i když je po ruce.
// Hvězda vedle nadpisu „Maximální spokojenost" se čte jako hodnocení,
// a hodnocení ALTENO nemá čím doložit (claude.md §11 — žádné fiktivní
// reference ani čísla). Terč mluví o přesnosti, ne o recenzi.
const VALUE_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Skleněná tabule: rámeček a dva šikmé odlesky uvnitř. První verze
 * kreslila dvě překryté desky, jednu čárkovanou — v 28 px z toho byla
 * změť čar. Sklo je při téže velikosti čitelné na první pohled a nese
 * totéž: je přes to vidět.
 *
 * Odlesky jsou tětivy spočítané tak, aby zůstaly uvnitř zaoblených
 * rohů. Bez `clipPath`, ten by v takhle malém glyfu byl kanón na vrabce.
 */
export function TransparencyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...VALUE_PROPS} {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3.4" />
      <path d="M6.2 17.4L17.4 6.2M6.2 11.6L11.6 6.2" />
    </svg>
  );
}

/** Dva posuvníky, každý v jiné poloze. Knoflíky hranaté — je to pult, ne hračka. */
export function SlidersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...VALUE_PROPS} {...props}>
      <path d="M3.75 8.25h4.4M11.6 8.25h8.65M3.75 15.75h9.15M16.35 15.75h3.9" />
      <rect x="8.15" y="6.1" width="3.45" height="4.3" rx="1.2" />
      <rect x="12.9" y="13.6" width="3.45" height="4.3" rx="1.2" />
    </svg>
  );
}

/**
 * Pravítko se střídavě dlouhými ryskami. Doslovný obraz slova „na míru".
 *
 * Natočené o 30°, a je to optika, ne ozdoba: vodorovný pruh zabírá ve
 * čtvercovém rastru mnohem menší plochu než sklo, posuvníky nebo terč
 * a vedle nich vypadal drobně. Natočením se rozprostře po úhlopříčce
 * a všechny čtyři glyfy mají konečně stejnou váhu. Rozměry jsou
 * spočítané tak, aby se i po otočení vešly do 24px rastru i se stopou.
 */
export function RulerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...VALUE_PROPS} {...props}>
      <g transform="rotate(-30 12 12)">
        <rect x="2.5" y="7.25" width="19" height="9.5" rx="2.4" />
        <path d="M6.5 7.25v2.8M10 7.25v4.2M13.5 7.25v2.8M17 7.25v4.2" />
      </g>
    </svg>
  );
}

/** Terč se zaměřovacím křížem: trefeno přesně, ne „skoro". */
export function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...VALUE_PROPS} {...props}>
      <circle cx="12" cy="12" r="7.75" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 2.1v2.3M12 19.6v2.3M2.1 12h2.3M19.6 12h2.3" />
      <circle cx="12" cy="12" r="0.85" />
    </svg>
  );
}
