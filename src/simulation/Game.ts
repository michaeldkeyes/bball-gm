import { Stats } from "../app/model/Stats";
import { Team } from "../app/model/Team";
import { getRandomNumber, getRandomNumberBetween } from "./utils/random";

export class Game {
  #homeTeam: Team;
  #awayTeam: Team;
  #offense: Team;
  #quarter: number;

  constructor(homeTeam: Team, awayTeam: Team) {
    this.#homeTeam = homeTeam;
    this.#awayTeam = awayTeam;
    this.#offense = getRandomNumber(2) === 0 ? homeTeam : awayTeam;
    this.#quarter = 1;

    this.#homeTeam.stats = new Stats();
    this.#homeTeam.players.forEach((player) => {
      player.stats = new Stats();
    });

    this.#awayTeam.stats = new Stats();
    this.#awayTeam.players.forEach((player) => {
      player.stats = new Stats();
    });
  }

  simulateGame(): Game {
    console.log("Simulating game...");
    let gameClock = 720; // 12 minutes in seconds

    while (
      this.#quarter <= 4 ||
      this.#homeTeam.stats!.points === this.#awayTeam.stats!.points
    ) {
      // this.#homeTeam.stats!.pointsPerQuarter.push(0);
      // this.#awayTeam.stats!.pointsPerQuarter.push(0);

      while (gameClock > 0) {
        const timeOfPossession = getRandomNumberBetween(10, 24); // 10 to 24 seconds
        gameClock -= timeOfPossession;

        this.#simPossession();

        this.#offense =
          this.#offense === this.#homeTeam ? this.#awayTeam : this.#homeTeam;
      }

      // End of quarter
      this.#quarter++;
      gameClock = this.#quarter <= 4 ? 720 : 300; // 12 minutes for first 4 quarters, 5 minutes for overtime
    }

    return this;
  }

  #simPossession(): void {
    // Simulate a possession
    // Get a random player from the offense
    const player =
      this.#offense.players[getRandomNumber(this.#offense.players.length)];

    // Determine if the player will shoot a 2-point or 3-point shot
    const shootThree = getRandomNumber(1000) <= player.attributes.threeTendency;

    let shotSuccess = false;

    if (shootThree) {
      player.stats!.threePointAttempts += 1;
      this.#offense.stats!.threePointAttempts += 1;
      shotSuccess =
        getRandomNumber(1000) <= player.attributes.threePointShooting;
    } else {
      shotSuccess = getRandomNumber(1000) <= player.attributes.twoPointShooting;
    }

    // Update the player's stats
    player.stats!.fieldGoalAttempts += 1;
    // Update the team's stats
    this.#offense.stats!.fieldGoalAttempts += 1;
    if (shotSuccess) {
      player.stats!.fieldGoalsMade += 1;
      this.#offense.stats!.fieldGoalsMade += 1;

      if (shootThree) {
        player.stats!.threePointMade += 1;
        this.#offense.stats!.threePointMade += 1;
        player.stats!.points += 3;
        this.#offense.stats!.points += 3; // Assuming a 3-point shot
        //this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 3; // Update points per quarter
      } else {
        player.stats!.points += 2;
        this.#offense.stats!.points += 2;
      }

      //this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 2; // Update points per quarter
    }
  }

  get homeTeam(): Team {
    return this.#homeTeam;
  }

  get awayTeam(): Team {
    return this.#awayTeam;
  }
}
