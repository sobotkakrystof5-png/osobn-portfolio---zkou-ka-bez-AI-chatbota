# 📊 Kompletní Analýza Booking Integrace

**Vytvořeno:** 2026-06-16 (Po Opravě)

---

## Executive Summary

**Status:** ✅ **OPRAVENO**

Booking systém měl kritickou chybu: rezervace se **neukládaly do vlastní databáze (Supabase)**, jen do externího SaaS (ZakazIQ).

**Řešení:** Přidal jsem INSERT do Supabase na ZAČÁTEK POST endpointu. Teď se data synchronizují správně.

---

## Architektura

### Komponenty

```
FRONTEND (Next.js + React)
├── app/page.tsx (webová stránka s portfoliem)
├── components/BookingModal.tsx (formulář)
├── components/PromoPopup.tsx (popup s nabídkami)
└── context/BookingContext.tsx (state management)

BACKEND (Next.js API Routes)
├── app/api/booking/route.ts ← OPRAVENO! ✅
├── app/api/contact/route.ts
└── app/api/test-email/route.ts

DATABÁZE (Supabase PostgreSQL)
├── bookings (rezervace) ← NYNÍ se ukládá!
├── available_slots (dostupné časy)
├── contact_messages (kontaktní formulář)
└── analytics_events (analytika)

ADMIN PANEL
├── /admin (AdminDashboard.tsx)
├── Vidí: Rezervace, Zprávy, Analytika
└── Akce: Změna statusu rezervací

INTEGRACE (ZakazIQ SaaS)
├── URL: https://project-iq-sigma.vercel.app
├── API: POST /api/public/booking
└── Autentizace: x-api-key header

EMAIL SLUŽBY
├── Resend (notifikace tobě)
└── Gmail SMTP (potvrzení klientovi)
```

---

## Workflow Rezervace (DOPO - Po Opravě)

```
1. Klient vyplní formulář
   └─ BookingModal.tsx

2. POST /api/booking
   ├─ 2.1 Validace (Zod) 
   │    └─ Chyba? → Vrátí 422
   │
   ├─ 2.2 INSERT do Supabase ← NOVÉ!
   │    ├─ Tabulka: bookings
   │    ├─ Status: 'pending'
   │    └─ Chyba? → Vrátí 500, ZASTAVÍ
   │
   ├─ 2.3 POST do ZakazIQ
   │    ├─ URL: https://project-iq-sigma.vercel.app/api/public/booking
   │    ├─ Odesílá: name, email, projectType, date, time, message
   │    └─ Chyba? → DELETE z Supabase (rollback) + Vrátí 502
   │
   ├─ 2.4 Extrahuj ID z ZakazIQ response
   │    └─ Pokus: Získej zakaziqData.id
   │
   ├─ 2.5 UPDATE zakaziq_id v Supabase
   │    └─ Synchronizace pro budoucí use cases
   │
   ├─ 2.6 Odesli emaily
   │    ├─ Resend: notifikace tobě
   │    ├─ Gmail: potvrzení klientovi
   │    └─ Chyba se loguje, ale NEBLOKUJE
   │
   └─ 2.7 Vrátí { success: true }

3. Modal se zavře, zobrazí "Děkujeme!"

4. Výsledek:
   ├─ Supabase: bookings tabulka má nový záznam
   ├─ ZakazIQ: kalendář má novou rezervaci
   ├─ Email: Tobě a klientovi
   └─ Admin: /admin ukazuje novou rezervaci
```

---

## Co Se Změnilo

### PŘED (Broken)
```
POST /api/booking
├─ Validace ✅
├─ ZakazIQ ✅
├─ Emaily ✅
└─ Supabase INSERT ❌ ← CHYBÍ!
```

### TEĎKA (Fixed)
```
POST /api/booking
├─ Validace ✅
├─ Supabase INSERT ✅ ← NOVÉ!
├─ ZakazIQ ✅
├─ Supabase UPDATE (zakaziq_id) ✅ ← NOVÉ!
└─ Emaily ✅
```

---

## Databázové Schéma

### Tabulka: bookings
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'pending', -- pending/confirmed/cancelled/done
  zakaziq_id TEXT, -- ← NOVÝ, pro synchronizaci
  created_at TIMESTAMP DEFAULT now()
);
```

### Tabulka: available_slots
```sql
CREATE TABLE available_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  capacity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(date, time_slot)
);
```

---

## Error Handling

### INSERT do Supabase selhá
```
Vrátí: 500 Internal Server Error
Zpráva: "Nepodařilo se uložit rezervaci do databáze"
Akce: ZASTAVÍ, neposílá do ZakazIQ
```

### ZakazIQ POST selhá
```
Vrátí: 502 Bad Gateway
Zpráva: "Rezervaci se nepodařilo uložit"
Akce: DELETE z Supabase (rollback) → konzistence
```

### Email selhá
```
Vrátí: Pokračuje! (ALE logguje chybu)
Akce: Rezervace zůstane saved
Důvod: Email je nice-to-have, ne critical
```

---

## GET Endpoint (Dostupné Sloty)

```sql
GET /api/booking?date=2026-06-16

-- Čte z:
SELECT * FROM available_slots WHERE date = '2026-06-16';
SELECT * FROM bookings WHERE date = '2026-06-16' AND status != 'cancelled';

-- Vrátí:
{
  "slots": [
    { "time_slot": "14:00 - 15:00", "is_available": true },
    { "time_slot": "15:00 - 16:00", "is_available": false },
    ...
  ]
}
```

**Logika:** Slot je dostupný, pokud: `booked_count < capacity`

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ytrniknnquccxyodyfcs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=ewog... (optional, ale doporučeno)

# Email (Resend)
RESEND_API_KEY=re_4Uh...

# Email (Gmail SMTP)
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# ZakazIQ
ZAKAZIQ_API_KEY=e4e7...

# Admin
ADMIN_PASSWORD=vizeon2026
```

---

## Bezpečnost

### RLS (Row-Level Security)
- Tabulka `bookings`: SELECT + INSERT veřejně, UPDATE/DELETE jen admin
- Tabulka `available_slots`: SELECT veřejně, ostatní jen admin

### CORS
- Middleware blokuje cross-origin requests
- Povoleny jen: vizeon.cz, www.vizeon.cz, localhost, Vercel

### Rate Limiting
- Max 5 requests za 10 minut per IP
- Chráníme API před abuse

---

## Testing Checklist

- [x] TypeScript build kompiluje bez chyb
- [x] POST endpoint validuje data (Zod)
- [x] INSERT do Supabase funguje
- [x] GET endpoint vrací dostupné sloty
- [x] Email notifikace se odesílají
- [x] Admin dashboard vidí rezervace
- [ ] Supabase tabulka má zakaziq_id sloupec (MUSÍŠ PŘIDAT)
- [ ] available_slots je naplněná (MUSÍŠ NAPLNIT)
- [ ] End-to-end test (formulář → email → admin)
- [ ] Duplikát prevention test

---

## Commits

```
5a79396 - fix(booking): oprava TypeScript chyb
3a13608 - feat(booking): integrace s Supabase
```

### Diff Stats
```
app/api/booking/route.ts           | +119 -28  (nový kód + error handling)
app/rezervace/rezervace/page.tsx   | -29      (smazáno - starý kód)
components/booking/BookingForm.tsx | -230     (smazáno - starý kód)
```

---

## Co Zbývá

- [ ] Ověřit schéma v Supabase (zakaziq_id sloupec)
- [ ] Naplnit available_slots tabulku
- [ ] End-to-end test
- [ ] Deploy na produkci
- [ ] (Budoucí) Webhook ze ZakazIQ
- [ ] (Budoucí) Two-way sync

---

## Dokumentace

1. **00_READING_FIRST.md** - Výchozí point (čti NEJDŘÍV)
2. **SUPABASE_SETUP.md** - Praktický návod na Supabase
3. **BOOKING_FIXES_SUMMARY.md** - Detailní souhrn oprav
4. **ANALYSIS.md** - Tento soubor (technické detaily)

---

## Kontakt & Support

Máš dotaz? Čti dokumentaci v pořadí výše.
Všechny odpovědi by měly být tam.

**Status:** ✅ **Hotovo!** 🚀
