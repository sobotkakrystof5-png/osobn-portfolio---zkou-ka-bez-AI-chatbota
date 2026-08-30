'use client';
import dynamic from 'next/dynamic';

const BookingModalWrapper = dynamic(
  () => import('@/components/BookingModalWrapper'),
  { ssr: false }
);

export default function ClientBooking() {
  return <BookingModalWrapper />;
}
 