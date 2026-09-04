export function FleetCardSkeleton() {
  return (
    <div className="fleets-card relative aspect-[320/280] w-full overflow-hidden rounded-[10px] border border-white/[0.06] bg-black/30">
      <div className="absolute inset-0 flex flex-col items-end justify-between gap-6 px-[7.5%] pb-[11%] pt-[8.5%]">
        <div className="flex h-1 w-full flex-row items-start justify-end gap-1">
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="h-1 w-1 rounded-full bg-white/20" />
        </div>

        <div className="flex w-full animate-pulse flex-col items-start gap-3 sm:gap-4">
          <div className="h-6 w-[60%] rounded bg-white/12" />
          <div className="h-[18px] w-full rounded bg-white/8" />
        </div>

        <div className="flex h-[22px] w-full flex-row items-center">
          <div className="h-4 w-[45%] animate-pulse rounded bg-white/12" />
        </div>
      </div>
    </div>
  );
}
