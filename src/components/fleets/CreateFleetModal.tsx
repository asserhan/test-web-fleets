"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useIntlayer } from "next-intlayer";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { ChevronRightIcon } from "@/icons";
import { FLEET_COLORS } from "@/lib/constants/fleet-colors";
import {
  createFleetFormSchema,
  type CreateFleetInput,
} from "@/lib/validations/fleet";
import { FleetForm } from "./FleetForm";
import { FleetPreview } from "./FleetPreview";

type CreateFleetModalProps = {
  onClose: () => void;
  onSubmit: (data: CreateFleetInput) => Promise<void>;
  isSubmitting?: boolean;
};

export function CreateFleetModal({
  onClose,
  onSubmit,
  isSubmitting = false,
}: CreateFleetModalProps) {
  const content = useIntlayer("fleets");
  const fleetSchema = useMemo(
    () => createFleetFormSchema(String(content.titleRequired)),
    [content.titleRequired],
  );

  const form = useForm<CreateFleetInput>({
    resolver: zodResolver(fleetSchema),
    defaultValues: {
      title: "",
      description: "",
      color: FLEET_COLORS[0],
    },
  });

  const title = form.watch("title");
  const description = form.watch("description");
  const color = form.watch("color");

  const handleSubmit = async (data: CreateFleetInput) => {
    await onSubmit(data);
    form.reset({
      title: "",
      description: "",
      color: FLEET_COLORS[0],
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[10px]"
        aria-hidden="true"
      />

      <div
        className="fleets-create-modal fixed z-40 flex flex-row items-center gap-[164px]"
        style={{ width: 1412, height: 563, left: 250, top: 258.5 }}
      >
        <div className="fleets-create-modal-preview flex h-[563px] w-[550px] flex-col items-start gap-4">
          <nav className="flex h-7 w-[204px] flex-row items-center gap-1">
            <span className="h-7 w-[135px] font-['Inter'] text-[18px] font-normal leading-7 text-white/70">
              {content.yourRepertoire}
            </span>
            <ChevronRightIcon className="h-5 w-5 text-white/70" />
            <span className="h-7 w-[41px] font-['Inter'] text-[18px] font-semibold leading-7 text-white">
              {title || content.titlePlaceholder}
            </span>
          </nav>

          <FleetPreview
            name={title}
            description={description}
            selectedColor={color}
          />
        </div>

        <FleetForm
          form={form}
          onCancel={onClose}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}
