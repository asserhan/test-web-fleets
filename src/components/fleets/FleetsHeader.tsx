"use client";

import { useIntlayer } from "next-intlayer";
import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { InfoCircleIcon } from "@/icons";

export function FleetsHeader() {
  const content = useIntlayer("fleets");

  return (
    <>
      <Modal.Return label={String(content.back)} />

      <Button
        type="button"
        variant="ghostMonochrome"
        className="fixed top-11.75 right-26 z-70 flex rounded-s"
      >
        <div className="flex items-center justify-center gap-s">
          <p className="text-s font-normal leading-6">{content.help}</p>
          <span className="size-6 flex items-center justify-center">
            <InfoCircleIcon className="h-5 w-5" />
          </span>
        </div>
      </Button>
    </>
  );
}
