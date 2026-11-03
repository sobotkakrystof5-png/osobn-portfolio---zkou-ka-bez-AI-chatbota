import type { Metadata } from "next";
import dynamic from "next/dynamic";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { HOME_FAQ } from "@/lib/data/home-faq";

// Sekce pod ohybem jdou přes next/dynamic do vlastních chunků mimo hlavní
// bundle homepage (viz vizeon.cz-audit/findings/performance.md Finding 1/2).
// SSR zůstává zapnuté (výchozí chování next/dynamic), takže jejich text je
// v prvotním HTML pro crawlery. U referencí na tom záleží kvůli E-E-A-T.
// `loading` skeleton se reálně uplatní jen při klientské navigaci.
const OfferDashboard = dynamic(() => import("@/components/OfferDashboard"));
const OurValues = dynamic(() => import("@/components/OurValues"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const HomeFAQ = dynamic(() => import("@/components/HomeFAQ"));

const ReferencesSection = dynamic(() => import("@/components/ReferencesSection"), {
  loading: () => (
    <section aria-hidden="true" className="py-20 md:py-28 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-4 w-24 bg-white/[0.04] mb-4" />
        <div className="h-10 w-2/3 max-w-md bg-white/[0.04] mb-12" />
        <div className="h-[480px] bg-white/[0.03]" />
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

// FAQPage jen pro dotazy z homepage. Organizace a web jsou v JSON-LD layoutu.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ.flatMap((group) =>
    group.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  ),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <AnalyticsTracker page="/" />
      <IntroAnimation />
      <Navbar />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <ReferencesSection />
        <OfferDashboard />
        <OurValues />
        <HowItWorks variant="home" />
        <HomeFAQ />
        <Contact headingLevel="h2" />
      </main>
      <Footer />
    </>
  );
}
