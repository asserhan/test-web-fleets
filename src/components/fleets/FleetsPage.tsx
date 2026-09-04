"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MODAL_IDS, useModalActions } from "@/components/modal";
import { createFleet } from "@/lib/api/fleets";
import { fleetKeys } from "@/lib/queries/fleet-keys";
import type { CreateFleetInput } from "@/lib/validations/fleet";
import { CreateFleetModal } from "./CreateFleetModal";
import { Repertoire } from "./Repertoire";

export function FleetsPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModalActions();

  const createFleetMutation = useMutation({
    mutationFn: createFleet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fleetKeys.all });
      closeModal();
    },
  });

  const handleCreateClick = () => {
    createFleetMutation.reset();
    openModal(MODAL_IDS.createFleet);
  };

  return (
    <main className="fleets-page relative min-h-dvh overflow-x-hidden overflow-y-auto bg-[#272149]">
      <Repertoire onCreateClick={handleCreateClick} />

      <CreateFleetModal
        onSubmit={(data: CreateFleetInput) => createFleetMutation.mutate(data)}
        isSubmitting={createFleetMutation.isPending}
        hasError={createFleetMutation.isError}
      />
    </main>
  );
}
