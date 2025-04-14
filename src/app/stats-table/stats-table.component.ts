import { Component, computed, Input, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Team } from "../model/Team";

@Component({
  selector: "app-stats-table",
  imports: [CommonModule],
  templateUrl: "./stats-table.component.html",
  styleUrl: "./stats-table.component.scss",
})
export class StatsTableComponent {
  readonly team = input.required<Team>();

  fullTeamName = computed(() => `${this.team().city} ${this.team().name}`);

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
