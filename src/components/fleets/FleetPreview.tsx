"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useIntlayer } from "next-intlayer";
import { useRef } from "react";
import { FolderIcon } from "@/icons";

type FleetPreviewProps = {
  name: string;
  description: string;
  selectedColor: string;
};

const TILT_MAX_DEGREES = 8;

export function FleetPreview({
  name,
  description,
  selectedColor,
}: FleetPreviewProps) {
  const content = useIntlayer("fleets");
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [TILT_MAX_DEGREES, -TILT_MAX_DEGREES]),
    { stiffness: 260, damping: 24 },
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-TILT_MAX_DEGREES, TILT_MAX_DEGREES]),
    { stiffness: 260, damping: 24 },
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="aspect-[550/519] w-full max-w-[550px] flex-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full overflow-hidden rounded-[10px] bg-black/30"
      >
        <div
          className="pointer-events-none absolute h-[1080px] w-[1080px] transition-colors"
          style={{
            left: -229,
            top: -404,
            background: selectedColor,
            WebkitMaskImage:
              "radial-gradient(80.37% 80.37% at 12.31% 31.85%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 57.85%)",
            maskImage:
              "radial-gradient(80.37% 80.37% at 12.31% 31.85%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 57.85%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-end justify-between gap-10 px-[8%] pb-[12%] pt-[9%]">
          <div className="flex w-full flex-row items-center justify-end gap-10">
            <div className="flex flex-row items-center gap-2">
              <FolderIcon className="h-[22px] w-[22px] text-white/50" />
              <span className="font-['Inter'] text-[clamp(14px,1.1vw,18px)] font-normal leading-[22px] text-white/50">
                {content.fleetLabel}
              </span>
            </div>

            <div className="flex flex-1 flex-row items-start justify-end">
              <div className="flex flex-row items-center gap-2">
                <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4 sm:gap-6">
            <p className="line-clamp-2 font-['Inter'] text-[clamp(28px,4vw,40px)] font-bold leading-tight text-white/40">
              {name || content.titlePlaceholder}
            </p>
            <p className="line-clamp-2 w-full font-['Inter'] text-[clamp(16px,2vw,22px)] font-normal leading-snug text-white/30">
              {description || content.descriptionPlaceholder}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
