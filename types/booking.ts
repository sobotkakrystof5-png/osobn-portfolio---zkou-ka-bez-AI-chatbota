export type ServiceKey =
  | 'weby'
  | 'eshop'
  | 'automatizace'
  | 'chatbot'
  | 'aplikace'
  | 'systemy'
  | 'grafika'
  | 'technicke'
  | 'seo'
  | 'individualni';

export interface SubService {
  id: string;
  name: string;
  desc: string;
  variants?: string[];
  /** Název položky v ceníku (PRICE_BY_NAME), když se liší od `name`. */
  priceName?: string;
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
