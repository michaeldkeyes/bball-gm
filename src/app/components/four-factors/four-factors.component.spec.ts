import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourFactorsComponent } from './four-factors.component';

describe('FourFactorsComponent', () => {
  let component: FourFactorsComponent;
  let fixture: ComponentFixture<FourFactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourFactorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
