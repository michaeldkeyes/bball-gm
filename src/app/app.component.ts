import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { TeamService } from "./service/team.service";
import { GameStateService } from "./service/game-state.service";
import { Game } from "./simulation/Game";
import { Team } from "./model/Team";
import { generateRandomPlayers } from "./utils/playerGenerator";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  homeTeam: Team | undefined;
  awayTeam: Team | undefined;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private gameStateService: GameStateService
  ) {}

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
      const gameResult = game.simulateGame();

      this.gameStateService.setGame(gameResult);

      this.router.navigate(["/game"]);
    }
  }
}
