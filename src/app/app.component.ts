import { Component, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TeamService } from "./service/team.service";
import { StatsTableComponent } from "./components/stats-table/stats-table.component";
import { Game } from "./simulation/Game";
import { Team } from "./model/Team";
import { TeamPpqtableComponent } from "./components/team-ppqtable/team-ppqtable.component";
import { FourFactorsComponent } from "./components/four-factors/four-factors.component";
import { generateRandomPlayers } from "./utils/playerGenerator";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FourFactorsComponent, StatsTableComponent, TeamPpqtableComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  homeTeam: Team | undefined;
  awayTeam: Team | undefined;
  readonly gameResult = signal<Game | null>(null);

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.homeTeam = new Team(1, "LAL", "Lakers", "Los Angeles", generateRandomPlayers());
    this.awayTeam = new Team(2, "BKN", "Nets", "Brooklyn", generateRandomPlayers());
    // this.teamService
    //   .getTeam(1)
    //   .subscribe(
    //     (team) =>
    //       (this.homeTeam = new Team(team.id, team.abbreviation, team.name, team.city, team.players))
    //   );
    // this.teamService
    //   .getTeam(2)
    //   .subscribe(
    //     (team) =>
    //       (this.awayTeam = new Team(team.id, team.abbreviation, team.name, team.city, team.players))
    //   );
  }

  simulateGame(): void {
    if (this.homeTeam && this.awayTeam) {
      const game = new Game(this.homeTeam, this.awayTeam);

      this.gameResult.set(game.simulateGame());
    }
  }
}
