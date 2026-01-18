import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { signal } from "@angular/core";

import { GameResultsComponent } from "./game-results.component";
import { GameStateService } from "../../service/game-state.service";
import { Game } from "../../simulation/Game";
import { Team } from "../../model/Team";
import { TeamStats } from "../../model/TeamStats";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("GameResultsComponent", () => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };
  let mockGameStateService: { getGame: ReturnType<typeof vi.fn> };
  let mockGame: Game;
  let mockHomeTeam: Team;
  let mockAwayTeam: Team;

  beforeEach(async () => {
    // Create mock teams
    mockHomeTeam = new Team(1, "LAL", "Lakers", "Los Angeles", [], new TeamStats());
    mockAwayTeam = new Team(2, "BOS", "Celtics", "Boston", [], new TeamStats());

    // Create mock game
    mockGame = new Game(mockHomeTeam, mockAwayTeam);
    mockGame.homeTeam.stats = {
      points: 105,
      pointsPerQuarter: [25, 30, 25, 25],
    } as any;
    mockGame.awayTeam.stats = {
      points: 98,
      pointsPerQuarter: [20, 28, 22, 28],
    } as any;

    // Create mock services
    mockRouter = {
      navigate: vi.fn(),
    };

    mockGameStateService = {
      getGame: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [GameResultsComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GameStateService, useValue: mockGameStateService },
      ],
    }).compileComponents();
  });

  describe("when game exists", () => {
    beforeEach(() => {
      mockGameStateService.getGame.mockReturnValue(signal(mockGame));
      fixture = TestBed.createComponent(GameResultsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should display game result", () => {
      expect(component.gameResult()).toBe(mockGame);
    });

    it("should not navigate to home on init when game exists", () => {
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it("should display team names in the template", () => {
      const compiled = fixture.nativeElement;
      const teamNames = compiled.textContent;
      expect(teamNames).toContain("Los Angeles Lakers");
      expect(teamNames).toContain("Boston Celtics");
    });

    it("should display team scores in the template", () => {
      const compiled = fixture.nativeElement;
      const scores = compiled.textContent;
      expect(scores).toContain("105");
      expect(scores).toContain("98");
    });

    it("should display back button", () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector("button");
      expect(button).toBeTruthy();
      expect(button.textContent).toContain("Back to Home");
    });

    it("should navigate to home when goBack is called", () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(["/"]);
    });

    it("should navigate to home when back button is clicked", () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector("button");
      button.click();
      expect(mockRouter.navigate).toHaveBeenCalledWith(["/"]);
    });

    it("should display stats table components", () => {
      const compiled = fixture.nativeElement;
      const statsTables = compiled.querySelectorAll("app-stats-table");
      expect(statsTables.length).toBe(2);
    });

    it("should display team ppq table component", () => {
      const compiled = fixture.nativeElement;
      const ppqTable = compiled.querySelector("app-team-ppqtable");
      expect(ppqTable).toBeTruthy();
    });

    it("should display four factors component", () => {
      const compiled = fixture.nativeElement;
      const fourFactors = compiled.querySelector("app-four-factors");
      expect(fourFactors).toBeTruthy();
    });
  });

  describe("when game does not exist", () => {
    beforeEach(() => {
      mockGameStateService.getGame.mockReturnValue(signal(null));
      fixture = TestBed.createComponent(GameResultsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should navigate to home on init when game is null", () => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(["/"]);
    });

    it("should display no game results message", () => {
      const compiled = fixture.nativeElement;
      const message = compiled.textContent;
      expect(message).toContain("No game results found");
    });

    it("should display back button when no game exists", () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector("button");
      expect(button).toBeTruthy();
      expect(button.textContent).toContain("Back to Home");
    });

    it("should not display game results components when no game", () => {
      const compiled = fixture.nativeElement;
      const statsTables = compiled.querySelectorAll("app-stats-table");
      const ppqTable = compiled.querySelector("app-team-ppqtable");
      const fourFactors = compiled.querySelector("app-four-factors");

      expect(statsTables.length).toBe(0);
      expect(ppqTable).toBeFalsy();
      expect(fourFactors).toBeFalsy();
    });
  });

  describe("effect behavior", () => {
    it("should navigate to home when game becomes null after initialization", () => {
      const gameSignal = signal<Game | null>(mockGame);
      mockGameStateService.getGame.mockReturnValue(gameSignal);

      fixture = TestBed.createComponent(GameResultsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Clear any previous navigate calls
      mockRouter.navigate.mockClear();

      // Change game to null
      gameSignal.set(null);
      fixture.detectChanges();

      expect(mockRouter.navigate).toHaveBeenCalledWith(["/"]);
    });
  });
});
