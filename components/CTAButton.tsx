'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// „Konzultace zdarma" vede na kontaktní formulář (dřív otevíralo rezervační
// okno). Kde je formulář přímo na stránce (sekce #kontakt), jen k němu sjede,
// jinde otevře /kontakt. Výchozí `inline-block`, aby šířka a svislý padding
// fungovaly jako u dřívějšího <button>; display z className má přednost.
const PAGES_WITH_FORM = new Set(['/', '/kontakt']);

export function CTAButton({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const pathname = usePathname();
  return (
    <Link href={PAGES_WITH_FORM.has(pathname) ? '#kontakt' : '/kontakt'} className={cn('inline-block', className)} style={style}>
      {children}
    </Link>
  );
}
