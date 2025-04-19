import { Stats } from "./Stats";

export interface Player {
  firstName: string;
  lastName: string;
  position: string;
  attributes: Attributes;
  stats?: Stats;
  teamId: number;
}

interface Attributes {
  freeThrowShooting: number;
  twoPointShooting: number;
  threePointShooting: number;
  threeTendency: number;
}
