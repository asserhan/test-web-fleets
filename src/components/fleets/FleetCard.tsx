"use client";

import { useIntlayer } from "next-intlayer";

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
    <div className="relative h-[280px] w-[320px] overflow-hidden rounded-[10px] bg-black/30">
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

      <div className="absolute left-0 top-0 flex h-[280px] w-[320px] flex-col justify-between gap-4 px-6 pb-8 pt-6">
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <span className="h-1 w-1 rounded-full bg-white/50" />
          <span className="h-1 w-1 rounded-full bg-white/50" />
          <span className="h-1 w-1 rounded-full bg-white/50" />
        </div>

        <div className="flex w-full flex-col items-start gap-3">
          <p className="line-clamp-2 font-['Inter'] text-lg font-bold leading-6 text-white">
            {title}
          </p>
          <p className="line-clamp-2 w-full font-['Inter'] text-sm font-normal leading-[18px] text-white/90">
            {description}
          </p>
          <p className="font-['Inter'] text-[13px] font-medium leading-4 tracking-wide text-white">
            {companyCount} {content.companies}
          </p>
        </div>
      </div>
    </div>
  );
}
