"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { PriceLabel } from "@/components/PriceLabel";

// Na mobilu po odscrollování hera připnutá lišta s cenou a konzultací, ať
// klient nemusí tlačítko hledat. U závěrečné výzvy (`endId`) zmizí, tam je
// tlačítko velké. z-40 je pod cookie lištou (45), ta má přednost. Používá ji
// i stránka Automatizace.
export function EshopStickyCTA({ price, endId = "eshop-zaver" }: { price: string; endId?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const end = document.getElementById(endId);
      const nearEnd = end ? end.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(window.scrollY > window.innerHeight * 0.9 && !nearEnd);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [endId]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-[#c9a84c]/25 bg-[#0b0906]/95 px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 md:hidden"
        >
          <span className="font-cormorant text-[26px] leading-none lining-nums text-[#f0ece6]">
            <PriceLabel price={price} />
          </span>
          <CTAButton className="bg-[#c9a84c] px-5 py-3 font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-[#080808]">
            Konzultace zdarma
          </CTAButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
