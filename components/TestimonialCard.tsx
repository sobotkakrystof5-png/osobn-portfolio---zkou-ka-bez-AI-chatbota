import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({ quote, name, url, urlLabel }: Testimonial) {
  return (
    <div className="border border-[#c9a84c]/20 bg-[#141414] p-8 md:p-10 relative">
      <span className="absolute top-6 left-8 text-[#c9a84c]/30 font-cormorant text-[72px] leading-none select-none">&ldquo;</span>
      <p className="font-inter font-light text-[15px] md:text-[17px] text-[#c8c0b4] leading-[1.9] mt-8 mb-8">
        {quote}
      </p>
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#c9a84c]/10">
        <div>
          <p className="font-inter font-medium text-[13px] text-[#f0ece6] tracking-wide">{name}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter font-light text-[12px] text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-200 tracking-[0.05em]"
          >
            {urlLabel}
          </a>
        </div>
        <div className="flex items-center gap-1 text-[#c9a84c] shrink-0" aria-label="Hodnocení 5,0 z 5">
          <Star size={13} className="fill-[#c9a84c]" />
          <span className="font-inter font-medium text-[12px] tracking-wide">5,0</span>
        </div>
      </div>
    </div>
  );
}
