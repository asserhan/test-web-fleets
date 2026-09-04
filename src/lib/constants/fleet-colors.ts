export const FLEET_COLORS = [
  "#409BEC",
  "#7CD7F5",
  "#5DC677",
  "#FAC863",
  "#F28029",
  "#EB5555",
  "#E262DC",
  "#AE32E3",
] as const;

export type FleetColor = (typeof FLEET_COLORS)[number];
