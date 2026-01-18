import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ComponentRef } from "@angular/core";

import { TeamPpqtableComponent } from "./team-ppqtable.component";
import { Game } from "../../simulation/Game";
import { Team } from "../../model/Team";
import { TeamStats } from "../../model/TeamStats";
import { beforeEach, describe, expect, it } from "vitest";

describe("TeamPpqtableComponent", () => {
  let component: TeamPpqtableComponent;
  let fixture: ComponentFixture<TeamPpqtableComponent>;
  let componentRef: ComponentRef<TeamPpqtableComponent>;
  let mockGame: Game;
  let mockHomeTeam: Team;
  let mockAwayTeam: Team;

  beforeEach(async () => {
    // Create mock teams
    mockHomeTeam = new Team(1, "LAL", "Lakers", "Los Angeles", [], new TeamStats());
    mockAwayTeam = new Team(2, "BOS", "Celtics", "Boston", [], new TeamStats());

    // Create mock game
    mockGame = new Game(mockHomeTeam, mockAwayTeam);

    await TestBed.configureTestingModule({
      imports: [TeamPpqtableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPpqtableComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  describe("with completed 4-quarter game", () => {
    beforeEach(() => {
      // Mock a completed 4-quarter game
      mockGame.homeTeam.stats = {
        points: 105,
        pointsPerQuarter: [25, 30, 25, 25],
      } as any;
      mockGame.awayTeam.stats = {
        points: 98,
        pointsPerQuarter: [20, 28, 22, 28],
      } as any;
      Object.defineProperty(mockGame, "quarter", {
        get: () => 5, // Quarter 5 means game ended after 4 quarters
        configurable: true,
      });

      componentRef.setInput("game", mockGame);
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should accept game input", () => {
      expect(component.game()).toBe(mockGame);
    });

    it("should display correct number of quarter columns", () => {
      const compiled = fixture.nativeElement;
      const quarterHeaders = compiled.querySelectorAll("th");
      // Should have: empty header + Q1, Q2, Q3, Q4 + Final = 6 headers
      expect(quarterHeaders.length).toBe(6);
      expect(quarterHeaders[1].textContent.trim()).toBe("Q1");
      expect(quarterHeaders[2].textContent.trim()).toBe("Q2");
      expect(quarterHeaders[3].textContent.trim()).toBe("Q3");
      expect(quarterHeaders[4].textContent.trim()).toBe("Q4");
      expect(quarterHeaders[5].textContent.trim()).toBe("Final");
    });

    it("should display team abbreviations", () => {
      const compiled = fixture.nativeElement;
      const teamRows = compiled.querySelectorAll("tbody tr");
      expect(teamRows.length).toBe(2);

      const firstTeamAbbr = teamRows[0].querySelector("td:first-child");
      const secondTeamAbbr = teamRows[1].querySelector("td:first-child");

      expect(firstTeamAbbr.textContent.trim()).toBe("LAL");
      expect(secondTeamAbbr.textContent.trim()).toBe("BOS");
    });

    it("should display quarter scores for home team", () => {
      const compiled = fixture.nativeElement;
      const homeTeamRow = compiled.querySelectorAll("tbody tr")[0];
      const scoreCells = homeTeamRow.querySelectorAll("td");

      // Skip first cell (team abbreviation) and last cell (final score)
      expect(scoreCells[1].textContent.trim()).toBe("25"); // Q1
      expect(scoreCells[2].textContent.trim()).toBe("30"); // Q2
      expect(scoreCells[3].textContent.trim()).toBe("25"); // Q3
      expect(scoreCells[4].textContent.trim()).toBe("25"); // Q4
    });

    it("should display quarter scores for away team", () => {
      const compiled = fixture.nativeElement;
      const awayTeamRow = compiled.querySelectorAll("tbody tr")[1];
      const scoreCells = awayTeamRow.querySelectorAll("td");

      // Skip first cell (team abbreviation) and last cell (final score)
      expect(scoreCells[1].textContent.trim()).toBe("20"); // Q1
      expect(scoreCells[2].textContent.trim()).toBe("28"); // Q2
      expect(scoreCells[3].textContent.trim()).toBe("22"); // Q3
      expect(scoreCells[4].textContent.trim()).toBe("28"); // Q4
    });

    it("should display final scores", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");

      const homeTeamFinal = rows[0].querySelector("td:last-child");
      const awayTeamFinal = rows[1].querySelector("td:last-child");

      expect(homeTeamFinal.textContent.trim()).toBe("105");
      expect(awayTeamFinal.textContent.trim()).toBe("98");
    });

    it("should have proper table structure", () => {
      const compiled = fixture.nativeElement;
      const table = compiled.querySelector("table");
      const thead = table.querySelector("thead");
      const tbody = table.querySelector("tbody");

      expect(table).toBeTruthy();
      expect(thead).toBeTruthy();
      expect(tbody).toBeTruthy();
    });
  });

  describe("with overtime game", () => {
    beforeEach(() => {
      // Mock an overtime game (5 quarters)
      mockGame.homeTeam.stats = {
        points: 110,
        pointsPerQuarter: [25, 30, 25, 25, 5],
      } as any;
      mockGame.awayTeam.stats = {
        points: 108,
        pointsPerQuarter: [20, 28, 22, 28, 10],
      } as any;
      Object.defineProperty(mockGame, "quarter", {
        get: () => 6, // Quarter 6 means game ended after 5 quarters (1 OT)
        configurable: true,
      });

      componentRef.setInput("game", mockGame);
      fixture.detectChanges();
    });

    it("should display 5 quarter columns for overtime game", () => {
      const compiled = fixture.nativeElement;
      const quarterHeaders = compiled.querySelectorAll("th");
      // Should have: empty header + Q1, Q2, Q3, Q4, Q5 + Final = 7 headers
      expect(quarterHeaders.length).toBe(7);
      expect(quarterHeaders[5].textContent.trim()).toBe("Q5");
    });

    it("should display all quarter scores including overtime", () => {
      const compiled = fixture.nativeElement;
      const homeTeamRow = compiled.querySelectorAll("tbody tr")[0];
      const scoreCells = homeTeamRow.querySelectorAll("td");

      expect(scoreCells[1].textContent.trim()).toBe("25"); // Q1
      expect(scoreCells[2].textContent.trim()).toBe("30"); // Q2
      expect(scoreCells[3].textContent.trim()).toBe("25"); // Q3
      expect(scoreCells[4].textContent.trim()).toBe("25"); // Q4
      expect(scoreCells[5].textContent.trim()).toBe("5"); // OT
      expect(scoreCells[6].textContent.trim()).toBe("110"); // Final
    });
  });
});
