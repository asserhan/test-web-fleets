"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createFleet } from "@/lib/api/fleets";
import { fleetKeys } from "@/lib/queries/fleet-keys";
import type { CreateFleetInput } from "@/lib/validations/fleet";
import { CreateFleetModal } from "./CreateFleetModal";
import { FleetsHeader } from "./FleetsHeader";
import { Repertoire } from "./Repertoire";

export function FleetsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const queryClient = useQueryClient();

  const createFleetMutation = useMutation({
    mutationFn: createFleet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fleetKeys.all });
      setIsCreateOpen(false);
    },
  });

  const handleClose = () => {
    if (createFleetMutation.isPending) return;
    setIsCreateOpen(false);
  };

  const handleCreateSubmit = async (data: CreateFleetInput) => {
    await createFleetMutation.mutateAsync(data);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272149]">
      <Repertoire onCreateClick={() => setIsCreateOpen(true)} />

      {isCreateOpen && (
        <CreateFleetModal
          onClose={handleClose}
          onSubmit={handleCreateSubmit}
          isSubmitting={createFleetMutation.isPending}
        />
      )}

      {isCreateOpen && <FleetsHeader onClose={handleClose} />}
    </main>
  );
}
