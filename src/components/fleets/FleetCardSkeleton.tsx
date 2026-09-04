export function FleetCardSkeleton() {
  return (
    <div className="relative h-[280px] w-[320px] overflow-hidden rounded-[10px] bg-black/30">
      <div className="absolute left-0 top-0 flex h-[280px] w-[320px] flex-col items-end justify-between gap-10 px-6 pb-8 pt-6">
        <div className="flex h-1 w-full flex-row items-start justify-end gap-1">
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="h-1 w-1 rounded-full bg-white/20" />
        </div>

        <div className="flex w-full animate-pulse flex-col items-start gap-4">
          <div className="h-6 w-[60%] rounded bg-white/12" />
          <div className="h-[18px] w-full rounded bg-white/8" />
        </div>

        <div className="flex h-[22px] w-full flex-row items-center">
          <div className="h-4 w-[113px] animate-pulse rounded bg-white/12" />
        </div>
      </div>
    </div>
  );
}
