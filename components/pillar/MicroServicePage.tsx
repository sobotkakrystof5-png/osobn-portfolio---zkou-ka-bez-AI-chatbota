import Link from "next/link";
import type { ReactNode } from "react";
import { PillarHeader, PillarFooter } from "@/components/pillar/PillarChrome";
import { RelatedIndustries } from "@/components/pillar/RelatedIndustries";

export type MicroFaq = { q: string; a: string };
export type MicroBullet = { title: string; text: string };
export type MicroProcessStep = { title: string; text: string };

export function MicroServicePage({
  kicker,
  h1,
  subhead,
  bullets,
  cenikLead,
  faqs,
  portfolioNote,
  slug,
  serviceType,
  breadcrumbName,
  hubHref = "/tvorba-webu-pro-zivnostniky",
  hubLabel = "← Zpět na tvorbu webu pro živnostníky",
  relatedSlugs,
  caseExampleTitle,
  caseExampleText,
  processHeading = "Jak obvykle probíhá zakázka",
  processSteps,
}: {
  kicker: string;
  h1: string;
  subhead: string;
  bullets: MicroBullet[];
  cenikLead: string;
  faqs?: MicroFaq[];
  /** Volitelná reference na Schovinox (zámečnictví/kovovýroba) v portfoliu. */
  portfolioNote?: ReactNode;
  /** Cesta stránky bez lomítka, např. "web-pro-zamecniky" — pro BreadcrumbList/Service JSON-LD. */
  slug: string;
  /** schema.org Service.serviceType, např. "Tvorba webu pro zámečníky". */
  serviceType: string;
  /** Název položky v BreadcrumbList, defaultně h1. */
  breadcrumbName?: string;
  /** Cíl zpětného odkazu na dně stránky. Default = pillar (/tvorba-webu-pro-zivnostniky). */
  hubHref?: string;
  /** Text zpětného odkazu, musí odpovídat hubHref. */
  hubLabel?: string;
  /** Slugy 2-3 příbuzných oborů pro cross-link blok „Podobné obory". */
  relatedSlugs?: string[];
  /** Nadpis volitelné sekce s konkrétním příkladem zakázky, výchozí "Příklad zakázky". */
  caseExampleTitle?: string;
  /** Text konkrétního příkladu zakázky/scénáře specifického pro obor. Vynechá sekci, pokud chybí. */
  caseExampleText?: string;
  /** Nadpis volitelné sekce s procesem zakázky, výchozí "Jak obvykle probíhá zakázka". */
  processHeading?: string;
  /** 3-4 kroky popisující, jak zakázka v oboru obvykle probíhá (ne proces tvorby webu). Vynechá sekci, pokud chybí. */
  processSteps?: MicroProcessStep[];
}) {
  const url = `https://vizeon.cz/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
          { "@type": "ListItem", position: 2, name: breadcrumbName ?? h1, item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType,
        name: h1,
        provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
        areaServed: { "@type": "Country", name: "Česká republika" },
        url,
        description: subhead,
      },
      ...(faqs && faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PillarHeader />

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          {kicker}
        </p>
        <h1 className="font-cormorant font-light text-[34px] md:text-[52px] leading-[1.1] text-[#f0ece6] mb-5 max-w-2xl">
          {h1}
        </h1>
        <p className="font-inter font-light text-[16px] leading-[1.85] text-[#8a8070] max-w-xl mb-12">
          {subhead}
        </p>

        {/* Co web potřebuje */}
        <section aria-labelledby="potreba" className="mb-12">
          <h2 id="potreba" className="font-cormorant font-light text-[24px] md:text-[30px] text-[#f0ece6] mb-6">
            Co takový web potřebuje
          </h2>
          <div className="space-y-5 font-inter font-light text-[15px] text-[#8a8070] leading-[1.8]">
            {bullets.map((b) => (
              <div key={b.title} className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1 tracking-[0.01em]">
                  {b.title}
                </h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {portfolioNote && (
          <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.8] mb-12 -mt-4">
            {portfolioNote}
          </p>
        )}

        {caseExampleText && (
          <section aria-labelledby="priklad-zakazky" className="mb-12">
            <h2 id="priklad-zakazky" className="font-cormorant font-light text-[24px] md:text-[30px] text-[#f0ece6] mb-4">
              {caseExampleTitle ?? "Příklad zakázky"}
            </h2>
            <p className="font-inter font-light text-[15px] text-[#8a8070] leading-[1.8]">
              {caseExampleText}
            </p>
          </section>
        )}

        {processSteps && processSteps.length > 0 && (
          <section aria-labelledby="proces-zakazky" className="mb-12">
            <h2 id="proces-zakazky" className="font-cormorant font-light text-[24px] md:text-[30px] text-[#f0ece6] mb-6">
              {processHeading}
            </h2>
            <ol className="space-y-5 font-inter font-light text-[15px] text-[#8a8070] leading-[1.8] list-decimal list-inside">
              {processSteps.map((step) => (
                <li key={step.title}>
                  <span className="font-inter font-medium text-[14px] text-[#f0ece6] tracking-[0.01em]">
                    {step.title}
                  </span>{" "}
                  — {step.text}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Hlavní konverzní CTA — přímo na ceník */}
        <div className="border border-[rgba(201,168,76,0.2)] p-7 md:p-9 mb-14 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at left, rgba(201,168,76,0.05), transparent 60%)" }}
            aria-hidden="true"
          />
          <p className="relative font-inter font-light text-[14px] text-[#8a8070] leading-[1.8] mb-4">
            {cenikLead}
          </p>
          <Link
            href="/cena-tvorby-webu"
            className="relative inline-flex font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-7 py-3.5 hover:bg-[#d4b968] transition-all duration-300"
          >
            Podívat se na ceník →
          </Link>
        </div>

        {faqs && faqs.length > 0 && (
          <section aria-labelledby="faq-micro" className="mb-14">
            <h2 id="faq-micro" className="font-cormorant font-light text-[24px] md:text-[30px] text-[#f0ece6] mb-6">
              Časté otázky
            </h2>
            <div className="space-y-6 font-inter font-light text-[15px] text-[#8a8070] leading-[1.8]">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5">{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedSlugs && relatedSlugs.length > 0 && <RelatedIndustries slugs={relatedSlugs} />}

        <Link
          href={hubHref}
          className="font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300"
        >
          {hubLabel}
        </Link>
      </main>

      <PillarFooter />
    </div>
  );
}
