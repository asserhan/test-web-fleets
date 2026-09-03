"use client";

import { Button } from "@/components/button";
import { SparkleIcon } from "@/icons";

type RepertoireProps = {
  onCreateClick: () => void;
};

export const Repertoire = ({ onCreateClick }: RepertoireProps) => {
  return (
    // Frame 4466 — outer wrapper, centered on the 1920x1080 canvas
    <div
      className="absolute flex flex-col items-end gap-12"
      style={{ width: 1869, height: 1025, left: "calc(50% - 934.5px - 9.5px)", top: "calc(50% - 512.5px + 27.5px)" }}
    >
      {/* Frame 4496 — top row, isolate so the absolutely-positioned trigger stacks correctly */}
      <div className="relative isolate flex h-12 w-[1869px] flex-row items-center justify-center self-stretch">
        {/* Frame 5283 — "Créer une flotte" trigger, flush right */}
        <div
          className="absolute flex h-8 flex-row items-center justify-end gap-8"
          style={{ width: 159, left: 1710, top: 8 }}
        >
          <Button
            type="button"
            variant="ghostMedium"
            className="flex h-8 w-[159px] flex-row items-center gap-2 rounded px-2 py-1"
            onClick={onCreateClick}
          >
            <SparkleIcon className="h-4 w-4" />
            <span className="font-['Inter'] text-base font-normal leading-6">
              Créer une flotte
            </span>
          </Button>
        </div>
      </div>

      {/* Fleet grid goes here next */}
    </div>
  );
};