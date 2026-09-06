import type { Metadata } from "next";
import dynamic from "next/dynamic";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import StatementBlock from "@/components/StatementBlock";
import HomeExplore from "@/components/HomeExplore";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// Below-the-fold, ale reference/citace mají SEO hodnotu (E-E-A-T) — ssr
// zůstává zapnuté (výchozí next/dynamic chování), takže text zákazníků
// je pořád v prvotním HTML pro crawlery. Dynamic import jen vyčlení
// samotnou sekci (framer-motion varianty, data referencí) do vlastního
// chunku mimo hlavní bundle homepage — viz
// vizeon.cz-audit/findings/performance.md Finding 1/2. `loading` skeleton
// se reálně uplatní jen při klientské navigaci (SSR už text vykreslí).
const ReferencesSection = dynamic(() => import("@/components/ReferencesSection"), {
  loading: () => (
    <section aria-hidden="true" className="py-20 md:py-28 bg-[#0e0e0e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-4 w-24 bg-white/[0.04] mb-4" />
        <div className="h-10 w-2/3 max-w-md bg-white/[0.04] mb-12" />
        <div className="h-[280px] bg-white/[0.03]" />
      </div>
    </section>
  ),
});

// Titulek záměrně necílí na "tvorba webových stránek" ani "tvorba webu pro
// firmy" — ty fráze si nechává /sluzby/tvorba-webovych-stranek a
// /sluzby/tvorba-webu-pro-firmy, ať si homepage nekanibalizuje pozice s
// vlastními podstránkami (viz cluster.md finding 6).
export const metadata: Metadata = {
  title: "VIZEON — weby na míru pro živnostníky a malé firmy",
  description:
    "Weby, které přivádějí zákazníky, ne jen návštěvníky. Tvorba webu na míru za 5–21 dní, bez šablon, transparentní ceník od 4 999 Kč. Weby, AI chatboti a grafika pro živnostníky a malé firmy v ČR.",
  alternates: { canonical: "https://vizeon.cz" },
  openGraph: {
    title: "VIZEON — weby na míru pro živnostníky a malé firmy",
    description:
      "Weby, které přivádějí zákazníky, ne jen návštěvníky. Bez šablon, hotovo za 5–21 dní.",
    url: "https://vizeon.cz",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <AnalyticsTracker page="/" />
      <IntroAnimation />
      <Navbar />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <ReferencesSection />
        <StatementBlock />
        <HomeExplore />
        <Contact headingLevel="h2" />
      </main>
      <Footer />
    </>
  );
}
