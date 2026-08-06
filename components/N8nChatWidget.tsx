"use client";

import { useEffect, useRef } from "react";
import "@n8n/chat/style.css";
import "./n8n-chat-theme.css";
import { useBooking } from "@/context/BookingContext";
import { SERVICES } from "@/lib/booking-config";
import type { ServiceKey } from "@/types/booking";

// Tvar odpovědi z n8n workflow — "output" čte @n8n/chat a vykreslí do bubliny,
// zbylá pole jsou náš vlastní kanál pro řízení UI (widget je ignoruje).
// Musí odpovídat JSON, který sestavuje "Respond to Webhook" node ve workflow.
interface AgentResponse {
  output?: string;
  action?: "open_booking";
  service?: ServiceKey;
  subService?: string;
  name?: string;
  phone?: string;
  email?: string;
}

export default function N8nChatWidget() {
  const initialized = useRef(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhookUrl || initialized.current) return;
    // React Strict Mode (zapnuté v next.config.mjs) v dev módu efekt spustí
    // dvakrát na sebe — bez téhle pojistky se do stejného #n8n-chat divu
    // namountovaly DVĚ instance Vue aplikace nad sebou, což rozbilo psaní
    // do inputu (klávesové eventy chytala jiná instance než ta viditelná).
    initialized.current = true;

    // Dynamický import — @n8n/chat (Vue pod kapotou) při statickém importu
    // padá při SSR na "ownKeys on proxy" chybě, protože se vyhodnocuje i
    // na serveru. V useEffect běží jen v prohlížeči.
    import("@n8n/chat").then(({ createChat }) => {
      createChat({
        webhookUrl,
        webhookConfig: {
          method: "POST",
          headers: {},
        },
        mode: "window",
        chatInputKey: "chatInput",
        chatSessionKey: "sessionId",
        // false: když webhook selže/je nedostupný, fetch v loadPreviousSession
        // hodí neošetřenou chybu, která zablokuje startNewSession() — chat pak
        // nikdy nevykreslí reálný input (jen věčnou "Powered by" patičku).
        loadPreviousSession: false,
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: "en",
        initialMessages: [
          "Ahoj! 👋",
          "Jsem Kryštof z VIZEON. S čím vám mohu pomoct — web, grafika, nebo něco jiného?",
        ],
        i18n: {
          en: {
            title: "VIZEON",
            subtitle: "Zeptejte se na cokoliv ohledně webu, grafiky nebo spolupráce.",
            footer: "",
            getStarted: "Nová konverzace",
            inputPlaceholder: "Napište zprávu…",
            closeButtonTooltip: "Zavřít chat",
          },
        },
        enableStreaming: false,
        // AI agent v n8n workflow může vedle textové odpovědi poslat i
        // { action: "open_booking", service, subService } — otevřeme stejný
        // BookingModal, který web nabízí přes tlačítka "Objednat konzultaci",
        // ať klient dokončí výběr termínu v ověřeném UI.
        afterMessageSent: (_message, response) => {
          const agentResponse = response as AgentResponse | undefined;
          if (agentResponse?.action !== "open_booking") return;

          const { name, phone, email } = agentResponse;
          const service = agentResponse.service;
          if (!service || !SERVICES[service]) {
            openBooking(
              name || phone || email
                ? {
                    service: "individualni",
                    serviceName: SERVICES.individualni.name,
                    subService: SERVICES.individualni.subs[0].name,
                    name,
                    phone,
                    email,
                  }
                : undefined
            );
            return;
          }

          const serviceDef = SERVICES[service];
          const subDef = agentResponse.subService
            ? serviceDef.subs.find((s) => s.name === agentResponse.subService)
            : undefined;

          openBooking({
            service,
            serviceName: serviceDef.name,
            subService: (subDef ?? serviceDef.subs[0]).name,
            name,
            phone,
            email,
          });
        },
      });
    });
  }, [openBooking]);

  return null;
}
