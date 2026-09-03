export const FLEET_COLORS = [
  "#409BEC",
  "#7CD7F5",
  "#5DC677",
  "#FAC863",
  "#F28029",
  "#EB5555",
  "#E262DC",
  "#AE32E3",
] as const;

type FleetFormProps = {
  name: string;
  description: string;
  selectedColor: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSelectedColorChange: (color: string) => void;
  onCancel: () => void;
};

export function FleetForm({
  name,
  description,
  selectedColor,
  onNameChange,
  onDescriptionChange,
  onSelectedColorChange,
  onCancel,
}: FleetFormProps) {
  return (
    <div className="flex h-[477px] w-[698px] flex-col items-start gap-[60px]">
      <div className="flex w-[698px] flex-col items-start gap-[60px] self-stretch">
        <div className="flex h-[65px] w-[698px] flex-col items-start gap-4 self-stretch">
          <h2 className="h-[29px] w-[698px] self-stretch font-['Inter'] text-2xl font-semibold leading-[29px] text-white">
            Créez votre flotte
          </h2>
          <p className="h-5 w-[349px] font-['Inter'] text-sm font-normal leading-5 text-white/70">
            Commencez par définir le profil de votre future flotte
          </p>
        </div>

        <div className="flex h-[69px] w-[698px] flex-row items-start gap-[60px]">
          <div className="flex h-[69px] w-[288px] flex-col items-start gap-2">
            <label className="h-5 w-[288px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white">
              Nom de la flotte <span className="text-white/70">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Renseignez un nom"
              className="box-border flex h-[41px] w-[288px] flex-row items-start gap-[308px] rounded-lg border border-black/10 bg-white/10 px-4 py-3 font-['Inter'] text-sm font-normal leading-[17px] text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>

          <div className="flex h-[69px] w-[350px] flex-col items-start gap-2">
            <label className="h-5 w-[350px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white">
              Couleur
            </label>
            <div className="flex h-[41px] w-[350px] flex-row items-center gap-[18px]">
              {FLEET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onSelectedColorChange(color)}
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

        <div className="flex h-[120px] w-[698px] flex-col items-start gap-2 self-stretch">
          <label className="h-5 w-[698px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Inscrivez une description sur le sujet de la flotte"
            className="box-border flex h-[92px] w-[698px] flex-row items-start gap-[308px] self-stretch rounded-lg border border-black/10 bg-white/10 px-4 py-3 font-['Inter'] text-sm font-normal leading-[17px] text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        </div>
      </div>

      <div className="flex h-[43px] w-[698px] flex-row items-start justify-between gap-12 self-stretch">
        <button
          type="button"
          onClick={onCancel}
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
  );
}
