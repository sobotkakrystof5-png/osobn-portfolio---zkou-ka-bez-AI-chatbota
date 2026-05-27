'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTrackClick } from '@/hooks/useAnalytics'

const SERVICES = [
  'Konzultace zdarma',
  'Online Vizitka',
  'Promo Page',
  'Pro Web',
  'Web Care',
  'Brand Logo',
  'Business Card',
  'Slide Deck Standard',
  'Slide Deck Premium',
  'Social Starter',
  'Social Pro',
  'Jiné',
]

interface SlotItem {
  time_slot: string
  is_available: boolean
}

export default function BookingForm() {
  const trackClick = useTrackClick('rezervace')

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    service: '', date: '', time_slot: '', note: '',
  })
  const [slots, setSlots] = useState<SlotItem[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Načti sloty pro vybraný datum
  const fetchSlots = useCallback(async (date: string) => {
    setSlotsLoading(true)
    setSlots([])
    setForm(f => ({ ...f, time_slot: '' }))
    try {
      const res = await fetch(`/api/booking?date=${date}`)
      const data = await res.json()
      setSlots(data.slots ?? [])
    } catch {
      setSlots([])
    } finally {
      setSlotsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (form.date) fetchSlots(form.date)
  }, [form.date, fetchSlots])

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.time_slot) return
    setLoading(true)
    setError(null)

    trackClick('odeslat_rezervaci', 'form', form.service)

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Chyba při rezervaci. Zkus to znovu.')
        if (data.error_code === 'SLOT_TAKEN') {
          // Obnov sloty — někdo ho zabrál mezitím
          fetchSlots(form.date)
        }
        return
      }

      setSuccess(true)
      trackClick('rezervace_uspech', 'form', form.service)
    } catch {
      setError('Spojení se nezdařilo. Zkontroluj připojení a zkus znovu.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-10 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Rezervace přijata!</h3>
        <p className="text-green-700 text-sm">
          Ozvu se ti do 24 hodin na <strong>{form.email}</strong> s potvrzením termínu.
        </p>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
  const labelCls = "block text-sm font-medium text-gray-700 mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">

      {/* Jméno */}
      <div>
        <label className={labelCls}>Jméno a příjmení *</label>
        <input required type="text" value={form.name} onChange={set('name')}
          className={inputCls} placeholder="Jan Novák" />
      </div>

      {/* Email */}
      <div>
        <label className={labelCls}>E-mail *</label>
        <input required type="email" value={form.email} onChange={set('email')}
          className={inputCls} placeholder="jan@example.cz" />
      </div>

      {/* Telefon */}
      <div>
        <label className={labelCls}>Telefon <span className="text-gray-400 font-normal">(volitelné)</span></label>
        <input type="tel" value={form.phone} onChange={set('phone')}
          className={inputCls} placeholder="+420 xxx xxx xxx" />
      </div>

      {/* Služba */}
      <div>
        <label className={labelCls}>Zájem o *</label>
        <select required value={form.service} onChange={set('service')} className={inputCls}>
          <option value="">Vybrat...</option>
          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Datum */}
      <div>
        <label className={labelCls}>Preferovaný datum *</label>
        <input required type="date" min={today} value={form.date} onChange={set('date')}
          className={inputCls} />
      </div>

      {/* Sloty */}
      {form.date && (
        <div>
          <label className={labelCls}>Čas *</label>
          {slotsLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
              <span className="animate-spin">⟳</span> Načítám dostupné časy...
            </div>
          ) : slots.length === 0 ? (
            <p className="text-sm text-gray-500 py-2">
              Pro tento den nejsou zadané žádné termíny. Vyber jiný den nebo mě kontaktuj přímo.
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {slots.map(slot => {
                const active = form.time_slot === slot.time_slot
                return (
                  <button
                    key={slot.time_slot}
                    type="button"
                    disabled={!slot.is_available}
                    onClick={() => {
                      if (slot.is_available) {
                        setForm(f => ({ ...f, time_slot: slot.time_slot }))
                        trackClick('vybrat_cas', 'sloty', slot.time_slot)
                      }
                    }}
                    className={[
                      'py-2.5 rounded-xl text-sm font-medium border transition-all',
                      !slot.is_available
                        ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through'
                        : active
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    ].join(' ')}
                  >
                    {slot.time_slot}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Poznámka */}
      <div>
        <label className={labelCls}>Poznámka <span className="text-gray-400 font-normal">(volitelné)</span></label>
        <textarea value={form.note} onChange={set('note')} rows={3}
          className={inputCls + ' resize-none'}
          placeholder="Řekni mi víc o svém projektu, co tě trápí nebo co chceš dosáhnout..." />
      </div>

      {/* Chyba */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2">
          <span className="mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !form.time_slot}
        onClick={() => trackClick('klik_odeslat', 'form')}
        className="w-full bg-black text-white py-3.5 rounded-xl font-medium text-sm
                   hover:bg-gray-800 active:scale-[0.98] disabled:opacity-40
                   disabled:cursor-not-allowed transition-all"
      >
        {loading ? 'Odesílám...' : 'Rezervovat termín →'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Bez závazků. Potvrdím do 24 hodin.
      </p>
    </form>
  )
}
