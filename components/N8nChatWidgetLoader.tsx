"use client";

import dynamic from "next/dynamic";

// `ssr: false` je v App Routeru povolený jen z Client Componenty — proto
// tenhle tenký wrapper, ať ho `app/layout.tsx` (Server Component) může
// jen naimportovat a vyrenderovat beze změny. N8nChatWidget samo o sobě
// renderuje null a veškerou práci dělá až v useEffectu po hydrataci
// (mountuje @n8n/chat), takže je bezpečné ho z prvotního JS bundlu na
// každé stránce úplně vynechat — viz
// vizeon.cz-audit/findings/performance.md Finding 1/2.
const N8nChatWidget = dynamic(() => import("@/components/N8nChatWidget"), {
  ssr: false,
});

export default N8nChatWidget;
