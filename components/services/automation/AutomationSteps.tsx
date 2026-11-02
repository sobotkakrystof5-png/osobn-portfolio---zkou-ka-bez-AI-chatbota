"use client";

import { FileCheck, LifeBuoy, Phone, Workflow } from "lucide-react";
import { LaunchTimeline, type TimelineStep } from "@/components/services/eshop/LaunchTimeline";

// Průběh spolupráce na automatizaci, stejná osa jako u e-shopů. Ikony jsou
// komponenty, proto kroky žijí v klientském souboru, ne v datech stránky.
const STEPS: TimelineStep[] = [
  { icon: Phone, title: "Konzultace zdarma", text: "Projdeme váš provoz a najdeme práci, která se opakuje." },
  { icon: FileCheck, title: "Návrh a pevná cena", text: "Víte, co poběží na pozadí, kudy tečou data a kolik to stojí." },
  { icon: Workflow, title: "Nasazení a testování", text: "Automatizaci postavíme a vyzkoušíme na reálných případech." },
  { icon: LifeBuoy, title: "14 dní podpory zdarma", text: "Doladíme, co ukáže provoz. Potom podpora jako měsíční paušál." },
];

export function AutomationSteps() {
  return <LaunchTimeline steps={STEPS} />;
}
