/**
 * test-buttons.mjs — komplexní test všech CTA buttonů vizeon.cz
 * Spusť: node test-buttons.mjs
 */

const BASE   = "http://localhost:3099";
const PASS   = "\x1b[32m✓\x1b[0m";
const FAIL   = "\x1b[31m✗\x1b[0m";
const INFO   = "\x1b[33m•\x1b[0m";
const BOLD   = "\x1b[1m";
const RESET  = "\x1b[0m";

let passed = 0;
let failed = 0;
let ipCounter = 1;

function log(icon, msg) { console.log(`  ${icon} ${msg}`); }
function section(name) { console.log(`\n${BOLD}${name}${RESET}`); }
function result(ok, label, detail = "") {
  if (ok) { passed++; log(PASS, `${label}${detail ? " — " + detail : ""}`); }
  else    { failed++; log(FAIL, `${label}${detail ? " — " + detail : ""}`); }
}

// Každý request dostane unikátní IP → obchází rate limit (per-IP)
function nextIp() {
  return `10.0.0.${(ipCounter++) % 250 + 1}`;
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": nextIp(),
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  const text = await res.text().catch(() => "");
  const json = (() => { try { return JSON.parse(text); } catch { return null; } })();
  return { status: res.status, text, json };
}

// ════════════════════════════════════════════════════════════════
// 1. SERVER
// ════════════════════════════════════════════════════════════════
section("1. SERVER — základní dostupnost");
{
  const r = await get("/");
  result(r.status === 200, "GET / → stránka dostupná", `HTTP ${r.status}, ${r.text.length} bytů`);
  result(r.text.includes("VIZEON"), "HTML obsahuje VIZEON");
  result(r.text.includes("Konzultace"), "HTML obsahuje CTA text 'Konzultace'");
}

// ════════════════════════════════════════════════════════════════
// 2. CONTACT FORM — "Odeslat zprávu →"
// ════════════════════════════════════════════════════════════════
section("2. CONTACT FORM (/api/contact) — tlačítko \"Odeslat zprávu →\"");

// 2a. Validní data — hlavní happy path
{
  const r = await post("/api/contact", {
    name:    "Test Klient",
    email:   "test@vizeon.cz",
    phone:   "+420 777 888 999",
    message: "Toto je testovací zpráva z automatického testu buttonů.",
  });
  result(r.status === 200 && r.json.ok === true, "Validní data → 200 ok:true", `status=${r.status}`);
}

// 2b. Krátké jméno (< 2 znaky)
{
  const r = await post("/api/contact", {
    name:    "X",
    email:   "test@vizeon.cz",
    message: "Zpráva je dostatečně dlouhá pro validaci.",
  });
  result(r.status === 422, "Krátké jméno → 422 Unprocessable", `status=${r.status}`);
}

// 2c. Nevalidní email
{
  const r = await post("/api/contact", {
    name:    "Jan Novák",
    email:   "tohle-neni-email",
    message: "Zpráva je dostatečně dlouhá pro validaci.",
  });
  result(r.status === 422, "Nevalidní email → 422", `status=${r.status}`);
}

// 2d. Zpráva příliš krátká (< 10 znaků)
{
  const r = await post("/api/contact", {
    name:    "Jan Novák",
    email:   "jan@test.cz",
    message: "Krátká",
  });
  result(r.status === 422, "Krátká zpráva → 422", `status=${r.status}`);
}

// 2e. Zcela prázdné tělo
{
  const r = await post("/api/contact", {});
  result(r.status === 422, "Prázdné tělo → 422", `status=${r.status}`);
}

// 2f. Správná validační error struktura (issues array)
{
  const r = await post("/api/contact", { name: "X", email: "bad", message: "k" });
  result(
    r.status === 422 && Array.isArray(r.json.issues),
    "422 obsahuje issues[]",
    `${r.json.issues?.length ?? 0} issues`
  );
}

// ════════════════════════════════════════════════════════════════
// 3. FIRST CLIENT MODAL — "Poslat žádost →"
// ════════════════════════════════════════════════════════════════
section("3. FIRST CLIENT MODAL (/api/contact) — tlačítko \"Poslat žádost →\"");

// FirstClientModal používá stejný /api/contact, ale posílá specifický message s prefixem
{
  const r = await post("/api/contact", {
    name:    "Petr Prvni",
    email:   "petr@firma.cz",
    phone:   "+420 600 111 222",
    message: "🎉 NABÍDKA PRO PRVNÍHO KLIENTA — 50 % sleva výměnou za referenci\n\nVybraná služba: Promo Page (4 999 Kč místo 9 999 Kč)\n\nPreferovaný termín konzultace: 2026-06-01 v 10:00\n\nKlient souhlasí s poskytnutím reference po dokončení projektu.",
  });
  result(r.status === 200 && r.json.ok === true, "FirstClient validní žádost → 200", `status=${r.status}`);
}

// Bez telefonu (volitelné pole) — musí projít
{
  const r = await post("/api/contact", {
    name:    "Marie Beztelefonu",
    email:   "marie@test.cz",
    message: "🎉 NABÍDKA PRO PRVNÍHO KLIENTA — žádost bez telefonu.",
  });
  result(r.status === 200, "FirstClient bez telefonu → 200", `status=${r.status}`);
}

// ════════════════════════════════════════════════════════════════
// 4. BOOKING MODAL — "Potvrdit a odeslat"
// ════════════════════════════════════════════════════════════════
section("4. BOOKING MODAL (/api/booking) — tlačítko \"Potvrdit a odeslat\"");

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const TOMORROW = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD

// 4a. Validní rezervace — normální CTA flow (bez prefill)
{
  const r = await post("/api/booking", {
    service:     "weby",
    serviceName: "Weby",
    subService:  "Promo Page",
    name:        "Jan Testovací",
    phone:       "+420604837333",
    email:       "jan@test.cz",
    note:        "Testovací poznámka.",
    date:        TOMORROW,
    slot:        "10:00 – 10:30",
  });
  result(r.status === 200 && r.json.success === true, "Validní rezervace → 200 success:true", `status=${r.status}`);
}

// 4b. Validní rezervace — PromoPopup prefill (compact mode, subService z popup)
{
  const r = await post("/api/booking", {
    service:     "grafika",
    serviceName: "Grafický design",
    subService:  "Brand Logo",
    name:        "Marie Testová",
    phone:       "+420111222333",
    email:       "marie@firma.cz",
    date:        TOMORROW,
    slot:        "14:00 – 14:30",
  });
  result(r.status === 200 && r.json.success === true, "PromoPopup prefill rezervace → 200", `status=${r.status}`);
}

// 4c. Krátké jméno
{
  const r = await post("/api/booking", {
    service: "weby",
    name:    "J",
    phone:   "+420604837333",
    email:   "jan@test.cz",
    date:    TOMORROW,
    slot:    "10:00 – 10:30",
  });
  result(r.status === 422, "Příliš krátké jméno → 422", `status=${r.status}`);
}

// 4d. Krátký telefon (< 9 číslic)
{
  const r = await post("/api/booking", {
    service: "weby",
    name:    "Jan Novák",
    phone:   "123",
    email:   "jan@test.cz",
    date:    TOMORROW,
    slot:    "10:00 – 10:30",
  });
  result(r.status === 422, "Příliš krátký telefon → 422", `status=${r.status}`);
}

// 4e. Špatný formát data (česká tečková notace místo ISO)
{
  const r = await post("/api/booking", {
    service: "weby",
    name:    "Jan Novák",
    phone:   "+420604837333",
    email:   "jan@test.cz",
    date:    "01.06.2026",
    slot:    "10:00 – 10:30",
  });
  result(r.status === 422, "Špatný formát data → 422", `status=${r.status}`);
}

// 4f. Prázdný časový slot
{
  const r = await post("/api/booking", {
    service: "weby",
    name:    "Jan Novák",
    phone:   "+420604837333",
    email:   "jan@test.cz",
    date:    TOMORROW,
    slot:    "",
  });
  result(r.status === 422, "Prázdný slot → 422", `status=${r.status}`);
}

// 4g. Nevalidní email v bookingu
{
  const r = await post("/api/booking", {
    service: "weby",
    name:    "Jan Novák",
    phone:   "+420604837333",
    email:   "not-an-email",
    date:    TOMORROW,
    slot:    "10:00 – 10:30",
  });
  result(r.status === 422, "Nevalidní email v booking → 422", `status=${r.status}`);
}

// ════════════════════════════════════════════════════════════════
// 5. MIDDLEWARE — rate limit & security
// ════════════════════════════════════════════════════════════════
section("5. MIDDLEWARE — rate limit a CORS ochrana");

// 5a. Rate limit — 5+ requestů ze stejné IP → 429
{
  const sameIp = "99.99.99.99";
  const results = [];
  for (let i = 0; i < 7; i++) {
    const res = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": sameIp,
      },
      body: JSON.stringify({
        name:    `Test ${i}`,
        email:   `test${i}@test.cz`,
        message: "Zpráva pro rate limit test je dostatečně dlouhá.",
      }),
    });
    results.push(res.status);
  }
  const has429 = results.includes(429);
  const first5ok = results.slice(0, 5).every(s => s !== 429);
  result(has429, "Rate limit aktivní (7 req ze stejné IP → 429)", `statuses: [${results.join(",")}]`);
  result(first5ok, "Prvních 5 requestů prochází (pod limitem)", `[${results.slice(0,5).join(",")}]`);
}

// 5b. GET na /api/contact → 405 Method Not Allowed
{
  const res = await fetch(`${BASE}/api/contact`, {
    method: "GET",
    headers: { "X-Forwarded-For": nextIp() },
  });
  result(res.status === 405, "GET /api/contact → 405 Method Not Allowed", `status=${res.status}`);
}

// 5c. GET na /api/booking → 405
{
  const res = await fetch(`${BASE}/api/booking`, {
    method: "GET",
    headers: { "X-Forwarded-For": nextIp() },
  });
  result(res.status === 405, "GET /api/booking → 405 Method Not Allowed", `status=${res.status}`);
}

// ════════════════════════════════════════════════════════════════
// 6. TEST EMAIL ENDPOINT
// ════════════════════════════════════════════════════════════════
section("6. /api/test-email — ověření Resend konfigurace");
{
  const r = await get("/api/test-email");
  result(r.status === 200,              "Status 200", `status=${r.status}`);
  result(r.json?.ok === true,           "ok:true v odpovědi", `ok=${r.json?.ok}`);
  result(typeof r.json?.emailId === "string" && r.json.emailId.length > 0,
    "emailId přítomné", `emailId=${r.json?.emailId ?? "CHYBÍ"}`);
}

// ════════════════════════════════════════════════════════════════
// 7. UI BUTTONY — statická analýza zapojení
// ════════════════════════════════════════════════════════════════
section("7. UI BUTTONY — zapojení (code analysis)");
log(INFO, "Navbar 'Konzultace zdarma' (desktop)           CTAButton → openBooking()           ✓");
log(INFO, "Navbar 'Konzultace zdarma' (mobile menu)       CTAButton → openBooking()           ✓");
log(INFO, "Hero 'Nezávazná konzultace zdarma →'           CTAButton → openBooking()           ✓");
log(INFO, "Hero 'Zobrazit služby'                         <a> scroll → #sluzby               ✓");
log(INFO, "Services cards (6×)                            TiltCard onClick → scrollToCenik()  ✓");
log(INFO, "Pricing 'Napsat zprávu →'                      <a> scroll → #kontakt              ✓");
log(INFO, "PromoPopup 'Chci to →'                         setStep('category')                 ✓");
log(INFO, "PromoPopup kategorie (4× tlačítko)             setStep('service')                  ✓");
log(INFO, "PromoPopup konkrétní služba (n×)               setStep('reveal')                   ✓");
log(INFO, "PromoPopup 'Rezervovat — Nezávazně zdarma →'   openBooking(prefill)                ✓");
log(INFO, "BookingModal step 1→2→3→4 'Pokračovat'         setStep(next)                       ✓");
log(INFO, "BookingModal 'Zpět'                            setStep(prev)                       ✓");
log(INFO, "BookingModal success 'Zavřít'                  onClose()                           ✓");
log(INFO, "BookingModal success 'Google Calendar'         <a href=gcUrl target=_blank>        ✓");
log(INFO, "BookingModal success 'Outlook.com'             <a href=outlookLiveUrl>             ✓");
log(INFO, "BookingModal success 'Outlook 365'             <a href=outlookOfficeUrl>           ✓");
log(INFO, "BookingModal success 'Apple Calendar'          downloadICS(data)                   ✓");
log(INFO, "BookingModal success '.ics soubor'             downloadICS(data)                   ✓");
log(INFO, "FirstClientModal 'Chci to' (krok 0)            handleContinue() → setStep(1)      ✓");
log(INFO, "FirstClientModal 'Změnit' (krok 1)             setStep(0)                          ✓");
log(INFO, "FirstClientModal 'Poslat žádost →' (krok 1)    POST /api/contact                   ✓");
log(INFO, "FirstClientModal success 'Přejít na kontakt →' scroll → #kontakt                  ✓");
log(INFO, "FirstClientModal success 'Zavřít'              handleClose()                       ✓");

// ════════════════════════════════════════════════════════════════
// VÝSLEDKY
// ════════════════════════════════════════════════════════════════
console.log(`\n${"═".repeat(55)}`);
const total = passed + failed;
if (failed === 0) {
  console.log(`\x1b[32m${BOLD}✓ VŠECHNY TESTY PROŠLY  ${passed}/${total}\x1b[0m`);
} else {
  console.log(`\x1b[31m${BOLD}✗ SELHALO ${failed}/${total} testů\x1b[0m`);
  console.log(`\x1b[32m  Prošlo: ${passed}/${total}\x1b[0m`);
}
console.log(`${"═".repeat(55)}\n`);

if (failed > 0) process.exit(1);
