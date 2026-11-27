import "server-only";

import { TURNSTILE_ACTION } from "@/lib/lead";

// Ověření Cloudflare Turnstile na serveru (formulář poptávky).
//
// Zapne se, až jsou nastavené OBA klíče: NEXT_PUBLIC_TURNSTILE_SITE_KEY
// (prohlížeč, widget) a TURNSTILE_SECRET_KEY (jen server). S jedním z nich by
// buď server chtěl token, který prohlížeč nevyrobí, nebo naopak.
//
// Výsledky:
//   skipped     klíče nejsou, ochrana vypnutá
//   ok          člověk
//   missing     token chybí → poptávka jde jen e-mailem ke kontrole. Skript
//               Cloudflare se u člověka nemusí načíst (blokátor reklam, Brave,
//               firemní síť) nebo token nestihne vydat; odmítnout ho by znamenalo
//               ztratit skutečnou poptávku. Do adminu bez tokenu nejde nic.
//   invalid     Cloudflare token odmítl (podvržený, cizí doména, jiná akce)
//               → poptávka se nepřijme
//   unavailable Cloudflare neodpověděl → poptávka jde jen e-mailem, ať nepropadne

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 5_000;
const PRODUCTION_HOSTS = new Set(["vizeon.cz", "www.vizeon.cz"]);

export type TurnstileResult = "skipped" | "ok" | "missing" | "invalid" | "unavailable";

type SiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
  action?: string;
};

export async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return "skipped";
  if (!token) return "missing";

  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set("remoteip", ip);

  let data: SiteverifyResponse;
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.warn(`[Turnstile] Cloudflare vrátil HTTP ${res.status}`);
      return "unavailable";
    }
    data = (await res.json()) as SiteverifyResponse;
  } catch (error) {
    console.warn(`[Turnstile] Ověření neproběhlo (${error instanceof Error ? error.name : "UnknownError"})`);
    return "unavailable";
  }

  if (!data.success) {
    const codes = data["error-codes"] ?? [];
    console.info(`[Turnstile] Odmítnuto: ${codes.join(", ") || "bez kódu"}`);
    // Chyba na straně Cloudflare není vina návštěvníka.
    return codes.includes("internal-error") ? "unavailable" : "invalid";
  }
  // Testovací klíče Cloudflare (lokálně, náhledy) vracejí prázdnou akci
  // a doménu example.com, proto se akce a doména hlídají jen v produkci.
  if (process.env.VERCEL_ENV !== "production") return "ok";
  if (data.action !== TURNSTILE_ACTION) {
    console.info(`[Turnstile] Jiná akce: ${data.action || "žádná"}`);
    return "invalid";
  }
  if (!PRODUCTION_HOSTS.has(data.hostname ?? "")) {
    console.info(`[Turnstile] Cizí doména: ${data.hostname || "žádná"}`);
    return "invalid";
  }
  return "ok";
}
