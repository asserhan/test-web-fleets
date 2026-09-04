"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { FleetCard } from "@/components/fleets/FleetCard";
import { SparkleIcon } from "@/icons";
import { fetchFleets } from "@/lib/api/fleets";
import { fleetKeys } from "@/lib/queries/fleet-keys";

type RepertoireProps = {
  onCreateClick: () => void;
};

const FLEETS_PAGE_SIZE = 12;
const INFINITE_SCROLL_THRESHOLD = 200;

export const Repertoire = ({ onCreateClick }: RepertoireProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ height: 61, top: 0 });

  const TRACK_HEIGHT = 876;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: fleetKeys.list(),
      queryFn: ({ pageParam }) =>
        fetchFleets({ cursor: pageParam, limit: FLEETS_PAGE_SIZE }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  const fleets = data?.pages.flatMap((page) => page.items) ?? [];

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const ratio = clientHeight / scrollHeight;
    const thumbHeight = Math.max(ratio * TRACK_HEIGHT, 40);
    const maxThumbTop = TRACK_HEIGHT - thumbHeight;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight || 1);
    setThumb({ height: thumbHeight, top: scrollRatio * maxThumbTop });

    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (
      distanceFromBottom < INFINITE_SCROLL_THRESHOLD &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      void fetchNextPage();
    }
  };

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

      {/* Component 2 — scrollable grid area */}
      <div className="relative flex h-[932px] w-[1869px] flex-row items-start justify-end gap-4 self-stretch">
        {/* Frame 4464 — scroll container, native scrollbar hidden */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex h-[876px] w-[1524px] flex-col items-end gap-20 overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Frame 4454 — "Vos flottes" section */}
          <div className="flex w-full flex-col items-end gap-6">
            <nav className="flex w-full flex-row items-center gap-[13px]">
            </nav>

            {/* Frame 4366 — the actual card grid */}
            <div className="flex w-full flex-row flex-wrap items-start justify-end gap-6 content-start">
              {fleets.map((fleet) => (
                <FleetCard
                  key={fleet.id}
                  title={fleet.title}
                  description={fleet.description}
                  companyCount={fleet.companyCount}
                  color={fleet.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Group 4141 — custom scrollbar */}
        <div className="relative h-[876px] w-3">
          <div
            className="absolute h-[875px] w-0 border-2"
            style={{ left: 6, top: 1, borderColor: "#46406F" }}
          />
          <div
            className="absolute w-3 rounded-[10px] transition-[height,top] duration-100"
            style={{ left: 0, top: 0, height: 876, backgroundColor: "#241E42" }}
          />
          <div
            className="absolute w-[10px] rounded-[10px] transition-[height,top] duration-100"
            style={{ left: 1, top: thumb.top + 0.72, height: thumb.height, backgroundColor: "#5C5494" }}
          />
        </div>
      </div>
    </div>
  );
};
