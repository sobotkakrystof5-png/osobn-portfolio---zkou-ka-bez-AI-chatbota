import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side supabase – používá service role pro zápis z API route
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await supabase.from('analytics_events').insert({
      session_id: body.session_id ?? 'unknown',
      event_type: 'page_exit',
      page: body.page ?? '/',
      duration_ms: body.time_ms ?? 0,
      user_agent: req.headers.get('user-agent'),
    })
  } catch {
    // Tiché selhání
  }
  return new NextResponse(null, { status: 204 })
}
