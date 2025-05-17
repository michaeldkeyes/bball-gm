import { Player } from "./player.interface";
import { TeamStats } from "./TeamStats";

/**
 * Team class represents a basketball team with its players and stats.
 * It provides methods to get team details and manage player stats.
 */
export class Team {
  _id: number;
  _abbreviation: string;
  _name: string;
  _city: string;
  _players: Player[];
  _stats: TeamStats;

  constructor(
    id: number,
    abbreviation: string,
    name: string,
    city: string,
    players: Player[],
    stats: TeamStats = new TeamStats()
  ) {
    this._id = id;
    this._abbreviation = abbreviation;
    this._name = name;
    this._city = city;
    this._players = players;
    this._stats = stats;
  }

  fullName(): string {
    return `${this._city} ${this._name}`;
  }

  get id(): number {
    return this._id;
  }

  get abbreviation(): string {
    return this._abbreviation;
  }

  get name(): string {
    return this._name;
  }

  get city(): string {
    return this._city;
  }

  get players(): Player[] {
    return this._players;
  }

  get stats(): TeamStats {
    return this._stats;
  }

  set stats(value: TeamStats) {
    this._stats = value;
  }
}
