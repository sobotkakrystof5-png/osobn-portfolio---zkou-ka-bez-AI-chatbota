import { ESHOP_PACKAGE, PRICE_BY_NAME } from "@/lib/data/pricing";
import { WEB_PACKAGES } from "@/components/services/WebPackages";
import { cn } from "@/lib/utils";

// Srovnání variant jako skutečná <table>. Karty ceníku vypadají dobře, ale
// vyhledávače a AI asistenti z nich srovnání nevyčtou; tabulku s hlavičkou
// sloupců citují doslova („Promo Page stojí od 9 999 Kč a je hotová do
// 10 pracovních dní“). Ceny i termíny bere ze stejných dat jako karty.

const ORDER = ["Micro Page", "Promo Page", "Pro Web"];

const ROWS = [
  ...ORDER.map((name) => {
    const pkg = WEB_PACKAGES.find((p) => p.name === name)!;
    return {
      name,
      price: PRICE_BY_NAME[name],
      what: pkg.kind,
      use: pkg.tags.slice(0, 3).join(", "),
      delivery: pkg.delivery.replace(/^Hotovo /, ""),
    };
  }),
  {
    name: ESHOP_PACKAGE,
    price: PRICE_BY_NAME[ESHOP_PACKAGE],
    what: "E-shop",
    use: "Shopify nebo vlastní kód, platby, doprava, sklad",
    delivery: "podle počtu produktů, termín víte předem",
  },
];

export function PackageCompareTable({ caption, className }: { caption: string; className?: string }) {
  return (
    <div className={cn("overflow-x-auto border border-white/[0.07]", className)}>
      <table className="w-full min-w-[560px] border-collapse text-left font-inter">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/[0.07] bg-white/[0.02] text-[11px] uppercase tracking-[0.14em] text-text-muted">
            <th scope="col" className="px-4 py-3 font-medium">Varianta</th>
            <th scope="col" className="px-4 py-3 font-medium">Cena</th>
            <th scope="col" className="px-4 py-3 font-medium">Typ</th>
            <th scope="col" className="px-4 py-3 font-medium">Typické použití</th>
            <th scope="col" className="px-4 py-3 font-medium">Termín</th>
          </tr>
        </thead>
        <tbody className="text-[14px] text-text-secondary">
          {ROWS.map((row) => (
            <tr key={row.name} className="border-b border-white/[0.05] last:border-b-0">
              <th scope="row" className="px-4 py-3.5 font-medium text-[#f0ece6] whitespace-nowrap">
                {row.name}
              </th>
              <td className="px-4 py-3.5 whitespace-nowrap text-[#c9a84c]">{row.price}</td>
              <td className="px-4 py-3.5">{row.what}</td>
              <td className="px-4 py-3.5">{row.use}</td>
              <td className="px-4 py-3.5">{row.delivery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
