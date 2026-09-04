"use client";

import type { UseFormReturn } from "react-hook-form";
import { FLEET_COLORS } from "@/lib/constants/fleet-colors";
import type { CreateFleetInput } from "@/lib/validations/fleet";

export { FLEET_COLORS };

type FleetFormProps = {
  form: UseFormReturn<CreateFleetInput>;
  onCancel: () => void;
  onSubmit: (data: CreateFleetInput) => void;
  isSubmitting?: boolean;
};

export function FleetForm({
  form,
  onCancel,
  onSubmit,
  isSubmitting = false,
}: FleetFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const title = watch("title");
  const selectedColor = watch("color");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fleets-create-form flex h-[477px] w-[698px] flex-col items-start gap-[60px]"
    >
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
            <label
              htmlFor="fleet-title"
              className="h-5 w-[288px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white"
            >
              Nom de la flotte <span className="text-white/70">*</span>
            </label>
            <input
              id="fleet-title"
              type="text"
              {...register("title")}
              placeholder="Renseignez un nom"
              className="box-border flex h-[41px] w-[288px] flex-row items-start gap-[308px] rounded-lg border border-black/10 bg-white/10 px-4 py-3 font-['Inter'] text-sm font-normal leading-[17px] text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
            {errors.title && (
              <p className="font-['Inter'] text-xs text-[#DC3848]">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex h-[69px] w-[350px] flex-col items-start gap-2">
            <span className="h-5 w-[350px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white">
              Couleur
            </span>
            <div className="flex h-[41px] w-[350px] flex-row items-center gap-[18px]">
              {FLEET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setValue("color", color, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
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
          <label
            htmlFor="fleet-description"
            className="h-5 w-[698px] self-stretch font-['Inter'] text-sm font-medium leading-5 text-white"
          >
            Description
          </label>
          <textarea
            id="fleet-description"
            {...register("description")}
            placeholder="Inscrivez une description sur le sujet de la flotte"
            className="box-border flex h-[92px] w-[698px] flex-row items-start gap-[308px] self-stretch rounded-lg border border-black/10 bg-white/10 px-4 py-3 font-['Inter'] text-sm font-normal leading-[17px] text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        </div>
      </div>

      <div className="flex h-[43px] w-[698px] flex-row items-start justify-between gap-12 self-stretch">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="mx-auto flex h-[43px] w-[90px] flex-row items-center justify-center rounded bg-[#DC3848]/20 px-4 py-3 font-['Inter'] text-base font-normal leading-[19px] text-[#DC3848] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={!title?.trim() || isSubmitting}
          className="mx-auto flex h-[43px] w-[136px] flex-row items-center justify-center rounded bg-white/5 px-4 py-3 font-['Inter'] text-base font-normal leading-[19px] text-white/40 enabled:text-white disabled:cursor-not-allowed"
        >
          Créer la flotte
        </button>
      </div>
    </form>
  );
}
