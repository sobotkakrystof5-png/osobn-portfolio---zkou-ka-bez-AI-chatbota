# 🗄️ Supabase Setup - Návod pro Opravy Booking Systému

## Co jsem Udělal

✅ **Opravil jsem POST endpoint** (`app/api/booking/route.ts`):
- Nyní se rezervace **ukládají do Supabase tabulky `bookings`**
- Pokud se záznam neukládá → vrátí chybu a NEPOSÍLÁ do ZakazIQ
- Pokud se ZakazIQ nezdaří → zmaže záznam ze Supabase
- Pokud ZakazIQ vrátí ID → uloží jej pro synchronizaci

## Co Musíš Udělat

### Krok 1: Zkontroluj Strukturu Tabulky `bookings` v Supabase

**Jdi na:** https://supabase.co → Projects → tvůj projekt → Tables → `bookings`

**Tabulka musí mít tyto sloupce:**

| Sloupec | Typ | Nullable | Výchozí | Popis |
|---------|-----|----------|---------|-------|
| `id` | UUID | Ne | gen_random_uuid() | Primární klíč |
| `name` | TEXT | Ne | - | Jméno klienta |
| `email` | TEXT | Ne | - | Email |
| `phone` | TEXT | Ano | NULL | Telefon |
| `service` | TEXT | Ne | - | Typ služby |
| `date` | DATE | Ne | - | Datum rezervace |
| `time_slot` | TEXT | Ne | - | Čas (např. "14:00 - 15:00") |
| `note` | TEXT | Ano | NULL | Poznámka klienta |
| `status` | TEXT | Ne | 'pending' | pending/confirmed/cancelled/done |
| `zakaziq_id` | TEXT | Ano | NULL | **NOVÝ** - ID z ZakazIQ |
| `created_at` | TIMESTAMP | Ne | now() | Čas vytvoření |

---

### Krok 2: Přidej Sloupec `zakaziq_id` (pokud tam není)

**V SQL editoru v Supabase spusť:**

```sql
-- Přidej sloupec zakaziq_id pokud neexistuje
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;

-- Přidej index pro synchronizaci (volitelné, ale doporučeno)
CREATE INDEX IF NOT EXISTS idx_bookings_zakaziq_id ON bookings(zakaziq_id);
```

---

### Krok 3: Zkontroluj Tabulku `available_slots`

**Tabulka musí existovat a mít:**

| Sloupec | Typ | Nullable | Výchozí |
|---------|-----|----------|---------|
| `id` | UUID | Ne | gen_random_uuid() |
| `date` | DATE | Ne | - |
| `time_slot` | TEXT | Ne | - |
| `capacity` | INT | Ano | 1 |
| `created_at` | TIMESTAMP | Ano | now() |

**Pokud tabulka neexistuje, spusť:**

```sql
CREATE TABLE IF NOT EXISTS available_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  capacity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(date, time_slot)
);
```

---

### Krok 4: Naplň `available_slots` Dostupnými Sloty

**Aby se v booking formuláři zobrazily dostupné časy, musíš je zadat.**

Podle `WORKING_HOURS` v `lib/booking-config.ts`:
- **Neděle (0):** 8:00 - 15:00 (每隔1小時)
- **Pondělí (1):** 14:00 - 20:00
- **Úterý - Pátek (2-5):** 14:00 - 20:00
- **Sobota (6):** 8:00 - 21:00

**Příklad - vložit sloty na několik dní:**

```sql
-- Pondělí 16.6.2026
INSERT INTO available_slots (date, time_slot, capacity) VALUES
  ('2026-06-16', '14:00 - 15:00', 1),
  ('2026-06-16', '15:00 - 16:00', 1),
  ('2026-06-16', '16:00 - 17:00', 1),
  ('2026-06-16', '17:00 - 18:00', 1),
  ('2026-06-16', '18:00 - 19:00', 1),
  ('2026-06-16', '19:00 - 20:00', 1)
ON CONFLICT (date, time_slot) DO NOTHING;

-- Úterý 17.6.2026
INSERT INTO available_slots (date, time_slot, capacity) VALUES
  ('2026-06-17', '14:00 - 15:00', 1),
  ('2026-06-17', '15:00 - 16:00', 1),
  ('2026-06-17', '16:00 - 17:00', 1),
  ('2026-06-17', '17:00 - 18:00', 1),
  ('2026-06-17', '18:00 - 19:00', 1),
  ('2026-06-17', '19:00 - 20:00', 1)
ON CONFLICT (date, time_slot) DO NOTHING;
```

**Nebo spusť tento skript, aby generoval sloty na příští 30 dní:**

```sql
WITH RECURSIVE date_range AS (
  SELECT CURRENT_DATE as date
  UNION ALL
  SELECT date + INTERVAL '1 day'
  FROM date_range
  WHERE date < CURRENT_DATE + INTERVAL '30 days'
),
slots_generator AS (
  SELECT 
    dr.date,
    CASE 
      WHEN EXTRACT(DOW FROM dr.date) = 0 THEN 
        LPAD((CAST(h AS TEXT)), 2, '0') || ':00 - ' || 
        LPAD((CAST((h+1) AS TEXT)), 2, '0') || ':00'
      WHEN EXTRACT(DOW FROM dr.date) = 1 THEN 
        LPAD((CAST(h AS TEXT)), 2, '0') || ':00 - ' || 
        LPAD((CAST((h+1) AS TEXT)), 2, '0') || ':00'
      ELSE
        LPAD((CAST(h AS TEXT)), 2, '0') || ':00 - ' || 
        LPAD((CAST((h+1) AS TEXT)), 2, '0') || ':00'
    END as time_slot,
    1 as capacity
  FROM date_range dr,
  LATERAL (
    SELECT GENERATE_SERIES(
      CASE 
        WHEN EXTRACT(DOW FROM dr.date) = 0 THEN 8
        WHEN EXTRACT(DOW FROM dr.date) = 6 THEN 8
        ELSE 14
      END,
      CASE 
        WHEN EXTRACT(DOW FROM dr.date) = 0 THEN 14
        WHEN EXTRACT(DOW FROM dr.date) = 6 THEN 20
        ELSE 19
      END,
      1
    ) as h
  ) hours
)
INSERT INTO available_slots (date, time_slot, capacity)
SELECT date, time_slot, capacity FROM slots_generator
ON CONFLICT (date, time_slot) DO NOTHING;
```

---

### Krok 5: Ověř Bezpečnostní Pravidla (RLS)

**V Supabase → Authentication → Policies:**

Tabulka `bookings` by měla mít:
- ✅ **SELECT** - veřejné čtení (pro GET endpoint s dostupnými sloty)
- ✅ **INSERT** - veřejné (pro booking formulář)
- ✅ **UPDATE** - pouze admin (pro změnu statusu)
- ❌ **DELETE** - nemá být veřejné

**Pokud RLS není zapnutá, zkontroluj nastavení:**

```
Tabulka bookings → Security → RLS (měl by být zapnutý)
```

---

### Krok 6: Ověř Environment Variables

**V souboru `.env.local` zkontroluj:**

```
NEXT_PUBLIC_SUPABASE_URL=https://ytrniknnquccxyodyfcs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
ZAKAZIQ_API_KEY=e4e7...
```

**Pokud chceš używać SUPABASE_SERVICE_ROLE_KEY (doporučeno), přidej:**
```
SUPABASE_SERVICE_ROLE_KEY=ewogICJhbGc... (z Supabase → Settings → API)
```

---

## Testování

### Test 1: Zarezervuj Čas

1. Jdi na webovou stránku
2. Otevři booking formulář (CTAButton nebo PromoPopup)
3. Vyplň údaje a zarezervuj
4. **Zkontroluj:**
   - Dostaneš notifikační email (Resend)
   - Klient dostane potvrzovací email (Gmail)
   - V admin dashboardu `/admin` vidíš novou rezervaci

### Test 2: Zkontroluj Dostupné Sloty

1. Otevři booking formulář
2. Vyber datum
3. **Měly by se zobrazit jen volné sloty** (ne ty, které jsou už zarezervovány)
4. Pokud se nezobrazují ŽÁDNÉ sloty → chybí zápisy v `available_slots`

### Test 3: Pokus se Zarezervovat Stejný Čas 2×

1. Otevři 2 okna s booking formulářem
2. V prvním okně zarezervuj pátek 14:00
3. V druhém okně refreshni a zkontroluj, zda je 14:00 pryč
4. **Měl by být obsazený** (pokud kapacita je 1)

### Test 4: Synchronizace s ZakazIQ

1. Zarezervuj čas přes webový formulář
2. Jdi do ZakazIQ (https://project-iq-sigma.vercel.app)
3. Zkontroluj, zda se rezervace zobrazila v kalendáři
4. **Měla by být tam** s tvými údaji

---

## 🔧 Troubleshooting

### Problem: "Nepodařilo se uložit rezervaci do databáze"

**Řešení:**
1. Zkontroluj, zda tabulka `bookings` existuje v Supabase
2. Zkontroluj, zda má správné sloupce (viz tabulka výše)
3. Zkontroluj logs v Supabase → SQL Editor → Watch

### Problem: Sloty se Nezobrazují

**Řešení:**
1. Zkontroluj, zda je tabulka `available_slots` naplnená
2. Zkontroluj, zda je datum v tabulce správné
3. Zkontroluj RLS policies (měly by dovolit SELECT)

### Problem: Email se Neposílá

**Řešení:**
1. Pro Resend - zkontroluj RESEND_API_KEY v `.env.local`
2. Pro Gmail - zkontroluj GMAIL_APP_PASSWORD
3. Ověř, že `bookingNotificationFrom()` vrací validní email

### Problem: ZakazIQ Nevidí Rezervaci

**Řešení:**
1. Zkontroluj ZAKAZIQ_API_KEY v `.env.local`
2. Zkontroluj logs na Vercel (server logs)
3. Ověř, že ZakazIQ endpoint je dostupný

---

## 📊 SQL Query pro Diagnózu

```sql
-- 1. Kolik je v tabulce bookings?
SELECT COUNT(*) as total_bookings FROM bookings;

-- 2. Jaké sloty jsou dostupné dnes?
SELECT * FROM available_slots 
WHERE date = CURRENT_DATE 
ORDER BY time_slot;

-- 3. Které sloty jsou dnes obsazené?
SELECT time_slot, COUNT(*) as count 
FROM bookings 
WHERE date = CURRENT_DATE AND status != 'cancelled'
GROUP BY time_slot;

-- 4. Které rezervace nejsou synchronizované s ZakazIQ?
SELECT id, name, email, date, time_slot 
FROM bookings 
WHERE zakaziq_id IS NULL;

-- 5. Kolik je čekajících rezervací?
SELECT status, COUNT(*) as count 
FROM bookings 
GROUP BY status;
```

---

## 🎉 Po Hotovosti

Jakmile je vše nastaveno:
1. ✅ Rezervace se ukládají do Supabase
2. ✅ Odesílají se do ZakazIQ
3. ✅ Sloty se správně obsazují
4. ✅ Admin dashboard vidí všechny rezervace
5. ✅ Synchronizace funguje v obě strany

**Čim je potřeba?** Kontaktuji @sobotkakrystof5, je-li cokoliv nejasné. 🚀
