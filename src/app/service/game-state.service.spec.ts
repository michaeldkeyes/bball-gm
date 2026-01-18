import { TestBed } from "@angular/core/testing";

import { GameStateService } from "./game-state.service";
import { beforeEach, describe, expect, it } from "vitest";

describe("GameStateService", () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
