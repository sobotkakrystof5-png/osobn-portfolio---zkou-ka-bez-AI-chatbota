#!/usr/bin/env node
// IndexNow: oznámí změněné stránky Bingu, Seznamu, Yandexu a dalším
// vyhledávačům (api.indexnow.org je rozešle všem). Google IndexNow nepoužívá,
// ten čte sitemap.xml a RSS ze Search Console.
//
// Použití:
//   node scripts/indexnow.mjs                  URL ze sitemapy s lastmod za posledních 7 dní
//   node scripts/indexnow.mjs --days 2         jiné okno
//   node scripts/indexnow.mjs --state f.json   neposílat znovu URL, které se od minula nezměnily
//   node scripts/indexnow.mjs URL [URL...]     jen tyhle adresy (stav se ignoruje)
//   --dry-run                                  nic neposílá, jen vypíše
//
// Klíč není tajný: IndexNow ho ověřuje proti souboru public/<klíč>.txt na webu.
// Spouští ho .github/workflows/indexnow.yml po každém produkčním nasazení.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const HOST = "vizeon.cz";
const KEY = "231970ec451dcc5b99fa5b166e524c3f";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const days = Number(opt("--days") ?? 7);
const statePath = opt("--state");
const explicit = args.filter(
  (a, i) => !a.startsWith("--") && !["--days", "--state"].includes(args[i - 1]),
);

async function fromSitemap() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`Sitemap ${res.status}`);
  const xml = await res.text();
  const since = Date.now() - days * 86_400_000;
  const entries = [];
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]?.trim();
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.trim();
    if (loc && lastmod && Date.parse(lastmod) >= since) entries.push({ loc, lastmod });
  }
  return entries;
}

let entries = explicit.length
  ? explicit.map((loc) => ({ loc, lastmod: null }))
  : await fromSitemap();

const foreign = entries.filter((e) => new URL(e.loc).host !== HOST);
if (foreign.length) {
  console.error(`Cizí doména, IndexNow přijímá jen ${HOST}:`, foreign.map((e) => e.loc));
  process.exit(1);
}

const state = statePath && existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : {};
if (!explicit.length) entries = entries.filter((e) => state[e.loc] !== e.lastmod);

// Soubor se stavem vznikne vždy, ať má workflow co uložit do cache.
const saveState = () => statePath && writeFileSync(statePath, JSON.stringify(state, null, 2));

if (!entries.length) {
  console.log(`Nic nového k oznámení (okno ${days} dní).`);
  saveState();
  process.exit(0);
}

const urlList = entries.map((e) => e.loc);
console.log(`${dryRun ? "[dry-run] " : ""}Oznamuji ${urlList.length} URL:\n  ${urlList.join("\n  ")}`);
if (dryRun) process.exit(0);

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 = přijato, 202 = přijato, klíč se ještě ověřuje
if (res.status !== 200 && res.status !== 202) {
  console.error(`IndexNow odmítl (${res.status}): ${await res.text()}`);
  process.exit(1);
}
console.log(`IndexNow přijal (${res.status}).`);

for (const e of entries) if (e.lastmod) state[e.loc] = e.lastmod;
saveState();
