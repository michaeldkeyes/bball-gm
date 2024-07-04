import { Team } from "./Team";

// interface WinnerLoser {
//   name: string;
//   points: number;
// }

const blankTeamResult: TeamResult = {
  team: new Team("", "", ""),
  isWinner: false,
  pointsPerQuarter: [0, 0, 0, 0],
};

interface TeamResult {
  team: Team;
  isWinner: boolean;
  pointsPerQuarter: number[];
}

export class GameResult {
  teams: [TeamResult, TeamResult];
  overtimes: number;

  // providing these default values is necessary for typescript to have a no-arg constructor
  constructor(
    teams: [TeamResult, TeamResult] = [blankTeamResult, blankTeamResult],
    overtimes: number = 0
  ) {
    this.teams = teams;
    this.overtimes = overtimes;
  }

  getTeams(): [TeamResult, TeamResult] {
    return this.teams;
  }
  //   private winner: WinnerLoser;
  //   private loser: WinnerLoser;
  //   private overTimes: number;
  //   private teams: Team[];

  //   constructor(
  //     winner: WinnerLoser = { name: "", points: 0 },
  //     loser: WinnerLoser = { name: "", points: 0 },
  //     overTimes: number = 0,
  //     teams: Team[] = []
  //   ) {
  //     this.winner = winner;
  //     this.loser = loser;
  //     this.overTimes = overTimes;
  //     this.teams = teams;
  //   }

  //   getTeams(): Team[] {
  //     return this.teams;
  //   }

  //   getWinner(): WinnerLoser {
  //     return this.winner;
  //   }
}
