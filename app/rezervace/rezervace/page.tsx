import { Metadata } from 'next'
import BookingForm from '@/components/booking/BookingForm'

export const metadata: Metadata = {
  title: 'Rezervovat termín — VIZEON',
  description: 'Rezervuj si termín konzultace nebo kickoff callů. Bez závazků, bez agentury.',
}

export default function RezervacePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">— Rezervace</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vyber si termín.
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Konzultace zdarma, bez závazků. Ozvu se ti do 24 hodin s potvrzením.
        </p>
      </section>

      {/* Formulář */}
      <section className="pb-24 px-6">
        <BookingForm />
      </section>
    </main>
  )
}
