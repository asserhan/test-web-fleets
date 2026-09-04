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
    <div className="absolute left-[250px] top-[258.5px] flex h-[563px] w-[1412px] flex-row items-center gap-[164px] max-[1700px]:left-1/2 max-[1700px]:top-1/2 max-[1700px]:-translate-x-1/2 max-[1700px]:-translate-y-1/2 max-[1700px]:scale-[0.85] max-[1400px]:scale-[0.72] max-[1200px]:scale-[0.62]">
      <div className="flex h-[563px] w-[550px] flex-col items-start gap-4">
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
        onCancel={closeModal}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        hasError={hasError}
      />
    </div>
  );
}
