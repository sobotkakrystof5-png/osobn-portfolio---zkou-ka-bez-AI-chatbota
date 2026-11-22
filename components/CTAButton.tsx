'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { rememberLeadIntent, type InterestId } from '@/lib/lead';
import { track } from '@/lib/analytics';

// Hlavní CTA (v liště podle stránky, viz Navbar; jinde „Chci plán a cenu“ a varianty) vede na kontaktní formulář (dřív otevíralo rezervační
// okno). Kde je formulář přímo na stránce (sekce #kontakt), jen k němu sjede,
// jinde otevře /kontakt. Výchozí `inline-block`, aby šířka a svislý padding
// fungovaly jako u dřívějšího <button>; display z className má přednost.
// Klik si zapamatuje stránku, formulář podle ní předvybere zájem (lib/lead.ts).
// Každý klik jde do GA4 jako cta_click: cta_location = prop `location`, jinak id
// nejbližší <section>, jinak „stranka“. Stejná hodnota jde s odeslanou poptávkou
// jako lead_cta, takže jde porovnat, které místo přivádí poptávky.
const PAGES_WITH_FORM = new Set(['/', '/kontakt']);

export function CTAButton({ children, className, style, location, interest }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; location?: string; interest?: InterestId | null }) {
  const pathname = usePathname();
  return (
    <Link
      href={PAGES_WITH_FORM.has(pathname) ? '#kontakt' : '/kontakt'}
      onClick={(e) => {
        const where = location ?? e.currentTarget.closest('section[id]')?.id ?? 'stranka';
        const text = (e.currentTarget.textContent ?? '').replace(/[→\s]+/g, ' ').trim().slice(0, 100);
        track('cta_click', { cta_location: where, cta_text: text });
        rememberLeadIntent(pathname, where, interest);
      }}
      className={cn('inline-block', className)}
      style={style}
    >
      {children}
    </Link>
  );
}
