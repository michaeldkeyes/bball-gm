import { TestBed } from "@angular/core/testing";

import { GameStateService } from "./game-state.service";
import { Game } from "../simulation/Game";
import { Team } from "../model/Team";
import { TeamStats } from "../model/TeamStats";
import { beforeEach, describe, expect, it } from "vitest";

describe("GameStateService", () => {
  let service: GameStateService;
  let mockGame: Game;
  let mockHomeTeam: Team;
  let mockAwayTeam: Team;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStateService);

    // Create mock teams and game
    mockHomeTeam = new Team(1, "LAL", "Lakers", "Los Angeles", [], new TeamStats());
    mockAwayTeam = new Team(2, "BOS", "Celtics", "Boston", [], new TeamStats());
    mockGame = new Game(mockHomeTeam, mockAwayTeam);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("initial state", () => {
    it("should have null game initially", () => {
      const game = service.getGame();
      expect(game()).toBeNull();
    });

    it("should return a readonly signal", () => {
      const gameSignal = service.getGame();
      expect(gameSignal).toBeTruthy();
      expect(typeof gameSignal).toBe("function");
    });
  });

  describe("setGame", () => {
    it("should set the current game", () => {
      service.setGame(mockGame);
      const game = service.getGame();
      expect(game()).toBe(mockGame);
    });

    it("should update the game signal", () => {
      const gameSignal = service.getGame();
      expect(gameSignal()).toBeNull();

      service.setGame(mockGame);
      expect(gameSignal()).toBe(mockGame);
    });

    it("should overwrite previous game", () => {
      const firstGame = mockGame;
      service.setGame(firstGame);
      expect(service.getGame()()).toBe(firstGame);

      const secondTeam1 = new Team(3, "GSW", "Warriors", "Golden State", [], new TeamStats());
      const secondTeam2 = new Team(4, "MIA", "Heat", "Miami", [], new TeamStats());
      const secondGame = new Game(secondTeam1, secondTeam2);
      service.setGame(secondGame);
      expect(service.getGame()()).toBe(secondGame);
      expect(service.getGame()()).not.toBe(firstGame);
    });

    it("should allow setting the same game multiple times", () => {
      service.setGame(mockGame);
      expect(service.getGame()()).toBe(mockGame);

      service.setGame(mockGame);
      expect(service.getGame()()).toBe(mockGame);
    });
  });

  describe("getGame", () => {
    it("should return the current game", () => {
      service.setGame(mockGame);
      const game = service.getGame();
      expect(game()).toBe(mockGame);
    });

    it("should return null when no game is set", () => {
      const game = service.getGame();
      expect(game()).toBeNull();
    });

    it("should return the same signal reference on multiple calls", () => {
      const signal1 = service.getGame();
      const signal2 = service.getGame();
      expect(signal1).toBe(signal2);
    });

    it("should return a readonly signal that cannot be modified directly", () => {
      const gameSignal = service.getGame() as any;
      // Readonly signals should not have a set method
      expect(gameSignal.set).toBeUndefined();
    });

    it("should reflect changes made via setGame", () => {
      const gameSignal = service.getGame();
      expect(gameSignal()).toBeNull();

      service.setGame(mockGame);
      expect(gameSignal()).toBe(mockGame);

      service.clearGame();
      expect(gameSignal()).toBeNull();
    });
  });

  describe("clearGame", () => {
    it("should clear the current game", () => {
      service.setGame(mockGame);
      expect(service.getGame()()).toBe(mockGame);

      service.clearGame();
      expect(service.getGame()()).toBeNull();
    });

    it("should set game to null", () => {
      service.setGame(mockGame);
      service.clearGame();
      const game = service.getGame();
      expect(game()).toBeNull();
    });

    it("should do nothing when called on empty state", () => {
      expect(service.getGame()()).toBeNull();
      service.clearGame();
      expect(service.getGame()()).toBeNull();
    });

    it("should allow setting a new game after clearing", () => {
      service.setGame(mockGame);
      service.clearGame();
      expect(service.getGame()()).toBeNull();

      const newTeam1 = new Team(5, "CHI", "Bulls", "Chicago", [], new TeamStats());
      const newTeam2 = new Team(6, "NYK", "Knicks", "New York", [], new TeamStats());
      const newGame = new Game(newTeam1, newTeam2);
      service.setGame(newGame);
      expect(service.getGame()()).toBe(newGame);
    });

    it("should update signal subscriptions", () => {
      const gameSignal = service.getGame();
      service.setGame(mockGame);
      expect(gameSignal()).toBe(mockGame);

      service.clearGame();
      expect(gameSignal()).toBeNull();
    });
  });

  describe("service lifecycle", () => {
    it("should maintain state across multiple operations", () => {
      // Start with null
      expect(service.getGame()()).toBeNull();

      // Set game
      service.setGame(mockGame);
      expect(service.getGame()()).toBe(mockGame);

      // Clear game
      service.clearGame();
      expect(service.getGame()()).toBeNull();

      // Set game again
      const team1 = new Team(7, "DAL", "Mavericks", "Dallas", [], new TeamStats());
      const team2 = new Team(8, "PHX", "Suns", "Phoenix", [], new TeamStats());
      const newGame = new Game(team1, team2);
      service.setGame(newGame);
      expect(service.getGame()()).toBe(newGame);
    });

    it("should handle rapid set/clear cycles", () => {
      for (let i = 0; i < 10; i++) {
        const team1 = new Team(i * 2, `T${i}A`, `TeamA${i}`, `City${i}`, [], new TeamStats());
        const team2 = new Team(i * 2 + 1, `T${i}B`, `TeamB${i}`, `City${i}`, [], new TeamStats());
        const game = new Game(team1, team2);

        service.setGame(game);
        expect(service.getGame()()).toBe(game);

        service.clearGame();
        expect(service.getGame()()).toBeNull();
      }
    });
  });

  describe("singleton behavior", () => {
    it("should be provided as singleton", () => {
      const service1 = TestBed.inject(GameStateService);
      const service2 = TestBed.inject(GameStateService);
      expect(service1).toBe(service2);
    });

    it("should share state between injections", () => {
      const service1 = TestBed.inject(GameStateService);
      const service2 = TestBed.inject(GameStateService);

      service1.setGame(mockGame);
      expect(service2.getGame()()).toBe(mockGame);

      service2.clearGame();
      expect(service1.getGame()()).toBeNull();
    });
  });

  describe("signal reactivity", () => {
    it("should trigger effects when game changes", () => {
      let effectCount = 0;
      const gameSignal = service.getGame();

      // Simulate an effect watching the signal
      const checkSignal = () => {
        gameSignal();
        effectCount++;
      };

      checkSignal(); // Initial check
      expect(effectCount).toBe(1);

      service.setGame(mockGame);
      checkSignal(); // Should see the new value
      expect(effectCount).toBe(2);
      expect(gameSignal()).toBe(mockGame);

      service.clearGame();
      checkSignal(); // Should see null
      expect(effectCount).toBe(3);
      expect(gameSignal()).toBeNull();
    });
  });
});
