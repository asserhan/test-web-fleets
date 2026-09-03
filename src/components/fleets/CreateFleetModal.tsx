import { ChevronRightIcon } from "@/icons";
import { FleetForm } from "./FleetForm";
import { FleetPreview } from "./FleetPreview";

type CreateFleetModalProps = {
  name: string;
  description: string;
  selectedColor: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSelectedColorChange: (color: string) => void;
  onClose: () => void;
};

export function CreateFleetModal({
  name,
  description,
  selectedColor,
  onNameChange,
  onDescriptionChange,
  onSelectedColorChange,
  onClose,
}: CreateFleetModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[10px]"
        aria-hidden="true"
      />

      <div
        className="fixed z-40 flex flex-row items-center gap-[164px]"
        style={{ width: 1412, height: 563, left: 250, top: 258.5 }}
      >
        <div className="flex h-[563px] w-[550px] flex-col items-start gap-4">
          <nav className="flex h-7 w-[204px] flex-row items-center gap-1">
            <span className="h-7 w-[135px] font-['Inter'] text-[18px] font-normal leading-7 text-white/70">
              Votre répertoire
            </span>
            <ChevronRightIcon className="h-5 w-5 text-white/70" />
            <span className="h-7 w-[41px] font-['Inter'] text-[18px] font-semibold leading-7 text-white">
              {name || "Titre"}
            </span>
          </nav>

          <FleetPreview
            name={name}
            description={description}
            selectedColor={selectedColor}
          />
        </div>

        <FleetForm
          name={name}
          description={description}
          selectedColor={selectedColor}
          onNameChange={onNameChange}
          onDescriptionChange={onDescriptionChange}
          onSelectedColorChange={onSelectedColorChange}
          onCancel={onClose}
        />
      </div>
    </>
  );
}
