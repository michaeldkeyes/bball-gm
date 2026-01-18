import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ComponentRef } from "@angular/core";

import { FourFactorsComponent } from "./four-factors.component";
import { TeamGame } from "../../model/TeamGame";
import { Team } from "../../model/Team";
import { TeamStats } from "../../model/TeamStats";
import { beforeEach, describe, expect, it } from "vitest";

describe("FourFactorsComponent", () => {
  let component: FourFactorsComponent;
  let fixture: ComponentFixture<FourFactorsComponent>;
  let componentRef: ComponentRef<FourFactorsComponent>;
  let mockHomeTeam: Team;
  let mockAwayTeam: Team;
  let mockHomeTeamGame: TeamGame;
  let mockAwayTeamGame: TeamGame;
  let mockTeams: TeamGame[];

  beforeEach(async () => {
    // Create mock teams
    mockHomeTeam = new Team(1, "LAL", "Lakers", "Los Angeles", [], new TeamStats());
    mockAwayTeam = new Team(2, "BOS", "Celtics", "Boston", [], new TeamStats());

    mockHomeTeamGame = new TeamGame(mockHomeTeam);
    mockAwayTeamGame = new TeamGame(mockAwayTeam);

    // Set home team stats
    mockHomeTeamGame.stats!.fieldGoalsMade = 40;
    mockHomeTeamGame.stats!.fieldGoalAttempts = 85;
    mockHomeTeamGame.stats!.threePointMade = 12;
    mockHomeTeamGame.stats!.threePointAttempts = 30;
    mockHomeTeamGame.stats!.freeThrowsMade = 18;
    mockHomeTeamGame.stats!.freeThrowAttempts = 22;
    mockHomeTeamGame.stats!.offensiveRebounds = 10;
    mockHomeTeamGame.stats!.defensiveRebounds = 35;
    mockHomeTeamGame.stats!.turnovers = 12;
    mockHomeTeamGame.stats!.oppDefensiveRebounds = 30;

    // Set away team stats
    mockAwayTeamGame.stats!.fieldGoalsMade = 38;
    mockAwayTeamGame.stats!.fieldGoalAttempts = 82;
    mockAwayTeamGame.stats!.threePointMade = 10;
    mockAwayTeamGame.stats!.threePointAttempts = 28;
    mockAwayTeamGame.stats!.freeThrowsMade = 15;
    mockAwayTeamGame.stats!.freeThrowAttempts = 20;
    mockAwayTeamGame.stats!.offensiveRebounds = 8;
    mockAwayTeamGame.stats!.defensiveRebounds = 32;
    mockAwayTeamGame.stats!.turnovers = 15;
    mockAwayTeamGame.stats!.oppDefensiveRebounds = 35;

    mockTeams = [mockHomeTeamGame, mockAwayTeamGame];

    await TestBed.configureTestingModule({
      imports: [FourFactorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FourFactorsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  describe("component initialization", () => {
    beforeEach(() => {
      componentRef.setInput("teams", mockTeams);
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should accept teams input", () => {
      expect(component.teams()).toBe(mockTeams);
    });

    it("should have correct headers", () => {
      expect(component.headers).toEqual(["eFG%", "TOV%", "ORB%", "FTR%"]);
    });
  });

  describe("template rendering", () => {
    beforeEach(() => {
      componentRef.setInput("teams", mockTeams);
      fixture.detectChanges();
    });

    it("should render table", () => {
      const compiled = fixture.nativeElement;
      const table = compiled.querySelector("table");
      expect(table).toBeTruthy();
    });

    it("should render all header columns", () => {
      const compiled = fixture.nativeElement;
      const headers = compiled.querySelectorAll("thead th");
      expect(headers.length).toBe(4);
      expect(headers[0].textContent.trim()).toBe("eFG%");
      expect(headers[1].textContent.trim()).toBe("TOV%");
      expect(headers[2].textContent.trim()).toBe("ORB%");
      expect(headers[3].textContent.trim()).toBe("FTR%");
    });

    it("should render rows for both teams", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      expect(rows.length).toBe(2);
    });

    it("should display effective field goal percentage for home team", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const efgCell = rows[0].querySelectorAll("td")[0];
      // eFG% = (FGM + 0.5 * 3PM) / FGA = (40 + 0.5 * 12) / 85 = 46 / 85 = 0.541...
      expect(efgCell.textContent.trim()).toContain("54.1%");
    });

    it("should display effective field goal percentage for away team", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const efgCell = rows[1].querySelectorAll("td")[0];
      // eFG% = (FGM + 0.5 * 3PM) / FGA = (38 + 0.5 * 10) / 82 = 43 / 82 = 0.524...
      expect(efgCell.textContent.trim()).toContain("52.4%");
    });

    it("should display turnover percentage for home team", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const tovCell = rows[0].querySelectorAll("td")[1];
      // TOV% = TOV / (FGA + 0.44 * FTA + TOV) = 12 / (85 + 0.44 * 22 + 12) = 12 / 106.68 = 0.112...
      expect(tovCell.textContent.trim()).toContain("11.2%");
    });

    it("should display turnover percentage for away team", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const tovCell = rows[1].querySelectorAll("td")[1];
      // TOV% = TOV / (FGA + 0.44 * FTA + TOV) = 15 / (82 + 0.44 * 20 + 15) = 15 / 105.8 = 0.141...
      expect(tovCell.textContent.trim()).toContain("14.2%");
    });

    it("should display offensive rebound percentage for home team", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const orbCell = rows[0].querySelectorAll("td")[2];
      // ORB% = ORB / (ORB + OPP_DRB) = 10 / (10 + 30) = 10 / 40 = 0.25
      expect(orbCell.textContent.trim()).toContain("25.0%");
    });

    it("should display offensive rebound percentage for away team", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const orbCell = rows[1].querySelectorAll("td")[2];
      // ORB% = ORB / (ORB + OPP_DRB) = 8 / (8 + 35) = 8 / 43 = 0.186...
      expect(orbCell.textContent.trim()).toContain("18.6%");
    });

    it("should display free throw rate for home team", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const ftrCell = rows[0].querySelectorAll("td")[3];
      // FTR% = FTM / FGA = 18 / 85 = 0.211...
      expect(ftrCell.textContent.trim()).toContain("21.2%");
    });

    it("should display free throw rate for away team", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const ftrCell = rows[1].querySelectorAll("td")[3];
      // FTR% = FTM / FGA = 15 / 82 = 0.182...
      expect(ftrCell.textContent.trim()).toContain("18.3%");
    });

    it("should have correct table structure", () => {
      const compiled = fixture.nativeElement;
      const table = compiled.querySelector("table");
      const thead = table.querySelector("thead");
      const tbody = table.querySelector("tbody");
      expect(thead).toBeTruthy();
      expect(tbody).toBeTruthy();
    });

    it("should render 4 cells per team row", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const row1Cells = rows[0].querySelectorAll("td");
      const row2Cells = rows[1].querySelectorAll("td");
      expect(row1Cells.length).toBe(4);
      expect(row2Cells.length).toBe(4);
    });
  });
});
