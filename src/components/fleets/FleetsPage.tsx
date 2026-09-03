"use client";

import { useState } from "react";
import { CreateFleetModal } from "./CreateFleetModal";
import { FLEET_COLORS } from "./FleetForm";
import { FleetsHeader } from "./FleetsHeader";
import { Repertoire } from "./Repertoire";

export function FleetsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false); // false by default now — see note below

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(FLEET_COLORS[0]);

  const handleClose = () => setIsCreateOpen(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272149]">
      <Repertoire onCreateClick={() => setIsCreateOpen(true)} />

      {isCreateOpen && (
        <CreateFleetModal
          name={name}
          description={description}
          selectedColor={selectedColor}
          onNameChange={setName}
          onDescriptionChange={setDescription}
          onSelectedColorChange={setSelectedColor}
          onClose={handleClose}
        />
      )}

      {isCreateOpen && <FleetsHeader onClose={handleClose} />}
    </main>
  );
}