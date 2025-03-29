import { Component, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Team } from "./model/team.interface";
import { TeamService } from "./service/team.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  homeTeam = signal<Team>({ name: "", city: "", players: [] });
  awayTeam = signal<Team>({ name: "", city: "", players: [] });

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeam(1).subscribe((team) => this.homeTeam.set(team));
    this.teamService.getTeam(2).subscribe((team) => this.awayTeam.set(team));
  }
  // gameResult = signal<GameResult>(new GameResult());
  // homeTeam = computed(() => this.gameResult().getTeams()[0].team);
  // awayTeam = computed(() => this.gameResult().getTeams()[1].team);

  // simulateGame(): void {
  //   const homePlayers = [
  //     new Player("LeBron", "James", "SF"),
  //     new Player("Anthony", "Davis", "PF"),
  //     new Player("Dwight", "Howard", "C"),
  //     new Player("Avery", "Bradley", "PG"),
  //     new Player("Danny", "Green", "SG"),
  //   ];
  //   const homeTeam = new Team("Los Angeles", "Earthquakes", "LA", homePlayers);

  //   const awayPlayers = [
  //     new Player("Diana", "Taurasi", "SF"),
  //     new Player("Brittney", "Griner", "PF"),
  //     new Player("Skylar", "Diggins-Smith", "PG"),
  //     new Player("Bria", "Hartley", "SG"),
  //     new Player("Alanna", "Smith", "C"),
  //   ];
  //   const awayTeam = new Team("New York", "Liberty", "NY", awayPlayers);

  //   const game = new Game(homeTeam, awayTeam);

  //   this.gameResult.set(game.simulateGame());
  // }
}
