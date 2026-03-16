import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubject } from './add-subject';

describe('AddSubject', () => {
  let component: AddSubject;
  let fixture: ComponentFixture<AddSubject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
