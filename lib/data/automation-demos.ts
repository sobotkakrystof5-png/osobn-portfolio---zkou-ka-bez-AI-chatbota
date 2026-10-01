// Scénáře interaktivních scén na podstránkách /automatizace/[slug] (port z alteno, lib/service-demos.ts).
//
// TODO(S2): zatím jen typ `DemoIcon`, aby šla v S1 typově ověřit mapa
// components/automation/demo-icons.ts. Session 2 tenhle soubor nahradí celou
// kopií ALT/lib/service-demos.ts (typy scén, data, getServiceDemo).

/**
 * Klíč do mapy ikon v komponentě. Řetězec, ne komponenta, protože tenhle
 * soubor je čistá data a nesmí táhnout JSX do serverového importu.
 * Hodnoty odpovídají glyfům v components/automation/process-icons.tsx.
 */
export type DemoIcon =
  | "mail"
  | "document"
  | "chat"
  | "search"
  | "database"
  | "send"
  | "flag"
  | "person"
  | "check"
  | "spark"
  | "gear"
  | "phone"
  | "calendar";
