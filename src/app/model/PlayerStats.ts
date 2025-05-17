import { Stats } from "./Stats";

export class PlayerStats extends Stats {
  #minutesPlayed: number;
  #plusMinus: number;

  constructor() {
    super();
    this.#minutesPlayed = 0;
    this.#plusMinus = 0;
  }

  increaseMinutes(count: number): void {
    this.#minutesPlayed += count;
  }

  get minutesPlayed(): number {
    return this.#minutesPlayed;
  }

  get plusMinus(): number {
    return this.#plusMinus;
  }
  set plusMinus(value: number) {
    this.#plusMinus = value;
  }
}
