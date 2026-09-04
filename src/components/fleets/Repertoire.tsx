"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntlayer } from "next-intlayer";
import { useEffect, useRef, useState } from "react";
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

export const Repertoire = ({ onCreateClick }: RepertoireProps) => {
  const content = useIntlayer("fleets");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ height: 61, top: 0, track: 400 });

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

  const updateThumb = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const track = clientHeight;
    const ratio = clientHeight / scrollHeight;
    const thumbHeight = Math.min(track, Math.max(ratio * track, 40));
    const maxThumbTop = Math.max(track - thumbHeight, 0);
    const scrollRatio = scrollTop / (scrollHeight - clientHeight || 1);

    setThumb({
      height: thumbHeight,
      top: scrollRatio * maxThumbTop,
      track,
    });
  };

  const handleScroll = () => {
    updateThumb();

    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (
      distanceFromBottom < INFINITE_SCROLL_THRESHOLD &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      void fetchNextPage();
    }
  };

  useEffect(() => {
    updateThumb();

    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => updateThumb());
    observer.observe(el);
    return () => observer.disconnect();
  }, [fleets.length, isPending]);

  return (
    <div className="fleets-repertoire mx-auto flex h-dvh w-full max-w-[1800px] flex-col gap-6 px-4 pb-6 pt-8 sm:gap-8 sm:px-6 sm:pt-10 lg:px-10 xl:px-12">
      <div className="fleets-repertoire-header flex h-12 w-full shrink-0 flex-row items-center justify-end">
        <Button
          type="button"
          variant="ghostMedium"
          className="fleets-repertoire-create-trigger flex h-8 flex-row items-center gap-2 rounded px-2 py-1"
          onClick={onCreateClick}
        >
          <SparkleIcon className="h-4 w-4" />
          <span className="font-['Inter'] text-base font-normal leading-6">
            {content.createFleet}
          </span>
        </Button>
      </div>

      <div className="fleets-repertoire-body relative flex min-h-0 w-full flex-1 flex-row items-stretch gap-3 sm:gap-4">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="fleets-repertoire-scroll min-h-0 w-full flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {isError ? (
            <div className="flex h-full min-h-48 w-full items-center justify-center">
              <p className="font-['Inter'] text-base font-normal leading-6 text-white/60">
                {content.loadError}
              </p>
            </div>
          ) : isEmpty ? (
            <div className="flex h-full min-h-48 w-full flex-col items-center justify-center gap-3 px-4 text-center">
              <p className="font-['Inter'] text-[20px] font-semibold leading-7 text-white">
                {content.emptyTitle}
              </p>
              <p className="max-w-md font-['Inter'] text-sx font-normal leading-5 text-white/60">
                {content.emptyDescription}
              </p>
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
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
          )}
        </div>

        <div
          className="fleets-repertoire-scrollbar relative hidden w-3 shrink-0 sm:block"
          style={{ height: thumb.track || "100%" }}
          aria-hidden
        >
          <div
            className="absolute w-0 border-2"
            style={{
              left: 6,
              top: 1,
              height: Math.max(thumb.track - 1, 0),
              borderColor: "#46406F",
            }}
          />
          <div
            className="absolute w-3 rounded-[10px]"
            style={{
              left: 0,
              top: 0,
              height: thumb.track,
              backgroundColor: "#241E42",
            }}
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
