import { Attributes, Player, PlayerGame } from "../model/player.interface";
import { Team } from "../model/Team";
import { TeamGame } from "../model/TeamGame";
import { getRandomNumber, getRandomNumberBetween } from "./utils/random";

const FREE_THROW_RATE_FOR_TWO = 150; // 15% chance of getting fouled on a two point shot
const FREE_THROW_RATE_FOR_THREE = 15; // 1.5% chance of getting fouled on a three point shot

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

    this.#setHomeCourtAdvantage();
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
      }

      // End of quarter
      this.#quarter++;
      gameClock = this.#quarter <= 4 ? 720 : 300; // 12 minutes for first 4 quarters, 5 minutes for overtime
    }

    this.#setHomeCourtAdvantage(true); // Reset home court advantage

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

    // Determine if the offense or defense gets the rebound
    let player: PlayerGame;
    if (randomNumber <= totalDefenseRebounds) {
      // Defense gets the rebound
      player = this.#choosePlayer(this.#defense, totalDefenseRebounds, "defensiveRebounding");

      player.stats!.defensiveRebounds += 1;
      this.#defense.stats.defensiveRebounds += 1;
      this.#offense.stats.oppDefensiveRebounds += 1;
      this.#changePossession(); // Change possession to the defense
    } else {
      // Offense gets the rebound
      player = this.#choosePlayer(this.#offense, totalOffenseRebounds, "offensiveRebounding");

      player.stats!.offensiveRebounds += 1;
      this.#offense.stats!.offensiveRebounds += 1;
      this.#defense.stats.oppOffensiveRebounds += 1;
    }

    console.log(
      `Player: ${player.lastName} gets the rebound and now has ${player.stats!.rebounds} rebounds`
    );
  }

  #checkForAssist(playerToAssist: PlayerGame): PlayerGame | null {
    // Get a random number between 0 and 1000
    const randomNumber = getRandomNumber(1000);

    let min = 0;
    let max = 0;

    // Loop through the players on the court minus the player who is shooting to see if they get an assist
    for (const player of this.#offense.playersOnCourt) {
      if (player !== playerToAssist) {
        min = max;
        max = min + player.attributes.passing;

        if (randomNumber <= max) {
          return player; // Return the player who can get the assist
        }
      }
    }

    // If no player got the assist, return null
    return null;
  }

  #checkForSteal(): boolean {
    const randomNumber = getRandomNumber(1000);

    let min = 0;
    let max = 0;

    // Loop through the players on the court to see if they get a steal
    for (const player of this.#defense.playersOnCourt) {
      min = max;
      max = min + player.attributes.stealing;

      if (randomNumber <= max) {
        console.log(`${player.lastName} steals the ball!`);
        player.stats!.steals += 1;
        this.#defense.stats.steals += 1;
        this.#offense.stats.oppSteals += 1;

        return true;
      }
    }

    return false;
  }

  #simPossession(): void {
    // Get a random player from the offense
    const totalOffenseUsageRate = this.#getTeamTotalAttributeValue("usageRate", this.#offense);
    const playerToShoot = this.#choosePlayer(this.#offense, totalOffenseUsageRate, "usageRate");
    console.log(`Player: ${playerToShoot.lastName} has the ball`);

    // Determine if the player will shoot a 2-point or 3-point shot
    //const shootThree = getRandomNumber(1000) <= player.attributes.threeTendency;

    let shotSuccess = false;
    let isFouled = false;
    let numberOfFreeThrows = 0;
    let shotModifier = 1;

    // Check if there is a steal
    const steal = this.#checkForSteal();
    if (steal) {
      playerToShoot.stats!.turnovers += 1;
      this.#offense.stats.turnovers += 1;
      this.#defense.stats.oppTurnovers += 1;
      this.#changePossession(); // Change possession to the defense
      return; // End the possession
    }

    // Check if the player will turn the ball over
    const turnoverChance = getRandomNumber(1000);
    if (
      turnoverChance <=
      playerToShoot.attributes.ballHandling -
        this.#getTeamTotalAttributeValue("stealing", this.#defense) // Remove the defenses stealing ability from the equation, or else turnovers will be too high
    ) {
      console.log(`${playerToShoot.lastName} turns the ball over!`);
      playerToShoot.stats!.turnovers += 1;
      this.#offense.stats.turnovers += 1;
      this.#changePossession(); // Change possession to the defense
      this.#homeTeam.substitutePlayers();
      this.#awayTeam.substitutePlayers();
      return; // End the possession
    }

    playerToShoot.stats!.fieldGoalAttempts += 1;
    this.#offense.stats.fieldGoalAttempts += 1;
    this.#defense.stats.oppFieldGoalAttempts += 1;

    // Check if the shot is blocked
    const blockChance = getRandomNumber(1000);
    const totalBlockAbility = this.#getTeamTotalAttributeValue("blocking", this.#defense);
    if (blockChance <= totalBlockAbility) {
      const playerWhoBlocked = this.#choosePlayer(this.#defense, totalBlockAbility, "blocking");
      playerWhoBlocked.stats!.blocks += 1;
      this.#defense.stats.blocks += 1;
      this.#offense.stats.oppBlocks += 1;
      console.log(
        `${playerWhoBlocked.lastName} blocks the shot! He now has ${playerWhoBlocked.stats!.blocks} blocks`
      );

      this.#simRebound();
      return;
    }

    // Check if the player will be assisted
    const playerToAssist = this.#checkForAssist(playerToShoot);

    if (playerToAssist) {
      shotModifier += 0.05; // Player will have shooting percentage increased by 5% if assisted to simulate an easier shot
    }

    // Check if the player will shoot a 3-point shot based on their tendency
    if (getRandomNumber(1000) <= playerToShoot.attributes.threeTendency) {
      console.log(`${playerToShoot.lastName} for 3!`);

      // Check if the player is fouled on the 3-point shot
      isFouled = this.#isFouled(FREE_THROW_RATE_FOR_THREE);
      if (isFouled) {
        shotModifier -= 0.5; // Player will have shooting percentage reduced by 50% if fouled to simulate a tougher shot
      }

      playerToShoot.stats!.threePointAttempts += 1;
      this.#offense.stats.threePointAttempts += 1;
      this.#defense.stats.oppThreePointAttempts += 1;

      shotSuccess =
        getRandomNumber(1000) <= playerToShoot.attributes.threePointShooting * shotModifier;

      if (shotSuccess) {
        playerToShoot.stats!.fieldGoalsMade += 1;
        playerToShoot.stats!.points += 3;
        playerToShoot.stats!.threePointMade += 1;
        this.#offense.stats.fieldGoalsMade += 1;
        this.#offense.stats.points += 3;
        this.#offense.stats.threePointMade += 1;
        this.#offense.stats.pointsPerQuarter[this.#quarter - 1] += 3;
        this.#defense.stats.oppFieldGoalsMade += 1;
        this.#defense.stats.oppPoints += 3;
        this.#defense.stats.oppThreePointMade += 1;

        this.#doPlusMinus(3);

        console.log(
          `${playerToShoot.lastName} makes the 3-point shot! He is ${playerToShoot.stats!.threePointMade} for ${playerToShoot.stats!.threePointAttempts} from 3 and has ${playerToShoot.stats!.points} points`
        );

        if (playerToAssist) {
          console.log(`${playerToAssist.lastName} with the assist!`);
          playerToAssist.stats!.assists += 1;
          this.#offense.stats.assists += 1;
          this.#defense.stats.oppAssists += 1;
        }

        if (isFouled) {
          console.log(`And 1!`);
          numberOfFreeThrows = 1; // And 1
        } else {
          this.#changePossession(); // Change possession to the defense
        }
      } else {
        // The player missed the 3 point shot
        console.log(`${playerToShoot.lastName} misses the 3-point shot`);

        if (isFouled) {
          console.log(`But they were fouled!`);
          numberOfFreeThrows = 3;
          playerToShoot.stats!.threePointAttempts -= 1; // Remove the missed 3-point attempt from the stats
          playerToShoot.stats!.fieldGoalAttempts -= 1; // Remove the missed field goal attempt from the stats
          this.#offense.stats.threePointAttempts -= 1; // Remove the missed 3-point attempt from the stats
          this.#offense.stats.fieldGoalAttempts -= 1; // Remove the missed field goal attempt from the stats
        } else {
          this.#simRebound(); // Simulate a rebound
        }
      }
    } else {
      // The player will shoot a 2-point shot
      console.log(`${playerToShoot.lastName} takes the shot!`);

      // Check if the player is fouled on the 2-point shot
      isFouled = this.#isFouled(FREE_THROW_RATE_FOR_TWO);

      if (isFouled) {
        shotModifier = 0.5; // Player will have shooting percentage reduced by 50% if fouled to simulate a tougher shot
      }

      shotSuccess =
        getRandomNumber(1000) <= playerToShoot.attributes.twoPointShooting * shotModifier;

      if (shotSuccess) {
        playerToShoot.stats!.fieldGoalsMade += 1;
        playerToShoot.stats!.points += 2;
        this.#offense.stats.fieldGoalsMade += 1;
        this.#offense.stats.points += 2;
        this.#offense.stats.pointsPerQuarter[this.#quarter - 1] += 2; // Update points per quarter
        this.#defense.stats.oppFieldGoalsMade += 1;
        this.#defense.stats.oppPoints += 2;

        this.#doPlusMinus(2);

        console.log(
          `${playerToShoot.lastName} makes the 2-point shot! He is ${playerToShoot.stats!.fieldGoalsMade} for ${playerToShoot.stats!.fieldGoalAttempts} and has ${playerToShoot.stats!.points} points`
        );

        if (playerToAssist) {
          console.log(`${playerToAssist.lastName} with the assist!`);
          playerToAssist.stats!.assists += 1;
          this.#offense.stats.assists += 1;
          this.#defense.stats.oppAssists += 1;
        }

        if (isFouled) {
          console.log(`And 1!`);
          numberOfFreeThrows = 1; // And 1
        } else {
          this.#changePossession(); // Change possession to the defense
        }
      } else {
        // The player missed the 2 point shot
        console.log(`${playerToShoot.lastName} misses the 2-point shot`);

        if (isFouled) {
          console.log(`But they were fouled!`);
          numberOfFreeThrows = 2;

          playerToShoot.stats!.fieldGoalAttempts -= 1; // Remove the missed field goal attempt from the stats
          this.#offense.stats!.fieldGoalAttempts -= 1;
          this.#defense.stats.oppFieldGoalAttempts -= 1;
        } else {
          this.#simRebound();
        }
      }
    }

    if (numberOfFreeThrows > 0) {
      this.#simFreeThrows(playerToShoot, numberOfFreeThrows);
    }
  }

  #doPlusMinus(points: number): void {
    for (const player of this.#offense.playersOnCourt) {
      player.stats!.plusMinus += points;
    }

    for (const player of this.#defense.playersOnCourt) {
      player.stats!.plusMinus -= points;
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
      this.#defense.stats!.oppFreeThrowAttempts += 1;
      console.log(`${player.lastName} shoots his ${i + 1} free throw`);

      if (freeThrowSuccess) {
        console.log(`${player.lastName} makes the free throw`);
        player.stats!.freeThrowsMade += 1;
        this.#offense.stats!.freeThrowsMade += 1;
        player.stats!.points += 1;
        this.#offense.stats!.points += 1;
        this.#offense.stats!.pointsPerQuarter[this.#quarter - 1] += 1;
        this.#defense.stats.oppFreeThrowsMade += 1;
        this.#defense.stats.oppPoints += 1;

        this.#doPlusMinus(1);
      } else {
        console.log(`${player.lastName} misses the free throw`);
      }

      this.#homeTeam.substitutePlayers();
      this.#awayTeam.substitutePlayers();

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

  #setHomeCourtAdvantage(resetHomeCourtAdvantage: boolean = false): void {
    // Give home team a slight advantage. Home team gets a 0.5% boost to their attributes
    // and away team gets a 0.5% decrease to their attributes.
    const homeCourtAdvantage = 5;

    this.#homeTeam.players.forEach((player) => {
      if (!resetHomeCourtAdvantage) {
        for (const attr in player.attributes) {
          player.attributes[attr as keyof Attributes] += homeCourtAdvantage;
        }
      } else {
        for (const attr in player.attributes) {
          player.attributes[attr as keyof Attributes] -= homeCourtAdvantage;
        }
      }
    });

    this.#awayTeam.players.forEach((player) => {
      if (!resetHomeCourtAdvantage) {
        for (const attr in player.attributes) {
          player.attributes[attr as keyof Attributes] -= homeCourtAdvantage;
        }
      } else {
        // Reset the away team attributes to their original values
        for (const attr in player.attributes) {
          player.attributes[attr as keyof Attributes] += homeCourtAdvantage;
        }
      }
    });
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
