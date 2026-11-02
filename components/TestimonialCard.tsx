import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";
import { brandText } from "@/components/brand/BrandName";

// Karta reference. Bez hvězdiček: hodnocení 5,0 nešlo nikde ověřit a působilo,
// jako by si ho web dal sám (konzultace 11/2026). Nahoře volitelně náhled
// webu, který klient dostal.
export function TestimonialCard({ quote, name, url, urlLabel, image }: Testimonial & { image?: string }) {
  return (
    <article className="group flex flex-col h-full border border-[#c9a84c]/20 bg-[#141414] overflow-hidden hover:border-[#c9a84c]/45 transition-colors duration-300">
      {image ? (
        // Stejný cíl jako odkaz pod citací, proto mimo Tab a čtečky.
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[16/9] overflow-hidden border-b border-[#c9a84c]/10"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 88vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </a>
      ) : null}
      <div className="relative flex flex-col flex-1 p-8 md:p-10">
        <span className="absolute top-4 left-7 md:left-9 text-[#c9a84c]/30 font-cormorant text-[72px] leading-none select-none" aria-hidden="true">&ldquo;</span>
        <p className="font-inter font-normal text-[15px] md:text-[16px] text-[#c8c0b4] leading-[1.85] mt-8 mb-8">
          {brandText(quote)}
        </p>
        <div className="mt-auto pt-4 border-t border-[#c9a84c]/10">
          <p className="font-inter font-medium text-[14px] text-[#f0ece6] tracking-wide">{name}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-inter font-normal text-[13px] text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-200 tracking-[0.05em]"
          >
            {urlLabel}
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
