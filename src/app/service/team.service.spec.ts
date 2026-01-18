import { TestBed } from "@angular/core/testing";

import { TeamService } from "./team.service";
import { beforeEach, describe, expect, it } from "vitest";

describe("TeamService", () => {
  let service: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
