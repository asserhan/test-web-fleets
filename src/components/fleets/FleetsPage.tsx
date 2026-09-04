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

  const handleCreateSubmit = async (data: CreateFleetInput) => {
    await createFleetMutation.mutateAsync(data);
  };

  return (
    <main className="fleets-page relative min-h-screen overflow-hidden bg-[#272149]">
      <Repertoire onCreateClick={() => openModal(MODAL_IDS.createFleet)} />

      <CreateFleetModal
        onSubmit={handleCreateSubmit}
        isSubmitting={createFleetMutation.isPending}
      />
    </main>
  );
}
