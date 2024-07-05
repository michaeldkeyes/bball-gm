import { Stats } from "./Stats";
import { getRandomNumberBetween } from "./utils/random";

type Position = "PG" | "SG" | "SF" | "PF" | "C";

export class Player {
  private firstName: string;
  private lastName: string;
  private position: Position;

  // attributes
  private twoPointShooting: number;
  private threePointShooting: number;
  private threePointTendency: number;

  // stats
  private stats: Stats;

  constructor(firstName: string, lastName: string, position: Position) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.twoPointShooting = getRandomNumberBetween(30, 70);
    this.threePointShooting = getRandomNumberBetween(20, 50);
    this.threePointTendency = getRandomNumberBetween(0, 60);
    this.stats = new Stats();
  }

  getFieldGoalAttempts(): number {
    return this.stats.getFieldGoalAttempts();
  }

  getFieldGoalMakes(): number {
    return this.stats.getFieldGoalMakes();
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getPoints(): number {
    return this.stats.getPoints();
  }

  getPointsPerQuarter(): number[] {
    return this.stats.getPointsPerQuarter();
  }

  getPosition(): Position {
    return this.position;
  }

  getStats(): Stats {
    return this.stats;
  }

  getThreePointAttempts(): number {
    return this.stats.getThreePointAttempts();
  }

  getThreePointMakes(): number {
    return this.stats.getThreePointMakes();
  }

  getThreePointShooting(): number {
    return this.threePointShooting;
  }

  getThreePointTendency(): number {
    return this.threePointTendency;
  }

  getTwoPointShooting(): number {
    return this.twoPointShooting;
  }
}
