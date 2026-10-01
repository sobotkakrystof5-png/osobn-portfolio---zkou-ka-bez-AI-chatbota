// Jediný zdroj pravdy pro 4 podstránky /automatizace/[slug] (port z alteno,
// lib/services.ts). Když se obsah služeb mění, mění se tady, ne v komponentě.
// Navbar (S6) z tohohle pole generuje názvy a pořadí položek dropdownu
// Automatizace, takže pořadí v poli je zároveň pořadí v menu.
//
// TYP ZÁMĚRNĚ NEMÁ POLE PRO CENU a nikdy ho mít nebude. Podstránky
// neuvádějí žádnou částku ani rozmezí; cenu řeší odkaz na /cena-tvorby-webu.
// Tvar dat to má vynucovat, ne až kontrola v code review.
//
// Ze stejného důvodu tu není ani `href` služby. Cíl odkazu je šablona
// v komponentě (`/automatizace/${slug}`), ne pole v datech, aby do něj nešlo
// propašovat odkaz jinam. Jediné odkazy v datech jsou oborové stránky
// VIZEON v `relatedIndustries` (stejný tvar jako v lib/data/automation.tsx).
//
// ROZSAH TEXTŮ: příklady využití se píšou jako modelová situace, nikdy jako
// reference. Žádné jméno firmy, žádná úspora v hodinách ani procentech,
// žádný počet zpracovaných dokladů. Přesvědčuje popsaný mechanismus, ne
// slíbený výsledek. Texty jsou převzaté z alteno.cz (sesterská značka
// téhož člověka), upravené jen o pomlčky jako spojky.
//
// ROZDÍLY PROTI PŘEDLOZE: slug `automatizace` je tu `automatizace-procesu`
// (shodně s `AutomationServiceId` v lib/data/automation.tsx) a jmenuje se
// „Automatizace procesů", aby se v menu odlišil od celé sekce. Pole
// `relatedArea` (alteno „oblasti") vypadlo, VIZEON oblasti nemá.
import type { DemoIcon } from "@/lib/data/automation-demos";

/** Klíč ilustrace přínosu. Řetězec, ne komponenta: data nesmí táhnout JSX. */
export type BenefitArt =
  | "agenda-bezi-dal"
  | "vase-pravidla"
  | "rust-bez-nabirani"
  | "dohledatelnost"
  | "zmena-pravidla"
  | "bez-prepisovani"
  | "odpoved-driv"
  | "nesrovnalost-hned"
  | "pravidelne-rozesilky"
  | "spravny-nastroj"
  | "odezva-mimo-dobu"
  | "hovory-pro-cloveka"
  | "bez-cekani"
  | "zaznam-hovoru"
  | "telefon-jako-email"
  | "odpoved-v-noci"
  | "dotazy-pro-cloveka"
  | "z-vasich-podkladu"
  | "rozsahla-dokumentace"
  | "zmena-podkladu";

/** Klíč ilustrace bolesti („Co vás dnes zdržuje"). */
export type PainArt =
  | "zaseknuty-scenar"
  | "prace-pribyva"
  | "novy-kolega"
  | "znalosti-v-hlavach"
  | "rucni-prepis"
  | "pozdni-odpoved"
  | "lezi-ve-schrance"
  | "newsletter-nezbyde"
  | "telefon-bez-odezvy"
  | "stejne-dotazy"
  | "cekani-na-termin"
  | "zajemce-jinam"
  | "stejne-otazky"
  | "vikend-ceka"
  | "schovana-odpoved"
  | "chatbot-z-krabice";

export type Service = {
  slug: string;
  title: string;
  /** Jedna věta na kartě homepage. Zůstává co nejkratší, je to trailer. */
  summary: string;
  /** <title> podstránky. Míří na reálný vyhledávací dotaz, ne na název karty. */
  seoTitle: string;
  /** Podnadpis pod H1 a zároveň meta description. Proto do ~155 znaků. */
  lead: string;
  /**
   * "Co vás dnes zdržuje". Situace před automatizací, jazykem klienta.
   * `art` je klíč vlastní ilustrace v components/automation/PainArtwork.tsx.
   * Každá bolest má scénu, ze které je problém jasný na první pohled.
   */
  pain: { text: string; art: PainArt }[];
  /** "Jak to funguje". Kroky toku, ne vlastnosti produktu. */
  how: { title: string; text: string }[];
  /**
   * "Kde se to nejvíc vyplatí". Modelové situace, viz pravidlo výše.
   * `glyph` je znak uprostřed grafického pásu karty
   * (components/automation/UseCaseArtwork.tsx). Volitelný: příklad bez něj
   * dostane obecnou jiskru.
   */
  useCases: { title: string; text: string; glyph?: DemoIcon }[];
  /**
   * "Co získáte". Kvalitativní přínos, nikdy vyčíslený. `art` je klíč
   * vlastní ilustrace v components/automation/BenefitArtwork.tsx: každý
   * přínos má scénu kreslenou přímo k tomu, co věta tvrdí, proto klíč
   * a ne sdílený glyf. Obrázek nesmí slibovat víc než text: žádné číslo,
   * žádný graf s hodnotou. Přesně 5 položek, bento na podstránce je na
   * pět rozvržené natvrdo.
   */
  benefits: { text: string; art: BenefitArt }[];
  /**
   * „Pro koho to dává smysl". `relatedIndustries` jsou oborové stránky
   * VIZEON jako odkazové čipy; prázdné pole = panel zobrazí jen text.
   * Alteno obory bez protějšku ve VIZEON (e-shopy, výrobní firmy) vypadly.
   */
  whoItsFor: { text: string; relatedIndustries: { label: string; href: string }[] };
  /**
   * „Co s tím propojím". `tools` jsou jen NEODKAZOVANÉ štítky názvů
   * nástrojů, vytažené z `text` (VIZEON nemá stránky /nastroje).
   */
  whatWeConnect: { text: string; tools: string[] };
  /** Mini FAQ specifické pro danou službu, 2 až 3 otázky. Feeduje FAQPage JSON-LD podstránky, text musí sedět 1:1 s viditelným. */
  miniFaq: { q: string; a: string }[];
  /**
   * Služba existuje jako směr, ne jako hotová nabídka (dnes jen
   * "voice-agenti"). Karta na hubu i podstránka to musí viditelně přiznat
   * štítkem „Připravuji" a scéna mluví v budoucím čase. Obchodní tvrzení
   * majitele, nevypínat. Nepřítomnost pole znamená běžnou, hotovou službu.
   */
  comingSoon?: boolean;
};

// Pořadí = pořadí v menu i na hubu. Počet služeb (4) nese rozvržení mřížky
// karet na hubu /automatizace.
export const automationPages: Service[] = [
  {
    slug: "ai-agenti",
    title: "AI agenti na míru",
    summary:
      "Zastane celou agendu, ne jeden krok. Rozhoduje podle vašich dat a pravidel.",
    seoTitle: "AI agenti na míru pro firmy",
    lead: "Agent, který zná váš provoz, drží se vašich pravidel a běžný případ dotáhne do konce sám. Ptá se jen tam, kde se má ptát.",
    pain: [
      {
        text: "Pevný scénář zvládne rutinu, ale u prvního nestandardního případu se zastaví a čeká na člověka.",
        art: "zaseknuty-scenar",
      },
      {
        text: "Práce přibývá rychleji než lidé. Nabrat někoho kvůli jedné agendě se nevyplatí, nechat ji ležet taky ne.",
        art: "prace-pribyva",
      },
      {
        text: "Nový kolega se měsíce učí, jak se u vás věci dělají, a mezitím se ptá ostatních.",
        art: "novy-kolega",
      },
      {
        text: "To, co firma umí, je v hlavách lidí a ve staré komunikaci. Žádný systém z toho nic nevyčte.",
        art: "znalosti-v-hlavach",
      },
    ],
    how: [
      {
        title: "Napojení na vaše data",
        text: "Agent dostane přístup k tomu, z čeho firma reálně žije. Evidence zákazníků, doklady, historie komunikace, interní postupy. Odpovídá a rozhoduje z toho, ne z obecných znalostí posbíraných po internetu.",
      },
      {
        title: "Pravidla a mantinely",
        text: "Společně sepíšeme, co smí rozhodnout sám a kde se musí zeptat. Jakým tónem mluví se zákazníky, do jaké částky schvaluje, které případy vidí vždycky člověk. Tohle je ta část, která z obecného modelu dělá vašeho agenta.",
      },
      {
        title: "Vyhodnocení případu",
        text: "U každého případu si přečte kontext a zvolí další krok. Odpovědět, založit záznam, eskalovat, počkat na doplnění. Nejede seznam kroků odshora dolů, protože ne každý případ vypadá stejně.",
      },
      {
        title: "Kontrola a doladění",
        text: "Co agent udělal a proč, zůstane dohledatelné. Když se rozhodne jinak, než byste chtěli, upraví se pravidlo. Od té chvíle se stejná situace řeší nově, bez přeprogramování celého toku.",
      },
    ],
    useCases: [
      {
        title: "Faktury a doklady",
        glyph: "document",
        text: "Agent si převezme příchozí doklad, ověří ho proti objednávce a běžný případ dotáhne do konce. Rozdíl proti pevné automatizaci je v tom, co udělá, když něco nesedí: sám pozná, jestli jde o drobnost, kterou vyřeší, nebo o věc, se kterou má jít za konkrétním člověkem.",
      },
      {
        title: "Zákaznická podpora",
        glyph: "chat",
        text: "Dotaz čte i s historií zákazníka, odpovídá vaším tónem a běžnou věc rovnou vyřídí. U nespokojeného zákazníka nebo u výjimky z podmínek nehádá a předá to vám dřív, než se situace zhorší.",
      },
      {
        title: "Newslettery",
        glyph: "mail",
        text: "Navrhne, co dát do nejbližší rozesílky, komu a kdy, podle toho, co ve firmě přibylo a co koho zajímalo naposledy. Vy schvalujete hotový návrh, místo abyste ho skládali.",
      },
    ],
    benefits: [
      {
        text: "Agenda běží dál i ve chvíli, kdy na ni nikdo nemá čas.",
        art: "agenda-bezi-dal",
      },
      {
        text: "Agent mluví a rozhoduje podle vašich pravidel, ne obecně.",
        art: "vase-pravidla",
      },
      {
        text: "Firma může růst, aniž by kvůli každé nové agendě musela nabírat.",
        art: "rust-bez-nabirani",
      },
      {
        text: "U každého kroku je dohledatelné, co agent udělal a proč.",
        art: "dohledatelnost",
      },
      {
        text: "Když se pravidlo změní, změní se chování. Ne celý tok.",
        art: "zmena-pravidla",
      },
    ],
    whoItsFor: {
      text: "Vyplatí se firmám, kde se pořád dokola rozhoduje podle podobných pravidel a nikdo nemá čas sepisovat je do dalšího manuálu pro nového kolegu.",
      relatedIndustries: [
        { label: "Řemeslníci a služby", href: "/web-pro-remeslniky" },
        { label: "Účetní", href: "/web-pro-ucetni" },
      ],
    },
    whatWeConnect: {
      text: "Napojuju agenta na vaše systémy (CRM, e-mail, dokumentaci) a modely jako Claude nebo ChatGPT. Propojovací vrstvu stavím buď v n8n, nebo rovnou vlastním kódem v Pythonu, podle toho, co je pro daný případ spolehlivější. Nasazení běží na vašich datech, typicky přes Docker.",
      tools: ["Claude", "ChatGPT", "n8n", "Python", "Docker"],
    },
    miniFaq: [
      {
        q: "Jak dlouho trvá, než agent odpovídá spolehlivě?",
        a: "Záleží na složitosti agendy. Jednodušší případ zabere dny, komplexnější týdny. Pravidla se doladí podle reálného provozu, ne jen podle zadání.",
      },
      {
        q: "Co když agent narazí na něco, co nezná?",
        a: "Zeptá se, nebo případ předá vám. Nehádá tam, kde si není jistý.",
      },
    ],
  },
  {
    slug: "automatizace-procesu",
    title: "Automatizace procesů",
    summary:
      "Doklady, e-maily, přepisy i pravidelné rozesílky proběhnou samy, v n8n i vlastním kódem.",
    seoTitle: "Automatizace firemních procesů (n8n i na míru kódem)",
    lead: "Opakující se práce, která dnes zabírá čas týmu, proběhne sama. Stavím ji v n8n, nebo rovnou kódem v Pythonu, podle toho, co se pro váš případ vyplatí víc.",
    pain: [
      {
        text: "Doklady chodí e-mailem, datovou schránkou i papírově a někdo je musí ručně přepsat do systému.",
        art: "rucni-prepis",
      },
      {
        text: "Na nového zájemce se odpoví za dva dny, protože zrovna hořelo něco jiného.",
        art: "pozdni-odpoved",
      },
      {
        text: "Objednávky, smlouvy i vyplněné formuláře leží ve schránce, dokud se k nim někdo nedostane.",
        art: "lezi-ve-schrance",
      },
      {
        text: "Newsletter odejde, až zbyde čas. Většinou nezbyde.",
        art: "newsletter-nezbyde",
      },
    ],
    how: [
      {
        title: "Vstup se zachytí",
        text: "Automatizace hlídá e-mailovou schránku, sdílenou složku nebo formulář. Jakmile něco přijde, převezme si to sama, nikdo nic nemusí nikam přeposílat.",
      },
      {
        title: "AI přečte a vyhodnotí",
        text: "Fakturu, smlouvu, objednávku nebo vyplněný formulář přečte AI model podle významu, ne podle pevné šablony, takže mu nevadí, že každý dokument vypadá jinak.",
      },
      {
        title: "Zpracuje se správným nástrojem",
        text: "Jednodušší tok postavím v n8n nebo Make. Složitější logiku, kde se vyplatí větší kontrola nebo výkon, napíšu přímo kódem v Pythonu. Volím podle úlohy, ne podle zvyku.",
      },
      {
        title: "Výsledek jde dál",
        text: "Data se zapíšou do vašeho systému, e-mail nebo newsletter odejde ve správný čas, výjimka jde ke schválení konkrétnímu člověku i s informací, co přesně nesedí.",
      },
    ],
    useCases: [
      {
        title: "Faktury a doklady",
        glyph: "document",
        text: "Doklady chodí od pořád stejných dodavatelů, ale každý v jiném formátu. Automatizace vytěží data, porovná je s objednávkou a účetní dostane připravený podklad místo složky plné PDF.",
      },
      {
        title: "Reakce na poptávku",
        glyph: "send",
        text: "Zájemce dostane odpověď hned po odeslání formuláře, i když jste zrovna na schůzce. Ne obecné „děkujeme za zprávu“, ale konkrétní další krok.",
      },
      {
        title: "Objednávky a smlouvy",
        glyph: "database",
        text: "Objednávka nebo smlouva přijde e-mailem jako PDF, pokaždé jinak vysázená. Automatizace z ní vytáhne položky, termíny i podmínky a založí je do systému bez přepisování.",
      },
      {
        title: "Pravidelný newsletter",
        glyph: "mail",
        text: "Každý měsíc odejde souhrn toho, co ve firmě přibylo, poskládaný z webu a interních zdrojů. Vy jen kliknete na schválení. Nebo ani to ne.",
      },
    ],
    benefits: [
      {
        text: "Data v systému bez ručního přepisování a bez překlepů.",
        art: "bez-prepisovani",
      },
      {
        text: "Zájemce má odpověď dřív, než stihne napsat konkurenci.",
        art: "odpoved-driv",
      },
      {
        text: "Nesrovnalost se ozve hned, ne až u uzávěrky nebo u zákazníka.",
        art: "nesrovnalost-hned",
      },
      {
        text: "Newsletter i připomínky odejdou pravidelně, i v tom nejhorším měsíci.",
        art: "pravidelne-rozesilky",
      },
      {
        text: "Řešení stavím na nástroji, který se pro daný případ reálně vyplatí, ne jen na jednom, který zrovna umím.",
        art: "spravny-nastroj",
      },
    ],
    whoItsFor: {
      text: "Vyplatí se firmám, kde se dokola opakuje stejná rutina (doklady, e-maily nebo pravidelné rozesílky) a nikdo na ni dnes nemá čas.",
      relatedIndustries: [
        { label: "Účetní", href: "/web-pro-ucetni" },
      ],
    },
    whatWeConnect: {
      text: "Propojuju e-mail, účetní systém, CRM, banku i e-shop. Jednodušší toky stavím v n8n nebo Make, složitější logiku přímo kódem.",
      tools: ["n8n", "Make", "Python"],
    },
    miniFaq: [
      {
        q: "Musí to být vždycky přes n8n?",
        a: "Ne. U složitějších nebo objemnějších případů je často spolehlivější a levnější na provoz napsat to rovnou kódem. Vybírám podle konkrétní úlohy.",
      },
      {
        q: "Zvládne to i ruční doklady a scany?",
        a: "Ano, AI přečte i sken nebo fotku z mobilu. Nejasné případy vždy jdou na kontrolu člověku, ne dál do systému.",
      },
    ],
  },
  {
    slug: "chatboti-rag",
    title: "Chatboti a RAG",
    summary:
      "Odpovídá zákazníkům z vašich dat 24/7, od jednoduchého chatbota po vyhledávání ve velkém množství podkladů.",
    seoTitle: "AI chatbot a RAG (vyhledávání ve vlastních datech) pro firmy",
    lead: "Chatbot, který odpovídá z vašich vlastních podkladů, kdykoliv se zákazník zeptá. Jednoduchý pro pár stránek FAQ, nebo RAG, tedy chatbot, který si odpověď sám dohledá i ve stovkách dokumentů.",
    pain: [
      {
        text: "Pořád dokola se odpovídá na stejných pět otázek.",
        art: "stejne-otazky",
      },
      {
        text: "Dotaz z pátečního večera čeká do pondělního rána.",
        art: "vikend-ceka",
      },
      {
        text: "Odpověď je schovaná v desítkách dokumentů a nikdo nemá čas ji pokaždé znovu hledat ručně.",
        art: "schovana-odpoved",
      },
      {
        text: "Chatbot z krabice odpovídá mimo, protože o vaší firmě nic neví.",
        art: "chatbot-z-krabice",
      },
    ],
    how: [
      {
        title: "Znalostní báze",
        text: "Chatbot vychází z vašich vlastních podkladů. U jednoduššího případu stačí pár stránek webu nebo časté dotazy, u komplexnějšího RAG i tisíce dokumentů, ve kterých si model sám dohledá tu správnou pasáž.",
      },
      {
        title: "Rozpoznání dotazu",
        text: "Pochopí i otázku položenou vlastními slovy, ne jen přesnou frázi z nápovědy. Zákazník nemusí hádat, jak se to u vás jmenuje.",
      },
      {
        title: "Odpověď se zdrojem",
        text: "K odpovědi doplní, odkud pochází. Zákazník si ji může ověřit a vy víte, který podklad chatbot použil.",
      },
      {
        title: "Předání člověku",
        text: "Když si není jistý, nebo když jde o objednávku či stížnost, případ předá vám. Včetně toho, na co se zákazník ptal předtím.",
      },
    ],
    useCases: [
      {
        title: "Časté dotazy na webu",
        glyph: "chat",
        text: "Zákazník se zeptá na dostupnost, postup nebo podmínky a má odpověď hned. Nemusí kvůli tomu procházet menu ani psát e-mail.",
      },
      {
        title: "Podpora mimo pracovní dobu",
        glyph: "flag",
        text: "Večerní a víkendové dotazy nezůstanou bez reakce. Co chatbot nevyřeší, máte ráno připravené i s kontextem, takže se nezačíná od nuly.",
      },
      {
        title: "Vyhledávání ve velkém množství podkladů",
        glyph: "search",
        text: "Máte stovky smluv, manuálů nebo článků? RAG najde tu správnou pasáž a odpoví na jejím základě, místo aby to někdo procházel ručně.",
      },
    ],
    benefits: [
      {
        text: "Zákazník má odpověď hned, i v noci.",
        art: "odpoved-v-noci",
      },
      {
        text: "Tým řeší jen to, co si opravdu žádá člověka.",
        art: "dotazy-pro-cloveka",
      },
      {
        text: "Odpovědi vycházejí z vašich podkladů, ne z obecných frází.",
        art: "z-vasich-podkladu",
      },
      {
        text: "Zvládne i rozsáhlou dokumentaci, ne jen pár stránek FAQ.",
        art: "rozsahla-dokumentace",
      },
      {
        text: "Když se něco změní, upraví se podklad a chatbot odpovídá nově.",
        art: "zmena-podkladu",
      },
    ],
    whoItsFor: {
      text: "Vyplatí se firmám s pravidelným objemem podobných dotazů, typicky e-shopům i servisním a řemeslným firmám, které komunikují se zákazníky denně.",
      relatedIndustries: [
        { label: "Řemeslníci a služby", href: "/web-pro-remeslniky" },
        { label: "Realitní makléři", href: "/web-pro-realitni-maklere" },
      ],
    },
    whatWeConnect: {
      text: "Propojuju web, znalostní bázi a helpdesk. Chatbot staví na modelech jako Claude nebo ChatGPT.",
      tools: ["Claude", "ChatGPT"],
    },
    miniFaq: [
      {
        q: "Co je vlastně RAG?",
        a: "Zkratka pro přístup, kdy si chatbot odpověď sám dohledá přímo ve vašich podkladech, místo aby odpovídal jen z toho, co se naučil při trénování. Díky tomu odpovídá přesně a s odkazem na zdroj.",
      },
      {
        q: "Umí chatbot mluvit jen o tom, co je na webu?",
        a: "Odpovídá z podkladů, které mu dáte. Může to být web, dokumentace nebo interní postupy.",
      },
      {
        q: "Co když si zákazník stěžuje?",
        a: "Stížnost chatbot nevyřizuje sám, rovnou ji předá vám i s celým kontextem.",
      },
    ],
  },
  {
    slug: "voice-agenti",
    title: "Voice agenti",
    summary:
      "AI, která zvedá telefon a běžný hovor dotáhne sama. Právě ji stavím.",
    seoTitle: "Voice agenti: AI na telefonní hovory (připravuju)",
    lead: "AI agent, který umí telefonovat: zvedne hovor, rozumí, o co jde, a běžný případ vyřídí stejně, jako by u telefonu seděl člověk. Tuhle službu právě stavím.",
    comingSoon: true,
    pain: [
      {
        text: "Telefon zvoní i mimo pracovní dobu a nemá ho kdo zvednout.",
        art: "telefon-bez-odezvy",
      },
      {
        text: "Recepce nebo podpora tráví většinu hovorů odpovídáním na pořád stejné dotazy.",
        art: "stejne-dotazy",
      },
      {
        text: "Domluvit termín telefonem znamená čekat, až bude mít někdo z týmu volno.",
        art: "cekani-na-termin",
      },
      {
        text: "Poptávka, která přijde telefonem večer nebo o víkendu, se vyřídí až druhý pracovní den. Zájemce mezitím zavolá jinam.",
        art: "zajemce-jinam",
      },
    ],
    how: [
      {
        title: "Hovor převezme agent",
        text: "Voice agent zvedne příchozí hovor a rozumí mluvené řeči v reálném čase, ne jen předpřipraveným frázím nebo tlačítkům „stiskněte jedna pro...“.",
      },
      {
        title: "Rozpozná záměr",
        text: "Pozná, jestli jde o objednání termínu, běžný dotaz, nebo něco, co patří rovnou konkrétnímu člověku. Podle toho hovor vede dál.",
      },
      {
        title: "Vyřídí, nebo přepojí",
        text: "Běžný případ dovede do konce sám: potvrdí termín, odpoví na dotaz, zapíše poptávku. U složitějšího nebo citlivého hovoru ho přepojí a předá kontext, se kterým zákazník volal, aby se nezačínalo znovu od nuly.",
      },
      {
        title: "Zápis a návaznost",
        text: "Z hovoru vznikne záznam v systému, na který může navázat e-mail, SMS nebo připomínka, stejně jako u ostatních kanálů komunikace.",
      },
    ],
    useCases: [
      {
        title: "Příjem hovorů mimo pracovní dobu",
        glyph: "phone",
        text: "Večerní a víkendový hovor nezůstane bez odezvy. Agent ho převezme a běžnou věc vyřídí rovnou, i když je firma zavřená.",
      },
      {
        title: "Objednání termínu telefonem",
        glyph: "calendar",
        text: "Zákazník si domluví termín přímo v hovoru, bez čekání na to, až bude mít někdo z týmu chvíli volno se mu ozvat zpátky.",
      },
      {
        title: "Odpovědi na časté dotazy",
        glyph: "chat",
        text: "Dostupnost, otevírací doba, postup. Na běžné dotazy odpoví agent rovnou v hovoru, bez přepojování mezi lidmi.",
      },
      {
        title: "První kontakt s novou poptávkou",
        glyph: "person",
        text: "Zájemce, který zavolá poprvé, dostane odpověď hned a základní údaje se rovnou zapíšou. Obchod nebo tým se pak věnuje jen tomu, co už má smysl řešit osobně.",
      },
    ],
    benefits: [
      {
        text: "Hovor má odezvu i mimo pracovní dobu.",
        art: "odezva-mimo-dobu",
      },
      {
        text: "Tým se věnuje jen hovorům, které si opravdu žádají člověka.",
        art: "hovory-pro-cloveka",
      },
      {
        text: "Zákazník nečeká, až bude mít někdo čas zvednout telefon.",
        art: "bez-cekani",
      },
      {
        text: "Z každého hovoru zůstane záznam, na který navazují další kroky.",
        art: "zaznam-hovoru",
      },
      {
        text: "Poptávka telefonem se zpracuje stejně spolehlivě jako ta, co přijde e-mailem.",
        art: "telefon-jako-email",
      },
    ],
    whoItsFor: {
      text: "Bude se hodit firmám s pravidelným objemem telefonátů, kde dnes běžný hovor zvedá člověk vedle vlastní práce, tedy servisním a řemeslným firmám i realitním kancelářím.",
      relatedIndustries: [
        { label: "Řemeslníci a služby", href: "/web-pro-remeslniky" },
        { label: "Realitní makléři", href: "/web-pro-realitni-maklere" },
      ],
    },
    whatWeConnect: {
      text: "Voice agent se napojuje na vaši telefonní linku, kalendář a CRM. Rozumí mluvené řeči a reaguje hlasem v reálném čase, stejně jako u textových agentů rozhoduje podle pravidel, která pro váš provoz nastavím.",
      tools: [],
    },
    miniFaq: [
      {
        q: "Je tahle služba už dostupná?",
        a: "Právě ji stavím. Pokud vás zajímá mezi prvními, ozvěte se a probereme, jak by mohla fungovat konkrétně u vás.",
      },
      {
        q: "V čem se liší od chatbota?",
        a: "Chatbot odpovídá textem na webu. Voice agent umí totéž po telefonu. Rozumí mluvenému slovu a mluví zpátky.",
      },
      {
        q: "Kdy bude služba hotová?",
        a: "Termín zatím nepotvrzuju. Nechte mi kontakt a ozvu se, jakmile bude připravená k nasazení.",
      },
    ],
  },
];

export function getAutomationPage(slug: string) {
  return automationPages.find((service) => service.slug === slug);
}
