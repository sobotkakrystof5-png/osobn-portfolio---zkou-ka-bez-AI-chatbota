'use client'

import { useEffect, useRef, useCallback } from 'react'
import { safeStorageGet, safeStorageSet } from '@/lib/utils'

// Event se zapisuje přímo přes REST API Supabase (PostgREST), stejný požadavek,
// jaký posílá supabase-js `.insert()` s anon klíčem a RLS. Dřív se kvůli jedinému
// INSERTu stahovalo supabase-js (~59 kB gzip) hned při načtení každé stránky
// a soupeřilo s hydratací (TBT). `keepalive` doručí event i při odchodu.
type AnalyticsRow = Record<string, unknown>
function insertEvent(row: AnalyticsRow) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return Promise.resolve()
  return fetch(`${url}/rest/v1/analytics_events`, {
    method: 'POST',
    keepalive: true,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  }).then(() => {}, () => {})
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
      await insertEvent({
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
    void insertEvent({
      session_id: sid.current,
      event_type: 'click',
      page,
      element,
      section: section ?? null,
      value: value ?? null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    })
  }, [page])
}
