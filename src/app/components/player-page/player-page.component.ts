import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Player } from "../../model/player.interface";

@Component({
  selector: "app-player-page",
  imports: [CommonModule],
  templateUrl: "./player-page.component.html",
  styleUrl: "./player-page.component.scss",
})
export class PlayerPageComponent implements OnInit {
  player: Player | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get player data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.player = navigation.extras.state["player"];
    } else {
      // Try to get from history state (for direct URL access or refresh)
      this.player = history.state["player"];
    }
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }
}
