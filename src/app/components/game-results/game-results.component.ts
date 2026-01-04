import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Game } from "../../simulation/Game";
import { GameStateService } from "../../service/game-state.service";
import { StatsTableComponent } from "../stats-table/stats-table.component";
import { TeamPpqtableComponent } from "../team-ppqtable/team-ppqtable.component";
import { FourFactorsComponent } from "../four-factors/four-factors.component";

@Component({
  selector: "app-game-results",
  imports: [CommonModule, StatsTableComponent, TeamPpqtableComponent, FourFactorsComponent],
  templateUrl: "./game-results.component.html",
  styleUrl: "./game-results.component.scss",
})
export class GameResultsComponent implements OnInit {
  gameResult: Game | null = null;

  constructor(
    private router: Router,
    private gameStateService: GameStateService
  ) {}

  ngOnInit(): void {
    this.gameResult = this.gameStateService.getGame();

    if (!this.gameResult) {
      this.router.navigate(["/"]);
    }
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }
}
