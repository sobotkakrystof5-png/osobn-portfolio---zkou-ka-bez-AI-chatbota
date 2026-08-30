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
  chatbot: {
    name: 'AI Chatbot',
    icon: 'Bot',
    subs: [
      { id: 'chatbot-faq', name: 'AI Chatbot Starter', desc: 'Odpovídá na časté dotazy přímo na webu' },
      { id: 'chatbot-pro', name: 'AI Chatbot Pro', desc: 'Napojení na rezervace, poptávky nebo vaše data' },
    ],
  },
  systemy: {
    name: 'Systémy na míru',
    icon: 'CalendarClock',
    subs: [
      { id: 'rezervace', name: 'Rezervační systém', desc: 'Online rezervace bez telefonování' },
      { id: 'kalkulacka', name: 'Kalkulačka na míru', desc: 'Automatický výpočet ceny nebo nabídky' },
      { id: 'formular', name: 'Interaktivní formuláře', desc: 'Sběr poptávek a dat od zákazníků' },
      { id: 'dashboard', name: 'Vlastní dashboard', desc: 'Přehled dat a agendy na jednom místě' },
    ],
  },
  technicke: {
    name: 'Technické služby',
    icon: 'Wrench',
    subs: [
      { id: 'redirect', name: 'Přesměrování domény', desc: 'Nastavení DNS a přesměrování na novou adresu' },
      { id: 'relink', name: 'Přelinkování domény', desc: 'Migrace webu na jinou doménu bez ztráty provozu' },
      { id: 'sprava', name: 'Web Care', desc: 'Průběžná správa a údržba webu' },
      { id: 'tech-zasah', name: 'Technický zásah', desc: 'Jednorázová oprava nebo úprava webu' },
    ],
  },
  individualni: {
    name: 'Individuální poptávka',
    icon: 'MessageCircle',
    subs: [
      { id: 'custom', name: 'Vlastní projekt', desc: 'Cokoliv, co nezapadá do ostatních kategorií' },
    ],
  },
};
