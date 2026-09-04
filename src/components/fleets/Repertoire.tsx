"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntlayer } from "next-intlayer";
import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { FleetCard } from "@/components/fleets/FleetCard";
import { FleetCardSkeleton } from "@/components/fleets/FleetCardSkeleton";
import { SparkleIcon } from "@/icons";
import { fetchFleets } from "@/lib/api/fleets";
import { fleetKeys } from "@/lib/queries/fleet-keys";

type RepertoireProps = {
  onCreateClick: () => void;
};

const FLEETS_PAGE_SIZE = 12;
const NEXT_PAGE_SKELETONS = 4;
const INFINITE_SCROLL_THRESHOLD = 200;
const TRACK_HEIGHT = 876;

export const Repertoire = ({ onCreateClick }: RepertoireProps) => {
  const content = useIntlayer("fleets");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ height: 61, top: 0 });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: fleetKeys.list(),
    queryFn: ({ pageParam }) =>
      fetchFleets({ cursor: pageParam, limit: FLEETS_PAGE_SIZE }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const fleets = data?.pages.flatMap((page) => page.items) ?? [];
  const isEmpty = !isPending && !isError && fleets.length === 0;

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
    <div
      className="fleets-repertoire absolute flex flex-col items-end gap-12"
      style={{
        width: 1869,
        height: 1025,
        left: "calc(50% - 934.5px - 9.5px)",
        top: "calc(50% - 512.5px + 27.5px)",
      }}
    >
      <div className="fleets-repertoire-header relative isolate flex h-12 w-[1869px] flex-row items-center justify-center self-stretch">
        <div
          className="fleets-repertoire-create-trigger absolute flex h-8 flex-row items-center justify-end gap-8"
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
              {content.createFleet}
            </span>
          </Button>
        </div>
      </div>

      <div className="fleets-repertoire-body relative flex h-[932px] w-[1869px] flex-row items-start justify-end gap-4 self-stretch">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="fleets-repertoire-scroll flex h-[876px] w-[1524px] flex-col items-end gap-20 overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {isError ? (
            <div className="flex h-full w-full items-center justify-center">
              <p className="font-['Inter'] text-base font-normal leading-6 text-white/60">
                {content.loadError}
              </p>
            </div>
          ) : isEmpty ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <p className="font-['Inter'] text-[20px] font-semibold leading-7 text-white">
                {content.emptyTitle}
              </p>
              <p className="font-['Inter'] text-sx font-normal leading-5 text-white/60">
                {content.emptyDescription}
              </p>
            </div>
          ) : (
            <div className="flex w-full flex-col items-end gap-6">
              <div className="flex w-full flex-row flex-wrap items-start justify-end gap-6 content-start">
                {isPending
                  ? Array.from({ length: FLEETS_PAGE_SIZE }, (_, index) => (
                      <FleetCardSkeleton key={`fleet-skeleton-${index}`} />
                    ))
                  : fleets.map((fleet) => (
                      <FleetCard
                        key={fleet.id}
                        title={fleet.title}
                        description={fleet.description}
                        companyCount={fleet.companyCount}
                        color={fleet.color}
                      />
                    ))}

                {isFetchingNextPage &&
                  Array.from({ length: NEXT_PAGE_SKELETONS }, (_, index) => (
                    <FleetCardSkeleton key={`fleet-next-skeleton-${index}`} />
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="fleets-repertoire-scrollbar relative h-[876px] w-3">
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
            style={{
              left: 1,
              top: thumb.top + 0.72,
              height: thumb.height,
              backgroundColor: "#5C5494",
            }}
          />
        </div>
      </div>
    </div>
  );
};
