import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInstructorComponent } from './calendar-instructor.component';

describe('CalendarInstructorComponent', () => {
  let component: CalendarInstructorComponent;
  let fixture: ComponentFixture<CalendarInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
