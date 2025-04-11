import { Component, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TeamService } from "./service/team.service";
import { StatsTableComponent } from "./stats-table/stats-table.component";
import { Game } from "../simulation/Game";
import { Team } from "./model/Team";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, StatsTableComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  homeTeam: Team | undefined;
  awayTeam: Team | undefined;
  readonly gameResult = signal<Game | null>(null);

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService
      .getTeam(1)
      .subscribe(
        (team) =>
          (this.homeTeam = new Team(
            team.id,
            team.name,
            team.city,
            team.players
          ))
      );
    this.teamService
      .getTeam(2)
      .subscribe(
        (team) =>
          (this.awayTeam = new Team(
            team.id,
            team.name,
            team.city,
            team.players
          ))
      );
  }

  simulateGame(): void {
    if (this.homeTeam && this.awayTeam) {
      const game = new Game(this.homeTeam, this.awayTeam);

      this.gameResult.set(game.simulateGame());
    }
  }
}
