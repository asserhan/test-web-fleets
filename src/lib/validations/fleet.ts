import { z } from "zod";
import { FLEET_COLORS } from "@/lib/constants/fleet-colors";

export const createFleetBodySchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim(),
  color: z.enum(FLEET_COLORS),
});

export function createFleetFormSchema(titleRequiredMessage: string) {
  return createFleetBodySchema.extend({
    title: z.string().trim().min(1, titleRequiredMessage),
  });
}

export type CreateFleetInput = z.infer<typeof createFleetBodySchema>;

export const listFleetsQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export type ListFleetsQuery = z.infer<typeof listFleetsQuerySchema>;
