import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  // Ověření hesla (basic security)
  const password = req.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Přípojení jako service role (pro SQL DDL)
    const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseServiceUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase configuration' },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseServiceUrl, supabaseServiceKey);

    // Spuštění SQL migrace - Přidání zakaziq_id sloupce
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;`,
    });

    if (error) {
      // Pokud RPC nefunguje, vrátí instrukce
      if (error.code === 'PGRST204' || error.message.includes('exec_sql')) {
        return NextResponse.json({
          success: false,
          message: 'RPC exec_sql není dostupný. Musíš to udělat ručně v Supabase SQL editoru.',
          sql: 'ALTER TABLE bookings ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;',
          url: 'https://supabase.co/projects',
        }, { status: 501 });
      }

      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Sloupec zakaziq_id byl úspěšně přidán',
      data,
    });

  } catch (error) {
    console.error('[Setup] Chyba migrace:', error);
    return NextResponse.json(
      {
        error: 'Migration failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        help: 'Spusť ručně v Supabase SQL editoru: ALTER TABLE bookings ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;',
      },
      { status: 500 },
    );
  }
}
