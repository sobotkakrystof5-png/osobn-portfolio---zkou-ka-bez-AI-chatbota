import { processConfig } from "@/components/automation/process-config";
import { firstSentence } from "@/lib/utils";

// Kroky „Jak to funguje“ jako 4 karty se stejnými ikonami jako kostky ve 3D
// scéně v hero, ať klient pozná, který krok je který. Na kartě je jen první
// věta popisu, delší text by kartu zahltil.
export function ProcessSteps({ slug, steps }: { slug: string; steps: { title: string; text: string }[] }) {
  const { icons } = processConfig(slug);

  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = icons[index % icons.length];
        return (
          <li
            key={step.title}
            className="group relative flex gap-5 border border-white/[0.07] bg-[#0b0b0b] p-5 transition-[border-color,box-shadow] duration-500 hover:border-[#c9a84c]/35 hover:shadow-[0_0_50px_-24px_rgba(201,168,76,0.4)] sm:flex-col sm:gap-0 sm:p-6"
          >
            {/* Na mobilu ikona vlevo vedle textu, od sm nad ním s pořadím. */}
            <div className="flex shrink-0 items-start justify-between sm:items-center">
              <span className="flex h-12 w-12 items-center justify-center border border-[#c9a84c]/35 bg-[#100e09] transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden="true">
                <Icon size={21} strokeWidth={1.3} className="text-[#c9a84c]" />
              </span>
              <span aria-hidden="true" className="hidden font-cormorant text-[34px] font-light leading-none lining-nums text-[#c9a84c]/40 sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="sm:mt-6">
              <h3 className="font-inter text-[17px] font-medium text-[#f0ece6]">
                <span aria-hidden="true" className="mr-2 text-[#c9a84c]/60 sm:hidden">{index + 1}.</span>
                {step.title}
              </h3>
              <p className="mt-2 font-inter text-[15px] leading-[1.6] text-text-secondary">{firstSentence(step.text)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
