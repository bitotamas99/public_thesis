import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingSchoolsFormComponent } from './driving-schools-form.component';

describe('DrivingSchoolsFormComponent', () => {
  let component: DrivingSchoolsFormComponent;
  let fixture: ComponentFixture<DrivingSchoolsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivingSchoolsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivingSchoolsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
