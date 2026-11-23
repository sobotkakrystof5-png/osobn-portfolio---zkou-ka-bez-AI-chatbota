import { Metadata } from 'next'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin — VIZEON',
  robots: { index: false, follow: false },
}

// Admin se renderuje až na požádání, ne při buildu. Předgenerování
// spouštělo klienta Supabase na úrovni modulu a build bez jeho proměnných
// (náhledy na Vercelu, prostředí Preview) padal na „supabaseUrl is required“.
// Neveřejná stránka za přihlášením statickou verzi stejně nepotřebuje.
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminDashboard />
}
