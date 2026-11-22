#!/usr/bin/env node
// Fronta témat blogu (content/blog/_fronta.json) a termíny vydání.
//
//   npm run blog:queue -- list               přehled fronty
//   npm run blog:queue -- slots [n]          další volné termíny (ne, st, pá 14:00 Praha)
//   npm run blog:queue -- next [--id slug] [--within dní]
//                                            další schválené téma k napsání (pro blog-write.yml)
//   npm run blog:queue -- due                je teď co vydat? (pro blog-publish.yml)
//
// next a due zapisují výsledek i do $GITHUB_OUTPUT, když běží v GitHub Actions.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";

const TZ = "Europe/Prague";
const PUBLISH_DAYS = ["Sun", "Wed", "Fri"];
const PUBLISH_TIME = "14:00:00";
const SITE = "https://vizeon.cz";
const DIR = path.join(process.cwd(), "content", "blog");
const QUEUE = path.join(DIR, "_fronta.json");

const [cmd = "list", ...rest] = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = rest.indexOf(name);
  return i >= 0 && rest[i + 1] !== undefined ? rest[i + 1] : fallback;
};

const queue = () => JSON.parse(fs.readFileSync(QUEUE, "utf8"));
const postFiles = () => fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));
const pragueDay = (d) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
const pragueWeekday = (d) => new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(d);
const pragueOffset = (d) =>
  new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "longOffset" })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")
    .value.replace("GMT", "") || "+00:00";
const fmt = (iso) => new Date(iso).toLocaleString("cs-CZ", { timeZone: TZ, weekday: "short", day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" });

function output(values) {
  const lines = Object.entries(values).map(([k, v]) => `${k}=${v}`);
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, lines.join("\n") + "\n");
  console.log(JSON.stringify(values, null, 2));
}

/** Termíny vydání od teď: ne/st/pá 14:00 pražského času s posunem (+01:00 / +02:00). */
function upcomingSlots(count, taken = new Set()) {
  const out = [];
  // Poledne UTC je v Praze vždy týž den, takže krok po 24 h nepřeskočí den ani přes změnu času.
  const start = Date.parse(`${pragueDay(new Date())}T12:00:00Z`);
  for (let i = 0; out.length < count && i < 800; i++) {
    const noon = new Date(start + i * 86_400_000);
    if (!PUBLISH_DAYS.includes(pragueWeekday(noon))) continue;
    const iso = `${pragueDay(noon)}T${PUBLISH_TIME}${pragueOffset(noon)}`;
    if (Date.parse(iso) <= Date.now() || taken.has(Date.parse(iso))) continue;
    out.push(iso);
  }
  return out;
}

function remoteBlogBranches() {
  try {
    return new Set(
      execSync("git ls-remote --heads origin 'blog/*'", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
        .split("\n")
        .map((l) => l.split("refs/heads/")[1])
        .filter(Boolean),
    );
  } catch {
    return new Set();
  }
}

if (cmd === "list") {
  const files = new Set(postFiles().map((f) => f.replace(/\.mdx$/, "")));
  const items = queue().items ?? [];
  if (!items.length) console.log("Fronta je prázdná. Témata přidává /blog-plan.");
  for (const it of [...items].sort((a, b) => (a.publishAt ?? "~").localeCompare(b.publishAt ?? "~"))) {
    const when = it.publishAt ? fmt(it.publishAt) : "bez termínu";
    console.log(`${it.status.padEnd(10)} ${when.padEnd(20)} ${it.slug}${files.has(it.slug) ? " (napsáno)" : ""}  [${it.keyword}]`);
  }
} else if (cmd === "slots") {
  const taken = new Set((queue().items ?? []).filter((i) => i.publishAt && i.status !== "zamitnuto").map((i) => Date.parse(i.publishAt)));
  for (const s of upcomingSlots(Number(rest[0] ?? 6), taken)) console.log(`${s}   ${fmt(s)}`);
} else if (cmd === "next") {
  const files = new Set(postFiles().map((f) => f.replace(/\.mdx$/, "")));
  const branches = remoteBlogBranches();
  const within = Number(opt("--within", 4)) * 86_400_000;
  const id = opt("--id", "");
  const open = (queue().items ?? [])
    .filter((i) => i.status === "schvaleno" && !files.has(i.slug) && !branches.has(`blog/${i.slug}`))
    .sort((a, b) => Date.parse(a.publishAt) - Date.parse(b.publishAt));
  const pick = id
    ? open.find((i) => i.slug === id)
    : open.find((i) => Date.parse(i.publishAt) > Date.now() && Date.parse(i.publishAt) - Date.now() <= within);
  if (!pick) {
    output({ found: "false" });
    console.error(id ? `Téma ${id} není schválené, nebo už je napsané či v PR.` : "Žádné schválené téma k napsání v příštích dnech.");
  } else {
    output({ found: "true", slug: pick.slug, keyword: pick.keyword, publishAt: pick.publishAt, branch: `blog/${pick.slug}` });
  }
} else if (cmd === "due") {
  // Vydat = článek je na main, jeho publishAt už prošel (nejvýš před 2 dny) a na webu ještě není.
  const now = Date.now();
  const candidates = postFiles()
    .map((f) => ({ slug: f.replace(/\.mdx$/, ""), publishAt: matter(fs.readFileSync(path.join(DIR, f), "utf8")).data.publishAt }))
    .map((p) => ({ ...p, t: p.publishAt instanceof Date ? p.publishAt.getTime() : Date.parse(p.publishAt) }))
    .filter((p) => p.t <= now && now - p.t < 2 * 86_400_000);
  const missing = [];
  for (const p of candidates) {
    const res = await fetch(`${SITE}/blog/${p.slug}`, { method: "HEAD", redirect: "manual" });
    if (res.status === 404) missing.push(p.slug);
  }
  output({ due: missing.length ? "true" : "false", slugs: missing.join(",") });
} else {
  console.error(`Neznámý příkaz "${cmd}". Použij list | slots | next | due.`);
  process.exit(1);
}
