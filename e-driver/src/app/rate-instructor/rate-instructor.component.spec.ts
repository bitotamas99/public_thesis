import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateInstructorComponent } from './rate-instructor.component';

describe('RateInstructorComponent', () => {
  let component: RateInstructorComponent;
  let fixture: ComponentFixture<RateInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
