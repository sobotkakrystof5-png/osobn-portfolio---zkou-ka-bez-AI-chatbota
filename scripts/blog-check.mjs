#!/usr/bin/env node
// Kontrola článků blogu a fronty témat. Spouští ji Claude Code hook po každé
// úpravě článku, workflow při psaní i při každém PR do content/blog.
//
//   npm run blog:check                 všechny články + fronta
//   npm run blog:check -- soubor.mdx   jen vybrané články
//
// E = chyba (článek nesmí vyjít, skript skončí kódem 1), W = upozornění.
// Pravidla vycházejí z .claude/skills/blog-clanek/SKILL.md a z pravidla
// značek v CLAUDE.md.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "content", "blog");
const QUEUE = path.join(DIR, "_fronta.json");
const COMPONENTS = new Set(["Vizeon", "Alteno", "PricingHighlight"]);
/** Interní odkazy, které komponenta v článku vykreslí sama. */
const COMPONENT_LINKS = { PricingHighlight: ["/cena-tvorby-webu"] };
const QUEUE_STATUSES = new Set(["navrh", "schvaleno", "napsano", "zamitnuto"]);
const AI_PHRASES = [
  "nicméně", "v neposlední řadě", "je důležité poznamenat", "stojí za zmínku", "v dnešní době",
  "v dnešním digitálním světě", "v dnešní digitální době", "závěrem lze říci", "pojďme se podívat",
  "ponořme se", "hraje klíčovou roli", "nedílnou součástí", "v konečném důsledku", "bezesporu",
  "nepochybně", "v rychle se měnícím",
];

const leadTs = fs.readFileSync(path.join(ROOT, "lib", "lead.ts"), "utf8");
const interestsBlock = leadTs.slice(leadTs.indexOf("export const INTERESTS"), leadTs.indexOf("];", leadTs.indexOf("export const INTERESTS")));
const INTERESTS = new Set([...interestsBlock.matchAll(/\{ id: "([a-z-]+)", label:/g)].map((m) => m[1]));

const norm = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
const plainWords = (s) =>
  s.replace(/<[^>]+>/g, " ").replace(/\]\([^)]*\)/g, "]").replace(/[#*_>[\]|`]/g, " ").split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
const toStr = (v) => (v instanceof Date ? v.toISOString() : typeof v === "string" ? v.trim() : undefined);
const stems = (kw) => norm(kw).split(/[^a-z0-9.]+/).filter((w) => w.length >= 3).map((w) => w.slice(0, 5));
const hasStems = (text, kw) => {
  const t = norm(text);
  return stems(kw).every((s) => t.includes(s));
};
/** Text bez bloků kódu (v nich JSX ani {…} nevadí). */
const withoutCode = (s) => s.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");

// ── Existence interních odkazů podle složky app/ ──────────────────────────
function routeExists(href) {
  const clean = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (clean === "/") return true;
  if (fs.existsSync(path.join(ROOT, "public", clean))) return true;
  let dir = path.join(ROOT, "app");
  for (const seg of clean.slice(1).split("/")) {
    const exact = path.join(dir, seg);
    if (fs.existsSync(exact) && fs.statSync(exact).isDirectory()) {
      dir = exact;
      continue;
    }
    const dynamic = fs.readdirSync(dir).find((d) => /^\[[^\]]+\]$/.test(d));
    if (!dynamic) return false;
    dir = path.join(dir, dynamic);
  }
  return ["page.tsx", "page.ts", "route.ts"].some((f) => fs.existsSync(path.join(dir, f)));
}

// ── Načtení článků ────────────────────────────────────────────────────────
function load(file) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const offset = raw.split("\n---")[0].split("\n").length + 1; // řádek, kde začíná tělo
  return { file, slug: file.replace(/\.mdx$/, ""), data, body: content, offset };
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));
const posts = files.map(load);
const bySlug = new Map(posts.map((p) => [p.slug, p]));

const args = process.argv.slice(2);
const targets = args.length
  ? args.map((a) => path.basename(a.normalize("NFC"))).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
  : files;
const checkQueue = !args.length || args.some((a) => a.endsWith("_fronta.json"));

const report = [];
let errorCount = 0;

async function checkPost(p) {
  const E = (m) => (report.push(`${p.file}: E ${m}`), errorCount++);
  const W = (m) => report.push(`${p.file}: W ${m}`);
  const d = p.data;
  const title = toStr(d.title) ?? "";
  const seoTitle = toStr(d.seoTitle);
  const description = toStr(d.description) ?? "";
  const keyword = toStr(d.keyword) ?? "";
  const date = toStr(d.date)?.slice(0, 10);
  const publishAt = toStr(d.publishAt);
  const answer = toStr(d.answer) ?? "";
  const takeaways = Array.isArray(d.takeaways) ? d.takeaways : [];
  const faq = Array.isArray(d.faq) ? d.faq : [];
  const automated = Boolean(publishAt); // nové články mají vždy publishAt a plnou strukturu

  // Frontmatter
  for (const k of ["title", "description", "excerpt", "keyword", "category", "date"]) {
    if (!toStr(d[k])) E(`chybí ve frontmatteru: ${k}`);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) E("název souboru (slug) jen malá písmena bez diakritiky a pomlčky");
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) E(`date musí být YYYY-MM-DD, je "${date}"`);
  const updated = toStr(d.updated)?.slice(0, 10);
  if (updated && (!/^\d{4}-\d{2}-\d{2}$/.test(updated) || (date && updated < date))) E("updated musí být YYYY-MM-DD a ne dřív než date");
  if (publishAt) {
    const t = Date.parse(publishAt);
    if (Number.isNaN(t)) E(`publishAt není platné datum: ${publishAt}`);
    else {
      const pragueDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Prague" }).format(new Date(t));
      if (date !== pragueDay) E(`date (${date}) musí být den vydání podle publishAt (${pragueDay})`);
    }
  }
  if (d.interest && !INTERESTS.has(d.interest)) E(`interest "${d.interest}" není v lib/lead.ts (${[...INTERESTS].join(", ")})`);

  // Titulek, popis, klíčové slovo
  if (title.length > 90) E(`title má ${title.length} znaků, max 90`);
  const serpTitle = seoTitle ?? title;
  if (seoTitle && seoTitle.length > 55) E(`seoTitle má ${seoTitle.length} znaků, max 55 (za něj se přidá " | VIZEON")`);
  else if (serpTitle.length + 9 > 64) W(`titulek ve výsledcích (${serpTitle.length + 9} znaků s " | VIZEON") se ořízne, přidej seoTitle do 55 znaků`);
  if (description.length < 70 || description.length > 180) E(`description má ${description.length} znaků, má 120–160`);
  else if (description.length < 120 || description.length > 160) W(`description má ${description.length} znaků, ideál 120–160`);
  if (keyword) {
    if (!hasStems(serpTitle, keyword) && !hasStems(title, keyword)) E(`klíčové slovo "${keyword}" není v title ani seoTitle`);
    if (!hasStems(description, keyword)) W("klíčové slovo chybí v description");
    const intro = plainWords(`${answer} ${p.body}`).slice(0, 120).join(" ");
    if (!hasStems(intro, keyword)) W("klíčové slovo chybí v prvních 120 slovech");
    const clash = posts.find((o) => o !== p && toStr(o.data.keyword) && norm(toStr(o.data.keyword)) === norm(keyword));
    if (clash) E(`klíčové slovo "${keyword}" už má ${clash.file} (kanibalizace)`);
  }

  // Struktura článku (u nových povinná, u starých jen připomínka)
  const answerWords = plainWords(answer).length;
  if (automated) {
    if (!answer) E("chybí answer (stručná odpověď 40–60 slov)");
    else if (answerWords < 30 || answerWords > 90) E(`answer má ${answerWords} slov, má 40–60`);
    else if (answerWords < 40 || answerWords > 60) W(`answer má ${answerWords} slov, ideál 40–60`);
    if (takeaways.length < 3 || takeaways.length > 6) E(`takeaways má ${takeaways.length} bodů, má 3–5`);
    if (faq.length < 3 || faq.length > 6) E(`faq má ${faq.length} otázek, má 3–5`);
    if (faq.some((f) => !f?.q || !f?.a)) E("každá položka faq potřebuje q i a");
    if (!Array.isArray(d.secondaryKeywords) || !d.secondaryKeywords.length) W("chybí secondaryKeywords");
    if (!d.targetPage) E("chybí targetPage (prodejní stránka, na kterou článek vede)");
    if (!d.interest) E("chybí interest (předvýběr ve formuláři)");
  } else if (!answer || !faq.length) {
    W("starší článek bez answer/takeaways/faq, doplň při nejbližší aktualizaci");
  }

  // Tělo: MDX, komponenty, nadpisy, odkazy
  const body = withoutCode(p.body);
  try {
    await compile(p.body, { remarkPlugins: [remarkGfm] });
  } catch (err) {
    const line = err?.place?.line ?? err?.line;
    E(`MDX se nedá sestavit${line ? ` (řádek ${line + p.offset - 1})` : ""}: ${err?.reason ?? err?.message}`);
  }
  for (const m of body.matchAll(/<([A-Za-z][A-Za-z0-9]*)/g)) {
    if (/^[a-z]/.test(m[1])) E(`HTML značka <${m[1]}>, piš Markdown`);
    else if (!COMPONENTS.has(m[1])) E(`neznámá komponenta <${m[1]}>, povolené: ${[...COMPONENTS].join(", ")}`);
    else if (m[1] === "Vizeon" || m[1] === "Alteno") W(`<${m[1]} /> v textu není potřeba, piš prosté ${m[1].toUpperCase()}`);
  }
  if (/\{[^}\n]*\}/.test(body)) E("výraz {…} v textu, MDX ho na webu zahodí");
  if (/^# /m.test(body)) E("nadpis # v těle, H1 je title");
  if (/^#{4,} /m.test(body)) W("nadpis #### a nižší, drž se ## a ###");
  for (const [, alt, src] of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) {
    if (!alt.trim()) E(`obrázek ${src} bez alt textu`);
    if (src.startsWith("/") && !fs.existsSync(path.join(ROOT, "public", src))) E(`obrázek ${src} není v public/`);
  }
  const linkText = body.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  const h2 = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  if (automated && (h2.length < 4 || h2.length > 10)) W(`${h2.length} nadpisů H2, ideál 5–8`);
  if (automated && h2.length && h2.filter((h) => h.trim().endsWith("?")).length < Math.ceil(h2.length / 2)) {
    W("méně než polovina H2 je otázka, jak ji lidé hledají");
  }

  const internal = [
    ...[...linkText.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]),
    ...Object.entries(COMPONENT_LINKS).flatMap(([c, hrefs]) => (body.includes(`<${c}`) ? hrefs : [])),
  ];
  const links = (n) => `${n} ${n === 1 ? "interní odkaz" : n < 5 && n > 1 ? "interní odkazy" : "interních odkazů"}`;
  for (const href of new Set(internal)) {
    const blog = href.match(/^\/blog\/([^/#?]+)$/);
    if (blog) {
      const target = bySlug.get(blog[1]);
      if (!target) E(`odkaz na neexistující článek ${href}`);
      else if (toStr(target.data.publishAt) && (!publishAt || Date.parse(toStr(target.data.publishAt)) > Date.parse(publishAt))) {
        E(`odkaz na ${href}, který vyjde až po tomhle článku`);
      }
    } else if (!routeExists(href)) E(`odkaz na neexistující stránku ${href}`);
  }
  if (internal.length < 2) (automated ? E : W)(`${links(internal.length)}, mají být aspoň 3`);
  else if (internal.length < 3) W(`${links(internal.length)}, ideál 3–5`);
  if (d.targetPage) {
    if (!routeExists(d.targetPage)) E(`targetPage ${d.targetPage} neexistuje`);
    else if (!internal.some((h) => h.split(/[?#]/)[0] === d.targetPage)) E(`v textu chybí odkaz na targetPage ${d.targetPage}`);
  }
  if (/\]\(https?:\/\/(www\.)?vizeon\.cz/.test(body)) W("odkaz na vizeon.cz piš relativně (/cesta)");

  // Značka VIZEON / ALTENO
  const text = [title, description, toStr(d.excerpt) ?? "", answer, ...takeaways, ...faq.flatMap((f) => [f?.q ?? "", f?.a ?? ""]), body]
    .join("\n")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/https?:\/\/\S+|[\w.-]+@[\w.-]+/g, " ");
  for (const m of text.matchAll(/\b(vizeon|alteno)([a-záčďéěíňóřšťúůýž]+)/gi)) {
    E(`skloňovaná značka "${m[0]}", piš třeba "pod značkou ${m[1].toUpperCase()}"`);
  }
  for (const m of text.matchAll(/\b(vizeon|alteno)\b(?!\.[a-z])/gi)) {
    if (m[0] !== m[0].toUpperCase()) E(`značka "${m[0]}" verzálkami: ${m[0].toUpperCase()}`);
  }

  // Styl
  const lower = norm(text);
  const found = AI_PHRASES.filter((ph) => lower.includes(norm(ph)));
  if (found.length) W(`fráze typické pro AI: ${found.join(", ")}`);
  const dashes = (body.match(/ [—–] /g) ?? []).length;
  if (dashes > 3) W(`${dashes}× pomlčka jako spojka, piš čárkou, dvojtečkou nebo novou větou`);
  const longest = Math.max(0, ...body.split(/\n{2,}/).filter((b) => !/^\s*(#|\||[-*] |\d+\. )/.test(b)).map((b) => plainWords(b).length));
  if (longest > 130) W(`nejdelší odstavec má ${longest} slov, rozděl ho (max ~90)`);
  const words = plainWords(`${answer} ${takeaways.join(" ")} ${p.body} ${faq.map((f) => `${f?.q} ${f?.a}`).join(" ")}`).length;
  if (automated && words < 500) E(`článek má ${words} slov, minimum 700`);
  else if (automated && words < 700) W(`článek má ${words} slov, ideál 900–1600`);
}

function checkQueueFile() {
  if (!fs.existsSync(QUEUE)) return;
  const E = (m) => (report.push(`_fronta.json: E ${m}`), errorCount++);
  let q;
  try {
    q = JSON.parse(fs.readFileSync(QUEUE, "utf8"));
  } catch (err) {
    return E(`neplatný JSON: ${err.message}`);
  }
  const items = Array.isArray(q.items) ? q.items : (E("chybí pole items"), []);
  const slugs = new Set();
  const slots = new Map();
  for (const it of items) {
    const id = it.slug ?? "(bez slugu)";
    if (!it.slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(it.slug)) E(`${id}: slug jen malá písmena bez diakritiky a pomlčky`);
    if (slugs.has(it.slug)) E(`${id}: slug je ve frontě dvakrát`);
    slugs.add(it.slug);
    if (!QUEUE_STATUSES.has(it.status)) E(`${id}: status musí být ${[...QUEUE_STATUSES].join(" | ")}`);
    if (!it.keyword) E(`${id}: chybí keyword`);
    if (it.interest && !INTERESTS.has(it.interest)) E(`${id}: interest "${it.interest}" neexistuje`);
    if (it.targetPage && !routeExists(it.targetPage)) E(`${id}: targetPage ${it.targetPage} neexistuje`);
    if (it.status === "schvaleno" || it.status === "napsano") {
      if (!it.publishAt || Number.isNaN(Date.parse(it.publishAt))) E(`${id}: schválené téma potřebuje publishAt`);
      else if (slots.has(it.publishAt)) E(`${id}: termín ${it.publishAt} má už ${slots.get(it.publishAt)}`);
      else slots.set(it.publishAt, id);
      if (!it.targetPage) E(`${id}: schválené téma potřebuje targetPage`);
    }
    const clash = posts.find((p) => toStr(p.data.keyword) && norm(toStr(p.data.keyword)) === norm(it.keyword ?? "") && p.slug !== it.slug);
    if (clash && it.status !== "zamitnuto") E(`${id}: klíčové slovo "${it.keyword}" už má ${clash.file}`);
  }
}

for (const f of targets) {
  const p = bySlug.get(f.replace(/\.mdx$/, ""));
  if (!p) {
    report.push(`${f}: E soubor není v content/blog`);
    errorCount++;
    continue;
  }
  await checkPost(p);
}
if (checkQueue) checkQueueFile();

const warnCount = report.length - errorCount;
for (const line of report) console.log(line);
console.log(`\nblog:check: článků ${targets.length}, chyb ${errorCount}, upozornění ${warnCount}`);
process.exit(errorCount ? 1 : 0);
