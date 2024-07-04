import { Team } from "./Team";

interface WinnerLoser {
  name: string;
  points: number;
}

export class GameResult {
  private winner: WinnerLoser;
  private loser: WinnerLoser;
  private overTimes: number;
  private teams: Team[];

  constructor(
    winner: WinnerLoser = { name: "", points: 0 },
    loser: WinnerLoser = { name: "", points: 0 },
    overTimes: number = 0,
    teams: Team[] = []
  ) {
    this.winner = winner;
    this.loser = loser;
    this.overTimes = overTimes;
    this.teams = teams;
  }

  getTeams(): Team[] {
    return this.teams;
  }

  getWinner(): WinnerLoser {
    return this.winner;
  }
}
