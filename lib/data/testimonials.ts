export type Testimonial = {
  quote: string;
  name: string;
  url: string;
  urlLabel: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Spolupráce s Kryštofem z Vizeon na našem novém a skvělém webu u-cerhu.cz byla konstruktivní, rychlá a hlavně zábavná. Doporučím všem ve svém okolí. Jen tak dál a přeji hodně úspěchů, Kryštofe.",
    name: "Jiří Bartoň",
    url: "https://www.u-cerhu.cz",
    urlLabel: "u-cerhu.cz ↗",
  },
  {
    quote:
      "S Kryštofem se mi i přes to, že je mladá generace, spolupracovalo velmi dobře — je to profík každým coulem. Co jsem nechápal, mi vysvětlil, a co jsem neuměl udělat, mě po telefonu navedl. Vřele ho doporučuji všem, kdo chtějí nové webové stránky.",
    name: "Tomáš Kestner",
    url: "https://www.masazekestner.cz",
    urlLabel: "masazekestner.cz ↗",
  },
];

// Používá se JEN v TestimonialCarousel na homepage, ne na /reference.
export const carouselTestimonials: Testimonial[] = [
  ...testimonials,
  {
    quote:
      "Kryštofe, obrovské díky za ty nové stránky, jsou fakt perfektní! Upřímně mě potěšilo, jak hladce jsme všechno zvládli vyřešit jen přes zprávy. Výsledek vypadá naprosto profesionálně a už teď mi dělá neskutečnou radost. Skvělá práce a perfektní komunikace. Pokud se mě někdo zeptá na tvorbu webu, hned vím, koho doporučit! Budu se těšit do budoucna na další spolupráci na e-shopu a webu pro manželku.",
    name: "Dominik Schovánek",
    url: "https://www.schovinox.cz",
    urlLabel: "schovinox.cz ↗",
  },
];
