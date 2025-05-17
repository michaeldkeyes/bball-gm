import { PlayerGame } from "./player.interface";
import { PlayerStats } from "./PlayerStats";
import { Stats } from "./Stats";
import { Team } from "./Team";
import { TeamStats } from "./TeamStats";

/**
 * TeamGame class represents a basketball team in a game context.
 * It contains the team's players, stats, and methods to manage the game state.
 */
export class TeamGame extends Team {
  #players: PlayerGame[];
  #playersOnCourt: PlayerGame[];
  #playersOnBench: PlayerGame[];

  constructor(team: Team) {
    super(team._id, team.abbreviation, team.name, team.city, team.players);
    this.#players = team.players.map((player) => {
      return {
        ...player,
        stats: new PlayerStats(),
        benchTime: 0,
        courtTime: 0,
        playingTime: 0,
        restTime: 0,
      };
    });

    this.#playersOnCourt = this.#players.slice(0, 5); // First 5 players on court
    this.#playersOnBench = this.#players.slice(5); // Remaining players on bench

    this._stats = new TeamStats();
  }

  /**
   * This method increases the minutes played for each player on the court and bench.
   * @param count - The number of minutes to increase for each player.
   */
  increaseMinutes(count: number): void {
    this.#playersOnCourt.forEach((player) => {
      player.stats!.increaseMinutes(count); // Increase minutes played for each player on court
      player.courtTime++; // Increment court time for the player
    });

    this.#playersOnBench.forEach((player) => {
      player.benchTime++; // Increment bench time for the player
    });
  }

  /**
   * This method sets the playing times for each player.
   */
  setPlayingTimes(): void {
    const quarterPossessions = 50; // Estimated possessions in a quarter
    // TODO: add randomness to this number
    let possessionsToPlay = 37; // Starting possessions for the first player
    const decreaseBy = 3;

    this.#players.forEach((player, index) => {
      if (index > 9) return; // Only set playing time for the first 10 players

      player.playingTime = possessionsToPlay;
      player.restTime = quarterPossessions - possessionsToPlay;

      if (index !== 4) possessionsToPlay -= decreaseBy; // Don't decrease for the 6th man
    });
  }

  substitutePlayers(): void {
    const playersToSubOut = this.#playersOnCourt.filter(
      (player) => player.courtTime >= player.playingTime
    );

    if (playersToSubOut.length > 0 || this.#playersOnCourt.length < 5) {
      playersToSubOut.forEach((player) => {
        player.courtTime = 0; // Reset court time for the substituted player
        const index = this.#playersOnCourt.indexOf(player);
        this.#playersOnCourt.splice(index, 1); // Remove player from court
        this.#playersOnBench.push(player); // Add player to bench
      });

      const playersToSubIn = this.#playersOnBench.filter(
        (player) => player.benchTime >= player.restTime && player.playingTime > 0
      );

      playersToSubIn.forEach((player) => {
        player.benchTime = 0; // Reset bench time for the substituted player
        const index = this.#playersOnBench.indexOf(player);
        this.#playersOnBench.splice(index, 1); // Remove player from bench
        this.#playersOnCourt.push(player); // Add player to court
      });
    }
  }

  override get players(): PlayerGame[] {
    return this.#players;
  }

  get playersOnCourt(): PlayerGame[] {
    return this.#playersOnCourt;
  }
}
