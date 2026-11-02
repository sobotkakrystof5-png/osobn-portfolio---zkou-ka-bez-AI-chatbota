// Nafotí screenshoty projektů z lib/data/portfolio.ts pro mockupy MacBooku a iPhonu
// v sekci Projekty (/ukazky-webu) a zapíše jejich rozměry do lib/data/portfolio-screens.ts.
//
//   node scripts/capture-portfolio.mjs             všechny projekty
//   node scripts/capture-portfolio.mjs prvotka     jen vybrané slugy
//
// Potřebuje nainstalovaný Google Chrome (cesta jde přepsat přes CHROME_PATH).
// Pro každý projekt vznikne v public/portfolio/screens:
//   {slug}-desktop.jpg       první obrazovka na MacBooku Pro 14" (1512×982, @2x)
//   {slug}-desktop-full.jpg  celá stránka pro posouvání v detailu projektu
//   {slug}-mobile-{n}.jpg    1 až 3 obrazovky na iPhonu 16 Pro (402×874, @3x)
import { chromium } from "playwright-core";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/portfolio/screens");
const dataFile = path.join(root, "lib/data/portfolio-screens.ts");
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Slug a URL bereme přímo z dat, ať se seznam projektů nevede na dvou místech.
const source = fs.readFileSync(path.join(root, "lib/data/portfolio.ts"), "utf8");
const projects = [...source.matchAll(/slug: "([^"]+)"[\s\S]*?url: "([^"]+)"/g)].map((m) => ({ slug: m[1], url: m[2] }));
const only = process.argv.slice(2);

const DESKTOP = { viewport: { width: 1512, height: 982 }, deviceScaleFactor: 2 };
const MOBILE = {
  viewport: { width: 402, height: 874 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
};
const FULL_WIDTH = 1800; // šířka celostránkového screenshotu v px
const FULL_MAX_CSS_HEIGHT = 10000; // delší stránky se uříznou, ať soubor nemá desítky MB
const MOBILE_STOPS = [0, 0.4, 0.75]; // kde v délce stránky se fotí mobilní obrazovky

const consent = /^(přijmout( vše| všechny)?|souhlasím|rozumím|povolit vše|akceptovat( vše)?|accept( all)?|ok)$/i;

async function open(context, url) {
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(3500); // úvodní animace
  for (const button of await page.locator("button, a[role=button]").all()) {
    const text = ((await button.innerText().catch(() => "")) || "").trim();
    if (consent.test(text) && (await button.isVisible().catch(() => false))) {
      await button.click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(600);
      break;
    }
  }
  return page;
}

// Projede stránku dolů, aby se spustily animace při scrollu, a vrátí se nahoru.
async function scrollThrough(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(140);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  return height;
}

const jpeg = (input, file, quality = 82) =>
  sharp(input, { limitInputPixels: false }).jpeg({ quality, mozjpeg: true }).toFile(path.join(outDir, file));

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chromePath });

for (const { slug, url } of projects) {
  if (only.length && !only.includes(slug)) continue;
  console.log(`→ ${slug}`);

  const desktop = await browser.newContext({ ...DESKTOP, locale: "cs-CZ" });
  let page = await open(desktop, url);
  await jpeg(await page.screenshot(), `${slug}-desktop.jpg`);
  const height = Math.min(await scrollThrough(page), FULL_MAX_CSS_HEIGHT);
  const full = await page.screenshot({ fullPage: true, clip: { x: 0, y: 0, width: DESKTOP.viewport.width, height } });
  await sharp(full, { limitInputPixels: false })
    .resize({ width: FULL_WIDTH })
    .jpeg({ quality: 74, mozjpeg: true, progressive: true })
    .toFile(path.join(outDir, `${slug}-desktop-full.jpg`));
  await desktop.close();

  const mobile = await browser.newContext({ ...MOBILE, locale: "cs-CZ" });
  page = await open(mobile, url);
  const mobileHeight = await scrollThrough(page);
  const travel = mobileHeight - MOBILE.viewport.height;
  // Krátká stránka (do dvou obrazovek) dostane jen jeden telefon.
  const stops = travel < MOBILE.viewport.height ? [0] : MOBILE_STOPS;
  for (const [i, stop] of stops.entries()) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(travel * stop));
    await page.waitForTimeout(1300);
    await jpeg(await page.screenshot(), `${slug}-mobile-${i + 1}.jpg`);
  }
  await mobile.close();
}
await browser.close();

// Rozměry celostránkových screenshotů a počty mobilních obrazovek pro všechny
// projekty, které mají screenshoty na disku (i ty, co se tentokrát nefotily).
const meta = {};
for (const { slug } of projects) {
  const fullFile = path.join(outDir, `${slug}-desktop-full.jpg`);
  if (!fs.existsSync(fullFile)) continue;
  const { width, height } = await sharp(fullFile).metadata();
  let mobile = 0;
  while (fs.existsSync(path.join(outDir, `${slug}-mobile-${mobile + 1}.jpg`))) mobile++;
  meta[slug] = { full: { width, height }, mobile };
}

fs.writeFileSync(
  dataFile,
  `// Vygenerováno skriptem scripts/capture-portfolio.mjs, ručně neupravovat.
// Rozměry celostránkového screenshotu (px) a počet mobilních obrazovek projektu.
export const screenMeta: Record<string, { full: { width: number; height: number }; mobile: number }> = ${JSON.stringify(meta, null, 2)};
`,
);
console.log(`✓ ${Object.keys(meta).length} projektů v lib/data/portfolio-screens.ts`);
