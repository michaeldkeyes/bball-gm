import { Player } from "./player.interface";
import { Stats } from "./Stats";

export class Team {
  #id: number;
  #abbreviation: string;
  #name: string;
  #city: string;
  #players: Player[];
  #stats?: Stats;

  constructor(
    id: number,
    abbreviation: string,
    name: string,
    city: string,
    players: Player[]
  ) {
    this.#id = id;
    this.#abbreviation = abbreviation;
    this.#name = name;
    this.#city = city;
    this.#players = players;
  }

  fullName(): string {
    return `${this.#city} ${this.#name}`;
  }

  get id(): number {
    return this.#id;
  }

  get abbreviation(): string {
    return this.#abbreviation;
  }

  get name(): string {
    return this.#name;
  }

  get city(): string {
    return this.#city;
  }

  get players(): Player[] {
    return this.#players;
  }

  get stats(): Stats | undefined {
    return this.#stats;
  }

  set stats(value: Stats | undefined) {
    this.#stats = value;
  }
}
