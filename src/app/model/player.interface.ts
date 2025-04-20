import { Stats } from "./Stats";

/**
 * Player interface represents a basketball player with their attributes and stats.
 * It includes properties like first name, last name, position, attributes, and team ID.
 * The attributes include shooting skills and tendencies.
 */
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
