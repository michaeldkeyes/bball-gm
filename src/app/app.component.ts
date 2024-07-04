import { Component, computed, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Game } from "../simulation/Game";
import { Team } from "../simulation/Team";
import { Player } from "../simulation/Player";
import { GameResult } from "../simulation/GameResult";
import { StatsTableComponent } from "./stats-table/stats-table.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, StatsTableComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  gameResult = signal<GameResult>(new GameResult());
  homeTeam = computed(() => this.gameResult()?.getTeams()[0].team);
  awayTeam = computed(() => this.gameResult()?.getTeams()[1].team);

  simulateGame(): void {
    const homePlayers = [
      new Player("LeBron", "James", "SF"),
      new Player("Anthony", "Davis", "PF"),
      new Player("Dwight", "Howard", "C"),
      new Player("Avery", "Bradley", "PG"),
      new Player("Danny", "Green", "SG"),
    ];
    const homeTeam = new Team("Los Angeles", "Earthquakes", "LA", homePlayers);

    const awayPlayers = [
      new Player("Diana", "Taurasi", "SF"),
      new Player("Brittney", "Griner", "PF"),
      new Player("Skylar", "Diggins-Smith", "PG"),
      new Player("Bria", "Hartley", "SG"),
      new Player("Alanna", "Smith", "C"),
    ];
    const awayTeam = new Team("New York", "Liberty", "NY", awayPlayers);

    const game = new Game(homeTeam, awayTeam);

    this.gameResult.set(game.simulateGame());
  }
}
