import type { ServiceKey, SubService } from '@/types/booking';

export const WORKING_HOURS: Record<number, { start: number; end: number }> = {
  0: { start: 8, end: 15 },
  1: { start: 14, end: 20 },
  2: { start: 14, end: 20 },
  3: { start: 14, end: 20 },
  4: { start: 14, end: 20 },
  5: { start: 14, end: 20 },
  6: { start: 8, end: 21 },
};

export const SERVICES: Record<ServiceKey, { name: string; icon: string; subs: SubService[] }> = {
  weby: {
    name: 'Weby',
    icon: 'Globe',
    subs: [
      {
        id: 'micro',
        name: 'Micro Page',
        desc: 'Coming soon, link-in-bio nebo redirect stránka',
        variants: ['Coming soon', 'Link-in-bio', 'Redirect'],
      },
      { id: 'small', name: 'Online Vizitka', desc: 'Jednoduchý web který prodává' },
      { id: 'landing', name: 'Promo Page', desc: 'Prodejní stránka maximalizující konverze' },
      { id: 'business', name: 'Pro Web', desc: 'Vícestránkový web na míru' },
      { id: 'sprava', name: 'Web Care', desc: 'Správa a údržba vašeho webu' },
    ],
  },
  grafika: {
    name: 'Grafický design',
    icon: 'Palette',
    subs: [
      { id: 'logo', name: 'Brand Logo', desc: 'Profesionální logo pro váš byznys' },
      { id: 'vizitka', name: 'Business Card', desc: 'Vizitka která se nezapomíná' },
      { id: 'social', name: 'Social Visual', desc: 'Vizuály pro sociální sítě' },
      { id: 'tisk', name: 'Print Design', desc: 'Letáky, plakáty, tiskové materiály' },
    ],
  },
  prezentace: {
    name: 'Prezentace',
    icon: 'Presentation',
    subs: [
      { id: 'standard', name: 'Slide Deck Standard', desc: 'Profesionální prezentace na míru' },
      { id: 'premium', name: 'Slide Deck Premium', desc: 'Prémiový deck pro důležité příležitosti' },
    ],
  },
  socialni: {
    name: 'Sociální sítě',
    icon: 'Share2',
    subs: [
      { id: 'blueprint', name: 'Content Blueprint', desc: 'Strategie a plán obsahu' },
      { id: 'starter', name: 'Social Starter', desc: 'Kompletní správa profilů' },
      { id: 'pro', name: 'Social Pro', desc: 'Správa + vizuály + strategie' },
    ],
  },
  bundle: {
    name: 'Výhodné bundly',
    icon: 'Package',
    subs: [
      { id: 'small', name: 'Small Bundle', desc: 'Logo + Vizitka + Social Visual' },
      { id: 'smallweb', name: 'Small Bundle + Web', desc: 'Kompletní online přítomnost' },
      { id: 'middle', name: 'Middle Bundle', desc: 'Web + design + sociální sítě' },
      { id: 'mega', name: 'Mega Bundle', desc: 'Vše co váš byznys potřebuje' },
    ],
  },
  individualni: {
    name: 'Individuální poptávka',
    icon: 'MessageCircle',
    subs: [
      { id: 'custom', name: 'Vlastní projekt', desc: 'Webová aplikace, rezervační systém, custom řešení' },
    ],
  },
};
