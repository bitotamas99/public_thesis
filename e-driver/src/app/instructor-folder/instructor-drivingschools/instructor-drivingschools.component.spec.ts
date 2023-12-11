import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDrivingschoolsComponent } from './instructor-drivingschools.component';

describe('InstructorDrivingschoolsComponent', () => {
  let component: InstructorDrivingschoolsComponent;
  let fixture: ComponentFixture<InstructorDrivingschoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorDrivingschoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorDrivingschoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
