export class Stats {
  #fieldGoalAttempts: number;
  #fieldGoalsMade: number;
  #points: number;
  #threePointAttempts: number;
  #threePointMade: number;

  constructor() {
    this.#fieldGoalAttempts = 0;
    this.#fieldGoalsMade = 0;
    this.#points = 0;
    this.#threePointAttempts = 0;
    this.#threePointMade = 0;
  }

  get points(): number {
    return this.#points;
  }

  set points(value: number) {
    this.#points = value;
  }

  get fieldGoalAttempts(): number {
    return this.#fieldGoalAttempts;
  }

  set fieldGoalAttempts(value: number) {
    this.#fieldGoalAttempts = value;
  }

  get fieldGoalsMade(): number {
    return this.#fieldGoalsMade;
  }

  set fieldGoalsMade(value: number) {
    this.#fieldGoalsMade = value;
  }

  get threePointAttempts(): number {
    return this.#threePointAttempts;
  }
  set threePointAttempts(value: number) {
    this.#threePointAttempts = value;
  }

  get threePointMade(): number {
    return this.#threePointMade;
  }
  set threePointMade(value: number) {
    this.#threePointMade = value;
  }
}
