# 🔧 Přidání zakaziq_id Sloupce

Supabase API neumožňuje spouštět DDL příkazy (ALTER TABLE) z klientské strany.
Musíš to udělat ručně přes SQL editor v Supabase dashboardu.

## Postup (2 minuty)

### Krok 1: Jdi do Supabase

1. Otevři https://supabase.co
2. Přihlásí se do svého projektu
3. Jdi na: **SQL Editor** (levé menu)

### Krok 2: Vytvoř nový query

1. Klikni na **"New Query"** (nebo "+")
2. Vlož tento SQL:

```sql
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;
```

### Krok 3: Spusť query

1. Klikni na **"Run"** (zelené tlačítko)
2. Měla by se zobrazit zpráva: **"Success. No rows returned"**

### Krok 4: Ověř

1. Jdi na **Tables** (levé menu)
2. Klikni na **bookings**
3. V seznamu sloupců by měl být **zakaziq_id**

✅ **HOTOVO!**

---

## Pokud selže

Pokud dostaneš chybu typu:
```
ERROR: column "zakaziq_id" of relation "bookings" already exists
```

→ To je OK! Sloupec již existuje, nemusíš nic dělat.

## Co to udělá

Příkaz `ALTER TABLE` přidá nový sloupec `zakaziq_id` (TEXT) do tabulky `bookings`.
Bude prázdný pro starší rezervace a bude naplněn pro nové rezervace z ZakazIQ.

---

**Následující krok:** [00_READING_FIRST.md](./00_READING_FIRST.md) - Test booking workflow
