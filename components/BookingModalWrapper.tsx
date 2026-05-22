'use client';
import { useBooking } from '@/context/BookingContext';
import BookingModal from './BookingModal';

export default function BookingModalWrapper() {
  const { isOpen, closeBooking } = useBooking();
  return <BookingModal isOpen={isOpen} onClose={closeBooking} />;
}
