"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

// Template se znovu připojí při každé klientské navigaci, layout ne. Proměnná
// na úrovni modulu proto rozliší první načtení od přechodu mezi stránkami.
// Na serveru zůstává false (useEffect tam neběží), takže serverové HTML nese
// stránku rovnou viditelnou. Dřív tu bylo `initial={{ opacity: 0 }}` i pro
// první načtení: celá stránka přišla neviditelná a ukázala se až po stažení
// a hydrataci JS, což na mobilu posouvalo LCP na 5–8 s.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
