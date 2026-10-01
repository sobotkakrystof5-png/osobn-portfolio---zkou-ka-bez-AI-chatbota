// Scénáře interaktivních scén na podstránkách /automatizace/[slug].
// Port z alteno (lib/service-demos.ts). Texty i struktura beze změny, jen
// klíč `automatizace` je tu `automatizace-procesu` a cesty v komentářích
// míří na soubory ve VIZEON.
//
// Vzniklo 2026-09-15 na zadání majitele: podstránky služeb nemají být
// čistý text, ale mají divákovi reálně ukázat, jak služba funguje, aby si
// pod ní dokázal něco představit. Vybraný vizuální směr ("Provoz",
// schváleno z mockupu) staví scénu jako stroj na lince: případ vjede
// zleva, jádro nahlas řekne, co s ním dělá, vpravo vypadne hotová akce.
//
// PROČ JE OBSAH TADY A NE V KOMPONENTĚ: je to český copy, tedy obsah,
// a platí pro něj stejné pravidlo jako pro lib/data/automation-pages.ts — když se mění
// text, mění se v datech. Komponenta drží jen chování a vzhled.
//
// PROČ NE PŘÍMO V lib/data/automation-pages.ts: typ `Service` je tam schválně chráněný
// (nemá pole pro cenu ani pro `href`) a scény mají pro každou službu jiný
// tvar — konzole u agentů, telefon u Voice, chat widget u Chatbotů,
// propojení systémů u Automatizace. Cpát čtyři různé tvary do jednoho
// typu služby by z něj udělalo skladiště. Vazba je přes slug.
//
// STEJNÁ OBSAHOVÁ PRAVIDLA JAKO ZBYTEK WEBU (claude.md): modelová
// situace, nikdy reference. Žádné jméno firmy, žádná úspora v hodinách
// ani procentech, žádná částka. Přesvědčuje popsaný mechanismus, ne
// slíbený výsledek. Jména osob jsou zástupná (Nováková = "někdo"), ne
// klient.

/**
 * Klíč do mapy ikon v komponentě. Řetězec, ne komponenta, protože tenhle
 * soubor je čistá data a nesmí táhnout JSX do serverového importu.
 * Hodnoty odpovídají glyfům v components/automation/process-icons.tsx.
 */
export type DemoIcon =
  | "mail"
  | "document"
  | "chat"
  | "search"
  | "database"
  | "send"
  | "flag"
  | "person"
  | "check"
  | "spark"
  | "gear"
  | "phone"
  | "calendar";

export type ConsoleCase = {
  /** Stabilní klíč pro React, nezávislý na pořadí v poli. */
  id: string;
  icon: DemoIcon;
  /** Nadpis tlačítka ve frontě. Krátký, 2–4 slova. */
  title: string;
  /** Doplněk pod nadpisem. Okolnost, ne popis. */
  note: string;
  /**
   * Co agent řekne nahlas, když případ převezme. Píše se v první osobě
   * za agenta — je to jediné místo na webu, kde mluví stroj, ne Kryštof
   * ani značka. Drží se do dvou vět, vypisuje se po znacích.
   */
  say: string;
  /** Kroky, které agent udělal. Nástroj + co z toho vypadlo. */
  steps: { tool: string; text: string; icon: DemoIcon }[];
  /** Výsledek vpravo. `tags` jsou dotčené systémy, ne značky. */
  result: { title: string; text: string; tags: string[] };
};

export type ConsoleDemo = {
  kind: "console";
  /** Popisek plovoucí nad konzolí. Jedno tvrzení, žádná věta. */
  badge: string;
  /** Jméno stroje v hlavičce jádra. */
  actor: string;
  /** Text v replice, dokud návštěvník nic nevybral. */
  idleSay: string;
  labels: { input: string; core: string; output: string };
  cases: ConsoleCase[];
};

/**
 * Jeden podklad ve znalostní bázi chatbota.
 *
 * Je to MODELOVÝ DOKUMENT, ne napodobenina cizí značky. Žádné jméno
 * firmy, žádné logo, žádný odkaz na existující web — scéna má ukázat
 * mechanismus (odpověď vzniká z konkrétního podkladu), ne předstírat, že
 * ALTENO někomu takového chatbota nasadilo (sluzby-sceny-prompt.md §3a,
 * „Past"). Ze stejného důvodu v pasážích nejsou částky: cenu na tenhle
 * web nesmí propašovat ani vymyšlený dokument.
 */
export type ChatSource = {
  /** Stabilní klíč. Na něj se odkazuje `sourceId` v odpovědi. */
  id: string;
  icon: DemoIcon;
  /** Název podkladu. Obecný typ dokumentu, nikdy značka. */
  title: string;
  /** Odkud podklad je. Web, PDF, interní postup. */
  note: string;
  /**
   * Věta, kterou chatbot v podkladu našel. Ve scéně se zvýrazní, takže
   * je vidět, že odpověď z ní opravdu vychází, ne z obecné znalosti
   * modelu. Tohle je nosné sdělení celé scény.
   */
  passage: string;
};

export type ChatTurn = {
  /** Stabilní klíč pro React, nezávislý na pořadí v poli. */
  id: string;
  /**
   * Otázka na tlačítku i v bublině. Píše se, jak by ji napsal zákazník
   * vlastními slovy — ne terminologií z podkladu. Právě na tom stojí
   * krok „Rozpoznání dotazu" v lib/data/automation-pages.ts.
   */
  question: string;
  /**
   * Podklad, ze kterého odpověď vznikla. `null` znamená, že chatbot
   * v bázi nic nenašel — a takový případ ve scéně BÝT MUSÍ. Bez něj
   * scéna tvrdí, že bot umí odpovědět vždycky, což je přesně ten slib,
   * který ALTENO nemá čím doložit.
   */
  sourceId: string | null;
  /** Odpověď chatbota. Vypisuje se po znacích, drží se do dvou vět. */
  answer: string;
  /**
   * Systémový řádek pod odpovědí, když případ jde na člověka. Jen
   * u dotazu bez podkladu — jinde by z předání dělal běžný konec.
   */
  handoff?: string;
};

export type ChatDemo = {
  kind: "chat";
  /** Popisek plovoucí nad scénou. Jedno tvrzení, žádná věta. */
  badge: string;
  /** Jméno stroje v hlavičce widgetu. */
  actor: string;
  /** Text v bublině, dokud návštěvník nic nevybral. */
  idleSay: string;
  labels: {
    /** Nad řadou připravených dotazů. */
    picker: string;
    /** Nad panelem znalostní báze. */
    base: string;
    /** Stav báze během hledání. */
    searching: string;
    /** Stav báze, když se nenašlo nic. */
    notFound: string;
    /** Uvozuje citaci zdroje pod odpovědí. */
    source: string;
  };
  sources: ChatSource[];
  turns: ChatTurn[];
};

/**
 * Uzel řetězu ve scéně Automatizace.
 *
 * Dva tvary, a ten rozdíl je celé sdělení scény: `tool` je systém
 * ZÁKAZNÍKA (cizí značka, oficiální logo), `core` je vrstva, kterou staví
 * ALTENO (vlastní glyf, žádná značka). Řetěz tím říká „vaše systémy
 * zůstávají, mezi ně přijde tohle" — ne „kupte si nový systém".
 *
 * PROČ V `core` NENÍ LOGO n8n ANI PYTHONU, i když se tam jmenují: n8n
 * a Make jsou `automationTools` (vlastní dílna, čím to stavíme), ne
 * `connectedTools` (co propojujeme klientovi). Logo v řetězu integrací by
 * z dílny udělalo nabídku integrací — sluzby-sceny-prompt.md §3b, Past 1.
 * Název jako text uvnitř našeho uzlu ten rozdíl drží.
 */
export type FlowNode =
  | {
      kind: "tool";
      /**
       * Slugy do DEMO_TOOLS v components/automation/demo-tools.ts. Víc než
       * jeden tam, kde výsledek míří na dvě místa naráz (zápis do systému
       * a zároveň zpráva ven). Slug, který v DEMO_TOOLS chybí, se
       * nenakreslí (žádné náhradní logo).
       */
      tools: string[];
    }
  | {
      kind: "core";
      icon: DemoIcon;
      /**
       * Popisek uvnitř našeho uzlu. Buď model („AI model"), nebo nástroj,
       * kterým je tok postavený („n8n", „Python"). Druhá možnost je přímo
       * z `how` v lib/data/automation-pages.ts: volba nástroje podle úlohy je u téhle
       * služby obchodní tvrzení, ne implementační detail.
       */
      label: string;
    };

export type FlowStep = {
  /** Stabilní klíč pro React, nezávislý na pořadí v poli. */
  id: string;
  node: FlowNode;
  /**
   * Řádek do logu pod řetězem. `tool` je krátké označení místa, kde se to
   * stalo — nemusí to být značka, u výstupu na dvě místa je to popis
   * („Účetnictví + e-mail"). Žádné číslo, žádná částka.
   */
  log: { tool: string; text: string; icon: DemoIcon };
};

/**
 * Jeden průběh řetězu. Návštěvník si vybírá mezi průběhy, ne mezi kroky —
 * kroky jsou u téhle služby vždycky tytéž čtyři, mění se jen systémy na
 * koncích a to, co tokem projde.
 */
export type FlowRun = {
  id: string;
  /** Text na tlačítku výběru. Co dorazí. Krátké, 2–4 slova. */
  title: string;
  /** Okolnost pod nadpisem, ne popis. */
  note: string;
  icon: DemoIcon;
  /**
   * Právě čtyři kroky, vynuceno typem. Scéna je řetěz podle `how`
   * v lib/data/automation-pages.ts a ten má čtyři kroky — pátý uzel by znamenal, že
   * scéna a číslovaný seznam pod ní mluví každý o něčem jiném.
   */
  steps: [FlowStep, FlowStep, FlowStep, FlowStep];
  /**
   * Řádek pod výsledkem, když případ končí u člověka. Nepovinný: jeden
   * z průběhů ho MÍT MUSÍ. Bez něj scéna slibuje automatizaci, která
   * zvládne všechno sama, a to je tvrzení, které ALTENO nemá čím doložit
   * (stejné pravidlo jako `handoff` u chatu a „Dotaz mimo pravidla"
   * u konzole).
   */
  handoff?: string;
  /** Výsledek. `tags` jsou dotčené agendy, ne značky. */
  result: { title: string; text: string; tags: string[] };
};

export type FlowDemo = {
  kind: "flow";
  /** Popisek plovoucí nad scénou. Jedno tvrzení, žádná věta. */
  badge: string;
  /**
   * Text v panelu výsledku, dokud návštěvník nic nevybral.
   *
   * Scéna schválně nemá `actor` jako konzole a chat: tam mluví stroj
   * v první osobě a potřebuje jméno. Tady roli „kdo to dělá" nese štítek
   * nad naší vrstvou a druhé jméno pro totéž by mátlo.
   */
  idleSay: string;
  labels: {
    /** Nad řadou připravených vstupů. */
    picker: string;
    /** Štítek nad skupinou uzlů, které staví ALTENO. */
    ours: string;
    /** Nad výpisem kroků. */
    log: string;
    /** Nad panelem výsledku. */
    result: string;
  };
  /**
   * Popisky pod uzly. Shodné s `how` v lib/data/automation-pages.ts, a to schválně:
   * scéna ukazuje tentýž tok, který číslovaný seznam pod ní popisuje
   * slovy. Když se `how` přepíše, přepisuje se i tohle pole — jinak
   * podstránka tvrdí dvě verze téhož postupu.
   */
  captions: [string, string, string, string];
  runs: FlowRun[];
};

/**
 * Jedna replika v přepisu hovoru.
 *
 * `from` rozlišuje, kdo mluví — na tom stojí celá scéna: křivka se
 * zbarví podle mluvčího, takže je i beze čtení vidět, že agent nemluví
 * pořád a že hovor je dialog, ne přednes.
 */
export type PhoneLine = {
  /** Stabilní klíč pro React, nezávislý na pořadí v poli. */
  id: string;
  from: "caller" | "agent";
  /**
   * Co zazní. Vypisuje se po znacích jako živý přepis, drží se do dvou
   * krátkých vět — telefonní replika není odstavec.
   */
  text: string;
};

/**
 * Jeden modelový hovor.
 *
 * ŽÁDNÉ TELEFONNÍ ČÍSLO. Vymyšlené číslo je vymyšlený údaj a mohlo by
 * navíc patřit někomu skutečnému. `caller` proto nese STAV čísla
 * („Neznámé číslo", „Číslo z evidence"), ne číslo samotné — a je to
 * shodou okolností to jediné, co by na displeji dávalo obchodní smysl:
 * jestli volá někdo, koho firma zná.
 */
export type PhoneCall = {
  id: string;
  /** Text na tlačítku výběru. Co bude volat. Krátké, 2–4 slova. */
  title: string;
  /** Okolnost pod nadpisem, ne popis. */
  note: string;
  icon: DemoIcon;
  /** Stav volajícího čísla na displeji. Nikdy číslo. */
  caller: string;
  /**
   * Záměr, který agent v hovoru rozpozná. Odpovídá druhému kroku `how`
   * v lib/data/automation-pages.ts („Rozpozná záměr") a ve scéně se ukáže jako štítek
   * po první replice volajícího — tedy přesně v ten moment, kdy by ho
   * poznal i člověk.
   */
  intent: string;
  lines: PhoneLine[];
  /**
   * Řádek pod přepisem, když hovor půjde na člověka. Nepovinný: jeden
   * z hovorů ho MÍT MUSÍ. Bez něj scéna tvrdí, že agent zvládne každý
   * hovor sám — a to je u služby, která se teprve staví, slib úplně
   * mimo (stejné pravidlo jako `handoff` u chatu a řetězu).
   */
  handoff?: string;
  /** Výsledek. `tags` jsou dotčené agendy, ne značky. */
  result: { title: string; text: string; tags: string[] };
};

/**
 * Scéna „Telefon" pro /automatizace/voice-agenti.
 *
 * CELÁ MLUVÍ V BUDOUCÍM ČASE, a to je obchodní rozhodnutí majitele
 * z 2026-09-16, ne stylistická libůstka. Služba má `comingSoon: true`
 * a vyleštěná scéna v přítomném čase by z ní udělala hotovou nabídku —
 * přesně to, čemu ten příznak má bránit (sluzby-sceny-prompt.md §6,
 * bod 1, vybrána varianta (a)). Rámující texty — `badge`, `idleSay`,
 * `result` — proto slibují, jak to BUDE fungovat.
 *
 * Výjimkou jsou repliky v `lines`: dialog se nedá psát v budoucím čase,
 * aniž by přestal být dialogem. Je to modelový hovor, který se jednou
 * povede, ne přepis hovoru, který se stal. Rámec kolem něj to říká za
 * něj.
 *
 * ŽÁDNÝ SKUTEČNÝ ZVUK. Křivka je scénář, ne analýza audia — a autoplay
 * se zvukem je v prohlížečích stejně blokovaný bez gesta uživatele.
 */
export type PhoneDemo = {
  kind: "phone";
  /** Popisek plovoucí nad scénou. Jedno tvrzení, žádná věta. */
  badge: string;
  /** Jméno stroje v hlavičce displeje. */
  actor: string;
  /** Text v přepisu, dokud návštěvník nic nevybral. */
  idleSay: string;
  /**
   * Štítky nad částmi scény. `intent`, `transcript` a `result` schválně
   * kopírují kroky 2–4 z `how` v lib/data/automation-pages.ts: scéna ukazuje tentýž
   * postup, který číslovaný seznam pod ní popisuje slovy. Když se `how`
   * přepíše, přepisuje se i tohle pole.
   */
  labels: {
    /** Nad řadou připravených hovorů. */
    picker: string;
    /** Stav displeje, dokud agent nezvedl. */
    ringing: string;
    /** Stav displeje v okamžiku zvednutí. */
    answering: string;
    /** Stav displeje během hovoru. */
    talking: string;
    /** Uvozuje štítek s rozpoznaným záměrem. */
    intent: string;
    /** Nad přepisem hovoru. */
    transcript: string;
    /** Nad panelem výsledku. */
    result: string;
  };
  calls: PhoneCall[];
};

/**
 * Sjednocení tvarů scén, rozlišené polem `kind`. Podstránka si scénu
 * vybere `switch`em nad `demo.kind`. Každá ze 4 služeb má scénu,
 * větev `never` v `renderScene` shodí build, když přibude tvar a zapomene
 * se dopsat.
 */
export type ServiceDemo = ConsoleDemo | ChatDemo | FlowDemo | PhoneDemo;

/**
 * Klíčem je slug služby z lib/data/automation-pages.ts. Služba bez záznamu scénu
 * nedostane a podstránka se vykreslí bez ní.
 */
export const serviceDemos: Record<string, ServiceDemo> = {
  "ai-agenti": {
    kind: "console",
    badge: "běží bez zásahu člověka",
    actor: "Agent",
    idleSay: "Vyberte vlevo případ. Ukážu vám, co s ním udělám.",
    labels: {
      input: "Přijde na stůl",
      core: "Agent",
      output: "Odejde hotové",
    },
    cases: [
      {
        id: "poptavka",
        icon: "mail",
        title: "Poptávka e-mailem",
        note: "nový zákazník, mimo pracovní dobu",
        say: "Nového zákazníka v evidenci nemám. Nejdřív si ho založím.",
        steps: [
          { tool: "evidence", text: "kontakt nenalezen", icon: "search" },
          { tool: "rejstřík", text: "adresa a IČO doplněny", icon: "database" },
          { tool: "evidence", text: "zákazník založen", icon: "check" },
          { tool: "e-mail", text: "odpověď odeslána", icon: "send" },
        ],
        result: {
          title: "Odpověď odešla ráno",
          text: "Zákazník má potvrzený termín a vy ho najdete v evidenci i s historií. Nikdo u toho nemusel být.",
          tags: ["Evidence zákazníků", "E-mail"],
        },
      },
      {
        id: "faktura",
        icon: "document",
        title: "Faktura od dodavatele",
        note: "příloha v PDF",
        say: "Částka sedí s objednávkou. Podpis ale patří člověku, posílám dál.",
        steps: [
          { tool: "doklad", text: "částka a splatnost přečteny", icon: "document" },
          { tool: "objednávka", text: "souhlasí na položky", icon: "check" },
          { tool: "schválení", text: "předáno ke schválení", icon: "person" },
        ],
        result: {
          title: "Připraveno ke schválení",
          text: "Zaúčtuje se sama, jakmile schválení dorazí zpátky. Do té doby nikdo nepřepisuje čísla ručně.",
          tags: ["Účetnictví", "Schvalování"],
        },
      },
      {
        id: "mimo-pravidla",
        icon: "chat",
        title: "Dotaz mimo pravidla",
        note: "tohle agent řešit nemá",
        say: "Tohle nemám v pravidlech. Nebudu si vymýšlet, předávám vám to.",
        steps: [
          { tool: "pravidla", text: "mimo rozsah", icon: "flag" },
          { tool: "shrnutí", text: "sepsáno, co zákazník chce", icon: "document" },
          { tool: "předání", text: "čeká na vás", icon: "person" },
        ],
        result: {
          title: "Předáno člověku",
          text: "Se shrnutím a odkazem na celou konverzaci. Agent se ptá jen tam, kde se ptát má.",
          tags: ["Eskalace"],
        },
      },
    ],
  },

  // Scéna 2 (sluzby-sceny-prompt.md, session 1, 2026-09-16).
  //
  // NOSNÉ SDĚLENÍ JE CITACE ZDROJE, ne to, že bot umí odpovědět. Odpovídat
  // umí kdokoli; rozdíl mezi „chatbot" a „RAG" je v tom, že je vidět,
  // ze kterého podkladu odpověď vznikla. Proto má scéna vedle widgetu
  // panel znalostní báze a proto se v něm při odpovědi rozsvítí právě
  // jeden podklad se zvýrazněnou pasáží.
  //
  // Třetí dotaz je schválně mimo podklady. Bez něj by scéna slibovala
  // chatbota, který ví vždycky všechno — a to je přesně ten druh tvrzení,
  // které web nemá čím doložit.
  "chatboti-rag": {
    kind: "chat",
    badge: "odpovídá z vašich podkladů",
    actor: "Chatbot",
    idleSay:
      "Zeptejte se. Odpovím z vašich podkladů a řeknu, odkud to mám.",
    labels: {
      picker: "Připravené dotazy",
      base: "Vaše podklady",
      searching: "hledám v podkladech",
      notFound: "v podkladech není",
      source: "Zdroj",
    },
    sources: [
      {
        id: "podminky",
        icon: "document",
        title: "Obchodní podmínky",
        note: "stránka na webu",
        passage:
          "Zboží lze vrátit do 14 dnů od převzetí, nepoužité a v původním obalu.",
      },
      {
        id: "expedice",
        icon: "database",
        title: "Doprava a expedice",
        note: "stránka na webu",
        passage:
          "Objednávky přijaté do poledne expedujeme týž pracovní den.",
      },
      {
        id: "manual",
        icon: "search",
        title: "Servisní manuál",
        note: "interní PDF",
        passage:
          "Záruka se nevztahuje na díly opotřebené běžným provozem.",
      },
    ],
    turns: [
      {
        id: "vraceni",
        question: "Do kdy to můžu poslat zpátky?",
        sourceId: "podminky",
        answer:
          "Do 14 dnů od převzetí, pokud je zboží nepoužité a v původním obalu.",
      },
      {
        id: "expedice",
        question: "Stihne se to poslat ještě dneska?",
        sourceId: "expedice",
        answer:
          "Ano, když objednávka přijde do poledne. Doručení pak už závisí na dopravci.",
      },
      {
        id: "sleva",
        question: "Dostanu slevu na druhý kus?",
        sourceId: null,
        answer:
          "Tohle v podkladech nemám a nebudu si vymýšlet. Předávám vás člověku.",
        handoff: "Předáno člověku i s tím, na co jste se ptali předtím.",
      },
    ],
  },
  // Scéna 3 (sluzby-sceny-prompt.md, session 2, 2026-09-16).
  //
  // NOSNÉ SDĚLENÍ JE ŘETĚZ MEZI SYSTÉMY, KTERÉ UŽ ZÁKAZNÍK MÁ. Ne to, že
  // umíme něco spustit — to je u automatizace samozřejmost. Scéna ukazuje,
  // že na krajích stojí jeho nástroje s vlastními logy, uprostřed přibude
  // naše vrstva, a mezi tím něco reálně proteče. Proto jsou uzly vstupu
  // a výstupu značkové a prostřední dva ne.
  //
  // ČTYŘI KROKY, NE TŘI. `captions` jsou doslova `how` z lib/data/automation-pages.ts,
  // takže scéna a číslovaný seznam pod ní popisují tentýž tok.
  //
  // Průběh „Faktura e-mailem" schválně nekončí zápisem do systému, ale
  // u člověka. Každá scéna na webu má jeden případ, který se přizná, že
  // na něj nestačí — bez něj by řetěz sliboval automatizaci, která zvládne
  // všechno sama.
  //
  // ŽÁDNÉ ČÍSLO ÚSPORY, ŽÁDNÁ ČÁSTKA, ŽÁDNÉ JMÉNO FIRMY. Ani ve výsledku,
  // ani v logu. Slovo „ceník" se tu schválně nevyskytuje ani ve významu
  // zákazníkova vlastního ceníku — na tomhle webu ukazuje na /cenik.
  "automatizace-procesu": {
    kind: "flow",
    badge: "propojí systémy, které už máte",
    idleSay: "Vyberte nahoře, co dorazí. Ukážu vám, kudy to projde.",
    labels: {
      picker: "Co dorazí",
      ours: "Moje vrstva",
      log: "Co se stalo",
      result: "Výsledek",
    },
    captions: [
      "Vstup se zachytí",
      "AI přečte a vyhodnotí",
      "Zpracuje se správným nástrojem",
      "Výsledek jde dál",
    ],
    runs: [
      {
        id: "objednavka",
        icon: "document",
        title: "Objednávka z e-shopu",
        note: "v noci, mimo pracovní dobu",
        steps: [
          {
            id: "in",
            node: { kind: "tool", tools: ["shopify"] },
            log: { tool: "Shopify", text: "nová objednávka", icon: "document" },
          },
          {
            id: "ai",
            node: { kind: "core", icon: "spark", label: "AI model" },
            log: { tool: "AI", text: "položky a odběratel přečteny", icon: "spark" },
          },
          {
            id: "run",
            node: { kind: "core", icon: "gear", label: "n8n" },
            log: { tool: "n8n", text: "ověřeno proti skladu", icon: "check" },
          },
          {
            id: "out",
            node: { kind: "tool", tools: ["quickbooks", "gmail"] },
            log: {
              tool: "Účetnictví + e-mail",
              text: "doklad založen, potvrzení odešlo",
              icon: "send",
            },
          },
        ],
        result: {
          title: "Ráno je objednávka hotová",
          text: "Zákazník má potvrzení a doklad sedí na položky. Nikdo nic nepřepisoval.",
          tags: ["E-shop", "Účetnictví", "E-mail"],
        },
      },
      {
        id: "faktura",
        icon: "mail",
        title: "Faktura e-mailem",
        note: "PDF v příloze, pokaždé jinak vysázené",
        steps: [
          {
            id: "in",
            node: { kind: "tool", tools: ["gmail"] },
            log: { tool: "Gmail", text: "faktura v příloze", icon: "mail" },
          },
          {
            id: "ai",
            node: { kind: "core", icon: "spark", label: "AI model" },
            log: { tool: "AI", text: "částka a splatnost vytěženy", icon: "document" },
          },
          {
            id: "run",
            node: { kind: "core", icon: "gear", label: "Python" },
            log: { tool: "Python", text: "položka nesedí s objednávkou", icon: "flag" },
          },
          {
            id: "out",
            node: { kind: "tool", tools: ["slack"] },
            log: { tool: "Slack", text: "předáno ke kontrole", icon: "person" },
          },
        ],
        handoff: "Nejasný doklad jde na člověka, ne dál do systému.",
        result: {
          title: "Nesrovnalost se ozvala hned",
          text: "Doklad, který sedí, se zpracuje sám. Ten, který nesedí, čeká u konkrétního člověka i s poznámkou, co přesně nesedí.",
          tags: ["E-mail", "Kontrola"],
        },
      },
      {
        id: "poptavka",
        icon: "chat",
        title: "Poptávka z formuláře",
        note: "zájemce čeká na odpověď",
        steps: [
          {
            id: "in",
            node: { kind: "tool", tools: ["typeform"] },
            log: { tool: "Typeform", text: "nová poptávka", icon: "document" },
          },
          {
            id: "ai",
            node: { kind: "core", icon: "spark", label: "AI model" },
            log: { tool: "AI", text: "rozpoznáno, o co jde", icon: "spark" },
          },
          {
            id: "run",
            node: { kind: "core", icon: "gear", label: "n8n" },
            log: { tool: "n8n", text: "přiřazeno ke správné službě", icon: "check" },
          },
          {
            id: "out",
            node: { kind: "tool", tools: ["hubspot", "gmail"] },
            log: {
              tool: "CRM + e-mail",
              text: "kontakt založen, odpověď odešla",
              icon: "send",
            },
          },
        ],
        result: {
          title: "Zájemce má odpověď hned",
          text: "Ne obecné poděkování, ale konkrétní další krok. A kontakt už na vás čeká v CRM.",
          tags: ["Formuláře", "CRM", "E-mail"],
        },
      },
    ],
  },

  "voice-agenti": {
    kind: "phone",
    // Budoucí čas nese sám štítek nad scénou. Kdyby se tenhle text měl
    // přepsat na přítomný, je to obchodní změna (služba je comingSoon),
    // ne úprava copy — viz komentář u typu PhoneDemo.
    badge: "takhle to bude fungovat",
    actor: "Voice agent",
    idleSay: "Vyberte hovor vlevo. Uvidíte, jak ho agent povede.",
    labels: {
      picker: "Zazvoní telefon",
      ringing: "zvoní",
      answering: "agent zvedá",
      talking: "hovor probíhá",
      intent: "Rozpoznaný záměr",
      transcript: "Přepis hovoru",
      result: "Zápis a návaznost",
    },
    calls: [
      {
        id: "termin",
        icon: "calendar",
        title: "Objednání termínu",
        note: "podvečer, firma má zavřeno",
        caller: "Neznámé číslo",
        intent: "Objednání termínu",
        lines: [
          {
            id: "t1",
            from: "caller",
            text: "Dobrý den, potřeboval bych se objednat. Šlo by to tento týden?",
          },
          {
            id: "t2",
            from: "agent",
            text: "Dobrý den. Ve čtvrtek dopoledne je volno. Hodí se vám to?",
          },
          { id: "t3", from: "caller", text: "Čtvrtek by šel." },
          {
            id: "t4",
            from: "agent",
            text: "Mám to zapsané. Potvrzení vám přijde do pár minut.",
          },
        ],
        result: {
          title: "Termín bude v kalendáři",
          text: "Zákazník položí telefon s domluveným termínem a vy ho ráno najdete v kalendáři. Nikdo u toho nebude muset být.",
          tags: ["Kalendář", "Potvrzení zákazníkovi"],
        },
      },
      {
        id: "dotaz",
        icon: "chat",
        title: "Běžný dotaz",
        note: "opakuje se každý den",
        caller: "Neznámé číslo",
        intent: "Dotaz na otevírací dobu",
        lines: [
          {
            id: "d1",
            from: "caller",
            text: "Dobrý den, do kolika máte dnes otevřeno?",
          },
          {
            id: "d2",
            from: "agent",
            text: "Dnes do šesti. Zítra otevíráme v osm ráno.",
          },
          { id: "d3", from: "caller", text: "Díky, to mi stačí." },
        ],
        result: {
          title: "Hovor skončí u agenta",
          text: "Nikoho to nevytrhne z práce a v evidenci po hovoru zůstane záznam, na který půjde navázat.",
          tags: ["Evidence hovorů"],
        },
      },
      {
        // Hovor, který agent NEDOTÁHNE sám. Ve scéně být musí: bez něj
        // slibuje telefonní linku, která zvládne všechno, a to je
        // u služby ve stavbě slib úplně mimo. Stejná role jako „Dotaz
        // mimo pravidla" u konzole a dotazu bez podkladu u chatu.
        id: "stiznost",
        icon: "flag",
        title: "Stížnost na zakázku",
        note: "tohle agent řešit nemá",
        caller: "Číslo z evidence",
        intent: "Stížnost, patří člověku",
        lines: [
          {
            id: "s1",
            from: "caller",
            text: "Volám kvůli zakázce, se kterou nejsem spokojený.",
          },
          {
            id: "s2",
            from: "agent",
            text: "Rozumím. Tohle nechám na člověku, přepojuji vás.",
          },
        ],
        handoff: "Hovor půjde na člověka i s tím, co už zákazník řekl.",
        result: {
          title: "Předání i s kontextem",
          text: "Člověk zvedne telefon a bude vědět, o co jde. Zákazník nebude muset začínat znovu od začátku.",
          tags: ["Přepojení", "Záznam hovoru"],
        },
      },
    ],
  },
};

export function getServiceDemo(slug: string): ServiceDemo | undefined {
  return serviceDemos[slug];
}
