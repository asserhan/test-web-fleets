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
    <div className="relative h-[280px] w-[320px] overflow-hidden rounded-[10px] border border-white/[0.06] bg-black/30">
      <div
        className="absolute h-[1080px] w-[1080px] transition-colors"
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

      <div className="absolute left-0 top-0 flex h-[280px] w-[320px] flex-col items-end justify-between gap-10 px-6 pb-8 pt-6">
        <div className="flex h-1 w-full flex-col items-end gap-10">
          <div className="flex h-1 w-full flex-row items-start justify-end gap-[33px]">
            <div className="flex h-1 flex-row items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-white/50" />
              <span className="h-1 w-1 rounded-full bg-white/50" />
              <span className="h-1 w-1 rounded-full bg-white/50" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <p className="line-clamp-2 w-full font-['Inter'] text-[20px] font-bold leading-6 text-white">
            {title}
          </p>
          <p
            className={`line-clamp-2 w-full font-['Inter'] text-[13px] font-normal leading-[18px] ${
              description ? "text-white/60" : "text-white/30"
            }`}
          >
            {description || content.cardDescriptionEmpty}
          </p>
        </div>

        <div className="flex h-[22px] w-full flex-row items-center gap-6">
          <div className="flex h-4 flex-row items-center gap-1.5">
            <BuildingIcon className="h-2.5 w-[9px] shrink-0 text-white" />
            <span className="font-['Inter'] text-[13px] font-medium leading-4 tracking-[0.02em] text-white">
              {companyCount} {content.companies}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
