export type ServiceKey = 'weby' | 'grafika' | 'prezentace' | 'socialni' | 'bundle' | 'individualni';

export interface SubService {
  id: string;
  name: string;
  desc: string;
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
