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
// Pruh se sesterskou značkou leží až pod HomeExplore, takže se do hlavního
// bundlu homepage nemusí načítat rovnou — stejný důvod jako u referencí níž.
// SSR zůstává zapnuté, text pruhu je tedy v prvotním HTML.
const AltenoBand = dynamic(() => import("@/components/AltenoBand"));

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
  title: { absolute: "Weby a e-shopy na míru pro firmy a živnostníky | VIZEON" },
  description:
    "Weby a e-shopy na míru pro firmy a živnostníky. Moderní design, SEO a navíc automatizace procesů a AI chatboti. Přímá komunikace, konzultace zdarma.",
  alternates: { canonical: "https://vizeon.cz" },
  openGraph: {
    title: "Weby a e-shopy na míru pro firmy a živnostníky | VIZEON",
    description:
      "Weby a e-shopy na míru pro firmy a živnostníky. Moderní design, SEO a navíc automatizace procesů a AI chatboti. Přímá komunikace, konzultace zdarma.",
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
        <AltenoBand />
        <Contact headingLevel="h2" />
      </main>
      <Footer />
    </>
  );
}
