'use client';
import { createContext, useContext, useState } from 'react';

const BookingContext = createContext<{
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}>({ isOpen: false, openBooking: () => {}, closeBooking: () => {} });

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BookingContext.Provider value={{
      isOpen,
      openBooking: () => setIsOpen(true),
      closeBooking: () => setIsOpen(false),
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
