import { Attributes, Player, PlayerGame } from "../app/model/player.interface";
import { Team } from "../app/model/Team";
import { TeamGame } from "../app/model/TeamGame";
import { getRandomNumber, getRandomNumberBetween } from "./utils/random";

const FREE_THROW_RATE_FOR_TWO = 230; // 23% chance of getting fouled on a two point shot
const FREE_THROW_RATE_FOR_THREE = 23; // 2.3% chance of getting fouled on a three point shot

export class Game {
  #homeTeam: TeamGame;
  #awayTeam: TeamGame;
  #offense: TeamGame;
  #quarter: number;

  constructor(homeTeam: Team, awayTeam: Team) {
    this.#homeTeam = new TeamGame(homeTeam);
    this.#awayTeam = new TeamGame(awayTeam);
    this.#offense = getRandomNumber(2) === 0 ? this.#homeTeam : this.#awayTeam;
    this.#quarter = 1;

    this.#homeTeam.setPlayingTimes();
    this.#awayTeam.setPlayingTimes();
  }

  simulateGame(): Game {
    console.log("Simulating game...");
    let gameClock = 720; // 12 minutes in seconds

    while (this.#quarter <= 4 || this.#homeTeam.stats!.points === this.#awayTeam.stats!.points) {
      this.#homeTeam.stats!.pointsPerQuarter.push(0);
      this.#awayTeam.stats!.pointsPerQuarter.push(0);

      while (gameClock > 0) {
        const timeOfPossession = getRandomNumberBetween(10, 25); // 10 to 24 seconds
        gameClock -= timeOfPossession;

        this.#homeTeam.increaseMinutes(timeOfPossession);
        this.#awayTeam.increaseMinutes(timeOfPossession);

        this.#simPossession();

        this.#offense = this.#offense === this.#homeTeam ? this.#awayTeam : this.#homeTeam;

        this.#homeTeam.substitutePlayers();
        this.#awayTeam.substitutePlayers();
      }

      // End of quarter
      this.#quarter++;
      gameClock = this.#quarter <= 4 ? 720 : 300; // 12 minutes for first 4 quarters, 5 minutes for overtime
    }

    return this;
  }

  #choosePlayer(attr: keyof Attributes): PlayerGame {
    const totalAttributeValue = this.#offense.playersOnCourt.reduce(
      (sum, player) => sum + player.attributes[attr],
      0
    );
    const randomNumber = getRandomNumber(totalAttributeValue);
    let currentTotal = 0;

    for (const player of this.#offense.playersOnCourt) {
      currentTotal += player.attributes[attr];
      if (randomNumber <= currentTotal) {
        return player;
      }
    }

    // Should never reach here if usage rates are set correctly
    throw new Error("No player found for the given random number.");
  }

  #simPossession(): void {
    // Simulate a possession
    // Get a random player from the offense
    const player = this.#choosePlayer("usageRate");

    // Determine if the player will shoot a 2-point or 3-point shot
    const shootThree = getRandomNumber(1000) <= player.attributes.threeTendency;

    let shotSuccess = false;
    let isFouled = false;
    let numberOfFreeThrows = 0;

    if (shootThree) {
      player.stats!.threePointAttempts += 1;
      this.#offense.stats!.threePointAttempts += 1;
      isFouled = this.#isFouled(FREE_THROW_RATE_FOR_THREE);
      if (isFouled) {
        numberOfFreeThrows = 3;
      }
      shotSuccess = getRandomNumber(1000) <= player.attributes.threePointShooting;
    } else {
      isFouled = this.#isFouled(FREE_THROW_RATE_FOR_TWO);
      numberOfFreeThrows = 2;
      if (isFouled) {
        numberOfFreeThrows = 2;
      }
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
        this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 3; // Update points per quarter
      } else {
        player.stats!.points += 2;
        this.#offense.stats!.points += 2;
        this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 2; // Update points per quarter
      }

      if (isFouled) {
        this.#simFreeThrows(player, 1); // And 1
      }
    } else if (isFouled) {
      this.#simFreeThrows(player, numberOfFreeThrows); // If the shot was missed and the player was fouled, shoot free throws
      // Take away the field goal attempt from the player and team stats
      player.stats!.fieldGoalAttempts -= 1;
      this.#offense.stats!.fieldGoalAttempts -= 1;
    }
  }

  #isFouled(freeThrowRate: number): boolean {
    // Check if the player was fouled on the shot
    const foulChance = getRandomNumber(1000);

    if (foulChance <= freeThrowRate) {
      return true;
    }

    return false; // No foul
  }

  #simFreeThrows(player: Player, numberOfFreeThrows: number): void {
    for (let i = 0; i < numberOfFreeThrows; i++) {
      // Simulate a free throw
      const freeThrowSuccess = getRandomNumber(1000) <= player.attributes.freeThrowShooting;

      if (freeThrowSuccess) {
        player.stats!.freeThrowsMade += 1;
        this.#offense.stats!.freeThrowsMade += 1;
        player.stats!.points += 1;
        this.#offense.stats!.points += 1;
        this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 1;
      }

      player.stats!.freeThrowAttempts += 1;
      this.#offense.stats!.freeThrowAttempts += 1;
    }
  }

  get homeTeam(): TeamGame {
    return this.#homeTeam;
  }

  get awayTeam(): TeamGame {
    return this.#awayTeam;
  }

  get quarter(): number {
    return this.#quarter;
  }

  getTeams(): TeamGame[] {
    return [this.#homeTeam, this.#awayTeam];
  }
}
