"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useIntlayer } from "next-intlayer";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { MODAL_IDS, Modal, useModalActions } from "@/components/modal";
import { ChevronRightIcon } from "@/icons";
import { FLEET_COLORS } from "@/lib/constants/fleet-colors";
import {
  createFleetFormSchema,
  type CreateFleetInput,
} from "@/lib/validations/fleet";
import { FleetForm } from "./FleetForm";
import { FleetPreview } from "./FleetPreview";
import { FleetsHeader } from "./FleetsHeader";

type CreateFleetModalProps = {
  onSubmit: (data: CreateFleetInput) => void;
  isSubmitting?: boolean;
  hasError?: boolean;
};

export function CreateFleetModal({
  onSubmit,
  isSubmitting = false,
  hasError = false,
}: CreateFleetModalProps) {
  return (
    <Modal
      id={MODAL_IDS.createFleet}
      animation="scale"
      closeOnOverlayClick={false}
      closeOnEscape={!isSubmitting}
    >
      {/* ModalRoot already blurs #app-root, so the overlay only dims. */}
      <Modal.Overlay blurIntensity={0} opacity={0.3} />

      <FleetsHeader />

      <Modal.Content
        size="full"
        maxHeight="100vh"
        padding="0"
        borderRadius="0"
        scrollable={false}
        className="relative"
      >
        <CreateFleetModalContent
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          hasError={hasError}
        />
      </Modal.Content>
    </Modal>
  );
}

function CreateFleetModalContent({
  onSubmit,
  isSubmitting,
  hasError,
}: Required<CreateFleetModalProps>) {
  const content = useIntlayer("fleets");
  const { closeModal } = useModalActions();

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

  return (
    <div className="box-border flex h-full max-h-dvh w-full items-start justify-center overflow-x-hidden overflow-y-auto px-4 py-20 sm:items-center sm:px-6 sm:py-10 lg:px-10">
      <div className="fleets-create-layout flex w-full max-w-[1412px] flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-20 2xl:gap-[164px]">
        <div className="flex w-full max-w-[550px] flex-col items-start gap-4 lg:w-[550px] lg:shrink-0">
          <nav className="flex h-7 max-w-full flex-row items-center gap-1">
            <span className="truncate font-['Inter'] text-[18px] font-normal leading-7 text-white/70">
              {content.yourRepertoire}
            </span>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-white/70" />
            <span className="truncate font-['Inter'] text-[18px] font-semibold leading-7 text-white">
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
          onCancel={closeModal}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          hasError={hasError}
        />
      </div>
    </div>
  );
}
