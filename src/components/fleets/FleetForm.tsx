"use client";

import { useIntlayer } from "next-intlayer";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/button";
import { FLEET_COLORS } from "@/lib/constants/fleet-colors";
import type { CreateFleetInput } from "@/lib/validations/fleet";

export { FLEET_COLORS };

type FleetFormProps = {
  form: UseFormReturn<CreateFleetInput>;
  onCancel: () => void;
  onSubmit: (data: CreateFleetInput) => void;
  isSubmitting?: boolean;
  hasError?: boolean;
};

export function FleetForm({
  form,
  onCancel,
  onSubmit,
  isSubmitting = false,
  hasError = false,
}: FleetFormProps) {
  const content = useIntlayer("fleets");
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
      className="fleets-create-form relative flex w-full max-w-[698px] flex-col items-start gap-10 sm:gap-[60px]"
    >
      <div className="flex w-full flex-col items-start gap-10 self-stretch sm:gap-[60px]">
        <div className="flex w-full flex-col items-start gap-4 self-stretch">
          <h2 className="w-full font-['Inter'] text-2xl font-semibold leading-[29px] text-white">
            {content.createYourFleet}
          </h2>
          <p className="max-w-[349px] font-['Inter'] text-sx font-normal leading-5 text-white/70">
            {content.createYourFleetSubtitle}
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:gap-[60px]">
          <div className="flex w-full max-w-[288px] flex-col items-start gap-2">
            <label
              htmlFor="fleet-title"
              className="w-full font-['Inter'] text-sx font-medium leading-5 text-white"
            >
              {content.fleetNameLabel}{" "}
              <span className="text-white/70">*</span>
            </label>
            <input
              id="fleet-title"
              type="text"
              {...register("title")}
              placeholder={String(content.fleetNamePlaceholder)}
              className="box-border h-[41px] w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 font-['Inter'] text-sx font-normal leading-[17px] text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none"
            />
            {errors.title && (
              <p className="font-['Inter'] text-xs text-[#DC3848]">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex w-full max-w-[350px] flex-col items-start gap-2">
            <span className="w-full font-['Inter'] text-sx font-medium leading-5 text-white">
              {content.colorLabel}
            </span>
            <div className="flex h-[41px] w-full flex-row flex-wrap items-center gap-x-[18px] gap-y-2">
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
                  aria-label={`${content.chooseColor} ${color}`}
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

        <div className="flex w-full flex-col items-start gap-2 self-stretch">
          <label
            htmlFor="fleet-description"
            className="w-full font-['Inter'] text-sx font-medium leading-5 text-white"
          >
            {content.descriptionLabel}
          </label>
          <textarea
            id="fleet-description"
            {...register("description")}
            placeholder={String(content.descriptionInputPlaceholder)}
            className="box-border h-[92px] w-full resize-none rounded-lg border border-white/10 bg-white/10 px-4 py-3 font-['Inter'] text-sx font-normal leading-[17px] text-white placeholder:text-white/40 focus:border-white/20 focus:outline-none"
          />
        </div>
      </div>

      {hasError && (
        <p
          role="alert"
          className="font-['Inter'] text-sx font-normal leading-5 text-[#DC3848]"
        >
          {content.createError}
        </p>
      )}

      <div className="flex w-full flex-row items-center justify-between gap-4 self-stretch">
        <Button
          type="button"
          variant="danger"
          textSize="base"
          alignment="center"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-[43px] w-[90px] rounded leading-[19px]"
        >
          {content.cancel}
        </Button>

        <Button
          type="submit"
          variant="ghostMonochrome"
          textSize="base"
          alignment="center"
          disabled={!title?.trim() || isSubmitting}
          className="h-[43px] w-[136px] rounded bg-white/5 px-4 py-3 font-normal leading-[19px] text-white enabled:hover:text-white disabled:bg-white/5 disabled:text-white/40"
        >
          {content.submit}
        </Button>
      </div>
    </form>
  );
}
