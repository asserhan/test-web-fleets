import { z } from "zod";
import { FLEET_COLORS } from "@/lib/constants/fleet-colors";

export const createFleetSchema = z.object({
  title: z.string().trim().min(1, "Le nom de la flotte est requis"),
  description: z.string().trim(),
  color: z.enum(FLEET_COLORS),
});

export type CreateFleetInput = z.infer<typeof createFleetSchema>;

export const listFleetsQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export type ListFleetsQuery = z.infer<typeof listFleetsQuerySchema>;
