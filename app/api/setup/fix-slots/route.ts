import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const WORKING_HOURS = {
  0: { start: 8, end: 15 },   // Neděle
  1: { start: 14, end: 20 },  // Pondělí
  2: { start: 14, end: 20 },  // Úterý
  3: { start: 14, end: 20 },  // Středa
  4: { start: 14, end: 20 },  // Čtvrtek
  5: { start: 14, end: 20 },  // Pátek
  6: { start: 8, end: 21 },   // Sobota
};

function formatTime(hour: number) {
  const h = String(hour).padStart(2, '0');
  const nextH = String(hour + 1).padStart(2, '0');
  return `${h}:00 - ${nextH}:00`;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    console.log('[Setup] Mazání starých slotů...');
    await supabase
      .from('available_slots')
      .delete()
      .gt('date', '2000-01-01');

    console.log('[Setup] Generování nových slotů...');
    const allSlots: Array<{ date: string; time_slot: string; capacity: number }> = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();
      const hours = WORKING_HOURS[dayOfWeek as keyof typeof WORKING_HOURS];

      if (!hours) continue;

      for (let h = hours.start; h < hours.end; h++) {
        allSlots.push({
          date: date.toISOString().split('T')[0],
          time_slot: formatTime(h),
          capacity: 1,
        });
      }
    }

    console.log(`[Setup] Vkládání ${allSlots.length} slotů...`);

    // Vložení po 100 kusech
    let inserted = 0;
    for (let i = 0; i < allSlots.length; i += 100) {
      const batch = allSlots.slice(i, i + 100);
      const { error } = await supabase
        .from('available_slots')
        .insert(batch);

      if (error) {
        console.error(`[Setup] Insert error:`, error);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      inserted += batch.length;
    }

    console.log(`[Setup] Úspěšně vloženo ${inserted} slotů`);

    return NextResponse.json({
      success: true,
      message: `Úspěšně vloženo ${inserted} slotů`,
      inserted,
    });

  } catch (error) {
    console.error('[Setup] Chyba:', error);
    return NextResponse.json(
      {
        error: 'Setup failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
