"use client";

import { useEffect } from "react";
import { captureLeadSource } from "@/lib/lead";

// Zapamatuje si vstupní stránku a UTM/gclid/fbclid z adresy, než se při
// procházení webu ztratí. Formulář je pak přiloží k poptávce (lib/lead.ts).
export default function LeadSourceCapture() {
  useEffect(() => {
    captureLeadSource();
  }, []);
  return null;
}
