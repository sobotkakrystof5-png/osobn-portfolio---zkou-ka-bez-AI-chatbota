#!/usr/bin/env node
/**
 * Migrace: Přidání zakaziq_id sloupce do bookings tabulky
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Chybí SUPABASE_URL nebo SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function addZakaziqIdColumn() {
  console.log('\n🔧 Migrace: Přidání zakaziq_id sloupce\n');

  try {
    // Pokus SELECT zakaziq_id - pokud existuje, skončíme
    console.log('1️⃣  Kontrola, zda sloupec již existuje...');
    const { data: test, error: testError } = await supabase
      .from('bookings')
      .select('zakaziq_id')
      .limit(1);

    if (!testError) {
      console.log('   ✅ Sloupec zakaziq_id již existuje!\n');
      return;
    }

    // Pokud sloupec neexistuje, musíme spustit SQL přes rpc (ale to není dostupné)
    // Nebo si to uděláme ručně přes Supabase dashboard
    console.log('   ❌ Sloupec neexistuje\n');

    console.log('2️⃣  Pokuší se přidat sloupec přes API...');
    console.log('   ℹ️  API nepodporuje DDL příkazy (ALTER TABLE)');
    console.log('   → Musíš to udělat ručně v Supabase dashboardu\n');

    console.log('   Jdi na: https://supabase.co');
    console.log('   → Projects → tvůj projekt');
    console.log('   → SQL Editor → New Query');
    console.log('   → Spusť tento SQL:\n');

    console.log('╔═══════════════════════════════════════════════╗');
    console.log('║ ALTER TABLE bookings                          ║');
    console.log('║ ADD COLUMN zakaziq_id TEXT;                   ║');
    console.log('╚═══════════════════════════════════════════════╝\n');

    console.log('Po spuštění si ověř v Tables → bookings');
    console.log('že se sloupec zakaziq_id objevil.\n');

  } catch (error) {
    console.error('❌ Chyba:', error.message);
    process.exit(1);
  }
}

addZakaziqIdColumn();
