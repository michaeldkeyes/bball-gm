import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Player } from "../../model/player.interface";

@Component({
  selector: "app-player-page",
  imports: [],
  templateUrl: "./player-page.component.html",
  styleUrl: "./player-page.component.scss",
})
export class PlayerPageComponent implements OnInit {
  player: Player | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.player = navigation.extras.state["player"];
    } else {
      this.player = history.state["player"];
    }
  }

  goBack(): void {
    this.router.navigate(["/game"]);
  }
}
