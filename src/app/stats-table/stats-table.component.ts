import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TeamGame } from "../model/TeamGame";

@Component({
  selector: "app-stats-table",
  imports: [CommonModule],
  templateUrl: "./stats-table.component.html",
  styleUrl: "./stats-table.component.scss",
})
export class StatsTableComponent {
  readonly team = input.required<TeamGame>();

  headers = [
    "Player",
    "Position",
    "FG",
    "FG%",
    "3P",
    "FT",
    "Points",
    "Rebounds",
    "Assists",
  ];
}
