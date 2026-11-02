import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Project, ProjectScreens } from "@/lib/data/portfolio";
import { IPhone, MacBook } from "@/components/portfolio/Devices";

// Scéna projektu: MacBook s webem klienta, přes jeho pravý okraj iPhone
// s mobilní verzí, za nimi podsvícení v barvě webu klienta.

const variants = {
  card: {
    pad: "px-[7%] pt-[9%] pb-[7%]",
    desktop: "(min-width: 1024px) 440px, (min-width: 640px) 70vw, 85vw",
    mobile: "(min-width: 1024px) 110px, 22vw",
  },
  feature: {
    pad: "px-[7%] pt-[8%] pb-[6%]",
    desktop: "(min-width: 1024px) 600px, 85vw",
    mobile: "(min-width: 1024px) 150px, 22vw",
  },
  hero: {
    pad: "px-[5%] pt-[6%] pb-[5%] md:px-[8%]",
    desktop: "(min-width: 1280px) 900px, 85vw",
    mobile: "(min-width: 1280px) 230px, 22vw",
  },
} as const;

export function ProjectStage({
  project,
  screens,
  variant = "card",
  priority,
  desktopScreen,
  className,
}: {
  project: Project;
  screens: ProjectScreens;
  variant?: keyof typeof variants;
  priority?: boolean;
  /** Vlastní obsah obrazovky MacBooku místo statického screenshotu. */
  desktopScreen?: ReactNode;
  className?: string;
}) {
  const v = variants[variant];
  const phone = screens.mobile[0];

  return (
    <div className={cn("relative overflow-hidden border border-white/[0.07] bg-[#0c0c0c]", className)}>
      <div
        className="absolute inset-0 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 58% 55% at 46% 50%, ${project.accent}70 0%, ${project.accent}1f 45%, transparent 75%), radial-gradient(ellipse 40% 22% at 50% 100%, ${project.accent}40 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,black,transparent)]"
        aria-hidden="true"
      />

      <div className={cn("relative", v.pad)}>
        <div className="relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1.2%]">
          <MacBook
            className={phone ? "w-[92%]" : "mx-auto w-[90%]"}
            src={screens.desktop}
            alt={project.alt}
            sizes={v.desktop}
            priority={priority}
          >
            {desktopScreen}
          </MacBook>
          {phone && (
            <IPhone
              className="absolute -bottom-[2%] right-[1%] w-[19.5%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3%]"
              src={phone}
              alt={`${project.title}: mobilní verze webu`}
              sizes={v.mobile}
              priority={priority}
            />
          )}
        </div>
      </div>
    </div>
  );
}
