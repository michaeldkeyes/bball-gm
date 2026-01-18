import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PlayerPageComponent } from "./player-page.component";
import { beforeEach, describe, expect, it } from "vitest";

describe("PlayerPageComponent", () => {
  let component: PlayerPageComponent;
  let fixture: ComponentFixture<PlayerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
