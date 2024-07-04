import { Stats } from "./Stats";
import { getRandomNumber } from "./utils/random";

type Position = "PG" | "SG" | "SF" | "PF" | "C";

export class Player {
  private firstName: string;
  private lastName: string;
  private position: Position;

  // attributes
  private shooting: number;

  // stats
  private stats: Stats;

  constructor(firstName: string, lastName: string, position: Position) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.shooting = getRandomNumber(100);
    this.stats = new Stats();
  }

  getShooting(): number {
    return this.shooting;
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

  incrementPoints(points: number, quarter: number): void {
    this.stats.incrementPoints(points, quarter);
  }

  incrementFieldGoalAttempts(): void {
    this.stats.incrementFieldGoalAttempts();
  }

  incrementFieldGoalMakes(): void {
    this.stats.incrementFieldGoalMakes();
  }
}
