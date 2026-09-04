"use client";

import { useIntlayer } from "next-intlayer";
import { ArrowLeftIcon, InfoCircleIcon } from "@/icons";

type FleetsHeaderProps = {
  onClose: () => void;
};

export function FleetsHeader({ onClose }: FleetsHeaderProps) {
  const content = useIntlayer("fleets");

  return (
    <header className="fixed left-1/2 top-[47px] z-50 flex h-8 w-[calc(100%-2rem)] max-w-[1712px] -translate-x-1/2 items-center justify-between">
      <button
        type="button"
        onClick={onClose}
        className="flex h-8 items-center gap-2 rounded-[4px] px-2 text-white/60"
      >
        <span className="flex h-6 w-6 items-center justify-center">
          <ArrowLeftIcon />
        </span>
        <span className="text-base font-normal leading-6">{content.back}</span>
      </button>

      <button
        type="button"
        className="flex h-8 items-center gap-2 rounded-[4px] px-2 text-white/60"
      >
        <span className="text-base font-normal leading-6">{content.help}</span>
        <InfoCircleIcon className="h-5 w-5" />
      </button>
    </header>
  );
}
