import { Player } from "./player.interface";
import { Stats } from "./Stats";
import { Team } from "./Team";

/**
 * TeamGame class represents a basketball team in a game context.
 * It contains the team's players, stats, and methods to manage the game state.
 */
export class TeamGame extends Team {
  playersOnCourt: Player[];
  playersOnBench: Player[];

  constructor(team: Team) {
    super(team._id, team.abbreviation, team.name, team.city, team.players);
    this._abbreviation = team.abbreviation;
    this._name = team.name;
    this._city = team.city;
    this._players = team.players;

    this._players.forEach((player) => {
      player.stats = new Stats();
    });

    this.playersOnCourt = team.players.slice(0, 5); // First 5 players on court
    this.playersOnBench = team.players.slice(5); // Remaining players on bench
    this._stats = new Stats(); // Initialize stats for the team
  }
}
