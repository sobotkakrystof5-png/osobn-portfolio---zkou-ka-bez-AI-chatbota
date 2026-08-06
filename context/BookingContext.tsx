'use client';
import { createContext, useContext, useState } from 'react';
import type { ServiceKey } from '@/types/booking';

export interface BookingPrefill {
  service: ServiceKey;
  serviceName: string;
  subService: string;
  // Volitelné — vyplní AI chatbot, když už kontakt zjistil v konverzaci,
  // ať klient v BookingModalu jen ověří údaje a vybere termín.
  name?: string;
  phone?: string;
  email?: string;
}

const BookingContext = createContext<{
  isOpen: boolean;
  prefill: BookingPrefill | null;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}>({
  isOpen: false,
  prefill: null,
  openBooking: () => {},
  closeBooking: () => {},
});

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill | null>(null);

  return (
    <BookingContext.Provider value={{
      isOpen,
      prefill,
      openBooking: (p) => { setPrefill(p ?? null); setIsOpen(true); },
      closeBooking: () => { setIsOpen(false); setPrefill(null); },
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
