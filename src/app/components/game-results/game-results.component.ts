import { Component, OnInit, effect } from "@angular/core";
import { Router } from "@angular/router";

import { GameStateService } from "../../service/game-state.service";
import { StatsTableComponent } from "../stats-table/stats-table.component";
import { TeamPpqtableComponent } from "../team-ppqtable/team-ppqtable.component";
import { FourFactorsComponent } from "../four-factors/four-factors.component";

@Component({
  selector: "app-game-results",
  imports: [StatsTableComponent, TeamPpqtableComponent, FourFactorsComponent],
  templateUrl: "./game-results.component.html",
  styleUrl: "./game-results.component.scss",
})
export class GameResultsComponent implements OnInit {
  readonly gameResult = this.gameStateService.getGame();

  constructor(
    private router: Router,
    private gameStateService: GameStateService
  ) {
    // Use effect to react to game changes
    effect(() => {
      const game = this.gameResult();
      if (!game) {
        this.router.navigate(["/"]);
      }
    });
  }

  ngOnInit(): void {
    // Check if there's a game on init
    if (!this.gameResult()) {
      this.router.navigate(["/"]);
    }
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }
}
