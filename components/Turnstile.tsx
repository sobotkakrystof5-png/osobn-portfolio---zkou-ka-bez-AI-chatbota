"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { TURNSTILE_ACTION } from "@/lib/lead";

// Cloudflare Turnstile: ověří, že formulář vyplňuje člověk. Většina lidí nic
// nevidí, okénko se ukáže jen tomu, u koho si Cloudflare není jistý
// (appearance: interaction-only). Bez NEXT_PUBLIC_TURNSTILE_SITE_KEY se nic
// nenačte a formulář jede jako dřív.
//
// Skript se stahuje až s krokem Kontakt, ne s každou stránkou webu. Token
// platí na jedno odeslání, po každém pokusu se proto musí obnovit (reset).

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
// Jak dlouho při odeslání čekat, než Turnstile token vydá (pomalý telefon).
const WAIT_MS = 10_000;

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = {
  /** Token pro server; null, když Turnstile není zapnutý nebo token nevydal včas. */
  token: () => Promise<string | null>;
  /** Po odeslání: starý token je spotřebovaný. */
  reset: () => void;
};

let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile chybí")));
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("Turnstile se nenačetl"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

const Turnstile = forwardRef<TurnstileHandle>(function Turnstile(_props, ref) {
  const box = useRef<HTMLDivElement>(null);
  const api = useRef<TurnstileApi | null>(null);
  const widget = useRef<string | null>(null);
  const current = useRef<string | null>(null);
  const waiting = useRef<((token: string | null) => void)[]>([]);
  // Skript se nenačetl (blokátor, síť): token nepřijde, odeslání nemá na co čekat.
  // Server poptávku bez tokenu pošle e-mailem ke kontrole (lib/turnstile.ts).
  const failed = useRef(false);
  // Okénko je většinou neviditelné; mezeru pod ním jen když ho Cloudflare ukáže.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    const settle = (token: string | null) => {
      current.current = token;
      for (const resolve of waiting.current.splice(0)) resolve(token);
    };

    loadTurnstile()
      .then((ts) => {
        if (cancelled || !box.current) return;
        api.current = ts;
        widget.current = ts.render(box.current, {
          sitekey: SITE_KEY,
          action: TURNSTILE_ACTION,
          theme: "dark",
          language: "cs",
          size: "flexible",
          appearance: "interaction-only",
          callback: (token: string) => settle(token),
          "before-interactive-callback": () => setShown(true),
          "after-interactive-callback": () => setShown(false),
          "expired-callback": () => {
            current.current = null;
          },
          // Turnstile zkouší znovu sám; čekající odeslání dořeší časový limit.
          "error-callback": () => {
            current.current = null;
          },
        });
      })
      .catch(() => {
        failed.current = true;
        settle(null);
      });

    return () => {
      cancelled = true;
      if (widget.current) api.current?.remove(widget.current);
      widget.current = null;
      settle(null);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    token: () => {
      if (!SITE_KEY) return Promise.resolve(null);
      if (current.current) return Promise.resolve(current.current);
      if (failed.current) return Promise.resolve(null);
      return new Promise<string | null>((resolve) => {
        waiting.current.push(resolve);
        setTimeout(() => resolve(current.current), WAIT_MS);
      });
    },
    reset: () => {
      current.current = null;
      if (widget.current) api.current?.reset(widget.current);
    },
  }));

  if (!SITE_KEY) return null;
  return <div ref={box} className={shown ? "mb-4" : undefined} />;
});

export default Turnstile;
