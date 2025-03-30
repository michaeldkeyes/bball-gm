import { Component, computed, Input, input } from "@angular/core";
import { Team } from "../model/team.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-stats-table",
  imports: [CommonModule],
  templateUrl: "./stats-table.component.html",
  styleUrl: "./stats-table.component.scss",
})
export class StatsTableComponent {
  team = input.required<Team>();

  fullTeamName = computed(() => `${this.team().city} ${this.team().name}`);

  headers = ["Player", "Position", "Points", "Rebounds", "Assists"];
}
