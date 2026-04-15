import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPlan } from './study-plan';

describe('StudyPlan', () => {
  let component: StudyPlan;
  let fixture: ComponentFixture<StudyPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyPlan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
