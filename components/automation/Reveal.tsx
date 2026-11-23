// Odhalení sekce při scrollu na /automatizace, /automatizace/[slug] a /zakaziq.
// Dřív tu byl vlastní framer-motion obal, který v serverovém HTML nesl
// `opacity: 0`, takže sekce byly bez JS neviditelné a čekaly na hydrataci.
// Teď je to stejný CSS reveal jako v patičce a na homepage (components/Reveal.tsx,
// hooks/useReveal.ts): obsah je v HTML viditelný, skryje se až po hydrataci,
// jen když je pod ohybem, a pod prefers-reduced-motion se neanimuje vůbec.
export { Reveal } from "@/components/Reveal";
