import { Component, input } from "@angular/core";
import { Team } from "../../simulation/Team";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-stats-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./stats-table.component.html",
  styleUrl: "./stats-table.component.scss",
})
export class StatsTableComponent {
  team = input.required<Team>();

  headers = ["Player", "Position", "FG", "FG%", "3P", "Points"];
}
