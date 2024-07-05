import { Player } from "./Player";
import { Stats } from "./Stats";
import { getRandomNumber } from "./utils/random";

export class Team {
  private city: string;
  private name: string;
  private abbreviation: string;
  private players: Player[];

  // stats
  private stats: Stats;

  constructor(
    city: string,
    name: string,
    abbreviation: string,
    players: Player[] = []
  ) {
    this.city = city;
    this.name = name;
    this.abbreviation = abbreviation;
    this.players = players;

    this.stats = new Stats();
  }

  getAbbreviation(): string {
    return this.abbreviation;
  }

  getFullName(): string {
    return `${this.city} ${this.name}`;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getPoints(): number {
    return this.stats.getPoints();
  }

  getPointsPerQuarter(): number[] {
    return this.stats.getPointsPerQuarter();
  }

  getRandomPlayer(): Player {
    const randomIndex = getRandomNumber(this.players.length);
    return this.players[randomIndex];
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
