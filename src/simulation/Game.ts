import { GameResult } from "./GameResult";
import { Team } from "./Team";
import { getRandomNumber } from "./utils/random";

export class Game {
  private homeTeam: Team;
  private awayTeam: Team;

  private offense: Team;

  private quarter;

  constructor(homeTeam: Team, awayTeam: Team) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;

    this.offense = getRandomNumber(2) === 0 ? homeTeam : awayTeam;

    this.quarter = 1;
  }

  simulateGame(): GameResult {
    while (this.quarter <= 4) {
      let gameClock = 720;

      while (gameClock > 0) {
        const timeOfPossession = getRandomNumber(24);

        gameClock -= timeOfPossession;

        this.simPossession();

        this.offense =
          this.offense === this.homeTeam ? this.awayTeam : this.homeTeam;
      }

      this.quarter++;
    }

    const homePoints = this.homeTeam.getPoints();
    const awayPoints = this.awayTeam.getPoints();

    const gameResult: GameResult = new GameResult(
      [
        {
          team: this.homeTeam,
          isWinner: homePoints > awayPoints,
          pointsPerQuarter: this.homeTeam.getPointsPerQuarter(),
        },
        {
          team: this.awayTeam,
          isWinner: awayPoints > homePoints,
          pointsPerQuarter: this.awayTeam.getPointsPerQuarter(),
        },
      ],
      this.quarter,
      true
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
      player.incrementPoints(2, this.quarter);
      this.offense.incrementPoints(2, this.quarter);
      player.incrementFieldGoalMakes();
      this.offense.incrementFieldGoalMakes();
    }
  }
}
