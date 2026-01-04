import { Injectable } from "@angular/core";
import { Game } from "../simulation/Game";

@Injectable({
  providedIn: "root",
})
export class GameStateService {
  private currentGame: Game | null = null;

  setGame(game: Game): void {
    this.currentGame = game;
  }

  getGame(): Game | null {
    return this.currentGame;
  }

  clearGame(): void {
    this.currentGame = null;
  }
}
