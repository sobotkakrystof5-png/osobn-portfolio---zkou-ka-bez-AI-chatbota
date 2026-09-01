// Opakované class stringy vnitřních stránek. Hodnoty jsou převzaté 1:1 ze
// stávajících oborových stránek (app/web-pro-remeslniky/page.tsx a spol.),
// kde byla tahle trojice eyebrow/H1/lead ručně opsaná devětkrát.

export const t = {
  eyebrow:
    "font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c]",
  h1: "font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6]",
  h2Page: "font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6]",
  lead: "font-inter font-light text-[16px] md:text-[18px] leading-[1.85] text-[#8a8070]",
  body: "font-inter font-light text-[15px] text-[#8a8070] leading-[1.85]",
  h3: "font-inter font-medium text-[14px] text-[#f0ece6] tracking-[0.01em]",
  articleH2:
    "font-cormorant font-light text-[21px] md:text-[26px] text-[#f0ece6] pt-4",
  link: "text-[#c9a84c] hover:underline",
  backLink:
    "font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300",
  container: {
    page: "max-w-4xl mx-auto px-6 md:px-12",
    wide: "max-w-7xl mx-auto px-6 md:px-12",
  },
} as const;
