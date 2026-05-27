import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
})

// ── Typy ────────────────────────────────────────────────
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'done'
export type ContactStatus = 'new' | 'read' | 'replied' | 'archived'

export interface Booking {
  id: string
  name: string
  email: string
  phone?: string
  service: string
  date: string
  time_slot: string
  note?: string
  status: BookingStatus
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  status: ContactStatus
  created_at: string
}

export interface SlotAvailability {
  time_slot: string
  is_available: boolean
}

export interface BookingSafeResult {
  success: boolean
  booking_id?: string
  error?: string
  error_code?: 'SLOT_TAKEN' | 'DB_ERROR'
}
