import { FolderIcon } from "@/icons";

type FleetPreviewProps = {
  name: string;
  description: string;
  selectedColor: string;
};

export function FleetPreview({
  name,
  description,
  selectedColor,
}: FleetPreviewProps) {
  return (
    <div className="relative h-[519px] w-[550px] flex-none self-stretch overflow-hidden rounded-[10px] bg-black/30">
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
    </div>
  );
}
