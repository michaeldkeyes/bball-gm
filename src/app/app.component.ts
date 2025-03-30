import { Component, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Team } from "./model/team.interface";
import { TeamService } from "./service/team.service";
import { StatsTableComponent } from "./stats-table/stats-table.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, StatsTableComponent],
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
}
