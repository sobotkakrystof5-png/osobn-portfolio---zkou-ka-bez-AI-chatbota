import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// GET - Info o migration statusu
export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Ověř, zda sloupec existuje
    const { data, error } = await supabase
      .from('bookings')
      .select('zakaziq_id')
      .limit(1);

    if (!error) {
      return NextResponse.json({
        success: true,
        message: 'Sloupec zakaziq_id již existuje',
        status: 'completed',
      });
    }

    if (error.message?.includes('zakaziq_id')) {
      return NextResponse.json({
        success: false,
        message: 'Sloupec zakaziq_id neexistuje',
        status: 'pending',
        nextStep: 'POST na tuto URL s heslem v headers x-admin-password',
      });
    }

    throw error;
  } catch (error) {
    return NextResponse.json({
      error: 'Check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// POST - Spustit migraci
export async function POST(req: NextRequest) {
  const password = req.headers.get('x-admin-password');

  if (!password) {
    return NextResponse.json(
      {
        error: 'Missing password',
        hint: 'Pošli header: x-admin-password: ADMIN_PASSWORD'
      },
      { status: 400 }
    );
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[Setup] Spouštění SQL migrace...');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Missing Supabase configuration' },
        { status: 500 },
      );
    }

    // Zkusit zavolat SQL přímo přes REST API endpoint
    // Supabase má /rest/v1/sql endpoint (ale vyžaduje service role)
    // Místo toho zkusíme volat SQL přes vlastní RPC function

    // Nejdříve ověř, zda sloupec existuje
    const checkUrl = `${supabaseUrl}/rest/v1/rpc/sql`;

    const sqlQuery = `ALTER TABLE bookings ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;`;

    console.log('[Setup] SQL:', sqlQuery);

    // Pokus zavolat SQL přes Supabase SQL endpoint (vyžaduje SERVICE_ROLE_KEY)
    // Protože jej nemáme, použijeme alternativu - vytvoříme si edge function

    // Fallback: volej migration endpoint s auth
    const response = await fetch(`${supabaseUrl}/rest/v1/query_exec`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: sqlQuery,
      }),
    }).catch(() => null);

    if (!response) {
      // Endpoint není dostupný, vrátíme instrukce
      return NextResponse.json({
        success: false,
        message: 'Supabase SQL API není dostupný z klientské strany',
        workaround: 'Ručně v Supabase SQL editoru',
        sql: sqlQuery,
        steps: [
          'Jdi na https://supabase.co',
          'Přihlásí se',
          'SQL Editor → New Query',
          `Spusť: ${sqlQuery}`,
        ],
      }, { status: 503 });
    }

    // Pokud máme response, zkusíme parsovat
    const result = await response.json().catch(() => null);

    if (response.ok && result) {
      return NextResponse.json({
        success: true,
        message: 'Sloupec zakaziq_id byl úspěšně přidán',
        data: result,
      });
    }

    // Fallback: vrátíme instrukce
    return NextResponse.json({
      success: false,
      message: 'SQL execution fallback',
      workaround: 'Ručně v Supabase SQL editoru',
      sql: sqlQuery,
      response: result,
    }, { status: 503 });

  } catch (error) {
    console.error('[Setup] Chyba migrace:', error);
    return NextResponse.json(
      {
        error: 'Migration failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        workaround: 'Jdi na https://supabase.co → SQL Editor a spusť: ALTER TABLE bookings ADD COLUMN IF NOT EXISTS zakaziq_id TEXT;',
      },
      { status: 500 },
    );
  }
}
