// Jediné místo, kde se skládají odkazy na sesterskou značku ALTENO.
// UTM parametry se nikde jinde v kódu nepíšou ručně, ať se dá provoz
// z VIZEONU na alteno.cz měřit podle jednoho klíče (utm_campaign).

const ALTENO_ORIGIN = "https://www.alteno.cz";

/** Kampaně odpovídají místu odkazu na webu, ne stránce, kam vede. */
export type AltenoCampaign =
  | "home-tile"
  | "home-banner"
  | "home-banner-logo"
  | "home-hero"
  | "automatizace-hero"
  | "automatizace-ai-agenti"
  | "automatizace-automatizace-procesu"
  | "automatizace-chatboti-rag"
  | "automatizace-voice-agenti"
  | "automatizace-rodina"
  | "sluzby"
  | "cenik"
  | "footer"
  | "o-mne";

/**
 * Absolutní odkaz na alteno.cz s UTM značkami.
 *
 * @param path cesta včetně úvodního lomítka, klidně i s hashem („/cenik#kalkulacka")
 * @param campaign místo na VIZEONU, odkud odkaz vede
 */
export function altenoUrl(path: string, campaign: AltenoCampaign): string {
  const [pathname, hash] = path.split("#");
  const query = new URLSearchParams({
    utm_source: "vizeon",
    utm_medium: "cross-sell",
    utm_campaign: campaign,
  });

  return `${ALTENO_ORIGIN}${pathname}?${query.toString()}${hash ? `#${hash}` : ""}`;
}
