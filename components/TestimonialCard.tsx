import { ArrowUpRight, Star } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({ quote, name, url, urlLabel }: Testimonial) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full border border-[#c9a84c]/20 bg-[#141414] p-8 md:p-10 relative hover:border-[#c9a84c]/45 hover:-translate-y-1 transition-all duration-300"
      aria-label={`Reference od ${name} — přejít na ${urlLabel}`}
    >
      <span className="absolute top-6 left-8 text-[#c9a84c]/30 font-cormorant text-[72px] leading-none select-none" aria-hidden="true">&ldquo;</span>
      <p className="font-inter font-light text-[15px] md:text-[17px] text-[#c8c0b4] leading-[1.9] mt-8 mb-8">
        {quote}
      </p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-[#c9a84c]/10">
        <div>
          <p className="font-inter font-medium text-[13px] text-[#f0ece6] tracking-wide">{name}</p>
          <span className="inline-flex items-center gap-1 font-inter font-light text-[12px] text-[#c9a84c] group-hover:text-[#d4b968] transition-colors duration-200 tracking-[0.05em]">
            {urlLabel}
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#c9a84c] shrink-0" aria-label="Hodnocení 5,0 z 5">
          <Star size={13} className="fill-[#c9a84c]" />
          <span className="font-inter font-medium text-[12px] tracking-wide">5,0</span>
        </div>
      </div>
    </a>
  );
}
