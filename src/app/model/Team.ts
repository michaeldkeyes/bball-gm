import { Player } from "./player.interface";
import { Stats } from "./Stats";

// export interface Team {
//   id: number;
//   name: string;
//   city: string;
//   players: Player[];
//   stats?: Stats;
// }
export class Team {
  #id: number;
  #name: string;
  #city: string;
  #players: Player[];
  #stats?: Stats;

  constructor(id: number, name: string, city: string, players: Player[]) {
    this.#id = id;
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
