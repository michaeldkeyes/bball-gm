import { Routes } from "@angular/router";
import { PlayerPageComponent } from "./components/player-page/player-page.component";
import { GameResultsComponent } from "./components/game-results/game-results.component";

export const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "player/:id", component: PlayerPageComponent },
  { path: "game", component: GameResultsComponent },
];
