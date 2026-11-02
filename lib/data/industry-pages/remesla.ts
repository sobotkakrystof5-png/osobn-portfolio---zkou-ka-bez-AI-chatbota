import {
  AlarmClock,
  BadgeCheck,
  ClipboardList,
  Droplets,
  FileCheckCorner,
  Flame,
  Hammer,
  ImagePlus,
  Images,
  KeyRound,
  Layers,
  MapPin,
  Palette,
  PaintRoller,
  PhoneCall,
  Quote,
  Receipt,
  Ruler,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Sprout,
  CalendarClock,
  SunMedium,
  TreePine,
  Wrench,
} from "lucide-react";
import type { IndustryPage } from "./types";

// Řemesla: 11 oborů. Klíčová slova: title = „Webové stránky pro …“,
// H1 = „Web pro …“, popisek = „Tvorba webu pro …“, ať stránka pokryje
// všechny tři běžné tvary dotazu.

const LOCAL_SEO = { label: "Lokální SEO: buďte vidět ve svém okolí", href: "/sluzby/seo-optimalizace/lokalni-seo" };
const AUTOMATION = { label: "Automatizace poptávek a připomínek", href: "/automatizace/automatizace-procesu" };

const WOOD = ["#5c4128", "#7a5634", "#4a3420", "#8b6a45", "#6a4b2e", "#3f2d1c"];
const IRON = ["#3a3632", "#6b3d22", "#2e2c2a", "#8a4f24", "#45403a", "#5a4a3c"];

export const REMESLA: IndustryPage[] = [
  {
    slug: "web-pro-remeslniky",
    name: "Řemeslníci",
    forWhom: "řemeslníky",
    meta: {
      title: "Webové stránky pro řemeslníky od 9 999 Kč",
      description:
        "Tvorba webu pro řemeslníky: galerie realizací, poptávka s fotkou z mobilu a nalezení na Googlu i Seznamu. Promo Page od 9 999 Kč, hotovo do 10 pracovních dní.",
    },
    serviceType: "Tvorba webových stránek pro řemeslníky",
    h1: { lead: "Web pro řemeslníky,", accent: "který prodává vaši práci." },
    intro:
      "Tvoříme webové stránky pro řemeslníky. Zákazník uvidí vaše realizace, pochopí, co děláte, a pošle poptávku dřív, než zavolá konkurenci.",
    scene: {
      variant: "gallery",
      query: "řemeslník rekonstrukce koupelny Kolín",
      brand: "Řemesla Horák",
      headline: "Rekonstrukce a řemeslné práce · Kolín",
      chips: ["Realizace", "Služby", "Poptávka"],
      action: "Chci podobnou realizaci",
      tiles: ["Koupelna", "Schodiště", "Kuchyň", "Terasa", "Podkroví", "Fasáda"],
      tones: ["#4d5560", "#6b4b30", "#5b5248", "#7a5a3a", "#3f4a52", "#857563"],
      notify: { title: "Nová poptávka z webu", text: "Rekonstrukce koupelny · Kolín · fotka přiložena" },
    },
    shifts: [
      { pain: "Dobrá práce se šíří jen ústně.", fix: "Galerie realizací přesvědčí i lidi, kteří vás neznají." },
      { pain: "Zákazník najde jen starý profil v katalogu.", fix: "Vlastní web na Googlu i Seznamu s vašimi službami a lokalitou." },
      { pain: "Poptávky chodí neúplné a ztrácíte čas.", fix: "Formulář se zeptá na rozsah, termín i fotku hned napoprvé." },
    ],
    features: [
      { icon: Images, title: "Galerie realizací", text: "Fotky podle typu práce, rychlé i se stovkami snímků." },
      { icon: ClipboardList, title: "Poptávka s fotkou", text: "Zákazník popíše zakázku a přiloží fotku přímo z mobilu." },
      { icon: Layers, title: "Víc řemesel na jednom webu", text: "Každé řemeslo má vlastní sekci, zákazník hned najde své." },
      { icon: MapPin, title: "Kde působíte", text: "Oblast, kam jezdíte, pomůže zákazníkovi i vyhledávačům." },
      { icon: BadgeCheck, title: "Roky praxe a reference", text: "Zkušenosti a ohlasy zákazníků tam, kde se rozhoduje." },
    ],
    searches: [
      "řemeslník v okolí",
      "rekonstrukce koupelny Kolín",
      "zámečník brány na míru",
      "truhlář kuchyně na míru",
      "malíř pokojů cena",
      "hodinový manžel poptávka",
    ],
    plan: {
      name: "Promo Page",
      reason: "Řemeslníkovi s jedním oborem stačí Promo Page s galerií a poptávkou. Víc řemesel nebo kategorií realizací pokryje Pro Web.",
    },
    project: { slug: "zamecnictvi-mb", fit: "same" },
    faqs: [
      {
        q: "Jak velkou galerii realizací web unese?",
        a: "Klidně stovky fotek rozdělených podle typu zakázky. Obrázky připravíme pro každé zařízení a načítáme postupně, takže web zůstane rychlý i na mobilu.",
      },
      {
        q: "Musím mít profesionální fotky realizací?",
        a: "Ne. Stačí ostré fotky z mobilu při denním světle. Poradíme, co a jak nafotit, a před spuštěním je upravíme.",
      },
      {
        q: "Dělám víc řemesel najednou. Dá se to na jeden web?",
        a: "Ano. Každé řemeslo dostane vlastní sekci nebo podstránku, aby vás zákazník našel podle toho, co zrovna hledá.",
      },
      {
        q: "Pomůže mi web i u zákazníků z okolí?",
        a: "Ano. Základ SEO je v ceně každého webu, nadpisy a texty stavíme na místních dotazech. Když chcete být vidět i v mapách, pomůžeme s lokálním SEO.",
      },
    ],
    related: ["web-pro-zamecniky", "web-pro-truhlare", "web-pro-malire", "web-pro-elektrikare"],
    links: [
      LOCAL_SEO,
      { label: "Jak poznat kvalitní web pro řemeslníka", href: "/blog/jak-poznat-kvalitni-web-pro-remeslnika" },
      AUTOMATION,
    ],
    crafts: [
      { name: "Zámečnictví", text: "Nonstop kontakt a galerie kovovýroby.", anchor: "Web pro zámečníky", href: "/web-pro-zamecniky" },
      { name: "Kovářství", text: "Velké fotky detailů a zakázková výroba.", anchor: "Web pro kováře", href: "/web-pro-kovare" },
      { name: "Řezbářství", text: "Galerie podle stylu a příběh každé práce.", anchor: "Web pro řezbáře", href: "/web-pro-rezbare" },
      { name: "Studnařství", text: "Důvěra tam, kde výsledek není vidět.", anchor: "Web pro studnaře", href: "/web-pro-studnare" },
      { name: "Malířství a natěračství", text: "Fotky před a po jako hlavní argument.", anchor: "Web pro malíře pokojů", href: "/web-pro-malire" },
      { name: "Sanace zdiva", text: "Příčiny vlhkosti a metody srozumitelně.", anchor: "Web pro sanační firmy", href: "/web-pro-sanace" },
      { name: "Truhlářství a tesařství", text: "Kuchyně, nábytek a krovy na míru.", anchor: "Web pro truhláře", href: "/web-pro-truhlare" },
      { name: "Zahradnictví", text: "Proměny zahrad a pravidelná údržba.", anchor: "Web pro zahradníky", href: "/web-pro-zahradniky" },
      { name: "Instalatérství", text: "Havárie na jedno klepnutí.", anchor: "Web pro instalatéry", href: "/web-pro-instalatery" },
      { name: "Elektrikářství", text: "Nonstop kontakt, revize i fotovoltaika.", anchor: "Web pro elektrikáře", href: "/web-pro-elektrikare" },
    ],
  },

  {
    slug: "web-pro-zamecniky",
    name: "Zámečníci",
    forWhom: "zámečníky",
    meta: {
      title: "Webové stránky pro zámečníky od 9 999 Kč",
      description:
        "Web pro zámečnictví s nonstop tlačítkem na odemčení, ceníkem úkonů, galerií kovovýroby a poptávkou z mobilu. Promo Page od 9 999 Kč, hotovo do 10 pracovních dní.",
    },
    serviceType: "Tvorba webových stránek pro zámečníky a zámečnictví",
    h1: { lead: "Web pro zámečníky,", accent: "který otevře dveře zakázkám." },
    intro:
      "Děláme webové stránky pro zámečníky a zámečnictví. Nonstop kontakt pro zabouchnuté dveře, jasný ceník a galerie kovovýroby, která přivede i větší zakázky.",
    scene: {
      variant: "call",
      query: "zámečník nonstop odemčení Praha 4",
      brand: "Zámečnictví Kratochvíl",
      headline: "Nonstop odemykání · Praha 4",
      chips: ["Odemčení", "Výměna zámku", "Kovovýroba"],
      action: "Volat nonstop",
      notify: { title: "Příchozí hovor z webu", text: "Zabouchnuté dveře · Praha 4" },
    },
    shifts: [
      { pain: "Zákazník u zabouchnutých dveří volá prvnímu, koho najde.", fix: "Nonstop tlačítko volání hned nahoře, na mobilu jedním klepnutím." },
      { pain: "Kovovýrobu u vás nikdo nehledá.", fix: "Galerie bran, zábradlí a konstrukcí přivádí větší zakázky." },
      { pain: "Cenu odemčení vysvětlujete do telefonu pořád dokola.", fix: "Orientační ceník úkonů včetně příplatku v noci a o víkendu." },
    ],
    features: [
      { icon: PhoneCall, title: "Nonstop tlačítko volání", text: "Na mobilu stále na očích, i když zákazník scrolluje." },
      { icon: KeyRound, title: "Služby přehledně", text: "Odemčení, výměna vložek, zabezpečení i kovovýroba zvlášť." },
      { icon: Images, title: "Galerie kovovýroby", text: "Brány, ploty a zábradlí podle kategorií." },
      { icon: ShieldCheck, title: "Certifikace a bezpečnost", text: "Certifikované vložky a generální klíč budí důvěru." },
      { icon: Receipt, title: "Orientační ceník", text: "Odemčení, výjezd a příplatky na jednom místě." },
    ],
    searches: [
      "zámečník nonstop",
      "otevření zabouchnutých dveří",
      "výměna zámku cena",
      "zámečnictví Praha 4",
      "kované brány na míru",
      "bezpečnostní vložka montáž",
    ],
    plan: {
      name: "Promo Page",
      reason: "Promo Page s nonstop kontaktem a ceníkem pokryje pohotovost. Když chcete ukázat i kovovýrobu podle kategorií, sáhněte po Pro Webu.",
    },
    project: { slug: "zamecnictvi-mb", fit: "same" },
    faqs: [
      {
        q: "Dá se na web přidat nonstop kontakt na havarijní zásahy?",
        a: "Ano. Tlačítko volání je na mobilu pořád po ruce a u čísla je jasně napsané, kdy jezdíte i v noci.",
      },
      {
        q: "Můžu na webu uvést příplatek za noc a víkend?",
        a: "Ano a doporučujeme to. Zákazník zná podmínky předem a hovor nezačíná dohadováním o ceně.",
      },
      {
        q: "Dá se na web přidat i kovovýroba, nejen zámečnické práce?",
        a: "Ano. Kovovýroba dostane vlastní galerii a poptávku, aby přiváděla větší zakázky než jen odemykání.",
      },
    ],
    related: ["web-pro-kovare", "web-pro-instalatery", "web-pro-elektrikare", "web-pro-remeslniky"],
    links: [LOCAL_SEO],
  },

  {
    slug: "web-pro-kovare",
    name: "Kováři",
    forWhom: "kováře",
    meta: {
      title: "Web pro kováře a kovářství od 9 999 Kč",
      description:
        "Tvorba webu pro kováře a umělecké kovářství: velké fotky detailů, zakázková výroba, restaurování a poptávka s rozměry. Od 9 999 Kč, hotovo do 10 pracovních dní.",
    },
    serviceType: "Tvorba webových stránek pro kováře a umělecké kovářství",
    h1: { lead: "Web pro kováře,", accent: "kde vynikne každý úder kladiva." },
    intro:
      "Stavíme webové stránky pro kováře a umělecká kovářství. Velké fotky ukážou detail práce a poptávka s rozměry přivede zakázky na brány, zábradlí i restaurování.",
    scene: {
      variant: "gallery",
      query: "umělecký kovář brána na míru",
      brand: "Kovárna Šťastný",
      headline: "Umělecké kovářství · Vysočina",
      chips: ["Brány", "Zábradlí", "Restaurování"],
      action: "Poptat na míru",
      tiles: ["Brána", "Zábradlí", "Mříže", "Svícen", "Kování", "Restaurování"],
      tones: IRON,
      notify: { title: "Nová poptávka z webu", text: "Kovaná brána 4 m · návrh podle fotky" },
    },
    shifts: [
      { pain: "Fotky prací vidíte jen vy v mobilu.", fix: "Velkoformátová galerie, kde vynikne každý detail." },
      { pain: "Zákazník neví, že děláte i na zakázku.", fix: "Zakázková výroba jako hlavní nabídka, s ukázkami stylů." },
      { pain: "Poptávka bez rozměrů znamená další tři telefonáty.", fix: "Formulář se zeptá na rozměr a styl a přijme i inspiraci." },
    ],
    features: [
      { icon: Images, title: "Galerie ve vysokém rozlišení", text: "Ostré detaily bez zpomalení webu." },
      { icon: Flame, title: "Proces výroby", text: "Fotky z výhně a dílny ukážou poctivé řemeslo." },
      { icon: Ruler, title: "Poptávka s rozměry", text: "Rozměr, styl a fotka místa v jednom formuláři." },
      { icon: Hammer, title: "Restaurování a opravy", text: "Samostatná nabídka pro památky i starší kování." },
      { icon: Layers, title: "Řazení podle výrobků", text: "Brány, zábradlí, mříže a doplňky zvlášť." },
    ],
    searches: [
      "umělecký kovář",
      "kovaná brána na míru",
      "kované zábradlí cena",
      "kovářství Vysočina",
      "restaurování kovaných prvků",
      "kované mříže do oken",
    ],
    plan: {
      name: "Pro Web",
      reason: "U kovářství prodávají fotky, proto doporučujeme Pro Web s galerií podle výrobků. Na začátek stačí i Promo Page s výběrem nejlepších prací.",
    },
    project: { slug: "schovinox", fit: "related" },
    faqs: [
      {
        q: "Nezpomalí velké fotky web?",
        a: "Ne. Fotky připravíme pro každé zařízení a načítáme je postupně, takže detail vynikne a web zůstane rychlý.",
      },
      {
        q: "Dá se ukázat i proces výroby, ne jen hotový výsledek?",
        a: "Ano. Krátká řada fotek z dílny nebo video z výhně často přesvědčí víc než hotový výrobek.",
      },
      {
        q: "Můžu nabízet i restaurování a opravy?",
        a: "Ano, jako samostatnou službu s vlastní galerií. Pro obce a majitele památek bývá hlavním důvodem poptávky.",
      },
    ],
    related: ["web-pro-zamecniky", "web-pro-rezbare", "web-pro-truhlare", "web-pro-remeslniky"],
    links: [LOCAL_SEO],
  },

  {
    slug: "web-pro-rezbare",
    name: "Řezbáři",
    forWhom: "řezbáře",
    meta: {
      title: "Webové stránky pro řezbáře od 9 999 Kč",
      description:
        "Web pro řezbáře a dřevořezbu: galerie podle stylu a materiálu, příběh každé práce a poptávka podle inspirace zákazníka. Od 9 999 Kč, hotovo do 10 pracovních dní.",
    },
    serviceType: "Tvorba webových stránek pro řezbáře",
    h1: { lead: "Web pro řezbáře,", accent: "kde má každá řezba příběh." },
    intro:
      "Tvoříme webové stránky pro řezbáře, na kterých vynikne ruční práce. Galerie podle stylu, příběhy realizací a poptávka, do které zákazník přiloží svou inspiraci.",
    scene: {
      variant: "gallery",
      query: "řezbář socha ze dřeva na zakázku",
      brand: "Dřevořezba Málek",
      headline: "Sochy a řezby ze dřeva na zakázku",
      chips: ["Sochy", "Reliéfy", "Betlémy"],
      action: "Poptat řezbu",
      tiles: ["Socha", "Reliéf", "Betlém", "Lavice", "Erb", "Totem"],
      tones: WOOD,
      notify: { title: "Nová poptávka z webu", text: "Socha sv. Floriána · lípa · 120 cm" },
    },
    shifts: [
      { pain: "Zákazník nepozná ruční řezbu od strojní výroby.", fix: "Detaily a příběh práce ukážou ruční řemeslo." },
      { pain: "Fotky prací jsou rozházené po sociálních sítích.", fix: "Galerie podle stylu a materiálu na jednom místě." },
      { pain: "Zákazník neumí popsat, co chce.", fix: "Poptávka, do které přiloží fotku nebo skicu inspirace." },
    ],
    features: [
      { icon: Images, title: "Galerie podle stylu", text: "Sochy, reliéfy, betlémy i nábytek zvlášť." },
      { icon: Quote, title: "Příběh každé práce", text: "Krátký popis, materiál a doba výroby u fotky." },
      { icon: TreePine, title: "Materiály a technika", text: "Lípa, dub nebo ořech a proč který." },
      { icon: ImagePlus, title: "Poptávka podle inspirace", text: "Zákazník přiloží fotku nebo skicu." },
      { icon: Hammer, title: "Opravy a restaurování", text: "Samostatná nabídka pro starší řezby." },
    ],
    searches: [
      "řezbář na zakázku",
      "dřevěná socha na zakázku",
      "dřevořezba cena",
      "betlém ze dřeva ruční práce",
      "vyřezávaný erb ze dřeva",
      "restaurování dřevěných soch",
    ],
    plan: {
      name: "Promo Page",
      reason: "Řezbáři obvykle stačí Promo Page s galerií vybraných prací a poptávkou. S desítkami realizací v různých stylech se vyplatí Pro Web.",
    },
    project: { slug: "zamecnictvi-mb", fit: "related" },
    faqs: [
      {
        q: "Dá se ke každé fotce přidat popis, materiál nebo doba práce?",
        a: "Ano. Krátký popis u fotky prodává víc než samotný obrázek a pomáhá i vyhledávačům.",
      },
      {
        q: "Jak velkou galerii web unese?",
        a: "I desítky realizací. Galerii rozdělíme podle stylu nebo materiálu, ať se v ní zákazník neztratí.",
      },
      {
        q: "Můžu nabízet i opravy a restaurování starších řezeb?",
        a: "Ano, jako samostatnou službu s ukázkami před a po.",
      },
    ],
    related: ["web-pro-kovare", "web-pro-truhlare", "web-pro-remeslniky", "web-pro-fotografy"],
  },

  {
    slug: "web-pro-studnare",
    name: "Studnaři",
    forWhom: "studnaře",
    meta: {
      title: "Web pro studnaře a studnařství od 9 999 Kč",
      description:
        "Tvorba webu pro studnaře: typy studní a povolení srozumitelně, oblast působnosti, reference a poptávka s lokalitou pozemku. Od 9 999 Kč, hotovo do 10 pracovních dní.",
    },
    serviceType: "Tvorba webových stránek pro studnaře a studnařské firmy",
    h1: { lead: "Web pro studnaře,", accent: "který ukáže práci pod zemí." },
    intro:
      "Tvoříme webové stránky pro studnaře a studnařské firmy. Srozumitelně vysvětlí typy studní a povolení, ukážou reference a zákazník pošle poptávku rovnou s lokalitou.",
    scene: {
      variant: "form",
      query: "kopaná studna cena Středočeský kraj",
      brand: "Studny Vondráček",
      headline: "Kopané a vrtané studny · celá ČR",
      chips: ["Kopané studny", "Vrty", "Čištění"],
      action: "Odeslat poptávku",
      fields: [
        { label: "Typ studny", value: "Kopaná" },
        { label: "Lokalita", value: "Benešov" },
        { label: "Pozemek", value: "Rodinný dům" },
      ],
      notify: { title: "Nová poptávka z webu", text: "Kopaná studna · Benešov · rodinný dům" },
    },
    shifts: [
      { pain: "Výsledek práce je pod zemí a nejde vyfotit.", fix: "Postup, reference a roky praxe nahradí fotky hotové práce." },
      { pain: "Zákazník neví, jestli chce kopanou, nebo vrtanou studnu.", fix: "Srozumitelné srovnání typů studní a povolení." },
      { pain: "Voláte zpátky kvůli adrese a typu pozemku.", fix: "Poptávka rovnou s lokalitou a typem studny." },
    ],
    features: [
      { icon: MapPin, title: "Oblast působnosti", text: "Kraje a okresy, kam jezdíte, přehledně na mapě." },
      { icon: Droplets, title: "Typy studní", text: "Kopaná, vrtaná, čištění a servis jednoduchým jazykem." },
      { icon: FileCheckCorner, title: "Povolení a dokumenty", text: "Co za zákazníka vyřídíte u vodoprávního úřadu." },
      { icon: BadgeCheck, title: "Reference a praxe", text: "Roky zkušeností a ohlasy na první pohled." },
      { icon: ClipboardList, title: "Poptávka s lokalitou", text: "Adresa, typ pozemku a stávající zdroj vody." },
    ],
    searches: [
      "kopaná studna cena",
      "vrtaná studna cena za metr",
      "studnař Benešov",
      "čištění studny",
      "vyhledání pramene vody",
      "povolení na studnu",
    ],
    plan: {
      name: "Promo Page",
      reason: "Studnaři stačí Promo Page s přehledem služeb, postupem a poptávkou. Víc služeb a regionů s vlastními podstránkami pokryje Pro Web.",
    },
    project: { slug: "studnarstvi-petran", fit: "same" },
    faqs: [
      {
        q: "Jak ukázat důvěryhodnost, když výsledek práce není vidět?",
        a: "Postupem krok za krokem, roky praxe, fotkami z realizace a ohlasy zákazníků. Přesně tak jsme to řešili u webu Studnářství Petráň.",
      },
      {
        q: "Dá se na web přidat mapa oblasti, kam jezdíte?",
        a: "Ano. Pomůže zákazníkovi i lokálnímu hledání ve vyhledávačích.",
      },
      {
        q: "Jak vysvětlit odborný postup, aby to neznělo jako reklama?",
        a: "Krátce a věcně: co zjistíte na místě, jak dlouho práce trvá a co zákazník dostane na konci. Texty připravíme spolu s vámi.",
      },
    ],
    related: ["web-pro-sanace", "web-pro-zahradniky", "web-pro-instalatery", "web-pro-remeslniky"],
    links: [LOCAL_SEO],
  },

  {
    slug: "web-pro-malire",
    name: "Malíři pokojů",
    forWhom: "malíře pokojů",
    meta: {
      title: "Webové stránky pro malíře pokojů od 9 999 Kč",
      description:
        "Tvorba webu pro malíře a natěrače: fotky před a po, přehled prací a poptávka s fotkou místnosti. Promo Page od 9 999 Kč, hotovo do 10 pracovních dní.",
    },
    serviceType: "Tvorba webových stránek pro malíře a natěrače",
    h1: { lead: "Web pro malíře pokojů,", accent: "kde mluví fotky před a po." },
    intro:
      "Stavíme webové stránky pro malíře a natěrače, na kterých rozdíl před a po prodává sám. Zákazník pošle poptávku s fotkou místnosti a vy rovnou odhadnete rozsah.",
    scene: {
      variant: "beforeAfter",
      query: "malíř pokojů Litoměřice cena",
      brand: "Malířství Beneš",
      headline: "Malování a nátěry · Litoměřice",
      chips: ["Malování", "Nátěry", "Stěrky"],
      action: "Poptat malování",
      tones: ["#4a4238", "#e6ddd0"],
      notify: { title: "Nová poptávka z webu", text: "Malování bytu 3+1 · 4 místnosti · fotky" },
    },
    shifts: [
      { pain: "Zákazník nevidí rozdíl mezi vámi a levnou partou.", fix: "Fotky před a po vedle sebe ukážou kvalitu práce." },
      { pain: "Cenu odhadujete naslepo do telefonu.", fix: "Poptávka s fotkou místnosti a přibližnou plochou." },
      { pain: "Nevíte, jestli jde o malování, nebo celé povrchy.", fix: "Formulář rozliší malování, nátěry, stěrky i opravy." },
    ],
    features: [
      { icon: Images, title: "Před a po", text: "Posuvné srovnání, které zákazník pochopí za vteřinu." },
      { icon: PaintRoller, title: "Přehled prací", text: "Malování, nátěry, stěrky a tapetování zvlášť." },
      { icon: Palette, title: "Barvy a materiály", text: "S jakými barvami pracujete a proč vydrží." },
      { icon: ImagePlus, title: "Poptávka s fotkou", text: "Fotka místnosti a plocha rovnou ve formuláři." },
      { icon: Sparkles, title: "Příprava a úklid", text: "Co zakryjete, co musí zákazník vyklidit a jak uklidíte." },
    ],
    searches: [
      "malíř pokojů Litoměřice",
      "malování bytu cena za m2",
      "natěrač oken a dveří",
      "malíř a natěrač v okolí",
      "stěrkování stěn cena",
      "malování panelového bytu",
    ],
    plan: {
      name: "Promo Page",
      reason: "Malíři obvykle stačí Promo Page s galerií před a po a poptávkou s fotkou. Víc služeb nebo měst s vlastními podstránkami pokryje Pro Web.",
    },
    project: { slug: "malirske-prace-litomerice", fit: "same" },
    faqs: [
      {
        q: "Kolik fotek před a po potřebuju na spuštění?",
        a: "Stačí tři až pět dobrých dvojic. Poradíme, jak fotit ze stejného místa, aby srovnání vyniklo.",
      },
      {
        q: "Dá se formulář přizpůsobit typu práce?",
        a: "Ano. Zákazník vybere malování, nátěr nebo stěrky, přidá plochu a fotku a vy rovnou víte, s čím počítat.",
      },
      {
        q: "Můžu na webu vysvětlit, jak to chodí s vyklízením a úklidem?",
        a: "Ano a doporučujeme to. Krátká sekce o přípravě ušetří desítky stejných dotazů po telefonu.",
      },
    ],
    related: ["web-pro-sanace", "web-pro-truhlare", "web-pro-zahradniky", "web-pro-remeslniky"],
    links: [LOCAL_SEO],
  },

  {
    slug: "web-pro-sanace",
    name: "Sanační firmy",
    forWhom: "sanační firmy",
    meta: {
      title: "Webové stránky pro sanační firmy od 9 999 Kč",
      description:
        "Tvorba webu pro sanaci vlhkého zdiva: příčiny vlhkosti srozumitelně, metody sanace, fotky před a po a poptávka s fotkou zdiva. Od 9 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro sanační firmy",
    h1: { lead: "Web pro sanační firmy,", accent: "který vysvětlí, proč zeď vlhne." },
    intro:
      "Tvoříme webové stránky pro firmy, které sanují vlhké zdivo. Zákazník pochopí příčinu problému, uvidí výsledky před a po a pošle poptávku rovnou s fotkou zdi.",
    scene: {
      variant: "beforeAfter",
      query: "sanace vlhkého zdiva cena",
      brand: "Sanace Dolejš",
      headline: "Sanace vlhkého zdiva · Plzeňsko",
      chips: ["Podřezání", "Injektáž", "Omítky"],
      action: "Poslat fotku zdiva",
      tones: ["#3d362c", "#d6ccbb"],
      notify: { title: "Nová poptávka z webu", text: "Vlhký sklep · dům z roku 1932 · 3 fotky" },
    },
    shifts: [
      { pain: "Zákazník si myslí, že stačí přemalovat.", fix: "Srozumitelné vysvětlení, odkud vlhkost jde a proč se vrací." },
      { pain: "Metody sanace zní jako cizí jazyk.", fix: "Podřezání, injektáž a omítky jednoduše a s obrázky." },
      { pain: "Bez fotky zdiva nejde nic odhadnout.", fix: "Poptávka s fotkami a stářím domu rovnou z mobilu." },
    ],
    features: [
      { icon: Droplets, title: "Poznejte příčinu vlhkosti", text: "Vzlínající, kondenzační a zatékající vlhkost podle příznaků." },
      { icon: Layers, title: "Metody sanace", text: "Kdy podřezat, kdy injektovat a kdy stačí sanační omítka." },
      { icon: Images, title: "Před a po", text: "Výsledky na fotkách přesvědčí víc než popis." },
      { icon: ClipboardList, title: "Poptávka s fotkou zdiva", text: "Fotky, stáří domu a rozsah problému v jednom formuláři." },
      { icon: ShieldCheck, title: "Postup a záruka", text: "Co zákazník dostane, jak dlouho to trvá a jakou záruku dáváte." },
    ],
    searches: [
      "sanace vlhkého zdiva",
      "vlhké zdivo ve sklepě",
      "podřezání zdiva cena",
      "chemická injektáž zdiva",
      "sanační omítka",
      "odvlhčení starého domu",
    ],
    plan: {
      name: "Pro Web",
      reason: "Každá metoda sanace má své vlastní dotazy ve vyhledávačích. Pro Web jí dá vlastní podstránku, která vám přivede zákazníky.",
    },
    project: { slug: "studnarstvi-petran", fit: "related" },
    faqs: [
      {
        q: "Zvládne web vysvětlit i technicky náročný postup?",
        a: "Ano. Postup rozložíme do pár kroků s obrázky. Zákazník mu porozumí a odbornost zůstane zachovaná.",
      },
      {
        q: "Dá se na web přidat průvodce „poznejte příčinu vlhkosti“?",
        a: "Ano. Krátký průvodce podle příznaků přivede i lidi, kteří zatím jen hledají, co se děje s jejich zdí.",
      },
      {
        q: "Jak ukázat výsledek, když zdivo vysychá měsíce?",
        a: "Fotkami před, během a po a měřením vlhkosti v čase. Na webu to ukážeme jako jednoduchou časovou osu.",
      },
    ],
    related: ["web-pro-studnare", "web-pro-malire", "web-pro-instalatery", "web-pro-remeslniky"],
    links: [LOCAL_SEO, { label: "Obsahové SEO: články, které přivádí zákazníky", href: "/sluzby/seo-optimalizace/obsahove-seo" }],
  },

  {
    slug: "web-pro-truhlare",
    name: "Truhláři a tesaři",
    forWhom: "truhláře a tesaře",
    meta: {
      title: "Web pro truhláře a tesaře od 9 999 Kč",
      description:
        "Tvorba webu pro truhlářství a tesařství: galerie kuchyní a nábytku na míru, materiály a poptávka s fotkou a rozměry prostoru. Od 9 999 Kč, hotovo do 10 dní.",
    },
    serviceType: "Tvorba webových stránek pro truhláře a tesaře",
    h1: { lead: "Web pro truhláře a tesaře,", accent: "kde vynikne poctivé dřevo." },
    intro:
      "Stavíme webové stránky pro truhláře a tesaře. Galerie kuchyní, nábytku a krovů prodává za vás a zákazník pošle poptávku s fotkou i rozměry prostoru.",
    scene: {
      variant: "gallery",
      query: "truhlář kuchyně na míru Olomouc",
      brand: "Truhlářství Pospíšil",
      headline: "Kuchyně a nábytek na míru · Olomouc",
      chips: ["Kuchyně", "Vestavěné skříně", "Krovy"],
      action: "Poptat kuchyň",
      tiles: ["Kuchyň", "Šatna", "Schody", "Pergola", "Stůl", "Krov"],
      tones: WOOD,
      notify: { title: "Nová poptávka z webu", text: "Kuchyň na míru · 3,2 m · fotka a rozměry" },
    },
    shifts: [
      { pain: "Zákazník srovnává vaši kuchyň s hotovou z katalogu.", fix: "Detaily spojů a materiálů ukážou, proč stojí za víc." },
      { pain: "Realizace máte jen v telefonu.", fix: "Galerie podle typu zakázky: kuchyně, skříně, schody, krovy." },
      { pain: "Bez rozměrů a fotky nejde nic nacenit.", fix: "Poptávka s rozměry, fotkou prostoru i inspirací." },
    ],
    features: [
      { icon: Images, title: "Galerie podle zakázek", text: "Kuchyně, skříně, schody a krovy zvlášť." },
      { icon: Ruler, title: "Poptávka s rozměry", text: "Rozměry, fotka prostoru a inspirace v jednom kroku." },
      { icon: TreePine, title: "Materiály a povrchy", text: "Masiv, dýha, lamino, olej nebo lak srozumitelně." },
      { icon: ScanSearch, title: "Detail zpracování", text: "Spoje a hrany zblízka, kde je vidět kvalita." },
      { icon: ShieldCheck, title: "Termíny a záruka", text: "Jak dlouho trvá výroba a jakou dáváte záruku." },
    ],
    searches: [
      "truhlář kuchyně na míru",
      "vestavěné skříně na míru",
      "truhlářství Olomouc",
      "dřevěné schody na míru",
      "tesař krov cena",
      "nábytek z masivu na zakázku",
    ],
    plan: {
      name: "Pro Web",
      reason: "Truhláři a tesaři mají víc typů zakázek, proto doporučujeme Pro Web s podstránkou pro každý. S jedním hlavním produktem stačí Promo Page.",
    },
    project: { slug: "zamecnictvi-mb", fit: "related" },
    faqs: [
      {
        q: "Musím mít profesionální fotky realizací?",
        a: "Ne. Ostré fotky z mobilu při denním světle stačí. Poradíme, jak fotit detaily, ve kterých je vidět kvalita.",
      },
      {
        q: "Dá se poptávkový formulář přizpůsobit typu zakázky?",
        a: "Ano. U kuchyně se zeptá na rozměry a spotřebiče, u krovu na typ střechy a rozměr stavby.",
      },
      {
        q: "Jak často mám galerii doplňovat?",
        a: "Stačí pár nových realizací za čtvrtletí. Aktuální galerie působí živě a pomáhá i ve vyhledávačích.",
      },
    ],
    related: ["web-pro-kovare", "web-pro-rezbare", "web-pro-malire", "web-pro-remeslniky"],
    links: [LOCAL_SEO],
  },

  {
    slug: "web-pro-zahradniky",
    name: "Zahradníci",
    forWhom: "zahradníky",
    meta: {
      title: "Webové stránky pro zahradníky od 9 999 Kč",
      description:
        "Tvorba webu pro zahradníky a zahradní firmy: proměny zahrad před a po, služby podle sezóny, pravidelná údržba a poptávka s adresou pozemku. Od 9 999 Kč.",
    },
    serviceType: "Tvorba webových stránek pro zahradníky a zahradní firmy",
    h1: { lead: "Web pro zahradníky,", accent: "který kvete celý rok." },
    intro:
      "Tvoříme webové stránky pro zahradníky a zahradní firmy. Proměny zahrad před a po, služby podle sezóny a pravidelná údržba, která vám drží práci i v zimě.",
    scene: {
      variant: "beforeAfter",
      query: "zahradník úprava zahrady Brno",
      brand: "Zahrady Černý",
      headline: "Zakládání a údržba zahrad · Brno",
      chips: ["Realizace", "Údržba", "Závlahy"],
      action: "Poptat úpravu",
      tones: ["#4a4232", "#4f7a3a"],
      notify: { title: "Nová poptávka z webu", text: "Údržba zahrady 800 m² · Brno-Žabovřesky" },
    },
    shifts: [
      { pain: "Na jaře nestíháte, v zimě nemáte co dělat.", fix: "Služby podle sezóny a pravidelná údržba na celý rok." },
      { pain: "Zákazník si proměnu zahrady neumí představit.", fix: "Fotky před a po, které prodají celou realizaci." },
      { pain: "Nacenit zahradu bez prohlídky je loterie.", fix: "Poptávka s adresou, plochou a fotkami pozemku." },
    ],
    features: [
      { icon: Images, title: "Proměny před a po", text: "Posuvné srovnání u každé realizace." },
      { icon: Sprout, title: "Služby podle sezóny", text: "Na jaře výsadba, na podzim úklid, v zimě řez." },
      { icon: CalendarClock, title: "Pravidelná údržba", text: "Samostatná nabídka sekání a péče na celou sezónu." },
      { icon: MapPin, title: "Poptávka s pozemkem", text: "Adresa, plocha a fotky zahrady rovnou ve formuláři." },
      { icon: Droplets, title: "Závlahy a trávníky", text: "Specializace jako samostatné služby s vlastními fotkami." },
    ],
    searches: [
      "zahradník Brno",
      "údržba zahrady cena",
      "založení trávníku cena za m2",
      "zahradní architekt",
      "automatická závlaha montáž",
      "řez ovocných stromů",
    ],
    plan: {
      name: "Promo Page",
      reason: "Zahradníkovi stačí Promo Page s proměnami a nabídkou údržby. Víc specializací, třeba závlahy nebo jezírka, pokryje Pro Web.",
    },
    project: { slug: "studnarstvi-petran", fit: "related" },
    faqs: [
      {
        q: "Dá se web přizpůsobit sezónnosti?",
        a: "Ano. Na jaře dáme dopředu výsadbu a trávníky, na podzim úklid a řez. Úprava zabere pár minut.",
      },
      {
        q: "Můžu nabízet pravidelnou údržbu vedle jednorázových realizací?",
        a: "Ano a doporučujeme to. Údržba jako samostatná služba přináší stálé zákazníky a práci i mimo hlavní sezónu.",
      },
      {
        q: "Jak často doplňovat galerii?",
        a: "Ideálně po každé větší realizaci. Stačí pár fotek před a po ze stejného místa.",
      },
    ],
    related: ["web-pro-studnare", "web-pro-truhlare", "web-pro-malire", "web-pro-remeslniky"],
    links: [LOCAL_SEO],
  },

  {
    slug: "web-pro-instalatery",
    name: "Instalatéři",
    forWhom: "instalatéry",
    meta: {
      title: "Webové stránky pro instalatéry od 9 999 Kč",
      description:
        "Tvorba webu pro instalatéry a topenáře: nonstop tlačítko na havárie, přehled specializací, oprávnění na plyn a rychlá poptávka. Od 9 999 Kč, hotovo do 10 dní.",
    },
    serviceType: "Tvorba webových stránek pro instalatéry a topenáře",
    h1: { lead: "Web pro instalatéry,", accent: "kterému neuteče žádná havárie." },
    intro:
      "Děláme webové stránky pro instalatéry, topenáře a plynaře. Zákazník s prasklou trubkou zavolá jedním klepnutím a ten, kdo plánuje koupelnu, pošle poptávku s fotkou.",
    scene: {
      variant: "call",
      query: "instalatér nonstop Ostrava",
      brand: "Instalatérství Navrátil",
      headline: "Voda, topení, plyn · Ostrava",
      chips: ["Havárie", "Kotle", "Koupelny"],
      action: "Volat nonstop",
      notify: { title: "Příchozí hovor z webu", text: "Prasklé potrubí · Ostrava-Poruba" },
    },
    shifts: [
      { pain: "Zákazník s prasklou trubkou nehledá, volá prvnímu.", fix: "Nonstop tlačítko volání je na mobilu pořád po ruce." },
      { pain: "Neví, jestli děláte i plyn a kotle.", fix: "Specializace přehledně: voda, topení, plyn, koupelny." },
      { pain: "Poptávka bez adresy a fotky znamená další hovor.", fix: "Formulář s adresou, naléhavostí a fotkou problému." },
    ],
    features: [
      { icon: PhoneCall, title: "Nonstop havarijní linka", text: "Číslo i tlačítko volání na každé obrazovce." },
      { icon: Wrench, title: "Přehled specializací", text: "Voda, topení, plyn a koupelny pěkně zvlášť." },
      { icon: Flame, title: "Oprávnění na plyn", text: "Revize a oprávnění na očích, kde budují důvěru." },
      { icon: AlarmClock, title: "Naléhavost poptávky", text: "Zákazník označí havárii, nebo plánovanou práci." },
      { icon: Receipt, title: "Ceník běžných úkonů", text: "Výměna baterie, bojleru nebo čištění odpadu." },
    ],
    searches: [
      "instalatér nonstop",
      "instalatér Ostrava",
      "havárie vody v bytě",
      "výměna bojleru cena",
      "servis plynového kotle",
      "rekonstrukce koupelny cena",
    ],
    plan: {
      name: "Promo Page",
      reason: "Promo Page s nonstop kontaktem a službami pokryje většinu instalatérů. Topenáři a firmy s víc obory využijí Pro Web s podstránkou pro každou službu.",
    },
    project: { slug: "zamecnictvi-mb", fit: "related" },
    faqs: [
      {
        q: "Dá se na web přidat nonstop pohotovostní linka?",
        a: "Ano. Tlačítko volání je na mobilu pořád po ruce a u čísla je jasně napsané, kdy jezdíte i mimo pracovní dobu.",
      },
      {
        q: "Mám oprávnění na plyn. Jak ho na webu ukázat?",
        a: "Přímo u služeb s plynem, krátce a věcně. Pro zákazníka je to důkaz odbornosti, který jinak nevidí.",
      },
      {
        q: "Dá se do formuláře přidat adresa a naléhavost?",
        a: "Ano. Hned poznáte, co řešit dnes a co počká na příští týden.",
      },
    ],
    related: ["web-pro-elektrikare", "web-pro-zamecniky", "web-pro-autoservisy", "web-pro-remeslniky"],
    links: [LOCAL_SEO],
  },

  {
    slug: "web-pro-elektrikare",
    name: "Elektrikáři",
    forWhom: "elektrikáře",
    meta: {
      title: "Webové stránky pro elektrikáře od 9 999 Kč",
      description:
        "Tvorba webu pro elektrikáře: nonstop kontakt na havárie, objednávka revize, oprávnění na očích a fotovoltaika. Promo Page od 9 999 Kč, hotovo do 10 pracovních dní.",
    },
    serviceType: "Tvorba webových stránek pro elektrikáře",
    h1: { lead: "Web pro elektrikáře,", accent: "na který se dovolá i ve tmě." },
    intro:
      "Tvoříme webové stránky pro elektrikáře. Kdo má výpadek proudu, zavolá jedním klepnutím. Kdo potřebuje revizi nebo fotovoltaiku, pošle poptávku i v noci.",
    scene: {
      variant: "call",
      query: "elektrikář nonstop Brno",
      brand: "Elektro Dvořák",
      headline: "Elektroinstalace a revize · Brno",
      chips: ["Havárie", "Revize", "Fotovoltaika"],
      action: "Volat nonstop",
      notify: { title: "Příchozí hovor z webu", text: "Výpadek proudu · Brno-Líšeň" },
    },
    shifts: [
      { pain: "Při výpadku proudu zákazník volá prvnímu, koho najde.", fix: "Nonstop tlačítko volání, které na mobilu nikdy nezmizí." },
      { pain: "Revize a fotovoltaika se ztratí v jedné větě.", fix: "Každá služba má své místo a vlastní poptávku." },
      { pain: "Kvalitu elektroinstalace zákazník pohledem nepozná.", fix: "Oprávnění, certifikace a reference tam, kde se rozhoduje." },
    ],
    features: [
      { icon: PhoneCall, title: "Nonstop kontakt na havárie", text: "Tlačítko volání vždy na očích, i v noci." },
      { icon: FileCheckCorner, title: "Objednávka revize", text: "Typ nemovitosti a termín, do kdy je zpráva potřeba." },
      { icon: SunMedium, title: "Fotovoltaika a wallboxy", text: "Samostatná nabídka pro větší zakázky." },
      { icon: ShieldCheck, title: "Oprávnění na očích", text: "Odborná způsobilost a certifikace budí důvěru." },
      { icon: AlarmClock, title: "Urgentní, nebo plánované", text: "Hned poznáte, co hoří a co počká." },
    ],
    searches: [
      "elektrikář nonstop",
      "elektrikář Brno",
      "revize elektroinstalace cena",
      "revize elektro před prodejem bytu",
      "montáž fotovoltaiky",
      "výměna jističe",
    ],
    plan: {
      name: "Promo Page",
      reason: "Elektrikáři obvykle stačí Promo Page s nonstop kontaktem a službami. Když nabízíte zvlášť revize, instalace a fotovoltaiku, vyplatí se Pro Web s podstránkami.",
    },
    project: { slug: "zamecnictvi-mb", fit: "related" },
    faqs: [
      {
        q: "Dá se na web přidat objednávka revize?",
        a: "Ano. Zákazník vybere typ nemovitosti a termín, do kdy revizní zprávu potřebuje, a vy rovnou víte, jak zakázku naplánovat.",
      },
      {
        q: "Můžu na webu uvést ceník běžných revizí?",
        a: "Ano. Orientační ceník ušetří spoustu telefonátů „kolik to bude stát“ a poptávky chodí s reálnou představou.",
      },
      {
        q: "Jak na webu ukázat oprávnění a odbornou způsobilost?",
        a: "Krátce u služeb a v sekci o vás, ideálně s číslem osvědčení. U elektra nahrazuje fotku hotové práce.",
      },
    ],
    related: ["web-pro-instalatery", "web-pro-zamecniky", "web-pro-autoservisy", "web-pro-remeslniky"],
    links: [LOCAL_SEO],
  },
];
