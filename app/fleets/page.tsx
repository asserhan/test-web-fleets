"use client";

import { useState } from "react";
import {
  ArrowLeftIcon,
  InfoCircleIcon,
  ChevronRightIcon,
  FolderIcon,
} from "@/icons";

const FLEET_COLORS = [
  "#409BEC",
  "#7CD7F5",
  "#5DC677",
  "#FAC863",
  "#F28029",
  "#EB5555",
  "#E262DC",
  "#AE32E3",
];

export default function FleetsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(FLEET_COLORS[0]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272149]">
      {/* 1. FLEETS GRID — blurs when modal is open */}
      <div className="relative z-0">
        <div className="mx-auto grid w-full max-w-[1712px] grid-cols-3 gap-6 pt-[140px]">
          {/* map your fleets here, e.g. fleets.map(f => <FleetCard key={f.id} {...f} />) */}
        </div>
      </div>

      {/* 2. BLUR OVERLAY + MODAL — only when creating a fleet */}
      {isCreateOpen && (
        <>
          {/* Rectangle 2777 */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[10px]"
            aria-hidden="true"
          />

          {/* Frame 1000003284 */}
          <div
            className="fixed z-40 flex flex-row items-center gap-[164px]"
            style={{ width: 1412, height: 563, left: 250, top: 258.5 }}
          >
            {/* Frame 4527 — left column (breadcrumb + preview card) */}
            <div className="flex h-[563px] w-[550px] flex-col items-start gap-4">
              {/* Fil d'ariane / Breadcrumb */}
              <nav className="flex h-7 w-[204px] flex-row items-center gap-1">
                <span className="h-7 w-[135px] font-['Inter'] text-[18px] font-normal leading-7 text-white/70">
                  Votre répertoire
                </span>
                <ChevronRightIcon className="h-5 w-5 text-white/70" />
                <span className="h-7 w-[41px] font-['Inter'] text-[18px] font-semibold leading-7 text-white">
                  {name || "Titre"}
                </span>
              </nav>

              {/* Slide 16:9 - 97 — the preview card itself */}
              <div className="relative h-[519px] w-[550px] flex-none self-stretch overflow-hidden rounded-[10px] bg-black/30">
                {/* Mask group — colored glow, tied to selected fleet color.
                    Uses CSS mask-image (not a painted overlay) so the color
                    fades softly instead of showing a hard circular edge. */}
                <div
                  className="absolute h-[1080px] w-[1080px] transition-colors"
                  style={{
                    left: -229,
                    top: -404,
                    background: selectedColor,
                    WebkitMaskImage:
                      "radial-gradient(80.37% 80.37% at 12.31% 31.85%, black 0%, transparent 57.85%)",
                    maskImage:
                      "radial-gradient(80.37% 80.37% at 12.31% 31.85%, black 0%, transparent 57.85%)",
                  }}
                />

                {/* Frame 4380 — actual content, right-aligned */}
                <div className="absolute left-0 top-0 flex h-[519px] w-[550px] flex-col items-end justify-between gap-10 px-12 pb-16 pt-12">
                  {/* Frame 1000003123 */}
                  <div className="mx-auto flex h-[22px] w-[454px] flex-row items-center justify-end gap-10 self-stretch">
                    <div className="flex h-[22px] w-20 flex-row items-center gap-2">
                      <FolderIcon className="h-[22px] w-[22px] text-white/50" />
                      <span className="h-[22px] w-[50px] font-['Inter'] text-[18px] font-normal leading-[22px] text-white/50">
                        Flotte
                      </span>
                    </div>

                    {/* Frame 1000003115 — 3 dots indicator */}
                    <div className="flex h-[7px] w-[334px] flex-1 flex-row items-start justify-end gap-[33px]">
                      <div className="flex h-[7px] w-[37px] flex-row items-center gap-2">
                        <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                        <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                        <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Infos de la flotte — Titre + Description, live from the form */}
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
            </div>

            {/* Frame 1000003137 — right column (form) */}
            <div className="flex h-[477px] w-[698px] flex-col items-start gap-[60px]">
              <div className="flex w-[698px] flex-col items-start gap-[60px] self-stretch">
                {/* Frame 1000003255 — title + subtitle */}
                <div className="flex h-[65px] w-[698px] flex-col items-start gap-4 self-stretch">
                  <h2 className="h-[29px] w-[698px] self-stretch font-['Inter'] text-2xl font-semibold leading-[29px] text-white">
                    Créez votre flotte
                  </h2>
                  <p className="h-5 w-[349px] font-['Inter'] text-sm font-normal leading-5 text-white/70">
                    Commencez par définir le profil de votre future flotte
                  </p>
                </div>

                {/* Frame 1000003134 — Nom de la flotte + Couleur */}
                <div className="flex h-[69px] w-[698px] flex-row items-start gap-[60px]">
                  {/* Frame 5077 — Nom de la flotte */}
                  <div className="flex h-[69px] w-[288px] flex-col items-start gap-2">
                    <label className="h-5 w-[288px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white">
                      Nom de la flotte <span className="text-white/70">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Renseignez un nom"
                      className="box-border flex h-[41px] w-[288px] flex-row items-start gap-[308px] rounded-lg border border-black/10 bg-white/10 px-4 py-3 font-['Inter'] text-sm font-normal leading-[17px] text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                    />
                  </div>

                  {/* Frame 5083 — Couleur */}
                  <div className="flex h-[69px] w-[350px] flex-col items-start gap-2">
                    <label className="h-5 w-[350px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white">
                      Couleur
                    </label>
                    <div className="flex h-[41px] w-[350px] flex-row items-center gap-[18px]">
                      {FLEET_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          aria-label={`Choisir la couleur ${color}`}
                          className="relative flex h-7 w-7 items-center justify-center rounded-full"
                          style={{
                            border:
                              selectedColor === color
                                ? `1.5px solid ${color}`
                                : "1.5px solid transparent",
                          }}
                        >
                          <span
                            className="rounded-full"
                            style={{
                              width: selectedColor === color ? 18 : 28,
                              height: selectedColor === color ? 18 : 28,
                              background: color,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Frame 5077 — Description */}
                <div className="flex h-[120px] w-[698px] flex-col items-start gap-2 self-stretch">
                  <label className="h-5 w-[698px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Inscrivez une description sur le sujet de la flotte"
                    className="box-border flex h-[92px] w-[698px] flex-row items-start gap-[308px] self-stretch rounded-lg border border-black/10 bg-white/10 px-4 py-3 font-['Inter'] text-sm font-normal leading-[17px] text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
              </div>

              {/* Frame 5117 — buttons */}
              <div className="flex h-[43px] w-[698px] flex-row items-start justify-between gap-12 self-stretch">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="mx-auto flex h-[43px] w-[90px] flex-row items-center justify-center rounded bg-[#DC3848]/20 px-4 py-3 font-['Inter'] text-base font-normal leading-[19px] text-[#DC3848]"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  disabled={!name}
                  className="mx-auto flex h-[43px] w-[136px] flex-row items-center justify-center rounded bg-white/5 px-4 py-3 font-['Inter'] text-base font-normal leading-[19px] text-white/40 enabled:text-white disabled:cursor-not-allowed"
                >
                  Créer la flotte
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 3. HEADER  */}
      <header className="fixed left-1/2 top-[47px] z-50 flex h-8 w-[calc(100%-2rem)] max-w-[1712px] -translate-x-1/2 items-center justify-between">
        <button
          type="button"
          onClick={() => setIsCreateOpen(false)}
          className="flex h-8 items-center gap-2 rounded-[4px] px-2 text-white/60"
        >
          <span className="flex h-6 w-6 items-center justify-center">
            <ArrowLeftIcon />
          </span>
          <span className="text-base font-normal leading-6">Retour</span>
        </button>

        <button
          type="button"
          className="flex h-8 items-center gap-2 rounded-[4px] px-2 text-white/60"
        >
          <span className="text-base font-normal leading-6">Aide</span>
          <InfoCircleIcon className="h-5 w-5" />
        </button>
      </header>
    </main>
  );
}