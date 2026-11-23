// Sdílené odkazy pro JSON-LD. Firma je na webu jediná entita, definovaná
// v app/layout.tsx. Všechna ostatní schema (provider, publisher, creator)
// na ni odkazují přes @id, aby z toho vyhledávače a AI parsery složily
// jeden graf, ne desítky anonymních kopií „VIZEON“ s různými daty.
export const ORG_ID = "https://vizeon.cz/#organization";
export const ORG_REF = { "@id": ORG_ID } as const;

// Zakladatel jako autor blogu a `founder` firmy. Záměrně jen křestní jméno:
// web ho tak uvádí všude (rozhodnutí majitele, 4. 11. 2026). `url` míří na
// blok „S kým mluvíte“ na /kontakt, protože /o-mne je noindex.
export const FOUNDER_ID = "https://vizeon.cz/#founder";
export const FOUNDER_REF = { "@id": FOUNDER_ID } as const;
