import { Attributes, Player, PlayerGame } from "../app/model/player.interface";
import { Team } from "../app/model/Team";
import { TeamGame } from "../app/model/TeamGame";
import { getRandomNumber, getRandomNumberBetween } from "./utils/random";

const FREE_THROW_RATE_FOR_TWO = 250; // 25% chance of getting fouled on a two point shot
const FREE_THROW_RATE_FOR_THREE = 25; // 2.5% chance of getting fouled on a three point shot

export class Game {
  #homeTeam: TeamGame;
  #awayTeam: TeamGame;
  #defense: TeamGame;
  #offense: TeamGame;
  #quarter: number;

  constructor(homeTeam: Team, awayTeam: Team) {
    this.#homeTeam = new TeamGame(homeTeam);
    this.#awayTeam = new TeamGame(awayTeam);
    this.#offense = getRandomNumber(2) === 0 ? this.#homeTeam : this.#awayTeam;
    this.#defense = this.#offense === this.#homeTeam ? this.#awayTeam : this.#homeTeam;
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

      console.log(`Quarter: ${this.#quarter}`);

      while (gameClock > 0) {
        const timeOfPossession = getRandomNumberBetween(4, 24); // 10 to 24 seconds
        gameClock -= timeOfPossession;

        this.#homeTeam.increaseMinutes(timeOfPossession);
        this.#awayTeam.increaseMinutes(timeOfPossession);

        console.log(
          `${this.#homeTeam.city}: ${this.#homeTeam.stats!.points} - ${this.#awayTeam.city}: ${this.#awayTeam.stats!.points}`
        );
        console.log(`The ${this.#offense.name} have the ball for ${timeOfPossession} seconds`);
        console.log(`Time left in the quarter: ${gameClock} seconds`);

        this.#simPossession();

        //this.#offense = this.#offense === this.#homeTeam ? this.#awayTeam : this.#homeTeam;

        this.#homeTeam.substitutePlayers();
        this.#awayTeam.substitutePlayers();
      }

      // End of quarter
      this.#quarter++;
      gameClock = this.#quarter <= 4 ? 720 : 300; // 12 minutes for first 4 quarters, 5 minutes for overtime
    }

    return this;
  }

  #changePossession(): void {
    // Swap offense and defense
    const temp = this.#offense;
    this.#offense = this.#defense;
    this.#defense = temp;
  }

  #getTeamTotalAttributeValue(attr: keyof Attributes, team: TeamGame): number {
    return team.playersOnCourt.reduce((sum, player) => sum + player.attributes[attr], 0);
  }

  #choosePlayer(team: TeamGame, totalAttributeValue: number, attr: keyof Attributes): PlayerGame {
    const randomNumber = getRandomNumber(totalAttributeValue);
    let currentTotal = 0;

    for (const player of team.playersOnCourt) {
      currentTotal += player.attributes[attr];
      if (randomNumber <= currentTotal) {
        return player;
      }
    }

    // Should never reach here
    throw new Error("No player found for the given random number.");
  }

  #simRebound(): void {
    // Get offenses total rebound ability
    const totalOffenseRebounds = this.#getTeamTotalAttributeValue(
      "offensiveRebounding",
      this.#offense
    );

    // Get defenses total rebound ability
    const totalDefenseRebounds = this.#getTeamTotalAttributeValue(
      "defensiveRebounding",
      this.#defense
    );

    const totalRebounds = totalOffenseRebounds + totalDefenseRebounds;

    // Get a random number between 0 and the total rebounds
    let randomNumber = getRandomNumber(totalRebounds);

    console.log(
      `Offense Rebound Total: ${totalOffenseRebounds}, Defense Rebound Total: ${totalDefenseRebounds}`
    );
    console.log(`Random Number: ${randomNumber} of ${totalRebounds}`);

    // Determine if the offense or defense gets the rebound
    let player: PlayerGame;
    if (randomNumber <= totalDefenseRebounds) {
      console.log("Defense gets the rebound");
      // Defense gets the rebound
      player = this.#choosePlayer(this.#defense, totalDefenseRebounds, "defensiveRebounding");

      player.stats!.defensiveRebounds += 1;
      this.#defense.stats!.defensiveRebounds += 1;
      this.#changePossession(); // Change possession to the defense
    } else {
      console.log("Offense gets the rebound");
      // Offense gets the rebound
      player = this.#choosePlayer(this.#offense, totalOffenseRebounds, "offensiveRebounding");

      player.stats!.offensiveRebounds += 1;
      this.#offense.stats!.offensiveRebounds += 1;
    }

    console.log(
      `Player: ${player.lastName} gets the rebound and now has ${player.stats!.rebounds} rebounds`
    );
  }

  #simPossession(): void {
    // Get a random player from the offense
    const totalOffenseUsageRate = this.#getTeamTotalAttributeValue("usageRate", this.#offense);
    const player = this.#choosePlayer(this.#offense, totalOffenseUsageRate, "usageRate");
    console.log(`Player: ${player.lastName} has the ball`);

    // Determine if the player will shoot a 2-point or 3-point shot
    //const shootThree = getRandomNumber(1000) <= player.attributes.threeTendency;

    let shotSuccess = false;
    let isFouled = false;
    let numberOfFreeThrows = 0;
    let shotModifier = 1;

    player.stats!.fieldGoalAttempts += 1;
    this.#offense.stats!.fieldGoalAttempts += 1;

    // Check if the player will shoot a 3-point shot based on their tendency
    if (getRandomNumber(1000) <= player.attributes.threeTendency) {
      console.log(`${player.lastName} for 3!`);

      // Check if the player is fouled on the 3-point shot
      isFouled = this.#isFouled(FREE_THROW_RATE_FOR_THREE);
      if (isFouled) {
        shotModifier = 0.5; // Player will have shooting percentage reduced by 50% if fouled to simulate a tougher shot
      }

      player.stats!.threePointAttempts += 1;
      this.#offense.stats!.threePointAttempts += 1;

      shotSuccess = getRandomNumber(1000) <= player.attributes.threePointShooting * shotModifier;

      if (shotSuccess) {
        player.stats!.fieldGoalsMade += 1;
        player.stats!.points += 3;
        player.stats!.threePointMade += 1;
        this.#offense.stats!.fieldGoalsMade += 1;
        this.#offense.stats!.points += 3;
        this.#offense.stats!.threePointMade += 1;
        this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 3; // Update points per quarter

        console.log(
          `${player.lastName} makes the 3-point shot! He is ${player.stats!.threePointMade} for ${player.stats!.threePointAttempts} from 3 and has ${player.stats!.points} points`
        );

        if (isFouled) {
          console.log(`And 1!`);
          numberOfFreeThrows = 1; // And 1
        } else {
          this.#changePossession(); // Change possession to the defense
        }
      } else {
        // The player missed the 3 point shot
        console.log(`${player.lastName} misses the 3-point shot`);

        if (isFouled) {
          console.log(`But they were fouled!`);
          numberOfFreeThrows = 3;
          player.stats!.threePointAttempts -= 1; // Remove the missed 3-point attempt from the stats
          player.stats!.fieldGoalAttempts -= 1; // Remove the missed field goal attempt from the stats
          this.#offense.stats!.threePointAttempts -= 1; // Remove the missed 3-point attempt from the stats
          this.#offense.stats!.fieldGoalAttempts -= 1; // Remove the missed field goal attempt from the stats
        } else {
          this.#simRebound(); // Simulate a rebound
        }
      }
    } else {
      // The player will shoot a 2-point shot
      console.log(`${player.lastName} takes the shot!`);

      // Check if the player is fouled on the 2-point shot
      isFouled = this.#isFouled(FREE_THROW_RATE_FOR_TWO);

      if (isFouled) {
        shotModifier = 0.5; // Player will have shooting percentage reduced by 50% if fouled to simulate a tougher shot
      }

      shotSuccess = getRandomNumber(1000) <= player.attributes.twoPointShooting * shotModifier;

      if (shotSuccess) {
        player.stats!.fieldGoalsMade += 1;
        player.stats!.points += 2;
        this.#offense.stats!.fieldGoalsMade += 1;
        this.#offense.stats!.points += 2;
        this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 2; // Update points per quarter

        console.log(
          `${player.lastName} makes the 2-point shot! He is ${player.stats!.fieldGoalsMade} for ${player.stats!.fieldGoalAttempts} and has ${player.stats!.points} points`
        );

        if (isFouled) {
          console.log(`And 1!`);
          numberOfFreeThrows = 1; // And 1
        } else {
          this.#changePossession(); // Change possession to the defense
        }
      } else {
        // The player missed the 2 point shot
        console.log(`${player.lastName} misses the 2-point shot`);

        if (isFouled) {
          console.log(`But they were fouled!`);
          numberOfFreeThrows = 2;

          player.stats!.fieldGoalAttempts -= 1; // Remove the missed field goal attempt from the stats
          this.#offense.stats!.fieldGoalAttempts -= 1; // Remove the missed field goal attempt from the stats
        } else {
          this.#simRebound(); // Simulate a rebound
        }
      }
    }

    if (numberOfFreeThrows > 0) {
      this.#simFreeThrows(player, numberOfFreeThrows); // Simulate free throws
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

      player.stats!.freeThrowAttempts += 1;
      this.#offense.stats!.freeThrowAttempts += 1;
      console.log(`${player.lastName} shoots his ${i + 1} free throw`);

      if (freeThrowSuccess) {
        console.log(`${player.lastName} makes the free throw`);
        player.stats!.freeThrowsMade += 1;
        this.#offense.stats!.freeThrowsMade += 1;
        player.stats!.points += 1;
        this.#offense.stats!.points += 1;
        this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 1;
      } else {
        console.log(`${player.lastName} misses the free throw`);
      }

      if (i + 1 === numberOfFreeThrows) {
        // If the last free throw was made, change possession
        if (freeThrowSuccess) {
          this.#changePossession();
        } else {
          // If the last free throw was missed, simulate a rebound
          console.log(`${player.lastName} misses the free throw! Rebound!`);
          this.#simRebound();
        }
      }
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
