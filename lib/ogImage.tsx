import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import AltenoLogo from "@/components/brand/AltenoLogo";

// Náhledový obrázek pro sdílení (WhatsApp, Messenger, LinkedIn, X, Slack).
// Kreslí se stejnou výtvarnou řečí jako hero na webu (components/Hero.tsx):
// pozadí #080808, mřížka 64 px ve zlaté, dva glow orby (zlatý vlevo,
// teplý hnědý vpravo), velký středový glow a tenká zlatá linka u spodní hrany.
// Nadpis je Cormorant light krémový, podtitulek Inter v text-secondary.
//
// Fonty: satori (motor next/og) neumí woff2 ani `next/font`, potřebuje syrová
// data TTF. Statické řezy z Google Fonts leží v `lib/fonts/` a čtou se z disku
// přes `new URL(..., import.meta.url)` — ne `fetch`, ten na `file:` schématu
// v Node spadne („not implemented... yet"). Zápis s `import.meta.url` navíc
// umí @vercel/nft staticky rozpoznat, takže se soubory přibalí i k případné
// serverless funkci, ne jen ke statickému buildu.

export const ogImageSize = { width: 1200, height: 630 };

const BG = "#080808";
const ACCENT = "#c9a84c";
const TEXT_PRIMARY = "#f0ece6";
const TEXT_SECONDARY = "#8a8070";

/** Výška verzálek v em. Inter podle BrandName.tsx, Cormorant podle VizeonLogo.tsx. */
const CAP_INTER = 0.727;
const CAP_CORMORANT = 0.625;
/** Podíl výšky viewBoxu ALTENO loga, který zabírají verzálky (AltenoLogo.tsx). */
const ALTENO_CAP_RATIO = 104.54 / 126;
const ALTENO_ASPECT = 939 / 126;

type FontData = { name: string; data: Buffer; weight: 300 | 400; style: "normal" };

let fontsPromise: Promise<FontData[]> | null = null;

function loadFonts(): Promise<FontData[]> {
  // Jedno čtení na proces, ne na každý obrázek — při buildu se generuje 45+ OG.
  fontsPromise ??= Promise.all([
    readFile(new URL("./fonts/CormorantGaramond-Light.ttf", import.meta.url)),
    readFile(new URL("./fonts/Inter-Regular.ttf", import.meta.url)),
  ]).then(([cormorant, inter]): FontData[] => [
    { name: "Cormorant Garamond", data: cormorant, weight: 300, style: "normal" },
    { name: "Inter", data: inter, weight: 400, style: "normal" },
  ]);
  return fontsPromise;
}

/** Mřížka 64 px jako `.grid-overlay` v globals.css. Satori neumí opakované pozadí, kreslí se linkami. */
function Grid() {
  const lines = [];
  for (let x = 64; x < ogImageSize.width; x += 64) {
    lines.push(
      <div
        key={`v${x}`}
        style={{
          position: "absolute",
          left: x,
          top: 0,
          width: 1,
          height: "100%",
          backgroundColor: ACCENT,
        }}
      />
    );
  }
  for (let y = 64; y < ogImageSize.height; y += 64) {
    lines.push(
      <div
        key={`h${y}`}
        style={{
          position: "absolute",
          left: 0,
          top: y,
          width: "100%",
          height: 1,
          backgroundColor: ACCENT,
        }}
      />
    );
  }
  return (
    // Rozměr čísly, ne přes `inset: 0` — satori shorthand `inset` nezná
    // a vrstva by se smrskla na nulovou velikost.
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: ogImageSize.width,
        height: ogImageSize.height,
        display: "flex",
        opacity: 0.04,
      }}
    >
      {lines}
    </div>
  );
}

/**
 * Slovo VIZEON v řezu svého loga (Cormorant light, verzálky, prostrk 0,2 em,
 * krémová) — pravidlo značek z CLAUDE.md platí i tady. Velikost je dopočítaná
 * tak, aby verzálky seděly na verzálky okolního Interu.
 */
function VizeonWord({ fontSize, spacingAfter = 0 }: { fontSize: number; spacingAfter?: number }) {
  const size = (fontSize * CAP_INTER) / CAP_CORMORANT;
  return (
    <span
      style={{
        fontFamily: "Cormorant Garamond",
        fontWeight: 300,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: size * 0.2,
        // Prostrk za posledním písmenem se odečte a místo něj se vrátí prostrk
        // okolního textu — jinak je mezera za slovem širší než mezi slovy.
        marginRight: -size * 0.2 + spacingAfter,
        color: TEXT_PRIMARY,
      }}
    >
      VIZEON
    </span>
  );
}

/** Vektorový wordmark ALTENO ve výšce verzálek okolního textu. */
function AltenoWord({ fontSize }: { fontSize: number }) {
  const height = (fontSize * CAP_INTER) / ALTENO_CAP_RATIO;
  return <AltenoLogo style={{ height, width: height * ALTENO_ASPECT }} />;
}

/**
 * Rozseká text na tokeny a VIZEON / ALTENO vysází logem. Adresy (vizeon.cz,
 * info@vizeon.cz) nechává textem — stejné pravidlo i stejná regulárka jako
 * `brandText()` v components/brand/BrandName.tsx.
 *
 * Satori nemá řádkový tok, takže slova jsou položky flexu; mezery mezi nimi
 * dělá `gap`, ne mezerník. Na krátké chipy podtitulku to stačí.
 */
function brandTokens(text: string, fontSize: number, spacingAfter = 0) {
  const parts = text.split(/\b(vizeon|alteno)\b(?!\.[a-z])/i);
  const words: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      words.push(
        part.toUpperCase() === "VIZEON" ? (
          <VizeonWord key={`b${i}`} fontSize={fontSize} spacingAfter={spacingAfter} />
        ) : (
          <AltenoWord key={`b${i}`} fontSize={fontSize} />
        )
      );
      return;
    }
    part
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word, j) => {
        words.push(<span key={`t${i}-${j}`}>{word}</span>);
      });
  });

  return words;
}

/**
 * Podtitulek jako řada „chipů" oddělených zlatou tečkou — stejný rytmus, jaký
 * má web v meta řádcích („Micro Page · Promo Page · Pro Web"). Vstup zůstává
 * obyčejný string oddělený „·", volající soubory se nemění.
 */
function Subtitle({ text }: { text: string }) {
  const fontSize = 19;
  const letterSpacing = fontSize * 0.15;
  const chips = text
    .split("·")
    .map((chip) => chip.trim())
    .filter(Boolean);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: 1000,
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize,
        letterSpacing,
        textTransform: "uppercase",
        color: TEXT_SECONDARY,
      }}
    >
      {chips.map((chip, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          {i > 0 ? (
            <div
              style={{
                width: 3,
                height: 3,
                borderRadius: 3,
                backgroundColor: ACCENT,
                opacity: 0.65,
                margin: "0 18px",
              }}
            />
          ) : null}
          <div style={{ display: "flex", alignItems: "center", gap: Math.round(fontSize * 0.34) }}>
            {brandTokens(chip, fontSize, letterSpacing)}
          </div>
        </div>
      ))}
    </div>
  );
}

export async function buildOgImage(title: string, subtitle: string) {
  const fonts = await loadFonts();

  // Delší nadpis se sází menším stupněm, ať se vejde na dva řádky.
  const titleSize = title.length <= 22 ? 78 : title.length <= 40 ? 66 : 58;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BG,
          fontFamily: "Inter",
          padding: "70px 90px",
        }}
      >
        <Grid />

        {/* Glow orb — zlatý vlevo (hero: -left-40 top-1/3) */}
        <div
          style={{
            position: "absolute",
            left: -230,
            top: 20,
            width: 520,
            height: 520,
            borderRadius: 520,
            backgroundImage:
              "radial-gradient(circle, rgba(201,168,76,0.17) 0%, rgba(201,168,76,0.06) 45%, rgba(8,8,8,0) 72%)",
          }}
        />

        {/* Glow orb — teplý vpravo dole */}
        <div
          style={{
            position: "absolute",
            right: -210,
            bottom: -150,
            width: 480,
            height: 480,
            borderRadius: 480,
            backgroundImage:
              "radial-gradient(circle, rgba(107,79,26,0.30) 0%, rgba(107,79,26,0.10) 45%, rgba(8,8,8,0) 72%)",
          }}
        />

        {/* Velký středový glow */}
        <div
          style={{
            position: "absolute",
            left: 250,
            top: -35,
            width: 700,
            height: 700,
            borderRadius: 700,
            backgroundImage: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, rgba(8,8,8,0) 65%)",
          }}
        />

        {/* Tenká zlatá linka u spodní hrany */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
            backgroundImage:
              "linear-gradient(90deg, rgba(8,8,8,0) 0%, rgba(201,168,76,0.45) 50%, rgba(8,8,8,0) 100%)",
          }}
        />

        {/* Logo VIZEON — Cormorant light, verzálky, prostrk 0,2 em, krémová */}
        <div
          style={{
            display: "flex",
            fontFamily: "Cormorant Garamond",
            fontWeight: 300,
            fontSize: 34,
            lineHeight: 1,
            letterSpacing: 6.8,
            marginRight: -6.8,
            color: TEXT_PRIMARY,
          }}
        >
          VIZEON
        </div>

        {/* Zlatá vlasová linka pod logem */}
        <div
          style={{
            width: 54,
            height: 1,
            marginTop: 26,
            backgroundColor: ACCENT,
            opacity: 0.5,
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontFamily: "Cormorant Garamond",
            fontWeight: 300,
            fontSize: titleSize,
            lineHeight: 1.14,
            color: TEXT_PRIMARY,
            textAlign: "center",
            maxWidth: 850,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", marginTop: 44 }}>
          <Subtitle text={subtitle} />
        </div>
      </div>
    ),
    { ...ogImageSize, fonts }
  );
}
