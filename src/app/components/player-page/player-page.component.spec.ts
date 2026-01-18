import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { PlayerPageComponent } from "./player-page.component";
import { Player } from "../../model/player.interface";
import { Position } from "../../model/positions.enum";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("PlayerPageComponent", () => {
  let component: PlayerPageComponent;
  let fixture: ComponentFixture<PlayerPageComponent>;
  let mockRouter: {
    navigate: ReturnType<typeof vi.fn>;
    getCurrentNavigation: ReturnType<typeof vi.fn>;
  };
  let mockPlayer: Player;

  beforeEach(async () => {
    mockPlayer = {
      firstName: "LeBron",
      lastName: "James",
      position: Position.SF,
      teamId: 1,
      attributes: {
        ballHandling: 85,
        blocking: 70,
        defensiveRebounding: 80,
        freeThrowShooting: 75,
        offensiveRebounding: 65,
        passing: 90,
        stealing: 75,
        twoPointShooting: 85,
        threePointShooting: 70,
        threeTendency: 40,
        usageRate: 30,
      },
    };

    mockRouter = {
      navigate: vi.fn(),
      getCurrentNavigation: vi.fn().mockReturnValue(null),
    };

    await TestBed.configureTestingModule({
      imports: [PlayerPageComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  describe("with player from navigation state", () => {
    beforeEach(() => {
      mockRouter.getCurrentNavigation.mockReturnValue({
        extras: {
          state: { player: mockPlayer },
        },
      });

      fixture = TestBed.createComponent(PlayerPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should load player from navigation state", () => {
      expect(component.player).toBe(mockPlayer);
    });

    it("should display player name", () => {
      const compiled = fixture.nativeElement;
      const playerName = compiled.querySelector("h1");
      expect(playerName.textContent.trim()).toBe("LeBron James");
    });

    it("should display player position", () => {
      const compiled = fixture.nativeElement;
      const position = compiled.textContent;
      expect(position).toContain("Position:");
      expect(position).toContain(Position.SF);
    });

    it("should display Attributes heading", () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelector("h2");
      expect(heading.textContent.trim()).toBe("Attributes");
    });

    it("should display ball handling attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Ball Handling");
      expect(content).toContain("85");
    });

    it("should display blocking attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Blocking");
      expect(content).toContain("70");
    });

    it("should display defensive rebounding attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Defensive Rebounding");
      expect(content).toContain("80");
    });

    it("should display free throw shooting attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Free Throw Shooting");
      expect(content).toContain("75");
    });

    it("should display offensive rebounding attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Offensive Rebounding");
      expect(content).toContain("65");
    });

    it("should display passing attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Passing");
      expect(content).toContain("90");
    });

    it("should display stealing attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Stealing");
      expect(content).toContain("75");
    });

    it("should display two point shooting attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Two Point Shooting");
      expect(content).toContain("85");
    });

    it("should display three point shooting attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Three Point Shooting");
      expect(content).toContain("70");
    });

    it("should display three point tendency attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Three Point Tendency");
      expect(content).toContain("40");
    });

    it("should display usage rate attribute", () => {
      const compiled = fixture.nativeElement;
      const content = compiled.textContent;
      expect(content).toContain("Usage Rate");
      expect(content).toContain("30");
    });

    it("should display back button", () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector("button");
      expect(button).toBeTruthy();
      expect(button.textContent).toContain("Back to Game");
    });

    it("should have 11 attribute cards", () => {
      const compiled = fixture.nativeElement;
      const cards = compiled.querySelectorAll(".rounded-lg.bg-gray-900");
      expect(cards.length).toBe(11);
    });

    it("should navigate to game page when goBack is called", () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(["/game"]);
    });

    it("should navigate to game page when back button is clicked", () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector("button");
      button.click();
      expect(mockRouter.navigate).toHaveBeenCalledWith(["/game"]);
    });
  });

  describe("with player from history state", () => {
    beforeEach(() => {
      mockRouter.getCurrentNavigation.mockReturnValue(null);
      // Mock history.state
      Object.defineProperty(window.history, "state", {
        writable: true,
        value: { player: mockPlayer },
      });

      fixture = TestBed.createComponent(PlayerPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should load player from history state", () => {
      expect(component.player).toBe(mockPlayer);
    });

    it("should display player name", () => {
      const compiled = fixture.nativeElement;
      const playerName = compiled.querySelector("h1");
      expect(playerName.textContent.trim()).toBe("LeBron James");
    });
  });

  describe("without player data", () => {
    beforeEach(() => {
      mockRouter.getCurrentNavigation.mockReturnValue(null);
      Object.defineProperty(window.history, "state", {
        writable: true,
        value: {},
      });

      fixture = TestBed.createComponent(PlayerPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should have null player", () => {
      expect(component.player).toBeUndefined();
    });

    it("should display player not found message", () => {
      const compiled = fixture.nativeElement;
      const message = compiled.textContent;
      expect(message).toContain("Player not found");
    });

    it("should display back button when player not found", () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector("button");
      expect(button).toBeTruthy();
      expect(button.textContent).toContain("Back to Game");
    });

    it("should not display player attributes", () => {
      const compiled = fixture.nativeElement;
      const cards = compiled.querySelectorAll(".rounded-lg.bg-gray-900");
      expect(cards.length).toBe(0);
    });

    it("should not display player name heading", () => {
      const compiled = fixture.nativeElement;
      const heading = compiled.querySelector("h1");
      expect(heading).toBeNull();
    });

    it("should navigate when back button is clicked", () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector("button");
      button.click();
      expect(mockRouter.navigate).toHaveBeenCalledWith(["/game"]);
    });
  });
});
