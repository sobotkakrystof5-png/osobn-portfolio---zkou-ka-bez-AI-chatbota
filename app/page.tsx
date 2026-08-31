import type { Metadata } from "next";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import TestimonialWall from "@/components/TestimonialWall";
import StatementBlock from "@/components/StatementBlock";
import HomeExplore from "@/components/HomeExplore";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Tvorba webových stránek | Web pro firmu a SEO optimalizace webu – VIZEON",
  description:
    "Weby, které přivádějí zákazníky, ne jen návštěvníky. Tvorba webu na míru za 5–21 dní, bez šablon, transparentní ceník od 4 999 Kč. Weby, AI chatboti a grafika pro živnostníky a malé firmy v ČR.",
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
        <TestimonialWall />
        <StatementBlock />
        <HomeExplore />
        <Contact headingLevel="h2" />
      </main>
      <Footer />
    </>
  );
}
