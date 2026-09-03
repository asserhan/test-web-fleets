import { ArrowLeftIcon, InfoCircleIcon } from "@/icons";

export default function FleetsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272149]">
      {/* Figma background overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[10px]"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="absolute left-1/2 top-[47px] flex h-8 w-[calc(100%-2rem)] max-w-[1712px] -translate-x-1/2 items-center justify-between">
        {/* Retour */}
        <button
          type="button"
          className="flex h-8 items-center gap-2 rounded-[4px] px-2 text-white/60"
        >
          <span className="flex h-6 w-6 items-center justify-center">
            <ArrowLeftIcon />
          </span>

          <span className="text-base font-normal leading-6">
            Retour
          </span>
        </button>

        {/* Aide */}
        <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-[4px] px-2 text-white/60"
            >
            <span className="text-base font-normal leading-6">
                Aide
            </span>

            <InfoCircleIcon className="h-5 w-5" />
        </button>
      </header>
    </main>
  );
}