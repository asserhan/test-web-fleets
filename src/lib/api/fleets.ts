import type { CreateFleetInput } from "@/lib/validations/fleet";

export type Fleet = {
  id: string;
  title: string;
  description: string;
  color: string;
  companyCount: number;
  userId: string;
  createdAt: string;
};

export type FleetsPageResponse = {
  items: Fleet[];
  nextCursor: string | null;
};

type FetchFleetsParams = {
  cursor?: string;
  limit?: number;
};

export async function fetchFleets({
  cursor,
  limit = 12,
}: FetchFleetsParams = {}): Promise<FleetsPageResponse> {
  const params = new URLSearchParams({ limit: String(limit) });

  if (cursor) {
    params.set("cursor", cursor);
  }

  const response = await fetch(`/api/fleets?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch fleets");
  }

  return response.json();
}

export async function createFleet(input: CreateFleetInput): Promise<Fleet> {
  const response = await fetch("/api/fleets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create fleet");
  }

  return response.json();
}
