'use client';
import { useBooking } from '@/context/BookingContext';

export function CTAButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { openBooking } = useBooking();
  return (
    <button onClick={openBooking} className={className}>
      {children}
    </button>
  );
}
