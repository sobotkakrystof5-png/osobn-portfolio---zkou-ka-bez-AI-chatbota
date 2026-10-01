// Překlad `DemoIcon` (řetězec v datech) na skutečný glyf.
//
// PROČ VLASTNÍ SOUBOR A NE KOPIE V KAŽDÉ SCÉNĚ: `DemoIcon` je exportovaný
// typ v lib/data/automation-demos.ts a tahle mapa je jeho jediná povinná
// protistrana — přibude-li do typu hodnota, TypeScript ohlásí chybu právě
// tady. Kdyby mapa existovala dvakrát (konzole, chat), ohlásí ji dvakrát
// a jedna z kopií se dřív nebo později doplní jinak. Není to předčasná
// abstrakce kostry scény (ta podle sluzby-sceny-prompt.md §2 vzniká až po
// druhé scéně), je to jen data, která nesmí existovat ve dvou verzích.
//
// Soubor je `.ts`, ne `.tsx`: obsahuje odkazy na komponenty, ne JSX.

import type { ComponentType, SVGProps } from "react";
import type { DemoIcon } from "@/lib/data/automation-demos";
import {
  CalendarCheckIcon,
  ChatIcon,
  CheckIcon,
  DatabaseIcon,
  DocumentIcon,
  FlagIcon,
  GearIcon,
  MailIcon,
  PersonIcon,
  PhoneIcon,
  SearchIcon,
  SendIcon,
  SparkIcon,
} from "@/components/automation/process-icons";

export const DEMO_ICONS: Record<
  DemoIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  mail: MailIcon,
  document: DocumentIcon,
  chat: ChatIcon,
  search: SearchIcon,
  database: DatabaseIcon,
  send: SendIcon,
  flag: FlagIcon,
  person: PersonIcon,
  check: CheckIcon,
  spark: SparkIcon,
  gear: GearIcon,
  phone: PhoneIcon,
  calendar: CalendarCheckIcon,
};
