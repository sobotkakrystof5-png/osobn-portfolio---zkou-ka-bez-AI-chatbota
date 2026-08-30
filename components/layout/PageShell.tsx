import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { t } from "@/lib/ui";

// Rám pro samostatné stránky webu. Používá plný Navbar/Footer — nové stránky
// jsou primární destinace navigace, ne sekundární SEO landingy (ty dál jedou
// na components/pillar/PillarChrome.tsx).
//
// <main id="main-content"> je tu záměrně: skip-link v app/layout.tsx na tohle
// id míří, ale doteď existovalo jen na homepage.

export function PageShell({
  children,
  jsonLd,
  width = "none",
}: {
  children: ReactNode;
  jsonLd?: object;
  /** "none" = sekce si nesou vlastní kontejner (výchozí), jinak obalí obsah. */
  width?: "none" | "page" | "wide";
}) {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Navbar />
      <main
        id="main-content"
        className={cn(width !== "none" && [t.container[width], "py-16 md:py-24"])}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
