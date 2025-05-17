import { Stats } from "./Stats";

export class TeamStats extends Stats {
  #oppAssists: number;
  #oppBlocks: number;
  #oppDefensiveRebounds: number;
  #oppFieldGoalAttempts: number;
  #oppFieldGoalsMade: number;
  #oppFreeThrowAttempts: number;
  #oppFreeThrowsMade: number;
  #oppOffensiveRebounds: number;
  #oppPoints: number;
  #oppSteals: number;
  #oppThreePointAttempts: number;
  #oppThreePointMade: number;
  #oppTurnovers: number;

  constructor() {
    super();

    this.#oppAssists = 0;
    this.#oppBlocks = 0;
    this.#oppDefensiveRebounds = 0;
    this.#oppFieldGoalAttempts = 0;
    this.#oppFieldGoalsMade = 0;
    this.#oppFreeThrowAttempts = 0;
    this.#oppFreeThrowsMade = 0;
    this.#oppOffensiveRebounds = 0;
    this.#oppPoints = 0;
    this.#oppSteals = 0;
    this.#oppThreePointAttempts = 0;
    this.#oppThreePointMade = 0;
    this.#oppTurnovers = 0;
  }

  set oppAssists(value: number) {
    this.#oppAssists = value;
  }

  set oppBlocks(value: number) {
    this.#oppBlocks = value;
  }

  get oppDefensiveRebounds(): number {
    return this.#oppDefensiveRebounds;
  }
  set oppDefensiveRebounds(value: number) {
    this.#oppDefensiveRebounds = value;
  }

  set oppFieldGoalAttempts(value: number) {
    this.#oppFieldGoalAttempts = value;
  }

  set oppFieldGoalsMade(value: number) {
    this.#oppFieldGoalsMade = value;
  }

  set oppFreeThrowAttempts(value: number) {
    this.#oppFreeThrowAttempts = value;
  }

  set oppFreeThrowsMade(value: number) {
    this.#oppFreeThrowsMade = value;
  }

  set oppOffensiveRebounds(value: number) {
    this.#oppOffensiveRebounds = value;
  }

  set oppPoints(value: number) {
    this.#oppPoints = value;
  }

  set oppSteals(value: number) {
    this.#oppSteals = value;
  }

  set oppThreePointAttempts(value: number) {
    this.#oppThreePointAttempts = value;
  }

  set oppThreePointMade(value: number) {
    this.#oppThreePointMade = value;
  }

  set oppTurnovers(value: number) {
    this.#oppTurnovers = value;
  }
}
