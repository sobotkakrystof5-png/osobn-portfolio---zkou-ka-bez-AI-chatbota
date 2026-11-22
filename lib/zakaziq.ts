import "server-only";

import { normalizePhone } from "@/lib/lead";

// Poptávka z kontaktního formuláře do adminu ZakazIQ (repo ZakazIQ,
// app/api/public/vizeon-leads, R-136). Admin ji uloží jako nepotvrzenou
// zakázku do Poptávek z webů a pošle upozornění do zvonku. E-mail zákazníkovi
// ani majiteli admin neposílá.
//
// Klíč je jen v serverovém prostředí jako ZAKAZIQ_LEAD_SECRET (v ZakazIQ
// VIZEON_LEAD_WEBHOOK_SECRET), nikdy v NEXT_PUBLIC_ ani v logu.
//
// Adresa je schválně s www: zakaziq.cz přesměrovává (308) na www a fetch při
// přechodu na jiný host hlavičku s klíčem zahodí.

const ENDPOINT = "https://www.zakaziq.cz/api/public/vizeon-leads";
const TIMEOUT_MS = 8_000;
const RETRY_DELAY_MS = 500;

export type ZakazIqRequest = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  /**
   * Mimo produkci. Admin zkušební poptávky nezná, takže se nic neposílá:
   * jinak by se Poptávky v adminu plnily testy z preview a lokálu.
   */
  test?: boolean;
};

export type ZakazIqIssue = { field: string; message: string };

export type ZakazIqResult =
  | { ok: true }
  | { ok: false; code: string; message?: string; issues?: ZakazIqIssue[] };

type Attempt = { result: ZakazIqResult; retry: boolean };

/**
 * `_idempotencyKey` admin nepoužívá: opakovaný pokus po síťové chybě nebo 5xx
 * může založit poptávku dvakrát. Ztracená poptávka je horší než duplicita.
 */
export async function sendRequest(data: ZakazIqRequest, _idempotencyKey: string): Promise<ZakazIqResult> {
  if (data.test) {
    console.info("[ZakazIQ] Mimo produkci se poptávka do adminu neposílá");
    return { ok: true };
  }

  const secret = process.env.ZAKAZIQ_LEAD_SECRET;
  if (!secret) {
    console.error("[ZakazIQ] ZAKAZIQ_LEAD_SECRET chybí v environment variables");
    return { ok: false, code: "NOT_CONFIGURED" };
  }

  // Jeden opakovaný pokus jen při síťové chybě nebo 5xx.
  const first = await attempt(secret, data);
  if (!first.retry) return first.result;
  await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  return (await attempt(secret, data)).result;
}

async function attempt(secret: string, data: ZakazIqRequest): Promise<Attempt> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "x-vizeon-lead-signature": secret,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        section: "vizeon",
        source: "web_contact_form",
        name: data.name,
        email: data.email,
        // Admin bere nejvýš 30 znaků; formulář telefon už ověřil přes normalizePhone.
        phone: normalizePhone(data.phone) ?? data.phone,
        message: data.message,
      }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    // Text chyby nelogujeme: request nese hlavičku s klíčem.
    const name = error instanceof Error ? error.name : "UnknownError";
    console.error(`[ZakazIQ] Admin nedostupný (typ_chyby=${name})`);
    return { result: { ok: false, code: "NETWORK_ERROR" }, retry: true };
  }

  const body = (await res.json().catch(() => null)) as { success?: boolean; code?: string; error?: string } | null;

  if (res.ok && body?.success) return { result: { ok: true }, retry: false };

  const code = body?.code ?? `HTTP_${res.status}`;
  // Jen kód a stav, žádné osobní údaje z poptávky.
  console.error(`[ZakazIQ] Poptávku nepřevzal (HTTP ${res.status}, ${code})`);
  return {
    result: { ok: false, code, message: body?.error },
    retry: res.status >= 500,
  };
}
