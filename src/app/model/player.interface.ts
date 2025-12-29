import { PlayerStats } from "./PlayerStats";
import { Position } from "./positions.enum";

/**
 * Player interface represents a basketball player with their attributes and stats.
 * It includes properties like first name, last name, position, attributes, and team ID.
 * The attributes include shooting skills and tendencies.
 */
export interface Player {
  firstName: string;
  lastName: string;
  position: Position;
  attributes: Attributes;
  stats?: PlayerStats;
  teamId: number;
}

export interface Attributes {
  ballHandling: number;
  blocking: number;
  defensiveRebounding: number;
  freeThrowShooting: number;
  offensiveRebounding: number;
  passing: number;
  stealing: number;
  twoPointShooting: number;
  threePointShooting: number;
  threeTendency: number;
  usageRate: number;
}

export interface PlayerGame extends Player {
  benchTime: number;
  courtTime: number;
  playingTime: number;
  restTime: number;
}
