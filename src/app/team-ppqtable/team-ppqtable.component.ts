import { Component, input } from "@angular/core";
import { Game } from "../../simulation/Game";

@Component({
  selector: "app-team-ppqtable",
  imports: [],
  templateUrl: "./team-ppqtable.component.html",
  styleUrl: "./team-ppqtable.component.scss",
})
export class TeamPpqtableComponent {
  readonly game = input.required<Game | null>(); // This will never be null
}
