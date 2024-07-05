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
    let gameClock = 720;

    while (
      this.quarter <= 4 ||
      this.homeTeam.getPoints() === this.awayTeam.getPoints()
    ) {
      this.homeTeam.getPointsPerQuarter().push(0);
      this.awayTeam.getPointsPerQuarter().push(0);

      while (gameClock > 0) {
        const timeOfPossession = getRandomNumber(24);

        gameClock -= timeOfPossession;

        this.simPossession();

        this.offense =
          this.offense === this.homeTeam ? this.awayTeam : this.homeTeam;
      }

      this.quarter++;
      gameClock = this.quarter <= 4 ? 720 : 300;
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
    // Determine if the player will shoot a 2 or 3
    const shotType = getRandomNumber(100);

    const playerStats = player.getStats();
    const offenseStats = this.offense.getStats();

    playerStats.incrementFieldGoalAttempts();
    offenseStats.incrementFieldGoalAttempts();

    if (shotType <= player.getThreePointTendency()) {
      player.getStats().incrementThreePointAttempts();
      this.offense.getStats().incrementThreePointAttempts();
      // If the shot is less than the player's three point percentage, it's good
      if (shot <= player.getThreePointShooting()) {
        player.getStats().incrementThreePointMakes();
        this.offense.getStats().incrementThreePointMakes();
        playerStats.incrementPoints(3, this.quarter);
        offenseStats.incrementPoints(3, this.quarter);
        playerStats.incrementFieldGoalMakes();
        offenseStats.incrementFieldGoalMakes();
      }
    } else {
      // If the shot is less than the player's two point percentage, it's good
      if (shot <= player.getTwoPointShooting()) {
        playerStats.incrementPoints(2, this.quarter);
        offenseStats.incrementPoints(2, this.quarter);
        playerStats.incrementFieldGoalMakes();
        offenseStats.incrementFieldGoalMakes();
      }
    }
  }
}
