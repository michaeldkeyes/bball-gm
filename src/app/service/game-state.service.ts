import { Injectable, signal, Signal } from "@angular/core";
import { Game } from "../simulation/Game";

@Injectable({
  providedIn: "root",
})
export class GameStateService {
  private currentGame = signal<Game | null>(null);

  setGame(game: Game): void {
    this.currentGame.set(game);
  }

  getGame(): Signal<Game | null> {
    return this.currentGame.asReadonly();
  }

  clearGame(): void {
    this.currentGame.set(null);
  }
}
