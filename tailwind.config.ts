import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      colors: {
        accent:          "#c9a84c",
        "accent-hover":  "#d4b968",
        "accent-dim":    "rgba(201,168,76,0.12)",
        "bg-primary":    "#080808",
        "bg-secondary":  "#0e0e0e",
        "bg-card":       "#111111",
        "bg-elevated":   "#161616",
        "text-primary":  "#f0ece6",
        // Kontrast na #0e0e0e: secondary ~10:1, muted ~7:1. Dřív byl
        // vedlejší text #8a8070 v tenkém řezu a drobné popisky #3d3830
        // (1,7:1), obojí špatně čitelné (zpětná vazba z konzultace 11/2026).
        // Druhé zesvětlení 2. 11. 2026: web musí přečíst i starší lidé.
        "text-secondary":"#c3bbad",
        "text-muted":    "#a39a8b",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      // Automatizace (port z alteno). Stejné keyframes jsou i v
      // app/globals.css včetně reduced-motion pojistky.
      keyframes: {
        "voice-wave": {
          "0%, 100%": { transform: "scaleY(0.2)" },
          "50%": { transform: "scaleY(1)" },
        },
        "nav-panel-in": {
          from: { opacity: "0", transform: "translateY(-4px) scale(0.98)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "voice-wave": "voice-wave 900ms ease-in-out infinite",
        "nav-panel-in": "nav-panel-in 150ms ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
