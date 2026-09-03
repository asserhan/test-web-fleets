"use client";

import { useState } from "react";
import { CreateFleetModal } from "./CreateFleetModal";
import { FLEET_COLORS } from "./FleetForm";
import { FleetsHeader } from "./FleetsHeader";

export function FleetsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(FLEET_COLORS[0]);

  const handleClose = () => setIsCreateOpen(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272149]">
      <div className="relative z-0">
        <div className="mx-auto grid w-full max-w-[1712px] grid-cols-3 gap-6 pt-[140px]">
        </div>
      </div>

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

      <FleetsHeader onClose={handleClose} />
    </main>
  );
}
