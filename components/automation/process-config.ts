import {
  AudioLines,
  BookOpen,
  BrainCircuit,
  Cog,
  Database,
  Inbox,
  ListChecks,
  MessageCircleQuestion,
  MessageSquareQuote,
  NotebookPen,
  PhoneIncoming,
  ScanText,
  Send,
  ShieldCheck,
  Split,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Ikony karet „Jak to funguje“ (ProcessSteps) pro každou podstránku
// /automatizace/<slug>, v pořadí kroků `how` v lib/data/automation-pages.ts
// (vždy 4). Texty kroků jsou v datech, tady jen to, co data nést nesmí
// (komponenty ikon).
export type ProcessConfig = {
  /** Ikona každého kroku, stejné pořadí jako `how`. */
  icons: [LucideIcon, LucideIcon, LucideIcon, LucideIcon];
};

const CONFIG: Record<string, ProcessConfig> = {
  "ai-agenti": {
    icons: [Database, ShieldCheck, BrainCircuit, ListChecks],
  },
  "automatizace-procesu": {
    icons: [Inbox, ScanText, Cog, Send],
  },
  "chatboti-rag": {
    icons: [BookOpen, MessageCircleQuestion, MessageSquareQuote, UserRound],
  },
  "voice-agenti": {
    icons: [PhoneIncoming, AudioLines, Split, NotebookPen],
  },
};

/** Neznámý slug (nová služba bez vlastní výbavy) dostane výbavu procesů. */
export function processConfig(slug: string): ProcessConfig {
  return CONFIG[slug] ?? CONFIG["automatizace-procesu"];
}
