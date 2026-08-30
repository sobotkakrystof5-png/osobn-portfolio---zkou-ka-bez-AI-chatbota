export type ServiceKey = 'weby' | 'grafika' | 'chatbot' | 'systemy' | 'technicke' | 'individualni';

export interface SubService {
  id: string;
  name: string;
  desc: string;
  variants?: string[];
}

export interface BookingData {
  service: ServiceKey | null;
  serviceName: string;
  subService: string | null;
  name: string;
  phone: string;
  email: string;
  note: string;
  date: string | null;
  slot: string | null;
}
