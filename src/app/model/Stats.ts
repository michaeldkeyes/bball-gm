export class Stats {
  #fieldGoalAttempts: number;
  #fieldGoalsMade: number;
  #freeThrowAttempts: number;
  #freeThrowsMade: number;
  #points: number;
  #pointsPerQuarter: number[];
  #threePointAttempts: number;
  #threePointMade: number;

  constructor() {
    this.#fieldGoalAttempts = 0;
    this.#fieldGoalsMade = 0;
    this.#freeThrowAttempts = 0;
    this.#freeThrowsMade = 0;
    this.#points = 0;
    this.#pointsPerQuarter = [];
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

  get freeThrowAttempts(): number {
    return this.#freeThrowAttempts;
  }

  set freeThrowAttempts(value: number) {
    this.#freeThrowAttempts = value;
  }

  get freeThrowsMade(): number {
    return this.#freeThrowsMade;
  }

  set freeThrowsMade(value: number) {
    this.#freeThrowsMade = value;
  }

  get fieldGoalsMade(): number {
    return this.#fieldGoalsMade;
  }

  set fieldGoalsMade(value: number) {
    this.#fieldGoalsMade = value;
  }

  get pointsPerQuarter(): number[] {
    return this.#pointsPerQuarter;
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
