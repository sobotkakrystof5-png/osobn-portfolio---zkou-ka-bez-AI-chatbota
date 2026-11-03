'use client'

import { useEffect, useRef, useCallback } from 'react'
import { safeStorageGet, safeStorageSet } from '@/lib/utils'

// supabase-js (~57 kB gzip) se stáhne až s prvním eventem, ne v hlavním JS
// každé stránky. Na mobilu to zdržovalo načtení i hydrataci. Import se
// cachuje, další eventy už čekají jen na síť.
let supabaseClient: Promise<typeof import('@/lib/supabase')['supabase']> | null = null
function getSupabase() {
  supabaseClient ??= import('@/lib/supabase').then((m) => m.supabase)
  return supabaseClient
}

// ── Session ID (unikátní per návštěva, ne per tab) ──────
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr'
  let sid = safeStorageGet(sessionStorage, 'v_sid')
  if (!sid) {
    sid = crypto.randomUUID()
    safeStorageSet(sessionStorage, 'v_sid', sid)
  }
  return sid
}

// ── Hlavní hook ─────────────────────────────────────────
export function useAnalytics(page: string) {
  const sid = useRef(getSessionId())
  const startTime = useRef(Date.now())
  const scrollMilestones = useRef(new Set<number>())

  // Odeslání eventu
  const track = useCallback(async (
    eventType: string,
    opts?: {
      element?: string
      section?: string
      value?: string
      metadata?: Record<string, unknown>
    }
  ) => {
    if (typeof window === 'undefined') return
    try {
      const supabase = await getSupabase()
      await supabase.from('analytics_events').insert({
        session_id: sid.current,
        event_type: eventType,
        page,
        element: opts?.element ?? null,
        section: opts?.section ?? null,
        value: opts?.value ?? null,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        metadata: opts?.metadata ?? null,
        duration_ms: Date.now() - startTime.current,
      })
    } catch {
      // Tiché selhání – analytika nesmí rozbít app
    }
  }, [page])

  // Zobrazení stránky
  useEffect(() => {
    track('page_view', {
      metadata: {
        url: window.location.pathname,
        ref: document.referrer || 'direct',
        screen: `${window.screen.width}x${window.screen.height}`,
        lang: navigator.language,
      },
    })
    // Odchod ze stránky
    return () => {
      navigator.sendBeacon?.(
        '/api/analytics-exit',
        JSON.stringify({
          session_id: sid.current,
          page,
          time_ms: Date.now() - startTime.current,
        })
      )
    }
  }, [page, track])

  // Scroll hloubka (25 / 50 / 75 / 100 %)
  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const pct = Math.round((window.scrollY / scrollable) * 100)
      const milestone = Math.floor(pct / 25) * 25
      if (milestone > 0 && !scrollMilestones.current.has(milestone)) {
        scrollMilestones.current.add(milestone)
        track('scroll_depth', { value: `${milestone}%` })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [track])

  return { track }
}

// ── Jednoduchý click tracker ─────────────────────────────
export function useTrackClick(page: string) {
  const sid = useRef(getSessionId())
  return useCallback((element: string, section?: string, value?: string) => {
    getSupabase().then((supabase) => supabase.from('analytics_events').insert({
      session_id: sid.current,
      event_type: 'click',
      page,
      element,
      section: section ?? null,
      value: value ?? null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    })).then(() => {}, () => {})
  }, [page])
}
