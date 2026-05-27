'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Booking, ContactMessage } from '@/lib/supabase'

type Tab = 'bookings' | 'messages' | 'analytics'

interface AnalyticsData {
  sessions: number
  pageViews: number
  topPages: { page: string; count: number }[]
  topClicks: { element: string; count: number }[]
  topScrolls: { value: string; count: number }[]
  recentEvents: { event_type: string; page: string; element: string; created_at: string }[]
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  done:      'bg-gray-100 text-gray-600 border-gray-200',
  new:       'bg-blue-100 text-blue-800 border-blue-200',
  read:      'bg-gray-100 text-gray-600 border-gray-200',
  replied:   'bg-green-100 text-green-800 border-green-200',
  archived:  'bg-gray-50 text-gray-400 border-gray-100',
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchBookings = useCallback(async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('date', { ascending: true })
      .order('time_slot', { ascending: true })
    setBookings(data ?? [])
  }, [])

  const fetchMessages = useCallback(async () => {
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
    setMessages(data ?? [])
  }, [])

  const fetchAnalytics = useCallback(async () => {
    // Posledních 30 dní
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

    const { data: events } = await supabase
      .from('analytics_events')
      .select('session_id, event_type, page, element, value, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false })

    if (!events) return

    const sessions = new Set(events.map(e => e.session_id))
    const pageViews = events.filter(e => e.event_type === 'page_view')
    const clicks = events.filter(e => e.event_type === 'click' && e.element)
    const scrolls = events.filter(e => e.event_type === 'scroll_depth')

    const count = <T extends Record<string, string | null>>(
      arr: T[], key: keyof T
    ): { value: string; count: number }[] => {
      const map: Record<string, number> = {}
      arr.forEach(item => {
        const v = item[key] as string
        if (v) map[v] = (map[v] ?? 0) + 1
      })
      return Object.entries(map)
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
    }

    setAnalytics({
      sessions: sessions.size,
      pageViews: pageViews.length,
      topPages: count(pageViews, 'page').map(x => ({ page: x.value, count: x.count })),
      topClicks: count(clicks, 'element').map(x => ({ element: x.value, count: x.count })),
      topScrolls: count(scrolls, 'value').map(x => ({ value: x.value, count: x.count })),
      recentEvents: events.slice(0, 20).map(e => ({
        event_type: e.event_type,
        page: e.page ?? '',
        element: e.element ?? '',
        created_at: e.created_at,
      })),
    })
  }, [])

  const refresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([fetchBookings(), fetchMessages(), fetchAnalytics()])
    setRefreshing(false)
  }, [fetchBookings, fetchMessages, fetchAnalytics])

  useEffect(() => {
    Promise.all([fetchBookings(), fetchMessages(), fetchAnalytics()])
      .finally(() => setLoading(false))
  }, [fetchBookings, fetchMessages, fetchAnalytics])

  const updateBooking = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    fetchBookings()
  }

  const updateMessage = async (id: string, status: string) => {
    await supabase.from('contact_messages').update({ status }).eq('id', id)
    fetchMessages()
  }

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: 'bookings', label: '📅 Rezervace', badge: bookings.filter(b => b.status === 'pending').length || undefined },
    { id: 'messages', label: '✉️ Zprávy', badge: messages.filter(m => m.status === 'new').length || undefined },
    { id: 'analytics', label: '📊 Analytika' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">VIZEON</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">Admin</span>
          </div>
          <button onClick={refresh} disabled={refreshing}
            className="text-sm text-gray-500 hover:text-black flex items-center gap-1.5 transition-colors disabled:opacity-50">
            <span className={refreshing ? 'animate-spin' : ''}>↻</span>
            Obnovit
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={[
                'px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2',
                tab === t.id
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              ].join(' ')}>
              {t.label}
              {t.badge != null && t.badge > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${tab === t.id ? 'bg-white text-black' : 'bg-red-500 text-white'}`}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <span className="animate-spin mr-2">⟳</span> Načítám...
          </div>
        )}

        {/* ── REZERVACE ── */}
        {!loading && tab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {bookings.length === 0 ? (
              <div className="text-center py-16 text-gray-400">Žádné rezervace zatím</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Klient', 'Služba', 'Termín', 'Status', 'Přijato', 'Akce'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{b.name}</div>
                          <div className="text-gray-400 text-xs">{b.email}</div>
                          {b.phone && <div className="text-gray-400 text-xs">{b.phone}</div>}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{b.service}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{b.date}</div>
                          <div className="text-gray-400 text-xs">{b.time_slot}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[b.status] ?? ''}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">
                          {new Date(b.created_at).toLocaleDateString('cs-CZ')}
                        </td>
                        <td className="px-4 py-3">
                          <select value={b.status} onChange={e => updateBooking(b.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white hover:border-gray-400 transition-colors">
                            <option value="pending">pending</option>
                            <option value="confirmed">confirmed ✓</option>
                            <option value="cancelled">cancelled ✗</option>
                            <option value="done">done ✓✓</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── ZPRÁVY ── */}
        {!loading && tab === 'messages' && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {messages.length === 0 ? (
              <div className="text-center py-16 text-gray-400">Žádné zprávy zatím</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {messages.map(m => (
                  <div key={m.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{m.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[m.status] ?? ''}`}>
                            {m.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mb-2">{m.email}{m.phone ? ` · ${m.phone}` : ''}</div>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{m.message}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs text-gray-400">
                          {new Date(m.created_at).toLocaleDateString('cs-CZ')}
                        </span>
                        <select value={m.status} onChange={e => updateMessage(m.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
                          <option value="new">new</option>
                          <option value="read">read</option>
                          <option value="replied">replied</option>
                          <option value="archived">archived</option>
                        </select>
                        <a href={`mailto:${m.email}`}
                          className="text-xs text-blue-600 hover:underline">
                          Odpovědět →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ANALYTIKA ── */}
        {!loading && tab === 'analytics' && analytics && (
          <div className="space-y-4">
            {/* KPI */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Unikátní sessions', value: analytics.sessions, sub: 'posledních 30 dní' },
                { label: 'Zobrazení stránek', value: analytics.pageViews, sub: 'page views' },
                { label: 'Rezervace celkem', value: bookings.length, sub: `${bookings.filter(b => b.status === 'pending').length} čeká` },
                { label: 'Zprávy celkem', value: messages.length, sub: `${messages.filter(m => m.status === 'new').length} nových` },
              ].map(kpi => (
                <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                  <div className="text-sm font-medium text-gray-700">{kpi.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* Detaily */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Top stránky */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wide">Top stránky</h3>
                <div className="space-y-2">
                  {analytics.topPages.length === 0
                    ? <p className="text-sm text-gray-400">Žádná data</p>
                    : analytics.topPages.map(p => (
                      <div key={p.page} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 truncate">{p.page || '/'}</span>
                        <span className="font-semibold text-gray-900 ml-2 tabular-nums">{p.count}</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Nejkliknutější */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wide">Nejkliknutější</h3>
                <div className="space-y-2">
                  {analytics.topClicks.length === 0
                    ? <p className="text-sm text-gray-400">Žádná data</p>
                    : analytics.topClicks.map(c => (
                      <div key={c.element} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 truncate">{c.element}</span>
                        <span className="font-semibold text-gray-900 ml-2 tabular-nums">{c.count}×</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Scroll hloubka */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wide">Scroll hloubka</h3>
                <div className="space-y-2">
                  {analytics.topScrolls.length === 0
                    ? <p className="text-sm text-gray-400">Žádná data</p>
                    : analytics.topScrolls.map(s => (
                      <div key={s.value} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{s.value}</span>
                        <span className="font-semibold text-gray-900 tabular-nums">{s.count}×</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            {/* Poslední eventy */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Poslední aktivita (live)</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {analytics.recentEvents.map((e, i) => (
                  <div key={i} className="px-5 py-3 flex items-center gap-3 text-sm">
                    <span className={[
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      e.event_type === 'page_view' ? 'bg-blue-50 text-blue-700' :
                      e.event_type === 'click' ? 'bg-green-50 text-green-700' :
                      e.event_type === 'scroll_depth' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-gray-50 text-gray-500'
                    ].join(' ')}>
                      {e.event_type}
                    </span>
                    <span className="text-gray-500">{e.page || '/'}</span>
                    {e.element && <span className="text-gray-400">→ {e.element}</span>}
                    <span className="text-gray-300 text-xs ml-auto">
                      {new Date(e.created_at).toLocaleTimeString('cs-CZ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
