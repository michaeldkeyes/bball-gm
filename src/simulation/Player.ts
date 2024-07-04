import { Stats } from "./Stats";
import { getRandomNumber } from "./utils/random";

export class Player {
  private firstName: string;
  private lastName: string;
  private position: string;

  // attributes
  private shooting: number;

  // stats
  private stats: Stats;

  constructor(firstName: string, lastName: string, position: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.shooting = getRandomNumber(100);
    this.stats = new Stats();
  }

  getShooting(): number {
    return this.shooting;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  incrementPoints(points: number): void {
    this.stats.incrementPoints(points);
  }

  incrementFieldGoalAttempts(): void {
    this.stats.incrementFieldGoalAttempts();
  }

  incrementFieldGoalMakes(): void {
    this.stats.incrementFieldGoalMakes();
  }
}
