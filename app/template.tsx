"use client";

import { useEffect } from "react";

// Template se znovu připojí při každé klientské navigaci, layout ne. Proměnná
// na úrovni modulu proto rozliší první načtení od přechodu mezi stránkami.
// Na serveru zůstává false (useEffect tam neběží), takže serverové HTML nese
// stránku rovnou viditelnou. Dřív tu bylo `initial={{ opacity: 0 }}` i pro
// první načtení: celá stránka přišla neviditelná a ukázala se až po stažení
// a hydrataci JS, což na mobilu posouvalo LCP na 5–8 s. Prolnutí při navigaci
// dělá CSS (.page-in v globals.css), ne framer-motion: obal kolem celé stránky
// pak při hydrataci nestartuje animační engine.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return <div className={animate ? "page-in" : undefined}>{children}</div>;
}
