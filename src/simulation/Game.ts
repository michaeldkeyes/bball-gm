import { GameResult } from "./GameResult";
import { Team } from "./Team";
import { getRandomNumber } from "./utils/random";

export class Game {
  private homeTeam: Team;
  private awayTeam: Team;

  private offense: Team;

  constructor(homeTeam: Team, awayTeam: Team) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;

    this.offense = getRandomNumber(2) === 0 ? homeTeam : awayTeam;
  }

  simulateGame(): GameResult {
    console.log(
      `Simulating game between ${this.homeTeam.getFullName()} and ${this.awayTeam.getFullName()}`
    );
    console.log(`Tip-off! ${this.offense.getFullName()} has the ball!`);

    let quarter = 1;
    let gameClock = 720;

    while (quarter <= 4) {
      while (gameClock > 0) {
        const timeOfPossession = getRandomNumber(24);

        gameClock -= timeOfPossession;

        this.simPossession();

        this.offense =
          this.offense === this.homeTeam ? this.awayTeam : this.homeTeam;
      }

      quarter++;
    }

    const homePoints = this.homeTeam.getPoints();
    const awayPoints = this.awayTeam.getPoints();

    const gameResult: GameResult = new GameResult(
      {
        name:
          homePoints > awayPoints
            ? this.homeTeam.getFullName()
            : this.awayTeam.getFullName(),
        points: Math.max(homePoints, awayPoints),
      },
      {
        name:
          homePoints < awayPoints
            ? this.homeTeam.getFullName()
            : this.awayTeam.getFullName(),
        points: Math.min(homePoints, awayPoints),
      },
      0,
      [this.homeTeam, this.awayTeam]
    );

    return gameResult;
  }

  private simPossession(): void {
    // Simulate a possession
    // Get a random player from the offense
    const player = this.offense.getRandomPlayer();

    // Get a random number between 0 and 100
    const shot = getRandomNumber(100);

    player.incrementFieldGoalAttempts();
    this.offense.incrementFieldGoalAttempts();
    // If the shot is less than the player's shooting percentage, it's good
    if (shot < player.getShooting()) {
      player.incrementPoints(2);
      this.offense.incrementPoints(2);
      player.incrementFieldGoalMakes();
      this.offense.incrementFieldGoalMakes();
    }
  }
}
