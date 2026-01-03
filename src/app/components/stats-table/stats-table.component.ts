import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TeamGame } from "../../model/TeamGame";
import { Player } from "../../model/player.interface";

@Component({
  selector: "app-stats-table",
  imports: [CommonModule],
  templateUrl: "./stats-table.component.html",
  styleUrl: "./stats-table.component.scss",
})
export class StatsTableComponent {
  readonly team = input.required<TeamGame>();

  constructor(private router: Router) {}

  navigateToPlayer(player: Player): void {
    this.router.navigate(["/player", player.teamId], {
      state: { player },
    });
  }

  headers = [
    "Player",
    "Position",
    "MP",
    "FG",
    "FG%",
    "3P",
    "FT",
    "ORB",
    "DRB",
    "TRB",
    "AST",
    "STL",
    "BLK",
    "TOV",
    "PTS",
    "+/-",
    "GmSc",
  ];
}
