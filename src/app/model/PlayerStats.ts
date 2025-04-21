import { Stats } from "./Stats";

export class PlayerStats extends Stats {
  #minutesPlayed: number;

  constructor() {
    super();
    this.#minutesPlayed = 0;
  }

  increaseMinutes(count: number): void {
    this.#minutesPlayed += count;
  }

  get minutesPlayed(): number {
    return this.#minutesPlayed;
  }
}
