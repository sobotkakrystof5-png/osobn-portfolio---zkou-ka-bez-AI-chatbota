import type { Metadata } from "next";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import About from "@/components/About";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import ZakazIQ from "@/components/ZakazIQ";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Tvorba webů na míru pro živnostníky a malé firmy | VIZEON",
  description:
    "Weby, které přivádějí zákazníky, ne jen návštěvníky. Tvorba webu na míru za 5–21 dní, bez šablon, transparentní ceník od 4 999 Kč. Weby, grafika a správa sociálních sítí pro živnostníky a malé firmy v ČR.",
  alternates: { canonical: "https://vizeon.cz" },
  openGraph: {
    title: "VIZEON — Tvorba webů na míru pro živnostníky a malé firmy",
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
        <About />
        <Services />
        <HowItWorks />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <ZakazIQ />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
