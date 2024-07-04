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

  getFullName(): string {
    return `${this.city} ${this.name}`;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getPoints(): number {
    return this.stats.getPoints();
  }

  getRandomPlayer(): Player {
    const randomIndex = getRandomNumber(this.players.length - 1);
    return this.players[randomIndex];
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
