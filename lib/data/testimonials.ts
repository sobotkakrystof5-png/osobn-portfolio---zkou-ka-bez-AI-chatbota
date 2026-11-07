export type Testimonial = {
  quote: string;
  /** Zkrácená citace pro carousel na homepage: doslovné věty z `quote`. */
  excerpt?: string;
  name: string;
  url: string;
  urlLabel: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "S prací jsme byli maximálně spokojeni. Od začátku byla spolupráce velmi příjemná, komunikace bezproblémová a přístup profesionální. Velmi si vážíme ochoty, vstřícnosti a snahy vyjít nám ve všem vstříc. Webové stránky jsou krásně zpracované a splnily naše očekávání. Moc děkujeme za skvělou práci, trpělivost a profesionální přístup. Určitě můžeme spolupráci doporučit všem, kteří hledají spolehlivého člověka pro tvorbu webových stránek.",
    excerpt:
      "S prací jsme byli maximálně spokojeni. Od začátku byla spolupráce velmi příjemná, komunikace bezproblémová a přístup profesionální.",
    name: "Studnářství Petráň",
    url: "https://www.studnarstvi-petran.cz",
    urlLabel: "studnarstvi-petran.cz",
  },
  {
    quote:
      "Spolupráce s Kryštofem z Vizeon na našem novém a skvělém webu u-cerhu.cz byla konstruktivní, rychlá a hlavně zábavná. Doporučím všem ve svém okolí. Jen tak dál a přeji hodně úspěchů, Kryštofe.",
    excerpt:
      "Spolupráce s Kryštofem z Vizeon na našem novém a skvělém webu u-cerhu.cz byla konstruktivní, rychlá a hlavně zábavná. Doporučím všem ve svém okolí.",
    name: "Jiří Bartoň",
    url: "https://www.u-cerhu.cz",
    urlLabel: "u-cerhu.cz",
  },
  {
    quote:
      "S Kryštofem se mi i přes to, že je mladá generace, spolupracovalo velmi dobře — je to profík každým coulem. Co jsem nechápal, mi vysvětlil, a co jsem neuměl udělat, mě po telefonu navedl. Vřele ho doporučuji všem, kdo chtějí nové webové stránky.",
    excerpt:
      "S Kryštofem se mi i přes to, že je mladá generace, spolupracovalo velmi dobře — je to profík každým coulem. Co jsem nechápal, mi vysvětlil, a co jsem neuměl udělat, mě po telefonu navedl.",
    name: "Tomáš Kestner",
    url: "https://www.masazekestner.cz",
    urlLabel: "masazekestner.cz",
  },
  {
    quote:
      "S panem Sobotkou jsem byl maximálně spokojený. Měl se mnou velkou trpělivost a všechno jsme spolu postupně doladili přesně podle mých představ. Komunikace byla super, vše proběhlo podle domluvy a web funguje přesně, jak má. Pokud budu v budoucnu znovu potřebovat jeho služby, určitě se na něj obrátím. Za mě určitě doporučuji!",
    excerpt:
      "S panem Sobotkou jsem byl maximálně spokojený. Měl se mnou velkou trpělivost a všechno jsme spolu postupně doladili přesně podle mých představ.",
    name: "Michal Varchol",
    url: "https://www.malirske-nateracske-prace-litomerice.cz",
    urlLabel: "malirske-nateracske-prace-litomerice.cz",
  },
  {
    quote:
      "S panem Kryštofem Sobotkou jsem opět velmi spokojený. Je to již naše druhá spolupráce a všechno proběhlo na jedničku. Stránky vypadají skvěle, přesně podle mých představ. Oceňuji jeho vstřícnost, ochotu a profesionální přístup. Určitě doporučuji.",
    excerpt:
      "Je to již naše druhá spolupráce a všechno proběhlo na jedničku. Stránky vypadají skvěle, přesně podle mých představ.",
    name: "Michal Varchol",
    url: "https://likvidace-eternitu-azbestu-litomerice.cz",
    urlLabel: "likvidace-eternitu-azbestu-litomerice.cz",
  },
  {
    quote:
      "Děkujeme za realizaci nového webu. Váš přístup byl velmi vstřícný a ochotný. Výsledek splnil naše očekávání.",
    name: "Josef Antoš",
    url: "https://www.zamecnictvimb.cz",
    urlLabel: "zamecnictvimb.cz",
  },
];

// Používá se JEN v ReferencesSection na homepage, ne v components/Testimonials.tsx.
export const carouselTestimonials: Testimonial[] = [
  ...testimonials,
  {
    quote:
      "Kryštofe, obrovské díky za ty nové stránky, jsou fakt perfektní! Upřímně mě potěšilo, jak hladce jsme všechno zvládli vyřešit jen přes zprávy. Výsledek vypadá naprosto profesionálně a už teď mi dělá neskutečnou radost. Skvělá práce a perfektní komunikace. Pokud se mě někdo zeptá na tvorbu webu, hned vím, koho doporučit! Budu se těšit do budoucna na další spolupráci na e-shopu a webu pro manželku.",
    excerpt:
      "Výsledek vypadá naprosto profesionálně a už teď mi dělá neskutečnou radost. Skvělá práce a perfektní komunikace.",
    name: "Dominik Schovánek",
    url: "https://www.schovinox.cz",
    urlLabel: "schovinox.cz",
  },
];
