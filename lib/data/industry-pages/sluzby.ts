import {
  Aperture,
  BadgeCheck,
  BellRing,
  Building2,
  Calculator,
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  Download,
  Dumbbell,
  FileText,
  Flower2,
  Gift,
  HeartHandshake,
  House,
  Images,
  Layers,
  Leaf,
  Lock,
  Receipt,
  Route,
  Snowflake,
  Sparkles,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import type { IndustryPage } from "./types";

// Služby a profese: 8 oborů. U salonů a trenérů je hlavní konverzí online
// rezervace, proto doporučujeme Pro Web (systémy na míru jsou jeho součástí).

const LOCAL_SEO = { label: "Lokální SEO: buďte vidět ve svém okolí", href: "/sluzby/seo-optimalizace/lokalni-seo" };
const BOOKING = { label: "Rezervační systémy a systémy na míru", href: "/sluzby/systemy-na-miru" };
const AUTOMATION = { label: "Automatizace poptávek a připomínek", href: "/automatizace/automatizace-procesu" };

const BOOKING_SHIFTS_HEADING = "Kde dnes přicházíte o klientky";

export const SLUZBY: IndustryPage[] = [
  {
    slug: "web-pro-kadernictvi",
    name: "Kadeřnictví",
    forWhom: "kadeřnictví",
    meta: {
      title: "Webové stránky pro kadeřnictví s rezervací",
      description:
        "Tvorba webu pro kadeřnictví a barbershopy s online rezervací, ceníkem a galerií účesů. Klientky se objednají samy, i když zrovna stříháte. Pro Web od 14 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro kadeřnictví",
    h1: { lead: "Web pro kadeřnictví,", accent: "kde se klientky objednají samy." },
    intro:
      "Tvoříme webové stránky pro kadeřnictví a barbershopy s online rezervací. Klientka si vybere službu i čas, zatímco vy stříháte, a před termínem jí přijde připomínka.",
    scene: {
      variant: "booking",
      query: "kadeřnictví Plzeň online rezervace",
      brand: "Salon Lucie",
      headline: "Kadeřnictví · Plzeň-Slovany",
      chips: ["Střih", "Barvení", "Melír"],
      action: "Rezervovat 14:30",
      slots: ["9:00", "10:30", "13:00", "14:30", "16:00", "17:30"],
      notify: { title: "Nová rezervace", text: "Pá 14:30 · Barvení a střih · Petra K." },
    },
    shiftsHeading: BOOKING_SHIFTS_HEADING,
    shifts: [
      { pain: "Telefon zvoní, když máte v ruce nůžky.", fix: "Online rezervace, která pracuje i během střihu." },
      { pain: "Klientka, která se nedovolá, jde jinam.", fix: "Volné termíny vidí nonstop, i večer na gauči." },
      { pain: "Zapomenuté termíny dělají díry v kalendáři.", fix: "Automatická připomínka den před návštěvou." },
    ],
    features: [
      { icon: CalendarCheck, title: "Online rezervace", text: "Služba, kadeřnice a čas na pár klepnutí." },
      { icon: BellRing, title: "Připomínky termínů", text: "E-mail den předem, méně nedorazivších klientek." },
      { icon: Receipt, title: "Aktuální ceník", text: "Střih, barva a melír podle délky vlasů." },
      { icon: Images, title: "Galerie účesů a salonu", text: "Proměny a prostor, které rozhodnou o první návštěvě." },
      { icon: Gift, title: "Dárkové poukazy", text: "Objednávka poukazu přímo z webu, i na Vánoce." },
    ],
    searches: [
      "kadeřnictví Plzeň",
      "kadeřnictví online rezervace",
      "dámské kadeřnictví v okolí",
      "barvení vlasů cena",
      "balayage Plzeň",
      "pánské kadeřnictví a barber",
    ],
    plan: {
      name: "Pro Web",
      reason: "Online rezervace je u kadeřnictví hlavní funkce, proto doporučujeme Pro Web. Když rezervujete přes jiný systém, stačí Promo Page s jeho napojením.",
    },
    project: { slug: "masaze-kestner", fit: "related" },
    faqs: [
      {
        q: "Jak funguje propojení rezervací s webem?",
        a: "Rezervační kalendář postavíme přímo do webu, nebo napojíme systém, který už používáte. Klientka si vybere službu a čas na pár kliknutí, bez telefonátu.",
      },
      {
        q: "Chodí klientkám připomínky termínu?",
        a: "Ano, automaticky e-mailem před termínem. Méně zapomenutých návštěv znamená méně děr v kalendáři.",
      },
      {
        q: "Musím mít profesionální fotky salonu?",
        a: "Ne. Stačí kvalitní fotky z mobilu při dobrém světle. Poradíme, co nafotit, aby salon i účesy vynikly.",
      },
    ],
    related: ["web-pro-kosmeticky", "web-pro-masery-a-wellness", "web-pro-fitness-trenery", "web-pro-fotografy"],
    links: [BOOKING, LOCAL_SEO],
  },

  {
    slug: "web-pro-masery-a-wellness",
    name: "Masérky a wellness",
    forWhom: "maséry a wellness",
    meta: {
      title: "Web pro maséry a wellness s online rezervací",
      description:
        "Tvorba webu pro maséry, masážní salony a wellness: klidný design, online rezervace podle délky procedury a dárkové poukazy. Pro Web od 14 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro maséry a wellness studia",
    h1: { lead: "Web pro maséry a wellness,", accent: "který uklidní na první pohled." },
    intro:
      "Tvoříme webové stránky pro maséry a wellness studia. Klidný design naladí na relaxaci a klient si rezervuje masáž podle délky procedury, aniž by vás rušil při práci.",
    scene: {
      variant: "booking",
      query: "masáže Liberec rezervace",
      brand: "Masáže Elen",
      headline: "Relaxační a sportovní masáže · Liberec",
      chips: ["Klasická 60 min", "Lávové kameny", "Poukazy"],
      action: "Rezervovat 16:00",
      slots: ["9:00", "10:30", "12:00", "14:30", "16:00", "18:00"],
      notify: { title: "Nová rezervace", text: "Čt 16:00 · Lávové kameny 90 min" },
    },
    shiftsHeading: "Kde dnes přicházíte o klienty",
    shifts: [
      { pain: "Při masáži telefon zvednout nejde.", fix: "Online rezervace, která pracuje, zatímco masírujete." },
      { pain: "Procedury různé délky rozbíjí kalendář.", fix: "Rezervace hlídá délku každé masáže i pauzy mezi klienty." },
      { pain: "Poukazy prodáváte jen osobně.", fix: "Dárkové poukazy objednané z webu, i těsně před Vánoci." },
    ],
    features: [
      { icon: CalendarCheck, title: "Rezervace podle délky", text: "60, 90 i 120 minut bez překrývání." },
      { icon: Flower2, title: "Klidný design", text: "Barvy, fotky a tempo stránky, které uvolní." },
      { icon: Gift, title: "Dárkové poukazy", text: "Objednávka poukazu přímo z webu." },
      { icon: HeartHandshake, title: "Která masáž pro koho", text: "Krátký průvodce procedurami i tím, kdy masáž nedoporučujete." },
      { icon: BellRing, title: "Změna a zrušení termínu", text: "Klient si termín přeobjedná sám podle vašich pravidel." },
    ],
    searches: [
      "masáže Liberec",
      "relaxační masáž",
      "sportovní masáž cena",
      "masáž lávovými kameny",
      "dárkový poukaz na masáž",
      "wellness pro páry",
    ],
    plan: {
      name: "Pro Web",
      reason: "U masáží je rezervace podle délky procedury hlavní funkce, proto doporučujeme Pro Web. Bez rezervací stačí Promo Page s ceníkem a kontaktem.",
    },
    project: { slug: "masaze-kestner", fit: "same" },
    faqs: [
      {
        q: "Zvládne kalendář hlídat délku procedur?",
        a: "Ano. Každá masáž má svou délku a pauzu na přípravu, takže se termíny nikdy nepřekrývají.",
      },
      {
        q: "Dá se na web přidat prodej dárkových poukazů?",
        a: "Ano. Klient vybere hodnotu nebo proceduru a poukaz objedná přímo z webu.",
      },
      {
        q: "Co když klient potřebuje termín zrušit nebo přeobjednat?",
        a: "Zvládne to sám přes odkaz v potvrzení, podle pravidel, která nastavíte, třeba nejpozději 24 hodin předem.",
      },
    ],
    related: ["web-pro-kosmeticky", "web-pro-kadernictvi", "web-pro-fitness-trenery", "web-pro-fotografy"],
    links: [BOOKING, LOCAL_SEO],
  },

  {
    slug: "web-pro-kosmeticky",
    name: "Kosmetičky",
    forWhom: "kosmetičky",
    meta: {
      title: "Webové stránky pro kosmetičky s rezervací",
      description:
        "Tvorba webu pro kosmetičky a kosmetické salony: online rezervace ošetření, ceník, galerie proměn a dárkové poukazy. Pro Web od 14 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro kosmetičky a kosmetické salony",
    h1: { lead: "Web pro kosmetičky,", accent: "kde je termín na dvě kliknutí." },
    intro:
      "Tvoříme webové stránky pro kosmetičky a kosmetické salony. Klientka zjistí, co ošetření obnáší, uvidí výsledky a rezervuje termín dřív, než zavře prohlížeč.",
    scene: {
      variant: "booking",
      query: "kosmetika Olomouc rezervace",
      brand: "Studio Bella",
      headline: "Kosmetický salon · Olomouc",
      chips: ["Čištění pleti", "Lash lifting", "Poukazy"],
      action: "Rezervovat 10:30",
      slots: ["8:30", "10:30", "12:00", "13:30", "15:00", "17:00"],
      notify: { title: "Nová rezervace", text: "Út 10:30 · Hloubkové čištění pleti" },
    },
    shiftsHeading: BOOKING_SHIFTS_HEADING,
    shifts: [
      { pain: "Klientka neví, které ošetření si vybrat.", fix: "Ošetření popsaná jednoduše: pro koho, jak dlouho, kolik." },
      { pain: "Na zprávy na Instagramu odpovídáte až večer.", fix: "Online rezervace bez psaní a čekání na odpověď." },
      { pain: "Výsledky vaší práce zapadnou ve feedu.", fix: "Galerie proměn s citlivým přístupem k soukromí." },
    ],
    features: [
      { icon: CalendarCheck, title: "Online rezervace", text: "Ošetření a čas vybrané za pár vteřin." },
      { icon: Sparkles, title: "Průvodce ošetřeními", text: "Co ošetření dělá, pro koho je a jak dlouho trvá." },
      { icon: Images, title: "Galerie proměn", text: "Před a po jen se souhlasem klientky a bez tváře." },
      { icon: Gift, title: "Poukazy a permanentky", text: "Objednávka z webu pro dárky i stálé klientky." },
      { icon: Leaf, title: "Značky a přípravky", text: "S čím pracujete a proč tomu věřit." },
    ],
    searches: [
      "kosmetika Olomouc",
      "kosmetický salon v okolí",
      "čištění pleti cena",
      "lash lifting",
      "laminace obočí",
      "dárkový poukaz na kosmetiku",
    ],
    plan: {
      name: "Pro Web",
      reason: "Online rezervace ošetření je hlavní funkce, proto doporučujeme Pro Web. Když rezervujete přes jiný systém, stačí Promo Page s jeho napojením.",
    },
    project: { slug: "masaze-kestner", fit: "related" },
    faqs: [
      {
        q: "Jak ukázat fotky před a po a nenarušit soukromí klientek?",
        a: "Jen se souhlasem klientky a s detailem ošetřené partie, bez tváře. Na webu to doplníme krátkou poznámkou o souhlasu.",
      },
      {
        q: "Dá se rezervace propojit s připomínkou termínu?",
        a: "Ano. Klientce přijde potvrzení a připomínka e-mailem, takže na termín nezapomene.",
      },
      {
        q: "Dá se na web přidat prodej permanentek?",
        a: "Ano, jako objednávku permanentky na sérii ošetření. Klientky se k vám vracejí pravidelně.",
      },
    ],
    related: ["web-pro-kadernictvi", "web-pro-masery-a-wellness", "web-pro-fitness-trenery", "web-pro-fotografy"],
    links: [BOOKING, LOCAL_SEO],
  },

  {
    slug: "web-pro-fitness-trenery",
    name: "Fitness trenéři",
    forWhom: "fitness trenéry",
    meta: {
      title: "Web pro fitness trenéry s rezervací tréninků",
      description:
        "Tvorba webu pro osobní a fitness trenéry: rezervace tréninků, balíčky a ceník, skupinové lekce s kapacitou a představení vašeho stylu. Pro Web od 14 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro fitness a osobní trenéry",
    h1: { lead: "Web pro fitness trenéry,", accent: "který vám plní kalendář." },
    intro:
      "Tvoříme webové stránky pro osobní trenéry a fitness lektory. Ukážou váš styl a balíčky tréninků a nový klient si sám zarezervuje úvodní konzultaci.",
    scene: {
      variant: "booking",
      query: "osobní trenér Praha 6",
      brand: "Trénink s Martinem",
      headline: "Osobní trenér · Praha 6",
      chips: ["Osobní trénink", "Skupinovky", "Balíčky"],
      action: "Rezervovat 18:00",
      slots: ["6:30", "7:30", "12:00", "17:00", "18:00", "19:00"],
      notify: { title: "Nová rezervace", text: "Úvodní konzultace · Po 18:00 · Jakub" },
    },
    shiftsHeading: "Kde dnes přicházíte o klienty",
    shifts: [
      { pain: "Domlouvání termínů přes zprávy vám zabere hodinu denně.", fix: "Klient si trénink zarezervuje sám podle vašeho kalendáře." },
      { pain: "Nový klient neví, jestli mu váš styl sedne.", fix: "Představení stylu, pro koho je a co čekat na prvním tréninku." },
      { pain: "Ceny posíláte každému zvlášť.", fix: "Balíčky tréninků s cenou přehledně na webu." },
    ],
    features: [
      { icon: CalendarCheck, title: "Rezervace tréninků", text: "Osobní tréninky i skupinové lekce v jednom kalendáři." },
      { icon: Users, title: "Kapacita skupinovek", text: "Kalendář hlídá počet míst a plnou lekci zavře." },
      { icon: Dumbbell, title: "Váš tréninkový styl", text: "Video nebo fotky, které ukážou, jak trénujete." },
      { icon: Receipt, title: "Balíčky a ceník", text: "Jednotlivý trénink, permanentky i online plán." },
      { icon: ClipboardList, title: "Dotazník před startem", text: "Cíle a zdravotní omezení znáte dřív, než klient přijde." },
    ],
    searches: [
      "osobní trenér Praha 6",
      "fitness trenér cena",
      "trenér na hubnutí",
      "kruhový trénink",
      "online tréninkový plán",
      "skupinové lekce v okolí",
    ],
    plan: {
      name: "Pro Web",
      reason: "Rezervace tréninků a kapacity lekcí jsou hlavní funkce, proto doporučujeme Pro Web. Bez rezervací stačí Promo Page s představením a balíčky.",
    },
    project: { slug: "auf-gehts", fit: "related" },
    faqs: [
      {
        q: "Zvládne kalendář hlídat kapacitu skupinových lekcí?",
        a: "Ano. Nastavíte počet míst a plná lekce se v kalendáři sama zavře.",
      },
      {
        q: "Dá se rozlišit osobní trénink a skupinová lekce?",
        a: "Ano. Každý typ má vlastní délku, cenu i kapacitu a klient hned vidí, co si rezervuje.",
      },
      {
        q: "Můžu přes web prodávat i online tréninkové plány?",
        a: "Ano, jako objednávku plánu. Způsob platby a doručení probereme na konzultaci.",
      },
    ],
    related: ["web-pro-masery-a-wellness", "web-pro-kosmeticky", "web-pro-kadernictvi", "web-pro-fotografy"],
    links: [BOOKING, LOCAL_SEO],
  },

  {
    slug: "web-pro-ucetni",
    name: "Účetní",
    forWhom: "účetní",
    meta: {
      title: "Webové stránky pro účetní kanceláře",
      description:
        "Tvorba webu pro účetní a účetní kanceláře: služby lidsky, poptávka s formou podnikání a počtem dokladů a důvěryhodný design. Promo Page od 9 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro účetní a účetní kanceláře",
    h1: { lead: "Web pro účetní,", accent: "kterému klient svěří svá čísla." },
    intro:
      "Tvoříme webové stránky pro účetní a účetní kanceláře. Důvěryhodný design, služby popsané lidsky a poptávka, ze které hned poznáte typ klienta i rozsah práce.",
    scene: {
      variant: "form",
      query: "účetní pro OSVČ Hradec Králové",
      brand: "Účetnictví Marková",
      headline: "Účetnictví a daně · Hradec Králové",
      chips: ["OSVČ", "s.r.o.", "Mzdy"],
      action: "Chci nabídku",
      fields: [
        { label: "Forma podnikání", value: "s.r.o., plátce DPH" },
        { label: "Dokladů měsíčně", value: "cca 40" },
        { label: "Mzdy", value: "3 zaměstnanci" },
      ],
      notify: { title: "Nová poptávka z webu", text: "s.r.o. · plátce DPH · 40 dokladů měsíčně" },
    },
    shiftsHeading: "Kde dnes přicházíte o klienty",
    shifts: [
      { pain: "Doporučení dojdou a nový klient vás nenajde.", fix: "Web, který vás ukáže lidem, kteří hledají účetní v okolí." },
      { pain: "Až na první schůzce zjistíte, že klient nesedí.", fix: "Poptávka s formou podnikání a počtem dokladů předem." },
      { pain: "Služby zní jako výňatek z daňového zákona.", fix: "Služby lidsky: co za klienta vyřešíte a co mu ušetříte." },
    ],
    features: [
      { icon: Calculator, title: "Orientační cena", text: "Kalkulace podle formy podnikání a počtu dokladů." },
      { icon: FileText, title: "Služby lidsky", text: "Účetnictví, daně, mzdy a DPH bez úředního jazyka." },
      { icon: BadgeCheck, title: "Důvěra a odbornost", text: "Certifikace, pojištění odpovědnosti a roky praxe." },
      { icon: CalendarClock, title: "Daňové termíny", text: "Přehled termínů, který přivádí návštěvy celý rok." },
      { icon: Lock, title: "Diskrétnost a bezpečí", text: "Zabezpečený web a odkaz na úložiště, které pro doklady používáte." },
    ],
    searches: [
      "účetní pro OSVČ",
      "účetní Hradec Králové",
      "účetní kancelář cena",
      "vedení účetnictví s.r.o. cena",
      "daňové přiznání OSVČ",
      "zpracování mezd",
    ],
    plan: {
      name: "Promo Page",
      reason: "Účetní obvykle stačí Promo Page se službami a poptávkou. Kancelář s víc službami nebo kalkulačkou ceny využije Pro Web.",
    },
    project: { slug: "prvotka", fit: "related" },
    faqs: [
      {
        q: "Nebude web působit moc prodejně pro obor jako účetnictví?",
        a: "Ne. Volíme klidný, věcný tón a design, který působí jako dobrá kancelář: spolehlivě a přehledně.",
      },
      {
        q: "Dá se na web přidat kalkulačka ceny účetnictví?",
        a: "Ano. Klient zadá formu podnikání a počet dokladů a hned vidí orientační cenu. Kalkulačku stavíme ve variantě Pro Web.",
      },
      {
        q: "Zvládne web bezpečně přijímat dokumenty od klientů?",
        a: "Web slouží k prvnímu kontaktu a poptávce. Pro citlivé doklady doporučujeme nástroj k tomu určený, třeba datovou schránku nebo šifrované úložiště, a na webu na něj odkážeme.",
      },
    ],
    related: ["web-pro-realitni-maklere", "web-pro-fotografy", "web-pro-autoservisy", "web-pro-kosmeticky"],
    links: [LOCAL_SEO, AUTOMATION],
  },

  {
    slug: "web-pro-realitni-maklere",
    name: "Realitní makléři",
    forWhom: "realitní makléře",
    meta: {
      title: "Web pro realitní makléře na míru od 9 999 Kč",
      description:
        "Tvorba webu pro realitní makléře: osobní značka, reference prodejů, aktuální nabídky a formulář na ocenění nemovitosti, který přivádí prodávající. Od 9 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro realitní makléře",
    h1: { lead: "Web pro realitní makléře,", accent: "který vám přivede prodávající." },
    intro:
      "Tvoříme webové stránky pro realitní makléře. Osobní značka a reference prodejů budují důvěru a formulář na ocenění nemovitosti vám přivádí nové zakázky.",
    scene: {
      variant: "form",
      query: "realitní makléř Pardubice prodej bytu",
      brand: "Jana Hronková Reality",
      headline: "Prodej bytů a domů · Pardubice",
      chips: ["Prodej", "Ocenění", "Reference"],
      action: "Ocenit zdarma",
      fields: [
        { label: "Nemovitost", value: "Byt 3+1" },
        { label: "Lokalita", value: "Pardubice-Dukla" },
        { label: "Plocha", value: "74 m²" },
      ],
      notify: { title: "Nová poptávka z webu", text: "Ocenění bytu 3+1 · 74 m² · Pardubice" },
    },
    shifts: [
      { pain: "Na portálech vypadáte jako stovka dalších makléřů.", fix: "Osobní web, kde je vidět, kdo jste a co jste prodali." },
      { pain: "Prodávající se rozhoduje podle doporučení.", fix: "Reference prodejů s dobou prodeje a ohlasy klientů." },
      { pain: "Nové zakázky shání jen telefonování.", fix: "Formulář na ocenění, který přivádí prodávající sám." },
    ],
    features: [
      { icon: House, title: "Ocenění nemovitosti", text: "Formulář, který z návštěvníka udělá prodávajícího." },
      { icon: BadgeCheck, title: "Reference prodejů", text: "Prodané nemovitosti, doba prodeje a ohlasy klientů." },
      { icon: Building2, title: "Aktuální nabídky", text: "Napojení na inzeráty, ať je nepíšete dvakrát." },
      { icon: Route, title: "Jak prodej probíhá", text: "Krok za krokem pro ty, kdo prodávají poprvé." },
      { icon: UserRound, title: "Osobní značka", text: "Fotka, příběh a styl práce místo loga velké kanceláře." },
    ],
    searches: [
      "realitní makléř Pardubice",
      "prodej bytu přes makléře",
      "ocenění nemovitosti zdarma",
      "odhad ceny bytu",
      "provize realitního makléře",
      "rychlý prodej domu",
    ],
    plan: {
      name: "Pro Web",
      reason: "Makléř prodává sebe i nabídky, proto doporučujeme Pro Web s referencemi, nabídkami a oceněním. Pro osobní vizitku s formulářem stačí Promo Page.",
    },
    project: { slug: "estatiq", fit: "related" },
    faqs: [
      {
        q: "Dá se web propojit s inzeráty na realitních portálech?",
        a: "Většinou ano, přes export, který už používáte. Nabídky pak nezadáváte dvakrát. Konkrétní napojení ověříme na konzultaci.",
      },
      {
        q: "Jak působit důvěryhodně bez velké realitní kanceláře v zádech?",
        a: "Osobním příběhem, referencemi prodejů a rychlou reakcí. Lidé si vybírají makléře, ne logo.",
      },
      {
        q: "Dá se přidat kalkulačka orientační ceny nemovitosti?",
        a: "Ano. Prodávající zadá typ, lokalitu a plochu a vy dostanete poptávku s kontaktem. Kalkulačku stavíme ve variantě Pro Web.",
      },
    ],
    related: ["web-pro-ucetni", "web-pro-fotografy", "web-pro-autoservisy", "web-pro-remeslniky"],
    links: [{ label: "AI agenti, kteří odpovídají zájemcům", href: "/automatizace/ai-agenti" }, LOCAL_SEO],
  },

  {
    slug: "web-pro-fotografy",
    name: "Fotografové",
    forWhom: "fotografy",
    meta: {
      title: "Web pro fotografy: portfolio na míru od 9 999 Kč",
      description:
        "Tvorba webu pro fotografy: rychlé portfolio ve vysokém rozlišení, specializace zvlášť, poptávka termínu a předání fotek klientům. Od 9 999 Kč.",
    },
    serviceType: "Tvorba webových stránek a portfolia pro fotografy",
    h1: { lead: "Web pro fotografy,", accent: "kde fotky mluví za vás." },
    intro:
      "Tvoříme webové stránky pro fotografy. Rychlé portfolio ve vysokém rozlišení, specializace přehledně zvlášť a poptávka, ze které hned víte termín, místo i typ focení.",
    scene: {
      variant: "gallery",
      query: "svatební fotograf Jižní Čechy",
      brand: "Ateliér Světlo",
      headline: "Svatební a rodinný fotograf · Jižní Čechy",
      chips: ["Svatby", "Rodina", "Portréty"],
      action: "Ověřit termín",
      tiles: ["Svatba", "Portrét", "Rodina", "Detail", "Krajina", "Produkt"],
      tones: ["#6b5a4a", "#3e4a52", "#8a7660", "#2f3a33", "#7d6b58", "#4b4038"],
      notify: { title: "Nová poptávka z webu", text: "Svatba 14. 6. · Český Krumlov · 8 hodin" },
    },
    shiftsHeading: "Kde dnes přicházíte o klienty",
    shifts: [
      { pain: "Instagram fotky zmenší a schová ve feedu.", fix: "Portfolio v plné kvalitě, rychlé i na mobilu." },
      { pain: "Svatby a produktovky se pletou dohromady.", fix: "Každá specializace má vlastní galerii a ceník." },
      { pain: "Pořád se doptáváte na termín, místo a rozsah.", fix: "Poptávka s termínem, místem a délkou focení." },
    ],
    features: [
      { icon: Aperture, title: "Portfolio ve vysokém rozlišení", text: "Ostré fotky bez čekání na načtení." },
      { icon: Layers, title: "Specializace zvlášť", text: "Svatby, portréty i produkty s vlastní galerií." },
      { icon: CalendarCheck, title: "Poptávka termínu", text: "Datum, místo a délka focení v jednom formuláři." },
      { icon: Download, title: "Předání fotek klientům", text: "Soukromá online galerie místo posílání odkazů." },
      { icon: Receipt, title: "Balíčky a ceník", text: "Jasné balíčky, ze kterých si klient vybere sám." },
    ],
    searches: [
      "svatební fotograf Jižní Čechy",
      "fotograf na svatbu cena",
      "rodinné focení venku",
      "portrétní fotograf",
      "produktové fotky pro e-shop",
      "těhotenské focení",
    ],
    plan: {
      name: "Pro Web",
      reason: "Fotograf s víc specializacemi potřebuje galerii pro každou, proto doporučujeme Pro Web. S jednou specializací stačí Promo Page.",
    },
    project: { slug: "u-cerhu", fit: "related" },
    faqs: [
      {
        q: "Zvládne web hodně fotek ve vysokém rozlišení?",
        a: "Ano. Fotky připravíme pro každé zařízení a načítáme postupně, takže portfolio vypadá ostře a web je rychlý.",
      },
      {
        q: "Dá se portfolio rozdělit podle specializace?",
        a: "Ano. Svatby, portréty i produkty dostanou vlastní galerii a klient hned najde, co hledá.",
      },
      {
        q: "Můžu klientům předávat fotky přes web?",
        a: "Ano, přes soukromou galerii chráněnou heslem. Rozsah a úložiště probereme na konzultaci.",
      },
    ],
    related: ["web-pro-kadernictvi", "web-pro-kosmeticky", "web-pro-realitni-maklere", "web-pro-rezbare"],
    links: [LOCAL_SEO],
  },

  {
    slug: "web-pro-autoservisy",
    name: "Autoservisy",
    forWhom: "autoservisy",
    meta: {
      title: "Webové stránky pro autoservis s objednávkou",
      description:
        "Tvorba webu pro autoservisy a pneuservisy: online objednávka servisu i přezutí, ceník základních úkonů a připomínky termínů. Pro Web od 14 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro autoservisy a pneuservisy",
    h1: { lead: "Web pro autoservisy,", accent: "kde se servis objedná sám." },
    intro:
      "Tvoříme webové stránky pro autoservisy a pneuservisy. Řidič si objedná přezutí nebo servis online, vybere vůz i úkon a vy máte dílnu naplánovanou bez telefonování.",
    scene: {
      variant: "booking",
      query: "pneuservis přezutí Kladno objednání",
      brand: "Autoservis Sýkora",
      headline: "Servis a pneuservis · Kladno",
      chips: ["Přezutí", "Olej", "Klimatizace"],
      action: "Objednat 8:30",
      slots: ["7:30", "8:30", "10:00", "11:30", "13:30", "15:00"],
      notify: { title: "Nová objednávka", text: "Přezutí pneu · Škoda Octavia · St 8:30" },
    },
    shiftsHeading: "Kde dnes přicházíte o zakázky",
    shifts: [
      { pain: "Na podzim telefon nepřestane zvonit kvůli přezutí.", fix: "Online objednávka přezutí podle volné kapacity dílny." },
      { pain: "Zákazník neví, co děláte a kolik to stojí.", fix: "Specializace a ceník základních úkonů přehledně." },
      { pain: "Stálí zákazníci zapomenou na STK i olej.", fix: "Připomínka servisu, která je přivede zpátky." },
    ],
    features: [
      { icon: CalendarCheck, title: "Online objednávka servisu", text: "Úkon, vůz a termín bez telefonování." },
      { icon: Snowflake, title: "Přezutí a uskladnění pneu", text: "Sezónní nabídka a uskladnění na jednom místě." },
      { icon: Receipt, title: "Ceník základních úkonů", text: "Výměna oleje, přezutí nebo geometrie s cenou." },
      { icon: Wrench, title: "Specializace a značky", text: "Na co se zaměřujete a s čím umíte pracovat." },
      { icon: BellRing, title: "Připomínky servisu", text: "STK, olej nebo přezutí připomeneme e-mailem včas." },
    ],
    searches: [
      "autoservis Kladno",
      "přezutí pneu cena",
      "pneuservis objednání online",
      "výměna oleje cena",
      "servis klimatizace auta",
      "příprava auta na STK",
    ],
    plan: {
      name: "Pro Web",
      reason: "Objednávky podle kapacity dílny jsou hlavní funkce, proto doporučujeme Pro Web. Bez objednávek stačí Promo Page se službami a ceníkem.",
    },
    project: { slug: "zamecnictvi-mb", fit: "related" },
    faqs: [
      {
        q: "Dá se na web přidat objednávka přezutí pneu?",
        a: "Ano. Zákazník vybere úkon, vůz a volný termín podle kapacity dílny. V sezóně vám to ušetří spoustu hovorů.",
      },
      {
        q: "Rozliší formulář typ vozu a požadovaný úkon?",
        a: "Ano. Podle značky, modelu a úkonu hned víte, kolik času si zakázka vezme.",
      },
      {
        q: "Dá se přidat připomínka STK nebo výměny oleje?",
        a: "Ano, jako automatický e-mail stálým zákazníkům. Navazuje na naše automatizace a vrací zákazníky zpátky do dílny.",
      },
    ],
    related: ["web-pro-elektrikare", "web-pro-instalatery", "web-pro-zamecniky", "web-pro-remeslniky"],
    links: [BOOKING, AUTOMATION],
  },
];
