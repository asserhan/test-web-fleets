"use client";

import { useIntlayer } from "next-intlayer";
import { BuildingIcon } from "@/icons";

type FleetCardProps = {
  title: string;
  description: string;
  companyCount: number;
  color: string;
};

export function FleetCard({
  title,
  description,
  companyCount,
  color,
}: FleetCardProps) {
  const content = useIntlayer("fleets");

  return (
    <div className="fleets-card relative aspect-[320/280] w-full overflow-hidden rounded-[10px] border border-white/[0.06] bg-black/30">
      <div
        className="pointer-events-none absolute h-[1080px] w-[1080px] transition-colors"
        style={{
          left: -229,
          top: -404,
          background: color,
          WebkitMaskImage:
            "radial-gradient(80.37% 80.37% at 12.31% 31.85%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 57.85%)",
          maskImage:
            "radial-gradient(80.37% 80.37% at 12.31% 31.85%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 57.85%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-end justify-between gap-6 px-[7.5%] pb-[11%] pt-[8.5%]">
        <div className="flex h-1 w-full flex-row items-start justify-end">
          <div className="flex h-1 flex-row items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="h-1 w-1 rounded-full bg-white/50" />
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-3 sm:gap-4">
          <p className="line-clamp-2 w-full font-['Inter'] text-[clamp(16px,1.15vw,20px)] font-bold leading-tight text-white">
            {title}
          </p>
          <p
            className={`line-clamp-2 w-full font-['Inter'] text-[clamp(12px,0.8vw,13px)] font-normal leading-[1.4] ${
              description ? "text-white/60" : "text-white/30"
            }`}
          >
            {description || content.cardDescriptionEmpty}
          </p>
        </div>

        <div className="flex h-[22px] w-full flex-row items-center gap-6">
          <div className="flex h-4 flex-row items-center gap-1.5">
            <BuildingIcon className="h-2.5 w-[9px] shrink-0 text-white" />
            <span className="font-['Inter'] text-[clamp(12px,0.8vw,13px)] font-medium leading-4 tracking-[0.02em] text-white">
              {companyCount} {content.companies}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
