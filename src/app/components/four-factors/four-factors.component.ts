import { Component, input } from "@angular/core";
import { TeamGame } from "../../model/TeamGame";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-four-factors",
  imports: [CommonModule],
  templateUrl: "./four-factors.component.html",
  styleUrl: "./four-factors.component.scss",
})
export class FourFactorsComponent {
  // readonly homeTeam = input.required<TeamGame>();
  // readonly awayTeam = input.required<TeamGame>();
  readonly teams = input.required<TeamGame[]>();

  headers = ["eFG%", "TOV%", "ORB%", "FTR%"];
}
