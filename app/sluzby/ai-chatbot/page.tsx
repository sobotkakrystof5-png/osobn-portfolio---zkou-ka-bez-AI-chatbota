import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "AI Chatbot na míru — odpovídá zákazníkům 24/7",
    description:
      "AI chatbot na míru napojený na váš web odpovídá na časté dotazy, sbírá poptávky a umí navázat na rezervační systém. Cena na dotaz podle rozsahu.",
    alternates: { canonical: "https://vizeon.cz/sluzby/ai-chatbot" },
    openGraph: {
      title: "AI Chatbot na míru | VIZEON",
      description: "Chatbot, který odpovídá zákazníkům 24/7 a sbírá poptávky přímo na vašem webu.",
      url: "https://vizeon.cz/sluzby/ai-chatbot",
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
        { "@type": "ListItem", position: 2, name: "Služby", item: "https://vizeon.cz/sluzby" },
        { "@type": "ListItem", position: 3, name: "AI Chatbot", item: "https://vizeon.cz/sluzby/ai-chatbot" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "AI Chatbot",
      name: "AI Chatbot na míru",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/ai-chatbot",
      description:
        "AI chatbot napojený na web klienta, který odpovídá na časté dotazy, sbírá poptávky a umí navázat na rezervační systém.",
    },
  ],
};

const umi = [
  { h: "Odpovídá 24/7 přímo na webu", p: "Zákazník dostane odpověď hned, i o víkendu nebo po zavírací době. Nečeká na e-mail nebo telefonát." },
  { h: "Zná odpovědi na časté dotazy", p: "Otevírací dobu, ceník nebo postup objednávky, to všechno chatbot zvládne odpovědět z informací, které mu předem nastavím." },
  { h: "Sbírá a kvalifikuje poptávky", p: "Než se ozvete vy, chatbot zjistí, co zákazník potřebuje, a předá vám kontakt rovnou s kontextem." },
  { h: "Umí navázat na rezervační systém", p: "U Pro varianty chatbot rovnou nabídne volný termín nebo poptávkový formulář, ne jen odpoví na dotaz." },
];

const varianty = [
  { name: "AI Chatbot Starter", desc: "Odpovídá na časté dotazy přímo na webu, třeba otevírací dobu, ceník, kontakt nebo postup spolupráce." },
  { name: "AI Chatbot Pro", desc: "Vše ze Starteru navíc napojené na rezervace, poptávkový formulář nebo vaše interní data." },
];

export default function AiChatbotPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/ai-chatbot" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="AI Chatbot na míru"
          h1="Chatbot, který odpovídá zákazníkům, i když zrovna nemůžete vy"
          lead="Nasadím vám chatbota přímo na web, který zvládne většinu opakovaných dotazů sám a poptávky, které potřebují vaši pozornost, vám předá s kontextem. Mimochodem, přesně tuhle technologii vidíte i v chatu vpravo dole na tomto webu."
        />

        <div className="space-y-14">
          <section aria-labelledby="umi">
            <h2 id="umi" className={cn(t.h2Page, "mb-6")}>Co chatbot umí</h2>
            <div className="space-y-6">
              {umi.map((o) => (
                <div key={o.h} className="border-l border-white/[0.06] pl-5">
                  <h3 className={cn(t.h3, "mb-1.5")}>{o.h}</h3>
                  <p className={t.body}>{o.p}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="varianty">
            <h2 id="varianty" className={cn(t.h2Page, "mb-6")}>Varianty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {varianty.map((v) => (
                <div key={v.name} className="border border-white/[0.06] p-5">
                  <h3 className={cn(t.h3, "mb-1.5")}>{v.name}</h3>
                  <p className={t.body}>{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="cena">
            <h2 id="cena" className={cn(t.h2Page, "mb-4")}>Kolik AI chatbot stojí</h2>
            <p className={t.body}>
              Cena je vždy na dotaz. Záleží na tom, kolik témat má chatbot pokrýt a jestli se
              napojuje na rezervační systém nebo vaše vlastní data. Na nezávazné konzultaci
              probereme rozsah a pošlu vám konkrétní nabídku.
            </p>
          </section>

          <section aria-labelledby="pro-koho">
            <h2 id="pro-koho" className={cn(t.h2Page, "mb-4")}>Pro koho se to hodí</h2>
            <p className={t.body}>
              Nejvíc smysl dává tam, kde přichází hodně podobných dotazů, typicky{" "}
              <Link href="/web-pro-kadernictvi" className={t.link}>kadeřnictví</Link>,{" "}
              <Link href="/web-pro-masery-a-wellness" className={t.link}>masérky a wellness</Link>{" "}
              nebo{" "}
              <Link href="/web-pro-remeslniky" className={t.link}>řemeslníci</Link>, kteří nemají
              čas odpovídat na každou zprávu ručně.
            </p>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete chatbota, který odbaví běžné dotazy za vás?"
          subheading="Nezávazná konzultace zdarma. Probereme, co má chatbot umět, a pošlu konkrétní nabídku."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
