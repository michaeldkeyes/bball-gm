import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPPQTableComponent } from './team-ppqtable.component';

describe('TeamPPQTableComponent', () => {
  let component: TeamPPQTableComponent;
  let fixture: ComponentFixture<TeamPPQTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPPQTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPPQTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
