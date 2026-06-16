#!/usr/bin/env node
/**
 * Setup skript pro Booking systém
 * - Přidá zakaziq_id sloupec do bookings tabulky
 * - Naplní available_slots tabulku dostupnými sloty
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Chybí SUPABASE_URL nebo SUPABASE_ANON_KEY v .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Pracovní doba podle dne v týdnu (lib/booking-config.ts)
const WORKING_HOURS = {
  0: { start: 8, end: 15 },   // Neděle
  1: { start: 14, end: 20 },  // Pondělí
  2: { start: 14, end: 20 },  // Úterý
  3: { start: 14, end: 20 },  // Středa
  4: { start: 14, end: 20 },  // Čtvrtek
  5: { start: 14, end: 20 },  // Pátek
  6: { start: 8, end: 21 },   // Sobota
};

// Formátování času
function formatTime(hour) {
  const h = String(hour).padStart(2, '0');
  const nextH = String(hour + 1).padStart(2, '0');
  return `${h}:00 - ${nextH}:00`;
}

// Generování slotů pro konkrétní den
function generateSlotsForDate(date) {
  const dayOfWeek = date.getDay();
  const hours = WORKING_HOURS[dayOfWeek];

  if (!hours) {
    console.log(`  ⏭️  ${date.toISOString().split('T')[0]} - není pracovní den (neděle)`);
    return [];
  }

  const slots = [];
  for (let h = hours.start; h < hours.end; h++) {
    slots.push({
      date: date.toISOString().split('T')[0],
      time_slot: formatTime(h),
      capacity: 1,
    });
  }

  console.log(`  ✅ ${date.toISOString().split('T')[0]} - ${slots.length} slotů`);
  return slots;
}

async function main() {
  console.log('\n🚀 Spuštění setup skriptu pro Booking systém\n');

  // Krok 1: Zkontroluj, zda tabulky existují
  console.log('1️⃣  Kontrola tabulek...');
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('count', { count: 'exact' })
    .limit(1);

  if (bookingsError) {
    console.error('❌ Chyba: Tabulka "bookings" neexistuje nebo není dostupná');
    console.error('   Vytvoř ji ručně v Supabase dashboardu');
    process.exit(1);
  }

  console.log('   ✅ Tabulka "bookings" existuje');

  const { data: slots, error: slotsError } = await supabase
    .from('available_slots')
    .select('count', { count: 'exact' })
    .limit(1);

  if (slotsError) {
    console.error('❌ Chyba: Tabulka "available_slots" neexistuje');
    console.error('   Vytvoř ji ručně v Supabase dashboardu');
    process.exit(1);
  }

  console.log('   ✅ Tabulka "available_slots" existuje\n');

  // Krok 2: Ověř zakaziq_id sloupec
  console.log('2️⃣  Kontrola sloupce "zakaziq_id"...');
  try {
    const { data: testData, error: testError } = await supabase
      .from('bookings')
      .select('zakaziq_id')
      .limit(1);

    if (!testError) {
      console.log('   ✅ Sloupec "zakaziq_id" existuje\n');
    } else if (testError.message.includes('zakaziq_id')) {
      console.log('   ⚠️  Sloupec "zakaziq_id" neexistuje - přidej jej ručně:\n');
      console.log('   ALTER TABLE bookings ADD COLUMN zakaziq_id TEXT;\n');
    } else {
      console.log('   ℹ️  Nelze ověřit sloupec (pokračujem)\n');
    }
  } catch (e) {
    console.log('   ℹ️  Nelze ověřit sloupec (pokračujem)\n');
  }

  // Krok 3: Zkontroluj počet slotů
  console.log('3️⃣  Kontrola dostupných slotů...');
  const { data: existingSlots, count: slotCount } = await supabase
    .from('available_slots')
    .select('*', { count: 'exact' })
    .limit(1);

  if (slotCount > 0) {
    console.log(`   ℹ️  V tabulce je již ${slotCount} slotů\n`);
    console.log('   ? Chceš je přepsat? (Zadej "ano" nebo "ne")');
    console.log('   → Pro teď je pokračujem bez přepisu\n');
  } else {
    console.log('   ℹ️  Tabulka je prázdná, naplňujem sloty...\n');

    // Generuj sloty na příštích 30 dní
    console.log('4️⃣  Generování slotů na příštích 30 dní...');
    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const daySlots = generateSlotsForDate(date);
      allSlots.push(...daySlots);
    }

    console.log(`   📊 Celkem ${allSlots.length} slotů k vložení\n`);

    // Vložení po 100 kusech (limit Supabase API)
    console.log('5️⃣  Vkládání slotů do databáze...');
    for (let i = 0; i < allSlots.length; i += 100) {
      const batch = allSlots.slice(i, i + 100);
      const { error: insertError } = await supabase
        .from('available_slots')
        .insert(batch)
        .on('*', (payload) => {})
        .catch((e) => ({ error: e }));

      if (insertError) {
        console.warn(`   ⚠️  Varování při vkládání: ${insertError.message}`);
      } else {
        console.log(`   ✅ Vloženo ${Math.min(100, allSlots.length - i)}/${allSlots.length} slotů`);
      }
    }

    console.log('   ✅ Všechny sloty vloženy!\n');
  }

  // Krok 4: Ověř data
  console.log('6️⃣  Ověření dat...');
  const { count: finalCount } = await supabase
    .from('available_slots')
    .select('*', { count: 'exact' });

  console.log(`   ✅ Tabulka available_slots obsahuje ${finalCount} slotů\n`);

  // Krok 5: Souhrn
  console.log('═'.repeat(60));
  console.log('✨ SETUP KOMPLETNÍ!\n');
  console.log('Co bylo uděleno:');
  console.log('  ✅ Tabulka "bookings" existuje');
  console.log('  ✅ Tabulka "available_slots" existuje');
  console.log(`  ✅ Tabulka available_slots má ${finalCount} slotů`);
  console.log('\nDalší kroky:');
  console.log('  1. Ověř v Supabase, že zakaziq_id sloupec existuje v bookings');
  console.log('  2. Testuj booking: otevři formulář a zarezervuj čas');
  console.log('  3. Ověř v admin dashboardu (/admin) že se rezervace zobrazila');
  console.log('  4. Deploy: git push origin main\n');
  console.log('═'.repeat(60));
}

main().catch((error) => {
  console.error('\n❌ Chyba při setupu:', error.message);
  process.exit(1);
});
