import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { ComponentRef } from "@angular/core";

import { StatsTableComponent } from "./stats-table.component";
import { TeamGame } from "../../model/TeamGame";
import { Team } from "../../model/Team";
import { TeamStats } from "../../model/TeamStats";
import { PlayerStats } from "../../model/PlayerStats";
import { Position } from "../../model/positions.enum";
import { Player } from "../../model/player.interface";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("StatsTableComponent", () => {
  let component: StatsTableComponent;
  let fixture: ComponentFixture<StatsTableComponent>;
  let componentRef: ComponentRef<StatsTableComponent>;
  let mockRouter: { navigate: ReturnType<typeof vi.fn> };
  let mockTeam: Team;
  let mockTeamGame: TeamGame;
  let mockPlayers: Player[];

  beforeEach(async () => {
    // Create mock players with stats
    mockPlayers = [
      {
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
      },
      {
        firstName: "Anthony",
        lastName: "Davis",
        position: Position.PF,
        teamId: 1,
        attributes: {
          ballHandling: 65,
          blocking: 95,
          defensiveRebounding: 90,
          freeThrowShooting: 80,
          offensiveRebounding: 85,
          passing: 70,
          stealing: 70,
          twoPointShooting: 80,
          threePointShooting: 60,
          threeTendency: 30,
          usageRate: 25,
        },
      },
    ];

    // Create mock team
    mockTeam = new Team(1, "LAL", "Lakers", "Los Angeles", mockPlayers, new TeamStats());
    mockTeamGame = new TeamGame(mockTeam);

    // Set player stats AFTER creating TeamGame (TeamGame creates new PlayerStats)
    mockTeamGame.players[0].stats!.points = 28;
    mockTeamGame.players[0].stats!.fieldGoalsMade = 10;
    mockTeamGame.players[0].stats!.fieldGoalAttempts = 18;
    mockTeamGame.players[0].stats!.threePointMade = 3;
    mockTeamGame.players[0].stats!.threePointAttempts = 7;
    mockTeamGame.players[0].stats!.freeThrowsMade = 5;
    mockTeamGame.players[0].stats!.freeThrowAttempts = 6;
    mockTeamGame.players[0].stats!.offensiveRebounds = 2;
    mockTeamGame.players[0].stats!.defensiveRebounds = 6;
    mockTeamGame.players[0].stats!.assists = 8;
    mockTeamGame.players[0].stats!.steals = 2;
    mockTeamGame.players[0].stats!.blocks = 1;
    mockTeamGame.players[0].stats!.turnovers = 3;
    mockTeamGame.players[0].stats!.plusMinus = 12;
    mockTeamGame.players[0].stats!.increaseMinutes(1800); // 30 minutes

    mockTeamGame.players[1].stats!.points = 22;
    mockTeamGame.players[1].stats!.fieldGoalsMade = 9;
    mockTeamGame.players[1].stats!.fieldGoalAttempts = 15;
    mockTeamGame.players[1].stats!.threePointMade = 1;
    mockTeamGame.players[1].stats!.threePointAttempts = 3;
    mockTeamGame.players[1].stats!.freeThrowsMade = 3;
    mockTeamGame.players[1].stats!.freeThrowAttempts = 4;
    mockTeamGame.players[1].stats!.offensiveRebounds = 4;
    mockTeamGame.players[1].stats!.defensiveRebounds = 8;
    mockTeamGame.players[1].stats!.assists = 3;
    mockTeamGame.players[1].stats!.steals = 1;
    mockTeamGame.players[1].stats!.blocks = 3;
    mockTeamGame.players[1].stats!.turnovers = 2;
    mockTeamGame.players[1].stats!.plusMinus = 8;
    mockTeamGame.players[1].stats!.increaseMinutes(1680); // 28 minutes

    // Set team stats
    mockTeamGame.stats!.points = 105;
    mockTeamGame.stats!.fieldGoalsMade = 38;
    mockTeamGame.stats!.fieldGoalAttempts = 85;
    mockTeamGame.stats!.threePointMade = 12;
    mockTeamGame.stats!.threePointAttempts = 30;
    mockTeamGame.stats!.freeThrowsMade = 17;
    mockTeamGame.stats!.freeThrowAttempts = 22;
    mockTeamGame.stats!.offensiveRebounds = 10;
    mockTeamGame.stats!.defensiveRebounds = 35;
    mockTeamGame.stats!.assists = 24;
    mockTeamGame.stats!.steals = 7;
    mockTeamGame.stats!.blocks = 5;
    mockTeamGame.stats!.turnovers = 12;

    mockRouter = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [StatsTableComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsTableComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  describe("component initialization", () => {
    beforeEach(() => {
      componentRef.setInput("team", mockTeamGame);
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should accept team input", () => {
      expect(component.team()).toBe(mockTeamGame);
    });

    it("should have correct headers", () => {
      expect(component.headers).toEqual([
        "Player",
        "Position",
        "MP",
        "FG",
        "FG%",
        "3P",
        "FT",
        "ORB",
        "DRB",
        "TRB",
        "AST",
        "STL",
        "BLK",
        "TOV",
        "PTS",
        "+/-",
        "GmSc",
      ]);
    });
  });

  describe("template rendering", () => {
    beforeEach(() => {
      componentRef.setInput("team", mockTeamGame);
      fixture.detectChanges();
    });

    it("should display team name", () => {
      const compiled = fixture.nativeElement;
      const teamName = compiled.querySelector("h2");
      expect(teamName.textContent).toContain("Los Angeles Lakers");
    });

    it("should render all header columns", () => {
      const compiled = fixture.nativeElement;
      const headers = compiled.querySelectorAll("thead th");
      expect(headers.length).toBe(17);
      expect(headers[0].textContent.trim()).toBe("Player");
      expect(headers[1].textContent.trim()).toBe("Position");
      expect(headers[14].textContent.trim()).toBe("PTS");
    });

    it("should render player rows", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      expect(rows.length).toBe(2);
    });

    it("should display player names as clickable buttons", () => {
      const compiled = fixture.nativeElement;
      const playerButtons = compiled.querySelectorAll("tbody tr td button");
      expect(playerButtons.length).toBe(2);
      expect(playerButtons[0].textContent.trim()).toBe("LeBron James");
      expect(playerButtons[1].textContent.trim()).toBe("Anthony Davis");
    });

    it("should display player positions", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const position1 = rows[0].querySelectorAll("td")[1];
      const position2 = rows[1].querySelectorAll("td")[1];
      expect(position1.textContent.trim()).toBe(Position.SF);
      expect(position2.textContent.trim()).toBe(Position.PF);
    });

    it("should display minutes played in correct format", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const minutes1 = rows[0].querySelectorAll("td")[2];
      const minutes2 = rows[1].querySelectorAll("td")[2];
      expect(minutes1.textContent.trim()).toBe("30:00");
      expect(minutes2.textContent.trim()).toBe("28:00");
    });

    it("should display field goals made/attempts", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const fg1 = rows[0].querySelectorAll("td")[3];
      const fg2 = rows[1].querySelectorAll("td")[3];
      expect(fg1.textContent.trim()).toBe("10/18");
      expect(fg2.textContent.trim()).toBe("9/15");
    });

    it("should display field goal percentage", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const fgPct1 = rows[0].querySelectorAll("td")[4];
      const fgPct2 = rows[1].querySelectorAll("td")[4];
      expect(fgPct1.textContent.trim()).toContain("55.6%");
      expect(fgPct2.textContent.trim()).toContain("60.0%");
    });

    it("should display three-pointers made/attempts", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const threes1 = rows[0].querySelectorAll("td")[5];
      const threes2 = rows[1].querySelectorAll("td")[5];
      expect(threes1.textContent.trim()).toBe("3/7");
      expect(threes2.textContent.trim()).toBe("1/3");
    });

    it("should display free throws made/attempts", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const ft1 = rows[0].querySelectorAll("td")[6];
      const ft2 = rows[1].querySelectorAll("td")[6];
      expect(ft1.textContent.trim()).toBe("5/6");
      expect(ft2.textContent.trim()).toBe("3/4");
    });

    it("should display offensive rebounds", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const orb1 = rows[0].querySelectorAll("td")[7];
      const orb2 = rows[1].querySelectorAll("td")[7];
      expect(orb1.textContent.trim()).toBe("2");
      expect(orb2.textContent.trim()).toBe("4");
    });

    it("should display defensive rebounds", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const drb1 = rows[0].querySelectorAll("td")[8];
      const drb2 = rows[1].querySelectorAll("td")[8];
      expect(drb1.textContent.trim()).toBe("6");
      expect(drb2.textContent.trim()).toBe("8");
    });

    it("should display total rebounds", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const trb1 = rows[0].querySelectorAll("td")[9];
      const trb2 = rows[1].querySelectorAll("td")[9];
      expect(trb1.textContent.trim()).toBe("8");
      expect(trb2.textContent.trim()).toBe("12");
    });

    it("should display assists", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const ast1 = rows[0].querySelectorAll("td")[10];
      const ast2 = rows[1].querySelectorAll("td")[10];
      expect(ast1.textContent.trim()).toBe("8");
      expect(ast2.textContent.trim()).toBe("3");
    });

    it("should display steals", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const stl1 = rows[0].querySelectorAll("td")[11];
      const stl2 = rows[1].querySelectorAll("td")[11];
      expect(stl1.textContent.trim()).toBe("2");
      expect(stl2.textContent.trim()).toBe("1");
    });

    it("should display blocks", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const blk1 = rows[0].querySelectorAll("td")[12];
      const blk2 = rows[1].querySelectorAll("td")[12];
      expect(blk1.textContent.trim()).toBe("1");
      expect(blk2.textContent.trim()).toBe("3");
    });

    it("should display turnovers", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const tov1 = rows[0].querySelectorAll("td")[13];
      const tov2 = rows[1].querySelectorAll("td")[13];
      expect(tov1.textContent.trim()).toBe("3");
      expect(tov2.textContent.trim()).toBe("2");
    });

    it("should display points", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const pts1 = rows[0].querySelectorAll("td")[14];
      const pts2 = rows[1].querySelectorAll("td")[14];
      expect(pts1.textContent.trim()).toBe("28");
      expect(pts2.textContent.trim()).toBe("22");
    });

    it("should display plus/minus", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const plusMinus1 = rows[0].querySelectorAll("td")[15];
      const plusMinus2 = rows[1].querySelectorAll("td")[15];
      expect(plusMinus1.textContent.trim()).toBe("12");
      expect(plusMinus2.textContent.trim()).toBe("8");
    });

    it("should display game score", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      const gmsc1 = rows[0].querySelectorAll("td")[16];
      const gmsc2 = rows[1].querySelectorAll("td")[16];
      // Game Score is calculated in the template
      expect(gmsc1.textContent.trim()).toBeTruthy();
      expect(gmsc2.textContent.trim()).toBeTruthy();
    });

    it("should apply alternating row colors", () => {
      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      expect(rows[0].classList.contains("bg-slate-900")).toBe(true);
      expect(rows[1].classList.contains("bg-gray-800")).toBe(true);
    });
  });

  describe("team totals footer", () => {
    beforeEach(() => {
      componentRef.setInput("team", mockTeamGame);
      fixture.detectChanges();
    });

    it("should display totals row", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      expect(totalsRow).toBeTruthy();
      const firstCell = totalsRow.querySelector("td");
      expect(firstCell.textContent.trim()).toBe("Totals");
    });

    it("should display team total field goals", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[3].textContent.trim()).toBe("38/85");
    });

    it("should display team field goal percentage", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[4].textContent.trim()).toContain("44.7%");
    });

    it("should display team total three-pointers", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[5].textContent.trim()).toBe("12/30");
    });

    it("should display team total free throws", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[6].textContent.trim()).toBe("17/22");
    });

    it("should display team total offensive rebounds", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[7].textContent.trim()).toBe("10");
    });

    it("should display team total defensive rebounds", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[8].textContent.trim()).toBe("35");
    });

    it("should display team total rebounds", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[9].textContent.trim()).toBe("45");
    });

    it("should display team total assists", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[10].textContent.trim()).toBe("24");
    });

    it("should display team total steals", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[11].textContent.trim()).toBe("7");
    });

    it("should display team total blocks", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[12].textContent.trim()).toBe("5");
    });

    it("should display team total turnovers", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[13].textContent.trim()).toBe("12");
    });

    it("should display team total points", () => {
      const compiled = fixture.nativeElement;
      const totalsRow = compiled.querySelector("tfoot tr");
      const cells = totalsRow.querySelectorAll("td");
      expect(cells[14].textContent.trim()).toBe("105");
    });
  });

  describe("player navigation", () => {
    beforeEach(() => {
      componentRef.setInput("team", mockTeamGame);
      fixture.detectChanges();
    });

    it("should navigate to player page when player name is clicked", () => {
      component.navigateToPlayer(mockTeamGame.players[0]);
      expect(mockRouter.navigate).toHaveBeenCalledWith(["/player", 1], {
        state: { player: mockTeamGame.players[0] },
      });
    });

    it("should navigate with correct player data", () => {
      component.navigateToPlayer(mockTeamGame.players[1]);
      expect(mockRouter.navigate).toHaveBeenCalledWith(["/player", 1], {
        state: { player: mockTeamGame.players[1] },
      });
    });

    it("should trigger navigation when clicking player button", () => {
      const compiled = fixture.nativeElement;
      const playerButton = compiled.querySelector("tbody tr td button");
      playerButton.click();
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle player with zero stats", () => {
      const zeroStatsPlayer: Player = {
        firstName: "Bench",
        lastName: "Warmer",
        position: Position.PG,
        teamId: 1,
        attributes: {} as any,
        stats: new PlayerStats(),
      };

      const teamWithZeroStats = new Team(
        1,
        "LAL",
        "Lakers",
        "Los Angeles",
        [zeroStatsPlayer],
        new TeamStats()
      );
      const teamGame = new TeamGame(teamWithZeroStats);

      componentRef.setInput("team", teamGame);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const rows = compiled.querySelectorAll("tbody tr");
      expect(rows.length).toBe(1);
    });

    it("should handle division by zero in field goal percentage", () => {
      const player: Player = {
        firstName: "No",
        lastName: "Shots",
        position: Position.PG,
        teamId: 1,
        attributes: {} as any,
        stats: new PlayerStats(),
      };
      player.stats!.fieldGoalsMade = 0;
      player.stats!.fieldGoalAttempts = 0;

      const team = new Team(1, "LAL", "Lakers", "Los Angeles", [player], new TeamStats());
      const teamGame = new TeamGame(team);

      componentRef.setInput("team", teamGame);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const fgPct = compiled.querySelector("tbody tr td:nth-child(5)");
      // NaN results in "NaN%" which Angular handles
      expect(fgPct.textContent.trim()).toBe("");
    });
  });
});
