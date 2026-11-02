// Milníky příběhu na stránce O nás (/o-mne). Stringy procházejí při
// renderu přes brandText, VIZEON/ALTENO se tak sází jako logo.
export type Milestone = {
  id: string;
  /** Datum u uzlu na čáře. */
  when: string;
  title: string;
  text: string;
  stat?: { value: string; label: string };
  link?: { href: string; label: string };
  /** Milník, který právě probíhá. */
  now?: boolean;
  /** Cíl, kam míříme. Úsek čáry k němu je tečkovaný. */
  goal?: boolean;
};

export const MILESTONES: Milestone[] = [
  {
    id: "prvni-kod",
    when: "Ve 14 letech",
    title: "První řádky kódu",
    text: "Začalo to zvědavostí, jak funguje web pod povrchem. Z koníčku se brzy stal směr.",
  },
  {
    id: "kurzy",
    when: "Začátek 2026",
    title: "Pokus, omyl, kurzy",
    text: "První vlastní projekty, spousta chyb, ze kterých jsem se učil, a první absolvované kurzy.",
  },
  {
    id: "prvni-klienti",
    when: "Březen až duben 2026",
    title: "První klienti",
    text: "Menší zakázky pro skutečné klienty. Z učení se stala práce s odpovědností.",
  },
  {
    id: "vizeon",
    when: "Květen 2026",
    title: "Vzniká VIZEON",
    text: "Weby na míru pod vlastní značkou. Od té doby jsem sám dokončil víc než 15 projektů.",
    stat: { value: "15+", label: "dokončených projektů" },
  },
  {
    id: "alteno",
    when: "Září 2026",
    title: "Vzniká ALTENO",
    text: "Sesterská značka pro zavádění umělé inteligence do firem a pro e‑commerce.",
  },
  {
    id: "tym",
    when: "Konec 2026",
    title: "Nabíráme první lidi",
    text: "Hledáme prvních 8 lidí, se kterými porosteme. Cíl zůstává: být nejlepší a nejdostupnější na trhu.",
    link: { href: "/kontakt", label: "Chcete být u toho? Ozvěte se" },
    now: true,
  },
  {
    id: "nemecko",
    when: "Další cíl",
    title: "Dobýt Německo.",
    text: "Expanze do zahraničí začne v Německu. Studuji tam, jazyk i trh znám zevnitř.",
    goal: true,
  },
];
