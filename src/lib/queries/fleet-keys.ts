export const fleetKeys = {
  all: ["fleets"] as const,
  list: () => [...fleetKeys.all, "list"] as const,
};
