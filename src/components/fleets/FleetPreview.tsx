"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
      className="h-[519px] w-[550px] flex-none self-stretch"
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
        className="relative h-[519px] w-[550px] overflow-hidden rounded-[10px] bg-black/30"
      >
        <div
          className="absolute h-[1080px] w-[1080px] transition-colors"
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

        <div className="absolute left-0 top-0 flex h-[519px] w-[550px] flex-col items-end justify-between gap-10 px-12 pb-16 pt-12">
          <div className="mx-auto flex h-[22px] w-[454px] flex-row items-center justify-end gap-10 self-stretch">
            <div className="flex h-[22px] w-20 flex-row items-center gap-2">
              <FolderIcon className="h-[22px] w-[22px] text-white/50" />
              <span className="h-[22px] w-[50px] font-['Inter'] text-[18px] font-normal leading-[22px] text-white/50">
                Flotte
              </span>
            </div>

            <div className="flex h-[7px] w-[334px] flex-1 flex-row items-start justify-end gap-[33px]">
              <div className="flex h-[7px] w-[37px] flex-row items-center gap-2">
                <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
              </div>
            </div>
          </div>

          <div className="mx-auto flex h-[103px] w-[454px] flex-col items-start gap-6">
            <p className="h-12 font-['Inter'] text-[40px] font-bold leading-[48px] text-white/40">
              {name || "Titre"}
            </p>
            <p className="h-[31px] w-[454px] self-stretch font-['Inter'] text-[22px] font-normal leading-[31px] text-white/30">
              {description || "Description"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
