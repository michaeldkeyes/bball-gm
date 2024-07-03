import { Player } from "./Player";
import { getRandomNumber } from "./utils/random";

export class Team {
  private city: string;
  private name: string;
  private abbreviation: string;
  private players: Player[];

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
  }

  getFullName(): string {
    return `${this.city} ${this.name}`;
  }

  getRandomPlayer(): Player {
    const randomIndex = getRandomNumber(this.players.length - 1);
    return this.players[randomIndex];
  }
}
