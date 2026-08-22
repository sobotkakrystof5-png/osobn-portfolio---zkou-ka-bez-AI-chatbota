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
        "text-secondary":"#8a8070",
        "text-muted":    "#3d3830",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
