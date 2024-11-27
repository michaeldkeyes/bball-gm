import { Component, input } from "@angular/core";
import { GameResult } from "../../simulation/GameResult";

@Component({
  selector: "app-team-ppqtable",
  standalone: true,
  imports: [],
  templateUrl: "./team-ppqtable.component.html",
  styleUrl: "./team-ppqtable.component.scss",
})
export class TeamPPQTableComponent {
  gameResult = input.required<GameResult>();
}
