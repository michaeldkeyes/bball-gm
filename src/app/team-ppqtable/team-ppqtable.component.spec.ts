import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPpqtableComponent } from './team-ppqtable.component';

describe('TeamPpqtableComponent', () => {
  let component: TeamPpqtableComponent;
  let fixture: ComponentFixture<TeamPpqtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPpqtableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPpqtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
