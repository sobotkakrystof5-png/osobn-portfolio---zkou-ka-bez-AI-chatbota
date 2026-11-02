import { PRICE_BY_NAME } from "@/lib/data/pricing";
import { PriceLabel } from "@/components/PriceLabel";
import { CTAButton } from "@/components/CTAButton";
import { ServiceBadge } from "@/components/services/PriceTable";
import { WebIllustration, type WebIllustrationKind } from "@/components/services/WebIllustrations";
import { cn } from "@/lib/utils";

// Tři varianty webu jako karty vedle sebe (vzor: karty nástrojů na alteno.cz):
// ilustrace okna prohlížeče se září, štítek typu, název, popis, čipy a cena. Prostřední
// karta (nejoblíbenější) svítí. Ceny bere z lib/data/pricing.ts podle názvu,
// ať se nerozejdou s ceníkem.
type WebPackage = {
  name: string;
  illustration: WebIllustrationKind;
  kind: string;
  desc: string;
  tags: string[];
  delivery: string;
  featured?: boolean;
};

export const WEB_PACKAGES: WebPackage[] = [
  {
    name: "Micro Page",
    illustration: "micro",
    kind: "Jeden účel",
    desc: "Rychlá stránka pro jeden konkrétní cíl: ohlášení novinky, rozcestník odkazů nebo přesměrování. Vyberete si jednu ze tří variant.",
    tags: ["Coming soon", "Link-in-bio", "Redirect"],
    delivery: "Hotovo do 2 pracovních dní",
  },
  {
    name: "Pro Web",
    illustration: "pro",
    kind: "Vícestránkový web",
    desc: "Plnohodnotný web s víc podstránkami, pokročilými animacemi a systémy na míru, třeba rezervacemi nebo kalkulačkou.",
    tags: ["Víc podstránek", "Pokročilé animace", "Systémy na míru", "SEO struktura"],
    delivery: "Hotovo do 3 týdnů",
    featured: true,
  },
  {
    name: "Promo Page",
    illustration: "promo",
    kind: "Landing page",
    desc: "Jedna stránka, maximální dojem. Postavená na jednu konverzi, ať je to poptávka, rezervace nebo objednávka.",
    tags: ["Prodejní struktura", "Poptávkový formulář", "Animace", "SEO základ"],
    delivery: "Hotovo do 10 pracovních dní",
  },
];

export function WebPackages() {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
      {WEB_PACKAGES.map((pkg) => (
        <li
          key={pkg.name}
          className={cn(
            "group relative flex flex-col items-center border bg-[#0b0b0b] px-6 pb-9 pt-11 text-center transition-[border-color,box-shadow] duration-500 md:px-7",
            pkg.featured
              ? "border-[#c9a84c]/45 shadow-[0_0_70px_-18px_rgba(201,168,76,0.45)]"
              : "border-white/[0.07] hover:border-[#c9a84c]/30 hover:shadow-[0_0_60px_-24px_rgba(201,168,76,0.35)]"
          )}
        >
          {pkg.featured && (
            <span className="absolute right-4 top-4">
              <ServiceBadge badge="Nejoblíbenější" />
            </span>
          )}

          {/* Okno prohlížeče s náhledem varianty, za ním měkká zlatá záře. */}
          <span className="relative block w-[132px]" aria-hidden="true">
            <span className="absolute inset-x-[-10px] inset-y-[-6px] rounded-full bg-[#c9a84c]/[0.12] blur-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            <WebIllustration
              kind={pkg.illustration}
              className="relative h-auto w-full text-[#c9a84c] transition-transform duration-500 group-hover:-translate-y-1"
            />
          </span>

          <p className="mt-8 border border-[#c9a84c]/25 bg-[#c9a84c]/[0.07] px-3 py-1.5 font-inter font-medium text-[11px] uppercase tracking-[0.16em] text-[#c9a84c]">
            {pkg.kind}
          </p>
          <h3 className="mt-5 font-cormorant font-light text-[34px] leading-none text-[#f0ece6]">{pkg.name}</h3>
          <p className="mt-4 max-w-[34ch] font-inter font-normal text-[15px] leading-[1.75] text-text-secondary">{pkg.desc}</p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label={`Co obsahuje ${pkg.name}`}>
            {pkg.tags.map((tag) => (
              <li
                key={tag}
                className="border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 font-inter font-normal text-[13px] text-text-secondary"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto w-full pt-9">
            <p className="font-cormorant font-light text-[38px] leading-none lining-nums text-[#f0ece6]">
              <PriceLabel price={PRICE_BY_NAME[pkg.name]} />
            </p>
            <p className="mt-2 font-inter font-normal text-[12px] uppercase tracking-[0.12em] text-text-muted">{pkg.delivery}</p>
            <CTAButton className="mt-7 flex w-full justify-center bg-[#c9a84c] px-6 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
              Nezávazně poptat →
            </CTAButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
