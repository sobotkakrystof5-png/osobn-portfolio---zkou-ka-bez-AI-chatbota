'use client';
import { useBooking } from '@/context/BookingContext';

export function CTAButton({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { openBooking } = useBooking();
  return (
    <button onClick={() => openBooking()} className={className} style={style}>
      {children}
    </button>
  );
}
